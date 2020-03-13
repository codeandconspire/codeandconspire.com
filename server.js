if (!process.env.HEROKU) require('dotenv/config')

var jalla = require('jalla')
var body = require('koa-body')
var dedent = require('dedent')
var compose = require('koa-compose')
var { get, post } = require('koa-route')
var Prismic = require('prismic-javascript')
var purge = require('./lib/purge')
var imageproxy = require('./lib/cloudinary-proxy')
var {resolve} = require('./components/base')

var REPOSITORY = 'https://codeandconspire.cdn.prismic.io/api/v2'

var app = jalla('index.js', {
  sw: 'sw.js',
  serve: Boolean(process.env.HEROKU)
})

app.use(get('/robots.txt', function (ctx, next) {
  if (ctx.host === process.env.HOST) return next()
  ctx.type = 'text/plain'
  ctx.body = dedent`
    User-agent: *
    Disallow: ${app.env === 'production' ? '' : '/'}
  `
}))

// proxy cloudinary on-demand-transform API
app.use(get('/media/:type/:transform/:uri(.+)', async function (ctx, type, transform, uri) {
  if (ctx.querystring) uri += `?${ctx.querystring}`
  var stream = await imageproxy(type, transform, uri)
  var headers = ['etag', 'last-modified', 'content-length', 'content-type']
  headers.forEach((header) => ctx.set(header, stream.headers[header]))
  ctx.set('Cache-Control', `public, max-age=${60 * 60 * 24 * 365}`)
  ctx.body = stream
}))

app.use(post('/prismic-hook', compose([body(), async function (ctx) {
  var secret = ctx.request.body && ctx.request.body.secret
  ctx.assert(secret === process.env.PRISMIC_SECRET, 403, 'Secret mismatch')
  return new Promise(function (resolve, reject) {
    purge(function (err, response) {
      if (err) return reject(err)
      ctx.type = 'application/json'
      ctx.body = {}
      resolve()
    })
  })
}])))

app.use(get('/prismic-preview', async function (ctx) {
  var token = ctx.query.token
  var api = await Prismic.api(REPOSITORY, { req: ctx.req })
  var href = await api.previewSession(token, resolve, '/')
  var expires = app.env === 'development'
    ? new Date(Date.now() + (1000 * 60 * 60 * 12))
    : new Date(Date.now() + (1000 * 60 * 30))

  ctx.set('Cache-Control', 'no-cache, private, max-age=0')
  ctx.cookies.set(Prismic.previewCookie, token, {
    expires: expires,
    httpOnly: false,
    path: '/'
  })
  ctx.redirect(href)
}))

app.use(function (ctx, next) {
  if (!ctx.accepts('html')) return next()
  ctx.state.repository = REPOSITORY
  ctx.state.origin = ctx.origin
  return next()
})

app.use(function (ctx, next) {
  if (!ctx.accepts('html')) return next()
  var previewCookie = ctx.cookies.get(Prismic.previewCookie)
  if (previewCookie) {
    ctx.state.ref = previewCookie
    ctx.set('Cache-Control', 'no-cache, private, max-age=0')
  } else {
    ctx.state.ref = null
    if (app.env !== 'development') {
      ctx.set('Cache-Control', `s-maxage=${60 * 60 * 24 * 30}, max-age=0`)
    }
  }

  return next()
})

if (process.env.HEROKU && process.env.NODE_ENV === 'production') {
  purge(['/sw.js'], function (err) {
    if (err) throw err
    start()
  })
} else {
  start()
}

// start server
// () -> void
function start () {
  app.listen(process.env.PORT || 8080)
}

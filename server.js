if (!process.env.NOW) require('dotenv/config')

var jalla = require('jalla')
var dedent = require('dedent')
var route = require('koa-route')

var app = jalla('index.js', {sw: 'sw.js'})

app.use(route.get('/robots.txt', function (ctx, next) {
  if (ctx.host === 'www.codeandconspire.com') return next()
  ctx.type = 'text/plain'
  ctx.body = dedent`
    User-agent: *
    Disallow: /
  `
}))

start()

// start server
// () -> void
function start () {
  app.listen(process.env.PORT || 8080)
}

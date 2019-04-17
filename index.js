var choo = require('choo')
var middleware = require('./lib/prismic-middleware')

var REPOSITORY = 'https://codeandconspire.cdn.prismic.io/api/v2'

var app = choo({hash: false})

app.use(require('./stores/reset'))

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  app.use(require('choo-devtools')())
  app.use(require('choo-service-worker/clear')())
}

app.use(require('choo-service-worker')('/sw.js'))
app.use(require('./stores/prismic')({ repository: REPOSITORY, middleware }))
app.use(require('choo-meta')({ origin: app.state.origin }))
app.use(require('./stores/ui'))

app.route('/', require('./views/home'))
app.route('/:slug', catchall)
app.route('/404', require('./views/404'))

try {
  module.exports = app.mount('body')
} catch (err) {
  if (typeof window !== 'undefined') {
    document.documentElement.classList.remove('has-js')
  }
}

function catchall (state, emit) {
  if (typeof window !== 'undefined' && window.location.hash) {
    return require('./views/home')(state, emit)
  }
  return require('./views/case')(state, emit)
}

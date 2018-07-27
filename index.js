var choo = require('choo')
var LRU = require('nanolru')

var app = choo({cache: new LRU(100)})

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  app.use(require('choo-devtools')())
  app.use(require('choo-service-worker/clear')())
}

app.use(require('choo-service-worker')('/sw.js'))
app.use(require('./lib/meta'))

app.route('/', require('./lib/home'))
app.route('/404', require('./lib/404'))

try {
  module.exports = app.mount('body')
} catch (err) {
  if (typeof window !== 'undefined') {
    document.documentElement.classList.remove('has-js')
  }
}

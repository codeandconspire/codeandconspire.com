var html = require('choo/html')
var error = require('./error')
var Header = require('./header')
var Footer = require('./footer')
var Takeover = require('../takeover')
var {i18n} = require('../base')

var text = i18n('./lang.json')

var DEFAULT_TITLE = 'code and conspire'

module.exports = createView

function createView (view, meta) {
  return function (state, emit) {
    if (state.ui.isPartial) return view(state, emit)

    var children
    try {
      children = state.error ? error(state.error) : view(state, emit)
      let next = meta(state)
      if (next.title !== DEFAULT_TITLE) {
        next.title = `${next.title} > ${DEFAULT_TITLE}`
      }
      emit('meta', next)
    } catch (err) {
      err.status = err.status || 500
      children = error(err)
      emit('meta', {
        description: '',
        'og:image': '/share.png',
        title: `${text`Oops`} > ${DEFAULT_TITLE}`
      })
    }

    prefetch('XK3lsREAAFjd6pAM')() // Home
    prefetch('XK4YgxEAABX_62qB')() // Manifesto
    prefetch('XK4X5hEAACzt62hY')() // About

    function prefetch (id) {
      return function () {
        var doc = state.documents.items.find((item) => item.id === id)
        if (!doc) emit('doc:fetch', {id}, {silent: true})
      }
    }

    return html`
      <body class="View">
        ${state.cache(Header, 'header').render(state.route)}
        ${children}
        ${state.cache(Footer, 'footer').render()}
        ${state.cache(Takeover, Takeover.id()).render()}
      </body>
    `
  }
}

var html = require('choo/html')
var error = require('./error')
var {i18n} = require('../base')
var Header = require('./header')
var Footer = require('./footer')
var Takeover = require('../takeover')
var PrismicToolbar = require('../prismic-toolbar')

var text = i18n('./lang.json')

var DEFAULT_TITLE = 'code and conspire'
var MENU = [
  ['homepage'],
  ['case', 'manifesto'],
  ['case', 'about']
]

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

    MENU.forEach(function ([type, uid]) {
      if (uid) state.prismic.getByUID(type, uid, {prefetch: true})
      else state.prismic.getSingle(type, {prefetch: true})
    })

    return html`
      <body class="View">
        ${state.cache(Header, 'header').render(state.route)}
        ${children}
        ${state.cache(Footer, 'footer').render()}
        ${state.cache(Takeover, Takeover.id()).render()}
        ${state.cache(PrismicToolbar, 'prismic-toolbar').placeholder(state.href)}
      </body>
    `
  }
}

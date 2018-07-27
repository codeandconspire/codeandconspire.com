var html = require('choo/html')
var error = require('./error')
var {i18n} = require('../base')

var text = i18n(require('../base/text.json'))

var DEFAULT_TITLE = text`SITE_TITLE`

module.exports = createView

function createView (view, meta) {
  return function (state, emit) {
    var children
    try {
      children = state.error ? error(state.error) : view(state, emit)
      let next = meta(state)
      if (next.title !== DEFAULT_TITLE) {
        next.title = `${next.title} | ${DEFAULT_TITLE}`
      }
      emit('meta', next)
    } catch (err) {
      err.status = err.status || 500
      children = error(err)
      emit('meta', {
        description: '',
        'og:image': '/share.png',
        title: `${text`Oops`} | ${DEFAULT_TITLE}`
      })
    }

    return html`
      <body class="View">
        ${children}
      </body>
    `
  }
}

var html = require('choo/html')
var view = require('../components/view')
var {i18n} = require('../components/base')

var text = i18n()

module.exports = view(home, meta)

function home (state, emit) {
  return html`
    <main class="View-container">
      <h2 class="u-hiddenVisually">${text`conspire!`}</h2>  
    </main>
  `
}

function meta (state) {
  return {
    'og:image': '/share.png',
    title: text`SITE_TITLE`,
    description: text`SITE_DESCRIPTION`
  }
}

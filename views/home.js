var html = require('choo/html')
var view = require('../components/view')
var intro = require('../components/intro')
var poster = require('../components/poster')
var content = require('../content')

module.exports = view(home, meta)

function meta (state) {
  return {
    'og:image': '/share.png',
    title: 'code and conspire',
    description: 'We are a group of digital experts in creating websites, applications, and services of the highest quality humanly possible.'
  }
}

function posters () {
  return content.map(function (item) {
    return html`
      <div class="View-poster">
        ${poster(item)}
      </div>
    `
  })
}

function home (state, emit) {
  return html`
    <main class="View-container">
      <div class="View-main">
        ${intro()}
      </div>

      <div class="View-scroll">
        <div class="View-poster View-poster--empty" area-hidden="true">
          ${intro()}
        </div>
        ${posters()}
      </div>
    </main>
  `
}

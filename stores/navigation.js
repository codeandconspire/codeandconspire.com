/* global gtag */

module.exports = navigation

function navigation (state, emitter) {
  emitter.on('navigate', function () {
    window.requestAnimationFrame(function () {
      gtag('config', 'UA-138966069-1', {
        'page_title': state.title,
        'page_path': state.href
      })
    })
  })
}

var html = require('choo/html')
var error = require('./error')

var DEFAULT_TITLE = 'code and conspire'

module.exports = createView

if (typeof window !== 'undefined') {
  document.addEventListener('touchstart', function () {}, false)
}

// var created = false

function createView (view, meta) {
  // if (!created && (typeof window !== 'undefined')) {
  //   window.addEventListener('resize', function () {
  //     var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) + 'px'
  //     document.documentElement.style.setProperty('--vh', vh)
  //   })
  // }

  // created = true

  return function (state, emit) {
    var children
    try {
      children = state.error ? error(state.error) : view(state, emit)
      let next = meta(state)
      if (next.title !== DEFAULT_TITLE) {
        next.title = `${next.title} _ ${DEFAULT_TITLE}`
      }
      emit('meta', next)
    } catch (err) {
      err.status = err.status || 500
      children = error(err)
      emit('meta', {
        description: '',
        'og:image': '/share.png',
        title: `Oh no _ ${DEFAULT_TITLE}`
      })
    }

    return html`
      <body class="View">
        ${children}
      </body>
    `
  }
}

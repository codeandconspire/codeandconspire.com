var Header = require('../components/view/header')

module.exports = ui

function ui (state, emitter, app) {
  state.ui = {
    isFirst: true,
    isPartial: false,
    isLoading: false,
    inTransition: false
  }

  emitter.on('ui:transition', function (next = true) {
    state.ui.inTransition = next
  })

  emitter.on('ui:partial', function (href, getPartial) {
    getPartial(function () {
      var matched = app.router.match(href)
      var _state = Object.assign({}, state, {
        href: href,
        route: matched.route,
        params: matched.params,
        ui: Object.assign({}, state.ui, {isPartial: true})
      })
      // pluck out header component from cache and pre-rerender with next route
      state.cache(Header, 'header').render(matched.route)
      return matched.cb(_state, emitter.emit.bind(emitter))
    })
  })

  // circumvent choo default scroll-to-anchor behavior
  emitter.on('navigate', function () {
    state.ui.inTransition = false
    state.ui.isFirst = false
    window.requestAnimationFrame(function () {
      window.scrollTo(0, 0)
    })
  })

  var requests = 0
  emitter.on('prismic:request', start)
  emitter.on('prismic:response', end)
  emitter.on('prismic:error', end)

  function start () {
    requests++
    state.ui.isLoading = true
  }

  function end () {
    requests--
    state.ui.isLoading = requests > 0
  }
}

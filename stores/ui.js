module.exports = ui

function ui (state, emitter, app) {
  state.ui = {
    isFirst: true,
    isPartial: false,
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
      // pluck out header component and pre-rerender with next route
      app._cache.get('header').render(matched.route)
      return matched.cb(_state, emitter.emit.bind(emitter))
    })
  })

  // circumvent choo default scroll-to-anchor behavior
  emitter.on('navigate', function () {
    state.ui.inTransition = false
    state.ui.isFirst = false

    window.requestAnimationFrame(function () {
      var el = document.getElementById(window.location.hash.substr(1))

      if (!el) {
        window.scrollTo(0, 0)
      } else {
        let from = window.scrollY
        window.setTimeout(function () {
          // reset scroll to where it was before navigate
          window.scrollTo(window.scrollX, from)
          window.setTimeout(function () {
            // smoothly scroll element into view when everything has settled
            el.scrollIntoView({behavior: 'smooth', block: 'start'})
          }, 0)
        }, 0)
      }
    })
  })
}

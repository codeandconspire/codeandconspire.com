var html = require('choo/html')
var {asText} = require('prismic-richtext')
var view = require('../components/view')
var Figure = require('../components/figure')
var Takeover = require('../components/takeover')
var Header = require('../components/view/header')
var {i18n, resolve} = require('../components/base')

var text = i18n()

module.exports = view(home, meta)

function home (state, emit) {
  var animate = state.ui.isPartial || state.ui.isFirst

  return state.prismic.getSingle('homepage', function (err, doc) {
    if (err) throw err
    if (!doc) {
      return html`
        <main class="View-container View-container--nudge View-container--fill"></main>
      `
    }

    return html`
      <main class="View-container View-container--nudge">
        <section>
          <h1 class="Display Display--1 u-spaceIntro u-spaceIntro--alt ${state.ui.isPartial ? 'u-slideIn' : ''}" style="${state.ui.isPartial ? 'animation-delay: 150ms;' : ''}">${asText(doc.data.title)}</h1>
          <div class="View-grid" id="cases">
            <div class="View-cell ${animate ? 'u-slideIn' : ''} View-headline" style="${animate ? `animation-delay: ${delay(0)}ms;` : ''}">
              <h2 class="u-spaceB3">${text`Selected cases`}</h2>
            </div>
            ${doc.data.featured_cases.map(function (props, i) {
              setTimeout(prefetch(props.case.id), (i + 1) * 500)

              return html`
                <div class="View-cell u-md-size1of2 u-spaceT6 ${animate ? 'u-slideIn' : ''}" style="${animate ? `animation-delay: ${delay(i)}ms;` : ''}">
                  <a href="${resolve(props.case)}" class="Figure-outer" onclick=${explode} onmouseover=${prefetch(props.case.id)} ontouchstart=${prefetch(props.case.id)}>
                    ${state.cache(Figure, `${props.case.uid}-${Figure.id(props.image)}:${state.ui.isPartial}`, {interactive: true, size: 'half'}).render(props.image)}
                    <h3 class="u-spaceT2">${asText(props.case.data.title)}</h3>
                  </a>
                </div>
              `
            })}
          </div>
        </section>
      </main>
    `
  })

  function delay (i) {
    if (state.ui.isFirst) {
      return 350 + 50 * (i % 2)
    } else if (state.ui.isPartial) {
      return 225 - 50 * (i % 2)
    }
  }

  function explode (event) {
    if (state.ui.inTransition) return event.preventDefault()
    var { scrollY, scrollX } = window
    var target = event.currentTarget
    var coordinates = {
      left: event.pageX - scrollX,
      top: event.pageY - scrollY
    }
    var header = new Header().render(target, true)
    state.cache(Takeover, Takeover.id()).open(target.pathname, coordinates, header)
    event.preventDefault()
  }

  function prefetch (id) {
    return function () {
      state.prismic.getByID(id, {prefetch: true})
    }
  }
}

function meta (state) {
  return state.prismic.getSingle('homepage', function (err, doc) {
    if (err) throw err
    if (!doc) return {title: text`Loading`}
    return {
      'og:image': '/share.png',
      title: 'code and conspire',
      description: doc.data.description
    }
  })
}

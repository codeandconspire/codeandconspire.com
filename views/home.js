var html = require('choo/html')
var {asText} = require('prismic-richtext')
var view = require('../components/view')
var {i18n} = require('../components/base')
var Figure = require('../components/figure')
var Takeover = require('../components/takeover')

var text = i18n()

module.exports = view(home, meta)

function home (state, emit) {
  if (state.documents.error) throw state.documents.error

  var animate = state.ui.isPartial || state.ui.isFirst

  var doc = state.documents.items.find((doc) => doc.type === 'homepage')
  if (!doc) {
    emit('doc:fetch', {type: 'homepage'})
    return html`
      <main class="View-container View-container--nudge View-container--fill"></main>
    `
  }

  return html`
    <main class="View-container View-container--nudge">
      <section id="cases">
        <h1 class="Display Display--1 u-spaceIntro u-spaceIntro--alt ${state.ui.isPartial ? 'u-slideInY' : ''}" style="${state.ui.isPartial ? 'animation-delay: 150ms;' : ''}">${asText(doc.data.title)}</h1>
        <div class="View-grid">
          <div class="View-cell ${animate ? 'u-slideInY' : ''} View-headline" style="${animate ? `animation-delay: ${delay(0)}ms;` : ''}">
            <h2 class="u-textBold">${text`Our case studies`}</h2>
          </div>
          ${doc.data.featured_cases.map(function (props, i) {
            setTimeout(function () {
              prefetch(props.case.id)()
            }, (i + 1) * 500)

            return html`
              <div class="View-cell u-md-size1of2 u-spaceT6 ${animate ? 'u-slideInY' : ''}" style="${animate ? `animation-delay: ${delay(i)}ms;` : ''}">
                <a href="${state.documents.resolve(props.case)}" class="Figure-outer" onclick=${explode} onmouseover=${prefetch(props.case.id)} ontouchstart=${prefetch(props.case.id)}>
                  ${state.cache(Figure, `${props.case.uid}-${Figure.id(props.image)}:${state.ui.isPartial}`, {interactive: true, size: 'half'}).render(props.image)}
                  <h3 class="u-textBold u-spaceT3">${asText(props.case.data.title)}</h3>
                  <p class="u-spaceT1">${asText(props.case.data.description)}</p>
                </a>
              </div>
            `
          })}
        </div>
      </section>
    </main>
  `

  function delay (i) {
    if (state.ui.isFirst) {
      return 350 + 50 * (i % 2)
    } else if (state.ui.isPartial) {
      return 225 - 50 * (i % 2)
    }
  }

  function explode (event) {
    if (state.ui.inTransition) return event.preventDefault()
    var target = event.currentTarget
    var origin = target.querySelector('.js-plus').getBoundingClientRect()
    state.cache(Takeover, Takeover.id()).open(target.pathname, origin)
    event.preventDefault()
  }

  function prefetch (id) {
    return function () {
      var doc = state.documents.items.find((item) => item.id === id)
      if (!doc) emit('doc:fetch', {id}, {silent: true})
    }
  }
}

function meta (state) {
  var doc = state.documents.items.find((doc) => doc.type === 'homepage')
  if (!doc) return {title: text`Loading`}
  return {
    'og:image': '/share.png',
    title: 'code and conspire',
    description: doc.data.description
  }
}

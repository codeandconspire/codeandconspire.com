var html = require('choo/html')
var raw = require('choo/html/raw')
var Component = require('choo/component')
var asElement = require('prismic-element')
var {asText, Elements} = require('prismic-richtext')
var view = require('../components/view')
var Figure = require('../components/figure')
var {i18n} = require('../components/base')

var text = i18n()

module.exports = view(caseView, meta)

function caseView (state, emit) {
  if (state.documents.error) throw state.documents.error

  var doc = state.documents.items.find((item) => item.uid === state.params.slug)
  if (!doc) {
    emit('doc:fetch', { type: 'case', uid: state.params.slug }, { fatal: true })

    // try and lookup case as linked item on homepage
    let parent = state.documents.items.find((doc) => doc.type === 'homepage')
    if (parent) {
      doc = parent.data.featured_cases.find(function (item) {
        return item.case.uid === state.params.slug
      }).case

      return html`
        <main class="View-container View-container--nudge View-container--fill">
          <h1 class="Display Display--1 u-spaceIntro u-spaceB8 ${state.ui.isPartial ? 'u-slideInY' : ''}" style="${state.ui.isPartial ? 'animation-delay: 150ms;' : ''}">${asText(doc.data.title).trim()}</h1>
          <div class="View-reverse View-reverse--md">
            <div class="u-spaceV4 ${state.ui.isPartial ? 'u-slideInY' : ''}" style="${state.ui.isPartial ? 'animation-delay: 200ms;' : ''}">
              ${doc.data.image.url ? state.cache(Figure, `${Figure.id(doc.data.image)}-${state.ui.isPartial}`).render(doc.data.image) : null}
            </div>
          </div>
        </main>
      `
    }

    return html`
      <main class="View-container View-container--nudge View-container--fill"></main>
    `
  }

  return html`
    <main class="View-container View-container--nudge">
      <h1 class="Display Display--1 u-spaceIntro u-spaceB8 ${state.ui.isPartial ? 'u-slideInY' : ''}" style="${state.ui.isPartial ? 'animation-delay: 150ms;' : ''}">${asText(doc.data.title).trim()}</h1>
      <div class="View-reverse View-reverse--md">
        <div class="u-spaceV4 ${state.ui.isPartial ? 'u-slideInY' : ''}" style="${state.ui.isPartial ? 'animation-delay: 225ms;' : ''}">
          ${doc.data.image.url ? state.cache(Figure, `${Figure.id(doc.data.image)}-${state.ui.isPartial}`).render(doc.data.image) : null}
        </div>
        <section class="View-grid u-spaceT1 ${state.ui.isPartial ? 'u-slideInY' : ''}" style="${state.ui.isPartial ? 'animation-delay: 175ms;' : ''}">
          ${doc.data.introduction.map((item, index, list) => html`
            <div class="View-cell u-md-size1of${list.length > 3 ? 2 : list.length}">
              ${state.cache(Topic, [doc.id, Topic.id(item), state.ui.isPartial].join('-')).render(item)}
            </div>
          `)}
        </section>
      </div>
      ${!state.ui.isPartial && doc.data.body.map((slice) => {
        switch (slice.slice_type) {
          case 'gallery': return html`
            <div class="View-grid">
              ${slice.items.map((item, index, list) => html`
                <div class="View-cell u-md-size1of2 u-spaceB4">
                  ${state.cache(Figure, Figure.id(item.image), {size: 'half'}).render(item.image)}
                </div>
              `)}
            </div>
          `
          case 'people': return html`
            <div class="View-grid">
              ${slice.items.map((item, index, list) => html`
                <div class="View-cell u-size1of2 u-md-size1of3 u-spaceB6">
                  ${state.cache(Figure, Figure.id(item.image), {size: 'third'}).render(item.image)}
                  <div class="Text u-spaceT3">${asElement(item.text)}</div>
                </div>
              `)}
              <div class="View-cell u-size1of2 u-md-size1of3 u-spaceB6">
                <div class="Figure">
                  <div style="--Figure-aspect: 133.67%;" class="Figure-container">
                    <div class="Figure-body">
                      <div class="Text Text--light u-textCenter Text--adaptive">
                        <p><strong>${text`Want to work with us?`}</strong><br>${text`Let us know!`}</p>
                        <p class="u-spaceT4">
                          <a href="mailto:hi@codeandconspire.com">Send an email</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </figure>
              </div>
            </div>
          `
          case 'image': return html`
            <div class="u-spaceB4">
              ${state.cache(Figure, Figure.id(slice.primary.image)).render(slice.primary.image)}
            </div>
          `
          case 'text': return html`
            <div class="View-divider">
              <div class="View-grid">
                ${slice.primary.align.toLowerCase() === 'right' ? html`
                  <div class="View-cell u-md-size1of2 u-lg-size1of3"></div>
                ` : null}
                <div class="View-cell u-md-size1of2 u-lg-size2of3">
                  <div class="Text u-spaceV4">
                    ${asElement(slice.primary.body)}
                  </div>
                </div>
              </div>
            </div>
          `
          case 'heading': return html`
            <div class="View-divider">
              <div class="View-grid u-spaceV8">
                <div class="View-cell u-md-size1of2 u-lg-size1of3 u-spaceB6">
                  <div class="Text">
                    <h2>${asText(slice.primary.heading).trim()}</h2>
                  </div>
                </div>
                <div class="View-cell u-md-size1of2 u-lg-size2of3">
                  <div class="View-grid">
                    ${slice.items.map((item) => html`
                      <div class="View-cell u-lg-size1of2 u-spaceB6">
                        <div class="Text">
                          ${asElement(item.body)}
                        </div>
                      </div>
                    `)}
                  </div>
                </div>
              </div>
            </div>
          `
          case 'large_heading': return html`
            <h2 class="Display Display--1 u-spaceIntro u-spaceB8">
              ${asText(slice.primary.heading).trim()}
            </h2>
          `
          case 'video': {
            let embed = slice.primary.video.find((block) => block.type === 'embed')

            if (embed) {
              embed = asElement([embed])
            } else {
              embed = slice.primary.video.find((block) => block.type === 'preformatted')
              if (!embed) return null
              embed = raw(embed.text)
            }

            return html`
              <div class="Text Text--full u-spaceB4">
                ${embed}
              </div>
            `
          }
          default: return null
        }
      })}
    </main>
  `
}

class Topic extends Component {
  constructor (id, state, opts = {}) {
    super(id)
    this.id = id
    this.resolve = state.documents.resolve
    this.local = state.components[id] = {expanded: false}
  }

  static id (props) {
    return asText(props.heading)
      .trim()
      .toLowerCase()
      .split(' ')
      .slice(0, 6)
      .map((word) => word.replace(/[^\w]/g, ''))
      .join('-')
  }

  update () {
    return false
  }

  expand () {
    this.local.expanded = true
    this.rerender()
  }

  unload () {
    this.local.expanded = false
  }

  createElement (props) {
    return html`
      <div id="${this.id}">
        ${props.heading ? html`
          <div class="Text Text--full">
            <h2>${asText(props.heading).trim()}</h2>
          </div>
        ` : null}
        <div class="Text Text--wide u-spaceT1 u-spaceB6">
          ${asElement(props.body.slice(0, 1), this.resolve, serialize)}
        </div>
      </div>
    `

    function serialize (node, content, children) {
      switch (node.type) {
        case Elements.paragraph: return html`<p class="u-spaceB2">${children}</p>`
        default: return null
      }
    }
  }
}

function meta (state) {
  if (state.documents.loading) return {title: text`Loading`}
  var doc = state.documents.items.find((item) => item.uid === state.params.slug)

  if (!doc) {
    let parent = state.documents.items.find((doc) => doc.type === 'homepage')

    if (parent) {
      doc = parent.data.featured_cases.find(function (item) {
        return item.case.uid === state.params.slug
      }).case
    }

    if (!doc) {
      let err = new Error('Page not found')
      err.status = 404
      throw err
    }
  }
  return {
    'og:image': doc.data.image.url ? doc.data.image.url : '/share.png',
    title: (doc.data.label || asText(doc.data.title)).trim(),
    description: doc.data.description[0].text
  }
}

var html = require('choo/html')
var Component = require('choo/component')
var {mousemove, memo, srcset} = require('../base')

module.exports = Figure

// wrapper class that only instantiates a Component if needed
// (str, obj, fn, opts) -> obj
function Figure (id, state, emit, opts) {
  opts = opts || {}
  if (opts.interactive) return new InteractiveFigure(id, state, emit, opts)
  Object.assign(this, opts, { id })
}

Figure.prototype.render = createElement

Figure.id = function (img) {
  return img.url.match(/.+\/(.+?)\.(?:jpg|jpeg|png|svg|gif|webp)$/)[1]
}

class InteractiveFigure extends Component {
  constructor (id, state, emit, opts) {
    super(id)
    Object.assign(this, opts)
    this.createElement = createElement
    this.aspect = opts.aspect
  }

  static id (img) {
    return img.url.match(/.+\/(.+?)\.(?:jpg|jpeg|png|svg|gif|webp)$/)[1]
  }

  load (element) {
    this.unload = mousemove(element)
  }

  update () {
    return false
  }
}

function createElement (img) {
  var viewport = '(min-midth: 600px) 50vw, 100vw'
  var sizes = [640, 750, 1125, 1440, [2880, 'q_50'], [3840, 'q_50']]

  if (this.size === 'half') {
    viewport = '50vw'
    sizes = [640, 750, 1125, 1440, [2880, 'q_50'], [3840, 'q_50']]
  }

  var image = memo(function (url, sizes) {
    if (!url) return null
    var sources = srcset(img.url, sizes)
    return Object.assign({
      sizes: viewport,
      srcset: sources,
      alt: img.alt || '',
      src: sources.split(' ')[0]
    }, img.dimensions)
  }, [img, sizes])

  return html`
    <figure class="Figure" id="${this.id}">
      <div class="Figure-container" style="padding-bottom:${this.aspect ? 'var(--aspect)' : ((img.dimensions.height / img.dimensions.width * 100).toFixed(2) + '%')};">
        ${this.interactive ? decorator() : null}
        ${image ? getImage(image) : null}
      </div>
      ${img.alt ? html`
        <figcaption class="Figure-caption">${img.alt}</figcaption>
      ` : null}
    </figure>
  `
}

function decorator () {
  return html`
    <div class="Figure-decorator">
      <div class="Figure-plus js-plus"><div class="Figure-circle"></div></div>
    </div>
  `
}

function getImage (props) {
  var attrs = {}
  Object.keys(props).forEach(function (key) {
    if (key !== 'src') attrs[key] = props[key]
  })
  return html`<img class="Figure-image" ${attrs} src="${props.src}">`
}

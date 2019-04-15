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
    Object.assign(this, opts, { id })
    this.createElement = createElement
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
  var alt = img.alternative
  return html`
    <figure class="Figure" id="${this.id}">
      <div class="Figure-container ${alt ? 'Figure-container--alternative' : ''}" style="--Figure-aspect: ${(img.dimensions.height / img.dimensions.width * 100).toFixed(2)}%; ${alt ? `--Figure-aspect-alternative: ${(alt.dimensions.height / alt.dimensions.width * 100).toFixed(2)}%` : ''}">
        ${img.url ? getImage(img) : null}
      </div>
      ${img.alt ? html`
        <figcaption class="u-spaceT2">${img.alt}</figcaption>
      ` : null}
    </figure>
  `
}

function getImage (props) {
  var viewport = '100vw'
  var sizes = [640, 750, 1125, 1440, [2880, 'q_80'], [3840, 'q_70']]

  if (this.size === 'half') {
    viewport = '(min-midth: 600px) 50vw, 100vw'
    sizes = [640, 750, 1125, 1440, [2880, 'q_80'], [3840, 'q_70']]
  }

  if (this.size === 'third') {
    viewport = '(min-midth: 600px) 30vw, 50vw'
    sizes = [640, 750, 1125, 1440, [2880, 'q_80'], [3840, 'q_70']]
  }

  var attrs = memo(function (url, sizes) {
    if (!url) return null
    var sources = srcset(props.url, sizes)
    return Object.assign({
      sizes: viewport,
      srcset: sources,
      alt: props.alt || '',
      src: sources.split(' ')[0]
    }, props.dimensions)
  }, [props.url, sizes])

  if (!props.alternative) {
    return html`<img class="Figure-image" ${attrs}>`
  }

  return html`
    <picture>
      <source srcset="${attrs.srcset}" media="(min-width: 600px)" sizes="${viewport}">
      <img class="Figure-image" alt="${attrs.alt}" srcset="${srcset(props.alternative.url, [300, 600, 900])}" sizes="${viewport}" width="${attrs.width}" height="${attrs.height}" src="${attrs.src}">
    </picture>
  `
}

var html = require('choo/html')

module.exports = Poster

function Poster (opts) {
  return html`
    <section class="Poster" id="poster-${opts.key}">
      <strong class="Poster-label">${opts.label}</strong>
      <h1 class="Display">${opts.title}</h1>
      <p class="Poster-text">${opts.text}</p>
    </section>
  `
}

var html = require('choo/html')

module.exports = Poster

function Poster (props) {
  return html`
    <section class="Poster Poster--${props.id}" id="poster-${props.id}">
      <div class="Poster-body">
        <strong class="Poster-label">${props.label}</strong>
        <h1 class="Display Display--keep">${props.title}</h1>
        <p class="Poster-text">${props.text}</p>
        <a class="Poster-link" target="_blank" rel="noopener noreferrer" href="${props.link.href}">${props.link.text}</a>
      </div>
      ${props.img ? html`
        <img class="Poster-bg" src="https://res.cloudinary.com/demo/image/fetch/c_scale,h_1342,q_auto/https://www.codeandconspire.com/${props.img.src}" alt="${props.img.alt}">
      ` : null} 
      ${props.embed ? html`
        ${props.embed}
      ` : null} 
    </section>
  `
}

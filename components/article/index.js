var html = require('choo/html')

module.exports = article

function article (opts) {
  return html`
    <div class="Article" id="${opts.id}">
      ${opts.children}
    </div>
  `
}

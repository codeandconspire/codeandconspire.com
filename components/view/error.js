var html = require('choo/html')
var {i18n} = require('../base')

var text = i18n(require('../base/text.json'))

module.exports = error

function error (err) {
  return html`
    <main>
      <h1>${text`Nothing here`}</h1>
      <div>
        ${err.status === 404 ? html`
          <p>
            <a href="/">${text`Try the index`}</a>.
          </p>
        ` : html`
          <p>
            ${text`Something crashed. Sorry. It happens to the best of us.`}
            <br>
            <a href="/">${text`Try the index`}</a>.
          </p>
        `}
        ${process.env.NODE_ENV === 'development' ? html`
          <div>
            <pre>${err.name}: ${err.message}</pre>
            <pre>${err.stack}</pre>
          </div>
        ` : null}
      </div>
    </main>
  `
}

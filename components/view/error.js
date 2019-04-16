var html = require('choo/html')
var {i18n} = require('../base')

var DEBUG = process.env.NODE_ENV === 'development'
if (typeof window !== 'undefined') {
  try {
    let flag = window.localStorage.DEBUG
    DEBUG = DEBUG || (flag && JSON.parse(flag))
  } catch (err) {}
}

var text = i18n()

module.exports = error

function error (err) {
  return html`
    <main class="View-container View-container--nudge View-container--center">
      <h1 class="Display Display--1">${text`Oops`}</h1>
      <div class="Text Text--center">
        ${err.status === 404 ? html`
          <p>
            ${text`There is no page at this address. Try finding your way using the menu or from` + ' '}
            <a href="/">${text`the homepage`}</a>.
          </p>
        ` : html`
          <p>
            ${text`We apologize, an error has occured on our site. It may be temporary and you could` + ' '}
            <a href="">${text`try again`}</a>
            ${' ' + text`or go back to` + ' '}
            <a href="/">${text`the homepage`}</a>.
          </p>
        `}
        ${DEBUG ? html`
          <div>
            <pre>${err.name}: ${err.message}</pre>
            <pre>${err.stack}</pre>
          </div>
        ` : null}
      </div>
    </main>
  `
}

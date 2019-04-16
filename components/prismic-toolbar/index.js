var html = require('choo/html')
var Component = require('choo/component')
var Prismic = require('prismic-javascript')
var { i18n } = require('../base')

var text = i18n()

var COOKIE_REGEX = new RegExp(`${Prismic.previewCookie}=(.+?)(?:;|$)`)

module.exports = class PrismicToolbar extends Component {
  constructor (id, state, emit) {
    super(id)
    this.local = {
      id,
      href: state.href,
      token: state.query.token,
      enabled: typeof window !== 'undefined'
    }

    this.href = () => state.origin + state.href

    if (state.query.token && typeof window !== 'undefined') {
      let expires = process.env.NODE_ENV === 'development'
        ? new Date(Date.now() + (1000 * 60 * 60 * 12))
        : new Date(Date.now() + (1000 * 60 * 30))
      document.cookie = `${Prismic.previewCookie}=${state.query.token}; path=/; expires=${expires.toUTCString()};`
      emit('prismic:clear')
      emit('replaceState', state.href)
    }
  }

  placeholder (href) {
    if (!this.local.enabled) return null
    if (!this.local.token) {
      let cookie = document.cookie.match(COOKIE_REGEX)
      if (!cookie) {
        this.local.enabled = false
        return null
      }
      this.local.token = cookie[1]
    }
    return this.render(href)
  }

  update (href) {
    if (this.local.href === href) return false
    this.local.href = href
    return true
  }

  createElement () {
    return html`
      <aside class="PrismicToolbar">
        <svg width="25" height="25" viewBox="0 0 25 25" class="PrismicToolbar-logo">
          <g fill="#FFF" fill-rule="evenodd">
            <path d="M8 4H7C5.2 4 4 5.3 4 7v8.7c1 .6 2.2 1 3 1V9c0-.3 0-3 1-5zm13 4V7c0-1.7-1.5-3-3-3H9c-.5 1-.8 2.2-1 3h8s2.6 0 5 1zm-4.3 13h1c1.8 0 3-1.5 3-3V9c-1-.5-2.2-.8-3-1v8s0 2.6-1 5zM4 16.7v1c0 1.8 1.2 3 2.8 3h8.8c.7-1 1-2.2 1-3H9s-2.7 0-5-1z"/>
            <path d="M13.7 0H6C2.7 0 0 2.7 0 6c0 0 .3 5.6 2.5 8.3 0 .2.3.4.5.6V7c0-2.3 1.7-4 4-4h1.6c.3-.4.6-.8 1-1 1-1 2.6-1.6 4-2z"/>
            <path d="M24.7 13.7V6c0-3.3-2.6-6-6-6 0 0-5.6.3-8.3 2.5-.2 0-.4.3-.5.5h7.6c2.2 0 4 1.7 4 4v1.6l1 1c1 1 1.5 2.6 2 4z"/>
            <path d="M11 24.7h7.8c3.3 0 6-2.6 6-6 0 0-.3-5.6-2.5-8.3l-.5-.5v7.6c0 2.2-1.8 4-4 4H16c-.2.4-.5.7-1 1-1 1-2.4 1.5-4 2z"/>
            <path d="M0 11v7.8c0 3.3 2.7 6 6 6 0 0 5.7-.3 8.4-2.5l.5-.5H7c-2.2 0-4-1.8-4-4V16c-.4-.2-.8-.5-1-1-1-1-1.5-2.4-2-4z"/>
          </g>
        </svg>
        <h2 class="PrismicToolbar-title">${text`Preview`}</h2>
        <div class="PrismicToolbar-share">
          <input type="url" autocomplete="off" value="${this.href()}?token=${this.local.token}" class="PrismicToolbar-url js-preview" readonly>
          <button class="PrismicToolbar-button" type="button" onclick=${copy}>${text`Copy`}</button>
        </div>
        <button class="PrismicToolbar-close" title="${text`Close`}" onclick=${close}>✕</button>
      </aside>
    `

    function close () {
      document.cookie = `${Prismic.previewCookie}=; path=/; Max-Age=-99999999;`
      window.location.reload()
    }

    function copy (event) {
      var input = document.querySelector('.js-preview')
      input.select()
      document.execCommand('Copy')
    }
  }
}

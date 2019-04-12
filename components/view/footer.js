var html = require('choo/html')
var Component = require('choo/component')
var {i18n} = require('../base')

var text = i18n()

module.exports = class Footer extends Component {
  constructor (id, state, emit) {
    super(id)
    this.id = id
  }

  update () {
    return false
  }

  createElement () {
    return html`
      <footer class="View-footer" id="${this.id}">
        <div class="View-contact">
          <h2>
            <span class="u-textBold u-block u-spaceT8 u-spaceB4">
              ${text`Contact us`}
            </span>
            <span class="Display Display--footer">
              ${text`Let’s solve a problem`}<br>
            </span>
          </h2>

          <div class="Display Display--footer u-spaceB8">
            <a class="Display-link u-spaceB8 u-spaceT1" href="mailto:hi@codeandconspire.com">hi@codeandconspire.com</a>
          </div>
        </div>

        <div class="Text Text--adaptive u-spaceB8 u-spaceT4 u-inlineBlock u-textBold">
          <p class="u-spaceT4">
            <a href="https://goo.gl/maps/TEWDAjA4sds" target="_blank" rel="noopener noreferrer">Svartmangatan 16, Stockholm</a>
            <br>
            <a href="mailto:hi@codeandconspire.com">hi@codeandconspire.com</a>
            <br>
            <a href="tel:+46735819750">+46 735 819 750</a>
            <br>
            <div class="u-spaceT4">
              <a href="https://www.instagram.com/codeandconspire/" class="u-inlineBlock u-spaceR1">Instagram</a>
              <a href="https://twitter.com/codeandconspire/" class="u-inlineBlock u-spaceR1">Twitter</a>
              <a href="https://github.com/codeandconspire/" class="u-inlineBlock u-spaceR1">Github</a>
              <a href="https://www.facebook.com/codeandconspire/" class="u-inlineBlock u-spaceR1">Facebook</a>
            </div>
          </p>
        </div>
      </footer>
    `
  }
}

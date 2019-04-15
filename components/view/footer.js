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
      <footer class="View-footer View-container" id="${this.id}">
        <h2 class="Display Display--1 u-spaceIntro u-spaceB8 ">
          <span class="Display Display--footer">
            ${text`Let’s solve a problem`}<br>
            <a class="Display-link u-spaceT1" href="mailto:hi@codeandconspire.com">hi@codeandconspire.com</a>
          </span>
        </h2>

        <div class="Text Text--adaptive u-spaceT1">
          <p>
            Svartmangatan 16 <br> 111 29 Stockholm, Sweden
            <div class="u-spaceT2"><a href="tel:+46735819750">+46 735 819 750</a></div>
            <a href="mailto:hi@codeandconspire.com">hi@codeandconspire.com</a>
            <br>
            <div class="u-spaceT5">
              <div class="u-inlineBlock u-spaceR2"><a href="https://www.instagram.com/codeandconspire/">Instagram</a></div>
              <div class="u-inlineBlock u-spaceR2"><a href="https://twitter.com/codeandconspire/">Twitter</a></div>
              <div class="u-inlineBlock u-spaceR2"><a href="https://github.com/codeandconspire/">Github</a></div>
              <div class="u-inlineBlock u-spaceR2"><a href="https://www.facebook.com/codeandconspire/">Facebook</a></div>
            </div>
          </p>
        </div>
      </footer>
    `
  }
}

var html = require('choo/html')
var view = require('../components/view')
var intro = require('../components/intro')
var poster = require('../components/poster')
var content = require('../components/base')

module.exports = view(home, meta)

function posters () {
  return content.posters.map(function (item) {
    return html`
      <div class="View-cell">
        ${poster(item)}
      </div>
    `
  })
}

function home (state, emit) {
  return html`
    <main class="View-container">
      <div class="View-intro">
        ${intro(html`
          <div>
            <h1 class="Display">We are a group of digital experts<span class="u-hiddenVisually"> creating websites, applications, and services of the highest quality</span>.</h1>
            <p>We innovate in the space where individuals meet technology. We want to solve actual problems and make both our clients and their clients happy. We seek elegant solutions with good functional design and code that is reliable, sustainable and blazing fast.</p>
            <p>
              <a class="Intro-button" href="/manifesto">
                <svg class="Intro-icon"width="20" height="27" viewBox="0 0 20 27" xmlns="http://www.w3.org/2000/svg"><path d="M11.095 1.76H1.75v22.966h16.502V8.962h-7.156V1.76zm1.75 1.245v4.197h4.17l-4.17-4.197zM0 0h12.332L20 7.717v18.77H0V0zm5.013 15.57h9.328v1.76H5.013v-1.76zm0-3.244h9.328v1.76H5.013v-1.76zm0 6.486h9.328v1.76H5.013v-1.76z" fill="#28182C" fill-rule="evenodd"/></svg> Our manifesto
              </a>
            </p>
          </div>
        `, true)}
      </div>

      <div class="View-grid">
        <h2 class="View-title">Our work</h2>
        ${posters()}
        <div class="View-cell">
          <section class="Poster Poster--contact" id="poster-contact">
            <div class="Poster-body">
              <img class="Poster-photo" src="/anton-trollback.jpg" alt="Portrait of Anton Trollbäck">
              <h1 class="Display">Contact Anton,<br /> he’s nice!</h1>
              <p><a class="Poster-link" href="mailto:anton@codeandconspire.com">anton@codeandconspire.com</a></p>
              <p><a class="Poster-link" href="tel:+46735819750">+46 735 819 750</a></p>
              <svg class="Poster-smile" role="presentation" width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g transform="translate(1 1)" fill="none" fill-rule="evenodd"><circle stroke="#28182C" stroke-width="2" cx="19" cy="19" r="19"/><circle fill="#28182C" cx="13.15" cy="14.15" r="2.15"/><circle fill="#28182C" cx="25.15" cy="14.15" r="2.15"/><path d="M9.7 24c2.26 3.3 5.807 5.027 9.348 5.027 3.541 0 6.924-1.727 9.348-5.027" stroke="#28182C" stroke-width="2"/></g></svg>
            </div>
          </section>
        </div>
      </div>
    </main>
  `
}

function meta (state) {
  return {
    'og:image': '/share.png',
    title: 'code and conspire',
    description: 'We innovate in the space where individuals meet technology. We want to solve actual problems and make both our clients and their clients happy. We seek elegant solutions with good functional design and code that is reliable, sustainable and blazing fast.'
  }
}

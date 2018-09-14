var html = require('choo/html')
var view = require('../components/view')
var article = require('../components/article')
var {i18n} = require('../components/base')

var text = i18n()

module.exports = view(home, meta)

function home (state, emit) {
  function onscroll (event) {
    console.log(event)
  }

  return html`
    <div class="View-container">
      <header class="View-header" onmousewheel=${onmousewheel} touchmove="onscroll">
        <h1 class="View-meta">
          <strong>Code and Conspire</strong>
          <span class="u-hv">–</span> 
          <span>Digital Agency</span>
        </h1>
        <nav class="View-nav">
          <ul class="View-list">
            <li class="View-item">
              <a class="View-link" href="#team">Cases</a><span class="u-hv">:</span>
              <br class="u-hidden">
              <span class="View-sub">Projects, clients & friends</h1>
            </li>
            <li class="View-item">
              <a class="View-link" href="#process">Process</a><span class="u-hv">:</span>
              <br class="u-hidden">
              <span class="View-sub">Success and repeat</h1>
            </li>
            <li class="View-item">
              <a class="View-link" href="#team">Team</a><span class="u-hv">:</span>
              <br class="u-hidden">
              <span class="View-sub">Anton, Carl, Therese, Kalle, Jakob</h1>
            </li>
            <li class="View-item">
              <a class="View-link" href="#about">About</a><span class="u-hv">:</span>
              <br class="u-hidden">
              <span class="View-sub">Get to know and contact </h1>
            </li>
          </ul>
        </nav>
        <p class="View-meta">
          <a href="mailto:hi@codeandconspire.com" title="Open mail app">hi@codeandconspire.com</a>
          <div>
            <a href="https://twitter.com/codeandconspire" title="@codeandconspire on Twitter">
              <span class="u-hv">Twitter</span>
              <svg class="View-icon" role="presentation" aria-hidden="true" viewBox="0 0 18 15" width="18" height="15">
                <path fill="currentColor" fill-rule="evenodd" d="M5.66 15c6.8 0 10.5-5.77 10.5-10.77v-.5A7.62 7.62 0 0 0 18 1.8a7.23 7.23 0 0 1-2.12.6A3.8 3.8 0 0 0 17.5.27a7.3 7.3 0 0 1-2.34.92 3.65 3.65 0 0 0-2.7-1.2c-2.04 0-3.7 1.7-3.7 3.8 0 .26.04.55.1.83C5.8 4.5 3.06 2.98 1.26.7c-.3.55-.5 1.2-.5 1.9A3.8 3.8 0 0 0 2.4 5.75a3.6 3.6 0 0 1-1.68-.47v.04C.72 7.16 2 8.7 3.7 9.04A3.62 3.62 0 0 1 2 9.1c.47 1.5 1.83 2.6 3.45 2.63A7.3 7.3 0 0 1 0 13.3 10.27 10.27 0 0 0 5.66 15"/>
              </svg>
            </a><span class="u-hv">,</span> <a href="https://www.facebook.com/codeandconspire/" title="Code and conspire on Facebook">
              <span class="u-hv">Facebook</span>
              <svg class="View-icon" role="presentation" aria-hidden="true" viewBox="0 0 18 18" width="18" height="18">
                <g fill="none" fill-rule="evenodd">
                  <path fill="currentColor" fill-rule="nonzero" d="M16.12 17H1.88a.87.87 0 0 1-.88-.88V1.88c0-.49.4-.88.88-.88h14.24c.49 0 .88.4.88.88v14.24c0 .49-.4.88-.88.88zm-4.08 0v-6.2h2.08l.3-2.4h-2.38V6.88c0-.7.2-1.17 1.2-1.17h1.27V3.57c-.61-.07-1.23-.1-1.85-.1-1.85 0-3.1 1.13-3.1 3.2V8.4h-2.1v2.4h2.1V17h2.48z" />
                </g>
              </svg>
            </a>
          </div>
        </p>
      </header>

      <main class="View-main">
        <article>
          <!-- <article class="View-article" id="start">
            <div class="Article">
              <img class="Article-bg" src="/dbg-nyc-flowers.jpg">
            </div>
          </article> -->
          <article class="View-article" id="about">
            <div class="Article">
              <h2 class="u-hv">About us</h2>
              <p class="Article-large">We are a group of digital experts that design and code digital services. We seek elegant technological solutions: code that is fast and design that works.</p>
              <p>We are autonomous in our relationship to tech enterprises, navigating by an ethical product framework to design positive and gratifying digital interactions. Our work ranges from large-scale internet architecture to popular open source projects and mobile experiences.</p>
              <h2 class="u-hv">About us</h2>
              <p class="Article-large">We are a group of digital experts that design and code digital services. We seek elegant technological solutions: code that is fast and design that works.</p>
              <p>We are autonomous in our relationship to tech enterprises, navigating by an ethical product framework to design positive and gratifying digital interactions. Our work ranges from large-scale internet architecture to popular open source projects and mobile experiences.</p>
              <h2 class="u-hv">About us</h2>
              <p class="Article-large">We are a group of digital experts that design and code digital services. We seek elegant technological solutions: code that is fast and design that works.</p>
              <p>We are autonomous in our relationship to tech enterprises, navigating by an ethical product framework to design positive and gratifying digital interactions. Our work ranges from large-scale internet architecture to popular open source projects and mobile experiences.</p>
            </div>
          </article>

        </article>
      </main>

      <article style="display: none;">
        <h2>About us</h2>
        <p>We are a group of digital experts that design and code digital services. We seek elegant technological solutions: code that is fast and design that works.</p>
        <p>We are autonomous in our relationship to tech enterprises, navigating by an ethical product framework to design positive and gratifying digital interactions. Our work ranges from large-scale internet architecture to popular open source projects and mobile experiences.</p>
        <h2>Design</h2>
        process
        mix and match of many different types of processes that we have picked from our broad (?) experience.
        <p>We are autonomous in our relationship to tech enterprises, navigating by an ethical product framework to design positive and gratifying digital interactions. Our work ranges from large-scale internet architecture to popular open source projects and mobile experiences.</p>
        <h2>Code</h2>
        <p>most things we do is open source. Jalla</p>
        <h2>Success</h2>
        <p>We are autonomous in our relationship to tech enterprises, navigating by an ethical product framework to design positive and gratifying digital interactions. Our work ranges from large-scale internet architecture to popular open source projects and mobile experiences.</p>

        <h2>Do you need our help or want to know more? Contact us</h2>
        <p>
          <a href="https://www.google.se/maps/place/Alma/@59.3215566,18.0169478,13z/data=!4m8!1m2!2m1!1salma!3m4!1s0x465f9d5b00af1afd:0x44480b8d5d69a7c7!8m2!3d59.334149!4d18.077116?dcr=0">Nybrogatan 8, Stockholm</a>
          <br class="u-hidden">
          <a href="mailto:hi@codeandconspire.com">hi@codeandconspire.com</a>
          <br class="u-hidden">
          <a href="tel:+46735819750">+<span class="sm">46 735 819 750</span></a>
        </p>
        <p>
          <a href="https://twitter.com/codeandconspire">Twitter</a>,
          <a href="https://github.com/codeandconspire">Github</a>,
          <a href="https://www.facebook.com/codeandconspire/">Facebook</a>
        </p>
        <h2>People</h2>
        <ul>
          <li>Anton Trollbäck</li>
          <li>Therese Albertsson</li>
          <li>Carl Törnqvist</li>
          <li>Therese Aziz</li>
          <li>Karl Sandgren</li>
          <li>Jakob Trollbäck</li>
        </ul>
        <p>
          <a href="mailto:hi@codeandconspire.com">We're hiring. Contact Anton, he's nice :)</a>
        </p>
      </article>
    </main>
  `
}

function meta (state) {
  return {
    'og:image': '/share.png',
    title: text`SITE_TITLE`,
    description: text`SITE_DESCRIPTION`
  }
}

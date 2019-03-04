var html = require('choo/html')
var view = require('../components/view')
var intro = require('../components/intro')

module.exports = view(manifesto, meta)

function manifesto (state, emit) {
  return html`
    <main class="View-container">
      <div class="View-intro View-intro--free">
        ${intro(html`
          <div>
            <h1 class="Display">Manifesto</h1>
            <p>Joining the post-silicon-valley movement, we have concluded that large corporations can't be relied upon to design and maintain gratifying, reliable and human-centered digital services. The systems and incentives are often in direct conflict.</p>
            <p>As problem solvers, designers and developers, individuals and groups, we have the responsibility and opportunity to shape the digital revolution. The interactions between individuals, corporations, and computers are deeply affected by the problems we choose to solve and our solutions.</p>
            <p>Moving forward, we need to establish new ways to curb the negative impact digitalization has. We need to challenge the online giants, invent new things, open up data, collaborate, stay flexible, provoke, be punk, explore and experiment, solve actual problems and create a functional, sustainable, fun and lovable internet for everyone.</p>
            <h2 class="Display Display--tiny">Our work should</h2>
            <ul>
              <li>Solve actual problems instead of creating more needs.</li>
              <li>Be usable and accessible. If it doesn't work for the user – it doesn't work at all.</li>
              <li>Not form unhealthy behavior that keeps people around for longer than they intended to.</li>
              <li>Be free of low-quality content and advertisement.</li>
              <li>Be a joint venture with our clients. Knowing that collaboration leads to better results.</li>
              <li>Cost money over "free", as it ensures that the service stays online and evolves in ways the users want it to.</li>
              <li>Live open source by default.</li>
              <li>Be long lasting and made with love and respect for the craftsmanship.</li>
              <li>Be open and humble. We don’t want to be scary, we are nice and fun, and then casually be the best choice around.</li>
            </ul>
            <p><br /><a class="Intro-link" href="/">Back</a></p>
          </div>
        `)}
        </div>
    </main>
  `
}

function meta (state) {
  return {
    'og:image': '/share.png',
    title: 'Manifesto',
    description: 'As a part of the post-silicon-valley movement, we have concluded that large corporations can\'t be relied upon to produce and maintain gratifying, reliable, human-centered digital products and services. The systems and incentives are often in direct conflict.'
  }
}

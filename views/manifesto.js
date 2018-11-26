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
            <p>As a part of the post-silicon-valley movement, we have concluded that large corporations can't be relied upon to produce and maintain gratifying, reliable, human-centered digital products and services. The systems and incentives are often in direct conflict.</p>
            <p>As designers and developers, individuals and groups, we face the responsibility and opportunity to shape the current digital revolution. The interactions between individuals, corporations and computers are deeply affected by the problems we choose to solve and our solutions for those problems.</p>
            <p>Moving forward, we need to establish new ways to curb the negative impact digitalization has. We need to challenge the online giants that have full control the digital evolution, open up data, collaborate, stay flexible, provoke, be punk, explore and experiment, solve actual problems and create a functional, fun and lovable internet for everyone.</p>
            <h2 class="Display Display--tiny">Our work should</h2>
            <ul>
              <li>Be usable. If it doesn't work for the person using it – it doesn't work at all.</li>
              <li>Not form unhealthy behavior that keeps people around for longer than they intended to.</li>
              <li>Be free of low-quality content and advertisement.</li>
              <li>Be a joint venture with our clients. Knowing that collaboration leads to better results.</li>
              <li>Rely on services and tools that are local and adaptable to save massive costs in licenses, stay lightweight, ensure the best in support.</li>
              <li>Cost money, over "free", as it guarantees that the product stays online, evolves, and deliver what it users actually want and need.</li>
              <li>Be open source by default when considered viable.</li>
              <li>Be done with respect. We don’t want to be scary, we are nice and fun, and then casually be the best choice around.</li>
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

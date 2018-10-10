var html = require('choo/html')
var view = require('../components/view')
var intro = require('../components/intro')
var poster = require('../components/poster')

module.exports = view(home, meta)

var content = [
  {
    label: 'United Nations',
    id: 'gg',
    title: 'The Global Goals',
    text: 'World leaders agreed to 17 goals for a better world by 2030. We created the website for the agenda, with millions of visitors from all over the world.',
    link: { text: 'www.globalgoals.org', href: 'https://www.globalgoals.org' },
    img: { src: 'goals.png?v2', alt: 'Three stacked screenshots from The Global Goals website' }
  }, {
    label: 'Maktsalongen',
    id: 'lmn',
    title: 'Lite mycket nu?',
    text: 'Utbrändhet ökar och det är ett problem för hela samhället. Vi byggde en skola på sms som hjälper att stå upp mot stress. Redan dag två hade fem tusen personer signat upp.',
    link: { text: 'litemycket.nu', href: 'https://www.litemycket.nu/' },
    img: { src: 'litemycketnu.png?v2', alt: 'Portrait of Flora Wiström in the Litemycket.nu jacket' }
  }, {
    label: 'Quantified Planet',
    id: 'qp',
    title: 'Real-time data visualized',
    text: 'Quantified Planet needed a logotype, branding, and a website that can explain a complex product in an inspiring way. It all turned out great.',
    link: { text: 'quantifiedplanet.org', href: 'https://www.quantifiedplanet.org/' },
    img: { src: 'quantifiedplanet.jpg?v2', alt: 'Planet Earth, night time' }
  }, {
    label: 'Amnesty International',
    id: 'unfluencer',
    title: 'Troll factory for the good guys',
    text: 'Amnesty released thousands of friendly bots on Twitter to end the online harassment, with the techniques of the bad guys. An unusual project for sure.',
    link: { text: 'amnesty.se/unfluencer', href: 'https://www.amnesty.se/unfluencer/' },
    embed: html`<div class="Poster-embed" style="width:70%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/B2HoNjMg66IF80ywTi" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>`
  }, {
    label: 'Planet 15',
    id: 'planet15',
    title: 'Help your city flourish',
    text: 'How do we get a broad group of people to collect data about what grows in their city? Planet 15 – a mobile game now under development.',
    link: { text: 'planet15.org', href: 'https://planet15.org' },
    img: { src: 'planet15.jpg?v2', alt: 'Rendering of a planet created in the Planet 15 game' }
  }, {
    label: 'Gates Foundation',
    id: 'gates',
    title: 'Progress is possible',
    text: 'We created a highly interactive nomination and voting platform for the Goalkeepers Award, presented during the United Nations General Assembly.',
    link: { text: 'About the award', href: 'https://www.gatesfoundation.org/goalkeepers' },
    img: { src: 'goalkeepers.png?v2', alt: 'Bill Gates on the Goalkeepers 2018 state' }
  }
]

function posters () {
  return content.map(function (item) {
    return html`
      <div class="View-poster">
        ${poster(item)}
      </div>
    `
  })
}

function home (state, emit) {
  return html`
    <main class="View-container">
      <div class="View-main">
        ${intro()}
      </div>

      <div class="View-scroll">
        <div class="View-poster View-poster--empty" area-hidden="true">
          ${intro()}
        </div>
        ${posters()}
      </div>
    </main>
  `
}

function meta (state) {
  return {
    'og:image': '/share.png',
    title: 'code and conspire',
    description: 'example text'
  }
}

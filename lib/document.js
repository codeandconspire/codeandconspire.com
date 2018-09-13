var dedent = require('dedent')
var hyperstream = require('hstream')

module.exports = document

function document () {
  return hyperstream({
    head: {
      _appendHtml: dedent`
        <meta property="og:site_name" content="code and conspire">
        <link rel="shortcut icon" href="/assets/favicon.ico">
        <link rel="apple-touch-icon" href="/icon.png">
        <script>document.documentElement.setAttribute('scripting-enabled', '')</script>
      `
    }
  })
}

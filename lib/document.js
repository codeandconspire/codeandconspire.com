var dedent = require('dedent')
var hyperstream = require('hstream')

module.exports = document

function document () {
  return hyperstream({
    head: {
      _appendHtml: dedent`
        <meta property="og:site_name" content="code and conspire">
        <script>document.documentElement.classList.add('has-js')</script>
        <link rel="shortcut icon" href="/assets/favicon.ico">
        <link rel="mask-icon" href="/assets/icon.svg" color="#000">
        <link rel="dns-prefetch" href="https://codeandconspire.cdn.prismic.io">
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-138966069-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-138966069-1');
        </script>
      `
    }
  })
}

module.exports = middleware

var FETCH_LINKS = ['case.title', 'case.description', 'case.image']

function middleware (predicates, opts) {
  if (!opts.fetchLinks) {
    opts.fetchLinks = FETCH_LINKS
  } else {
    if (!Array.isArray(opts.fetchLinks)) opts.fetchLinks = [opts.fetchLinks]
    FETCH_LINKS.forEach(function (link) {
      if (!opts.fetchLinks.includes(link)) opts.fetchLinks.push(link)
    })
  }
}

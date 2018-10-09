/* eslint-env serviceworker */

var TRACKING_REGEX = /https?:\/\/((www|ssl)\.)?google-analytics\.com/
var IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
var CACHE_KEY = getCacheKey()
var FILES = [
  '/'
]

self.addEventListener('install', function oninstall (event) {
  event.waitUntil(
    caches
      .open(CACHE_KEY)
      .then(cache => cache.addAll(FILES))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', function onactivate (event) {
  event.waitUntil(clear().then(() => self.clients.claim()))
})

self.addEventListener('fetch', function onfetch (event) {
  var req = event.request
  var url = new self.URL(req.url)
  var isHTML = req.headers.get('accept').includes('text/html')

  event.respondWith(
    caches.open(CACHE_KEY).then(cache => {
      return cache.match(req).then(cached => {
        var isLocal = self.location.origin === url.origin

        // bypass cache for certain types
        if ((isHTML && isLocal) || IS_DEVELOPMENT) {
          return update(cache, cached)
        }

        // bypass cache for tracking scripts
        if (TRACKING_REGEX.test(url.href)) return self.fetch(req)

        // use cached response
        return cached || update(cache)
      })
    })
  )

  // fetch request and update cache
  // (Cache, Response?) -> any
  function update (cache, fallback) {
    if (req.cache === 'only-if-cached' && req.mode !== 'same-origin') {
      return fallback
    }

    return self.fetch(req).then(response => {
      if (!response.ok && fallback) return fallback
      cache.put(req, response.clone())
      return response
    })
  }
})

// clear application cache
// () -> Promise
function clear () {
  return caches.keys().then(keys => {
    return Promise.all(keys.map(key => caches.delete(key)))
  })
}

// get application cache key
// () -> str
function getCacheKey () {
  if (process.env.NOW_URL) {
    return process.env.NOW_URL.match(/\w+(?=\.now\.sh)/)[0]
  } else {
    return process.env.npm_package_version
  }
}
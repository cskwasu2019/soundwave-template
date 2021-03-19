const CACHE_VERSION = 1
const CACHE_ASSETS = [
  'css/csshake-slow.min.css',
  'css/icofont.min.css',
  'css/responsive.css',
  'css/sal.css',
  'css/style.css',
  'css/svg.css',

  'fonts/icofont.eot',
  'fonts/icofont.svg',
  'fonts/icofont.ttf',
  'fonts/icofont.woff',
  'fonts/icofont.woff2',

  'images/icon-192x192-maskable.png',
  'images/icon-192x192.png',
  'images/icon-512x512.png',
  'images/icon.png',
  'images/image-2-transparent.png',
  'images/product-1.png',
  'images/product-2.png',
  'images/product-3.png',
  'images/product-4.png',
  'images/sound-wave.png',

  'js/sal.js',
  'index.html',
  'manifest.json',
  '/',
]

const cacheName = () => `cache_v${CACHE_VERSION}`

addEventListener('install', (event) => {
  const assets = CACHE_ASSETS.map(
    (asset) => new URL(asset, registration.scope).href
  )

  event.waitUntil(
    caches.open(cacheName()).then((cache) => cache.addAll(assets))
  )
})

addEventListener('activate', (event) =>
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) =>
            key == cacheName() ? Promise.resolve() : caches.delete(key)
          )
        )
      )
      .then(() => self.skipWaiting())
  )
)

addEventListener('fetch', async (event) =>
  event.respondWith(
    caches.open(cacheName()).then((cache) =>
      cache.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        } else {
          // console.log('Fetching Request...', event)
          return fetch(event.request)
        }
      })
    )
  )
)

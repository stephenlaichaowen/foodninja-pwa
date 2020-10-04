const staticCache = 'site-static-v21' 
const dynamicCache = 'site-dynamic-v3'

// App shell assets
const assets = [ 
  '/', // storing request url
  '/index.html',
  '/pages/fallback.html',
  '/js/app.js',
  '/js/ui.js',
  '/js/materialize.min.js',
  '/css/styles.css',
  '/css/materialize.min.css',
  '/img/dish.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
]

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size))
      }
    })
  })
}

// Install service worker
self.addEventListener('install', evt => {
  // console.log('service worker has been installed')
  
  evt.waitUntil( 
    caches.open(staticCache)
    .then(cache => {
      // reach out to server and all assets
      console.log('caching shell assets');
      cache.addAll(assets)
    })
  )
  
  // Manually skip waiting to activate or check 'Update on reload'
  self.skipWaiting(); 

})

// activate service worker 
self.addEventListener('activate', evt => {
  // console.log('service worker has been activated');  

  evt.waitUntil(
    caches.keys().then(keys => {
      // console.log(keys);

      // 刪除舊版 cache
      return Promise.all(keys
        .filter(key => key !== staticCache && key !== dynamicCache)
        .map(key => caches.delete(key))
      )
    })
  )
})

// fetch event 
// cache first (offline experiences)
self.addEventListener('fetch', evt => {
  // console.log('fetch event', evt)

  evt.respondWith(
    caches.match(evt.request)
    .then(cacheRes => {
      // if cache has assets, fetch assets from cache
      // if cache is for some reason has missing file, send request to server and install a copy to cache
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCache).then(cache => {
          cache.put(evt.request.url, fetchRes.clone())
          limitCacheSize(dynamicCache, 15)
          return fetchRes
        })
      })
    }).catch(() => { 
      // 如果圖片資源不在快取存儲, 或者 offline, 重新導向 fallback.html 
      if (evt.request.url.indexOf('.html') > -1) {
        return caches.match('/pages/fallback.html')
      }
    })
  )
})


const CACHE_NAME = 'game-2048-v1'

const URLS = [
  'src/shared/assets/2048.svg',
  'src/shared/assets/offline.html',

  'src/shared/assets/Forum/calendar.svg',
  'src/shared/assets/Forum/message.svg',
  'src/shared/assets/Forum/sendButton.svg',
  
  'src/shared/assets/Home/Crown.svg',
  'src/shared/assets/Home/Forum.svg',
  'src/shared/assets/Home/Game.svg',
  'src/shared/assets/Home/Help.svg',
  'src/shared/assets/Home/Home.svg',
  'src/shared/assets/Home/Quit.svg',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('Кэш открыт')
        return cache.addAll(URLS)
      })
      .catch((err) => {
        console.error('Ошибка при установке:', err)
        throw err
      })
  )
})

self.addEventListener('fetch', (event) => {
  const requestURL = event.request.url

  if (!requestURL.startsWith('http://') && !requestURL.startsWith('https://')) {
    return
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response
      }

      return fetch(event.request)
        .then((response) => {
          if (
            !response ||
            response.status !== 200 ||
            response.type !== 'basic'
          ) {
            return response
          }

          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            try {
              cache.put(event.request, responseToCache)
            } catch (error) {
              console.error('Ошибка при сохранении в кэш:', error)
              return caches.match(event.request)
            }
          })

          return response
        })
        .catch(() => {
          caches.match('src/shared/assets/offline.html')
        })
    })
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter(name => name !== CACHE_NAME)
            .map(name => caches.delete(name))
        )
      })
      .then(() => {
        console.log('Service Worker активирован')
      })
  )
})

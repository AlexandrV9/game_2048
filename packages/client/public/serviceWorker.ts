const CACHE_NAME = 'game-2048-v1'

const URLS: string[] = [
  '/src/pages/End/End.tsx',
  '/src/pages/Error404/Error404.tsx',
  '/src/pages/Error500/Error500.tsx',
  '/src/pages/Forum/Forum.tsx',
  '/src/pages/Home/Home.tsx',
  '/src/pages/LeaderBoard/LeaderBoard.tsx',
  '/src/pages/Pending/Pending.tsx',
  '/src/pages/Profile/Profile.tsx',
  '/src/pages/SignIn/ui/SignIn.tsx',
  '/src/pages/SignUp/ui/SignUp.tsx',
  '/src/pages/Start/Start.tsx',

  '/2048.svg',
  '/Forum/calendar.svg',
  '/Forum/message.svg',
  '/Forum/sendButton.svg',
]

self.addEventListener('install', (event: InstallEvent) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache: Cache) => {
        console.log('Кэш открыт')
        return cache.addAll(URLS)
      })
      .catch((err: Error) => {
        console.error('Ошибка при установке:', err)
        throw err
      })
  )
})

self.addEventListener('fetch', (event: FetchEvent) => {
  const requestURL = event.request.url

  if (!requestURL.startsWith('http://') && !requestURL.startsWith('https://')) {
    return
  }

  event.respondWith(
    caches.match(event.request).then((response: Response | undefined) => {
      if (response) {
        return response
      }

      const clonedRequest = event.request.clone()
      return fetch(clonedRequest)
        .then((response: Response) => {
          if (
            !response ||
            response.status !== 200 ||
            response.type !== 'basic'
          ) {
            return response
          }

          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then((cache: Cache) => {
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
          console.error('Ошибка при обработке запроса')
        })
    })
  )
})

self.addEventListener('activate', (event: ActivateEvent) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames: string[]) => {
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

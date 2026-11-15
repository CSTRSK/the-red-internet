// Service Worker fuer "The Red Internet" / "Das Rote Internet".
// Alle vier Sprachfassungen werden beim ersten Besuch zwischengespeichert.
// Seitenstrategie: erst Cache, dann Netz; im Hintergrund wird aktualisiert.
const CACHE = 'the-red-internet-f3e78d66d2';
// Relativ zum Scope des Workers aufgebaut, damit der Cache auch dann trifft,
// wenn die Fassung unter einem Unterpfad liegt (z. B. auf GitHub Pages).
const BASIS = new URL('./', self.location.href).pathname;
const SEITEN = [BASIS]
  .concat(['de', 'en', 'es', 'fr'].map((c) => BASIS + c + '/'));

self.addEventListener('install', (ereignis) => {
  ereignis.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.all(SEITEN.map((p) => c.add(p).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (ereignis) => {
  ereignis.waitUntil(
    caches.keys()
      .then((namen) => Promise.all(
        namen.filter((n) => n !== CACHE).map((n) => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (ereignis) => {
  const anfrage = ereignis.request;
  if (anfrage.method !== 'GET') return;

  const url = new URL(anfrage.url);
  if (url.origin !== self.location.origin) return;

  const istSeite = SEITEN.indexOf(url.pathname) !== -1;
  if (!istSeite) return;

  ereignis.respondWith(
    caches.match(anfrage).then((treffer) => {
      const netz = fetch(anfrage).then((antwort) => {
        if (antwort && antwort.ok) {
          const kopie = antwort.clone();
          caches.open(CACHE).then((c) => c.put(anfrage, kopie)).catch(() => {});
        }
        return antwort;
      });
      if (treffer) {
        netz.catch(() => {});
        return treffer;
      }
      return netz.catch(() => caches.match(BASIS + 'de/'));
    })
  );
});

// Guarda la app en el teléfono para que abra sin conexión. Los registros viven en el almacenamiento de la app, no aquí.
const CACHE = "comidas-v1";
const ARCHIVOS = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png",
  "./icon-maskable-512.png", "./apple-touch-icon.png"];
const FUENTES = ["https://fonts.googleapis.com", "https://fonts.gstatic.com"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const r = e.request, origen = new URL(r.url).origin;
  if (r.method !== "GET") return; // las consultas a Claude no pasan por aquí
  if (origen === location.origin) {
    // Primero la red (para recibir actualizaciones); sin conexión, la copia guardada
    e.respondWith(fetch(r).then(res => { const copia = res.clone(); caches.open(CACHE).then(c => c.put(r, copia)); return res; })
      .catch(() => caches.match(r, {ignoreSearch: true}).then(m => m || caches.match("./index.html"))));
  } else if (FUENTES.includes(origen)) {
    // Fuentes: la copia guardada; si no está, se descarga y se guarda
    e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => { const copia = res.clone(); caches.open(CACHE).then(c => c.put(r, copia)); return res; })));
  }
});

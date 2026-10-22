// Service worker : application utilisable hors-ligne après la première visite.
const SHELL = "tca-shell-v1";
const RUNTIME = "tca-runtime-v1";
const ASSETS = ["./", "./index.html", "./css/style.css", "./js/app.js", "./js/knowledge.js", "./js/metrics.js", "./js/pose.js", "./js/tactics.js", "./manifest.webmanifest", "./icons/icon.svg"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(SHELL).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => ![SHELL, RUNTIME].includes(k)).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  const external = /cdn\.jsdelivr\.net|storage\.googleapis\.com/.test(url.host);
  if (external) {
    // moteur IA + modèle : cache-first (volumineux, versionnés)
    e.respondWith(caches.open(RUNTIME).then(async (c) => {
      const hit = await c.match(e.request);
      if (hit) return hit;
      const res = await fetch(e.request);
      if (res.ok) c.put(e.request, res.clone());
      return res;
    }));
    return;
  }
  if (url.origin === location.origin) {
    // application : réseau d'abord (mises à jour), cache en secours
    e.respondWith(fetch(e.request).then((res) => {
      const copy = res.clone();
      caches.open(SHELL).then((c) => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request)));
  }
});

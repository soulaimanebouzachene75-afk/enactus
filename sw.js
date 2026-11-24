/* Service hors ligne — Enactus FSJES Souissi
 * - Pages : réseau d'abord (toujours la dernière version), copie de secours hors ligne.
 * - Fichiers du site (_next/static) : copie locale d'abord ; images : copie locale + mise à jour en fond.
 * Changez VERSION pour forcer le renouvellement des copies.
 */
const VERSION = "enx-v1";
const STATIC = VERSION + "-static";
const PAGES = VERSION + "-pages";
const SCOPE = self.registration.scope; // ex. https://…/enactus/

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(PAGES).then((c) => c.addAll([SCOPE + "fr/", SCOPE + "ar/", SCOPE + "en/"]).catch(() => {})));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // Fichiers versionnés (noms uniques à chaque mise à jour) : copie locale d'abord.
  if (url.pathname.includes("/_next/static/")) {
    e.respondWith(
      caches.open(STATIC).then(async (c) => {
        const hit = await c.match(req);
        if (hit) return hit;
        const res = await fetch(req);
        if (res.ok) c.put(req, res.clone());
        return res;
      }),
    );
    return;
  }
  // Images et icônes : copie locale immédiate + mise à jour en arrière-plan
  // (une photo remplacée sous le même nom apparaît dès la visite suivante).
  if (/\.(?:png|jpe?g|webp|svg|woff2?)$/.test(url.pathname)) {
    e.respondWith(
      caches.open(STATIC).then(async (c) => {
        const hit = await c.match(req);
        const refresh = fetch(req).then((res) => { if (res.ok) c.put(req, res.clone()); return res; }).catch(() => hit);
        return hit || refresh;
      }),
    );
    return;
  }
  if (url.pathname.endsWith(".mp4")) return; // vidéos : jamais mises en cache

  // Pages et données de navigation : réseau d'abord
  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(PAGES).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(async () => (await caches.match(req)) || (await caches.match(SCOPE + "fr/")) || Response.error()),
  );
});

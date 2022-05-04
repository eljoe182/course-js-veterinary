const version = "1.0.0";
const files = [
  "/",
  "/index.html",
  "/offline.html",
  "/css/styles.css",
  "/css/bootstrap.css",
  "/js/app.js",
  "/js/functions.js",
  "/js/selectors.js",
  "/js/class/App.class.js",
  "/js/class/DB.class.js",
  "/js/class/Schedule.class.js",
  "/js/class/UI.class.js",
];

self.addEventListener("install", (e) => {
  console.log("[ServiceWorker] Installed");
  e.waitUntil(
    caches.open(version).then((cache) => {
      console.log("[ServiceWorker] Caching files");
      cache.addAll(files);
    })
  );
});

self.addEventListener("activate", (e) => {
  console.log("[ServiceWorker] Activated");
  e.waitUntil(
    caches.keys().then((keyList) => {
      console.log("[ServiceWorker] Removing old cache");
      return Promise.all(
        keyList
          .filter((key) => key !== version)
          .map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  console.log("[ServiceWorker] Fetching");
  e.respondWith(
    caches
      .match(e.request)
      .then((response) => {
        return response || fetch(e.request);
      })
      .catch(() => {
        return caches.match("/offline.html");
      })
  );
});

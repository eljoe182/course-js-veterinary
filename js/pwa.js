if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then(function (registration) {
      console.log("Service Worker Registered", registration);
    })
    .catch(function (err) {
      console.log("ServiceWorker registration failed: ", err);
    });
} else {
  console.log("Service Worker not supported");
}

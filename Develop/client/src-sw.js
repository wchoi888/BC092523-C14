// Import necessary modules from Workbox
const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst, StaleWhileRevalidate } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");
// Precache and route all assets specified in the Workbox manifest file
precacheAndRoute(self.__WB_MANIFEST);
// Define a CacheFirst strategy for caching pages
const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    new CacheableResponsePlugin({
      // Cache responses with status codes 0 and 200
      statuses: [0, 200],
    }),
    // Set expiration time for cached responses (30 days)
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});
// Warm the cache with specific URLs
warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});
// Register a route for navigation requests to use the page cache strategy
registerRoute(({ request }) => request.mode === "navigate", pageCache);

// TODO: Implement asset caching
registerRoute(
  // Define a route for caching various types of assets (stylesheets, scripts, workers, images)
  ({ request }) =>
    ["style", "script", "worker", "image"].includes(request.destination),
  // Use a StaleWhileRevalidate strategy for asset caching
  new StaleWhileRevalidate({
    // Name of the cache storage.
    cacheName: "asset-cache",
    plugins: [
      // This plugin will cache responses with these headers to a maximum-age of 30 days
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

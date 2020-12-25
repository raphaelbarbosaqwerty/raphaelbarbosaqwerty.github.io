'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "favicon.png": "5dcef449791fa27946b3d35ad8803796",
"robots.txt": "d48123967e6cfb494b4ae42bac3c295e",
"404.html": "ae00339e9f6b293e5911db9fedbd4e71",
"manifest.json": "dcaf1f9686117d3151039ad84fd9a229",
"main.dart.js": "249e63b25b342cd61f2f5e25f5bff7d7",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"assets/AssetManifest.json": "f887f2ad168004f3cc3f9eceae671bdd",
"assets/fonts/MaterialIcons-Regular.otf": "a68d2a28c526b3b070aefca4bac93d25",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "a126c025bab9a1b4d8ac5534af76a208",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "d80ca32233940ebadc5ae5372ccd67f9",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "831eb40a2d76095849ba4aecd4340f19",
"assets/packages/flutter_markdown/assets/logo.png": "67642a0b80f3d50277c44cde8f450e50",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/assets/images/books/book1.jpg": "1628d1103263daafe4d7046259781414",
"assets/assets/images/books/caibalion.jpg": "2c6aabc055b09dda94c774b71921f0b1",
"assets/assets/cosmos.jpg": "96ec087955be1e4b9934d30b531bd2ec",
"assets/assets/try-harder.jpg": "2c608779c690ad794ffb795eb4ccaf47",
"assets/assets/celtic.png": "b2187b05862c730db26f504648d075c5",
"assets/assets/capture-ctf.jpg": "49158ac6f3afd9e776567100dd7a9325",
"assets/assets/image_posts/ctf/rick/rickme.jpg": "4ba6cf450516ec08df13e01df3a24c75",
"assets/assets/eye.png": "f77e3da163dd2bab680f03449d9eebc3",
"assets/assets/flutter-image.png": "b4e760d9bcccde2de784369ccdaee25a",
"assets/assets/idealamp.jpg": "dcaf3ad863dabe2fd579cc8512786da4",
"assets/assets/markdown_posts/about/6-new-blog.md": "3102f7ae4338286f934aa12cfd76b4e9",
"assets/assets/markdown_posts/about/7-asperger.md": "6e78d1255819b75e081ca30887979859",
"assets/assets/markdown_posts/about/2-the-blog.md": "83d5e6f9c533188818d23b22cb0e7ce8",
"assets/assets/markdown_posts/about/1-about-me.md": "41842bf10dae64580d9f3ab55be48063",
"assets/assets/markdown_posts/informative/5-next-machines.md": "8c6722a2591bf3fc269f1778c96501db",
"assets/assets/markdown_posts/evolution/3-frustration.md": "8db465feb37e5729ae33f245304edbf6",
"assets/assets/markdown_posts/ctf/4-rickdiculouslyeasy.md": "97b1ad45d0627ea884ec030bd4ecb6f3",
"assets/assets/board2.jpg": "56d445bdbb32a63d501f5a6e28457816",
"assets/assets/eye.jpg": "f77e3da163dd2bab680f03449d9eebc3",
"assets/assets/frustrationimage.png": "9b71a4834be61e890befdf1c809662a2",
"assets/assets/flutter-apps.png": "e2f9644c90966cfd8a876bf22bd05d13",
"assets/assets/asperger.png": "a029fb290de948b6e476772c45e7af98",
"assets/NOTICES": "904f72f6134804afecbc2e97cdbb1d78",
"assets/FontManifest.json": "5a32d4310a6f5d9a6b651e75ba0d7372",
"CNAME": "e0f4d8597996e47cbde6bb8a05416ad5",
"index.html": "54c3769fa43b95f3db162df7973e1eec",
"/": "54c3769fa43b95f3db162df7973e1eec"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value + '?revision=' + RESOURCES[value], {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');

      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }

      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#')) {
    key = '/';
  }
  // If the URL is not the RESOURCE list, skip the cache.
  if (!RESOURCES[key]) {
    return event.respondWith(fetch(event.request));
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache. Ensure the resources are not cached
        // by the browser for longer than the service worker expects.
        var modifiedRequest = new Request(event.request, {'cache': 'reload'});
        return response || fetch(modifiedRequest).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    return self.skipWaiting();
  }

  if (event.message === 'downloadOffline') {
    downloadOffline();
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey in Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

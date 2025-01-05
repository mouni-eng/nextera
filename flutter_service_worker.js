'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "031e782d9a20a97a4e18308db6d71a0a",
"version.json": "3e3724443c5f07f8b3cdfd5d9bb68a7e",
"favicon.ico": "b5e6727a14c2441366e6fd3eb6f47323",
"index.html": "474673b80b4f803318dda1984de4d69f",
"/": "474673b80b4f803318dda1984de4d69f",
"main.dart.js": "72243fc8817709b81cebc198aa062c66",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"icons/Icon-192.png": "950b978577b7a95835a579bc7a779186",
"icons/Icon-512.png": "b295debf3473f6babcf82934271ee276",
"manifest.json": "99a1450666bb93ff848ef727f1fd390d",
"assets/AssetManifest.json": "439a914cbf62040e9471104683a74323",
"assets/NOTICES": "11931e5a24a58bf284511ce29728f802",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "6ab6126a33c717bcdeae8b4b04b424cc",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "6aa792527dcabee09ee482f7a0e24f00",
"assets/fonts/MaterialIcons-Regular.otf": "1e3c983be6abc37c093910ed9a819334",
"assets/assets/images/event.jpg": "53a990ec70e155287e7689283e87d45b",
"assets/assets/images/Padel_In_Logo.png": "766da4d06c6078cfbe17f65a1d78b15c",
"assets/assets/images/boubyan_Bank.png": "2e396037df4263f96e7dffc98c445f04",
"assets/assets/images/Zain_Logo.png": "b67b87ff5f38cdf6515343181c9b0581",
"assets/assets/images/campaign.jpg": "733fcd7f35c399c06d6e7b8d3a708dd7",
"assets/assets/images/hero.jpg": "c312099cb6d1070ab2366264458b411a",
"assets/assets/images/GIH_Logo.png": "16dff4f1cd4a76eb00113c3155a7c4a3",
"assets/assets/images/content.jpg": "753ed38d8d9a6468116768cc1a644a21",
"assets/assets/images/ITS_Logo.png": "8214a5fcb4c83092526a9c425d99f489",
"assets/assets/images/gulf_Bank.png": "e7f72c8de5d4c833b428c5d96971100f",
"assets/assets/images/digital-marketing.jpg": "be3cec809866e613dc67dd9ff0f08e25",
"assets/assets/images/csr.jpg": "71bcd836b9b6f3422c36fbc41f4e5331",
"assets/assets/images/media.jpg": "0409241534073a20c03c14d4295683ea",
"assets/assets/images/Ooredoo_Logo.png": "1c75b3ab5f681feda1b85dbe59237f0f",
"assets/assets/images/brand.jpg": "518be2332cb530c9d2a47d3b49108015",
"assets/assets/icons/arrow-down.svg": "aaaeb1efe9e3e2952484b82cefc185e4",
"assets/assets/icons/instagram.svg": "c06f4e917187128efb2a7f5213226c33",
"assets/assets/icons/mail.svg": "9b10e74b53108ee23daefca512384740",
"assets/assets/icons/twitterx.svg": "3882b24417cf1e4777ae4c47f1770481",
"assets/assets/icons/lang.svg": "4cf245088c2493dc280a8035ad4ddaad",
"assets/assets/icons/facebook.svg": "5ac8066682e47123f41ff7639145c7e7",
"assets/assets/icons/logo.png": "0d275aedcc92996651c6b4f10c064129",
"assets/assets/icons/idea.svg": "d552657eff8fb4fce4ce36a23706ec0b",
"assets/assets/icons/arrow-up.svg": "c9b62b4ed534af4a2b99c1c7267797c7",
"assets/assets/icons/linkedin.svg": "d83aa12847d09e15c16414acf8c14371",
"assets/assets/icons/logo-1.svg": "d9117d0479cdca02a1be65ea2e28a2ec",
"assets/assets/icons/logo-3.svg": "f4927bb70c63868ee0a3a6632f9a99a5",
"assets/assets/icons/logo-2.svg": "06e24ea028d9cef1963595200d6576b9",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
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
        // Claim client to enable caching on first launch
        self.clients.claim();
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
      // Claim client to enable caching on first launch
      self.clients.claim();
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
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
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
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
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
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}

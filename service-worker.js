const CACHE='daily-wins-v10-google-2';
const ASSETS=['./','./index.html','./sync.js','./google-signin.js','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
// Activate on the next launch after existing V9 windows close; no forced reload during edits.
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>/^daily-wins-v\d/.test(k)&&k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>{const url=new URL(e.request.url);if(e.request.method!=='GET'||url.origin!==self.location.origin||e.request.headers.has('Authorization'))return;const allowed=ASSETS.map(p=>new URL(p,self.registration.scope).href);if(!allowed.includes(url.href))return;e.respondWith(caches.open(CACHE).then(async c=>(await c.match(e.request))||fetch(e.request)))});

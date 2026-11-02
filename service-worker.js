const CACHE='daily-wins-v10-no-pin-2';
const ASSETS=['./','./index.html','./sync.js','./google-signin.js','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    await cache.addAll(ASSETS);
    await self.skipWaiting();
  })());
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>/^daily-wins-v\d/.test(key)&&key!==CACHE).map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET'||request.headers.has('Authorization'))return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;
  const allowed=ASSETS.map(path=>new URL(path,self.registration.scope).href);
  if(!allowed.includes(url.href))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    const isAppShell=url.pathname===new URL('./',self.registration.scope).pathname||url.pathname===new URL('./index.html',self.registration.scope).pathname;
    if(isAppShell){
      try{
        const response=await fetch(request,{cache:'no-store'});
        if(response.ok)await cache.put(request,response.clone());
        return response;
      }catch(error){
        const cached=await cache.match(request);
        if(cached)return cached;
        throw error;
      }
    }
    return (await cache.match(request))||fetch(request);
  })());
});

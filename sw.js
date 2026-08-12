const CACHE = 'rtt-web-v0.3.0-r2';
const LOCAL_MODEL_MARKER = '/__rtt-local-models/';
const LOCAL_MODEL_DB = 'rtt-web-local-models';
const LOCAL_MODEL_STORE = 'resources';
const scopeUrl = new URL('./', self.registration.scope);
const shell = ['./', './app/', './models/', './manifest.webmanifest', './favicon.png', './icon-192.png', './icon-512.png']
  .map((path) => new URL(path, scopeUrl).toString());

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(shell)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;
  if (url.pathname.includes(LOCAL_MODEL_MARKER)) {
    event.respondWith(readLocalModelFile(url));
    return;
  }
  event.respondWith(fetch(event.request).then((response) => {
    if (response.ok) caches.open(CACHE).then((cache) => cache.put(event.request, response.clone()));
    return response;
  }).catch(() => caches.match(event.request).then((cached) => cached || caches.match(scopeUrl))));
});

async function readLocalModelFile(url) {
  const suffix = url.pathname.split(LOCAL_MODEL_MARKER)[1] || '';
  const [resourceId, ...parts] = suffix.split('/').filter(Boolean).map(decodeURIComponent);
  if (!resourceId || !parts.length) return new Response('Local model path is incomplete.', { status: 400 });
  const resource = await getLocalModelResource(resourceId);
  if (!resource?.directoryHandle) return new Response('Local model permission is unavailable.', { status: 404 });
  const permission = await resource.directoryHandle.queryPermission?.({ mode: 'read' });
  if (permission && permission !== 'granted') return new Response('Local model permission must be renewed in RTT.', { status: 403 });
  try {
    let directory = resource.directoryHandle;
    for (const part of parts.slice(0, -1)) directory = await directory.getDirectoryHandle(part);
    const file = await (await directory.getFileHandle(parts.at(-1))).getFile();
    return new Response(file, {
      headers: {
        'Content-Type': file.type || contentType(parts.at(-1)),
        'Content-Length': String(file.size),
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    return new Response(error instanceof Error ? error.message : 'Local model file was not found.', { status: 404 });
  }
}

function getLocalModelResource(id) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(LOCAL_MODEL_DB, 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const database = request.result;
      const read = database.transaction(LOCAL_MODEL_STORE, 'readonly').objectStore(LOCAL_MODEL_STORE).get(id);
      read.onsuccess = () => { resolve(read.result); database.close(); };
      read.onerror = () => { reject(read.error); database.close(); };
    };
  });
}

function contentType(name) {
  if (name.endsWith('.json')) return 'application/json';
  if (name.endsWith('.onnx')) return 'application/octet-stream';
  if (name.endsWith('.txt') || name.endsWith('.model') || name.endsWith('.spm')) return 'text/plain; charset=utf-8';
  return 'application/octet-stream';
}

// lib/cache.js
// Same in-memory cache behavior as node-cache in the old project
// (stdTTL 60 sec, set() accepts custom TTL)

const store = new Map();

function get(key) {
  const entry = store.get(key);
  if (!entry) return undefined;
  if (entry.expires !== 0 && Date.now() > entry.expires) {
    store.delete(key);
    return undefined;
  }
  return entry.value;
}

function has(key) {
  return get(key) !== undefined;
}

function set(key, value, ttl = 60) {
  store.set(key, {
    value,
    expires: ttl === 0 ? 0 : Date.now() + ttl * 1000
  });
}

function del(key) {
  store.delete(key);
}

function flushAll() {
  store.clear();
}

const cache = { get, has, set, del, flushAll };

export default cache;

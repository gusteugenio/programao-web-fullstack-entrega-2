const ttlMs = Math.max(1000, Number(process.env.CACHE_TTL_MS || 60_000));
const store = new Map();

export function getCachedValue(key) {
  const entry = store.get(key);

  if (!entry) {
    return null;
  }

  if (entry.expiresAt <= Date.now()) {
    store.delete(key);
    return null;
  }

  return entry.value;
}

export function setCachedValue(key, value, customTtlMs = ttlMs) {
  store.set(key, {
    value,
    expiresAt: Date.now() + customTtlMs,
  });
}

export function clearCacheByPrefix(prefix) {
  for (const key of store.keys()) {
    if (key.startsWith(prefix)) {
      store.delete(key);
    }
  }
}

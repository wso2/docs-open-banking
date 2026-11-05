/**
 * Parser for the published `versions.json` (served from `/en/versions/assets/versions.json`).
 * Plain ESM so that it can be unit-tested with `node --test` and imported by the navbar item.
 */

/** A doc URL that carries its own scheme or is protocol-relative, i.e. points off this docs set. */
const ABSOLUTE_URL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
/** The only URL schemes a version link may use. */
const ALLOWED_PROTOCOLS = new Set(['http:', 'https:']);

/**
 * @typedef {object} VersionItem
 * @property {string} label The version key, e.g. `4.0.0`.
 * @property {string} href Absolute http(s) URL of that version's documentation.
 * @property {boolean} external True when the entry is an absolute URL (opened in a new tab).
 */

/**
 * @param {unknown} value Candidate value.
 * @returns {boolean} True for a non-null, non-array object.
 */
function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Resolve one `doc` entry to an http(s) URL, or null when it is unusable or uses another scheme.
 *
 * @param {string} doc The `doc` value from versions.json.
 * @param {string} origin Site origin, e.g. `https://ob.docs.wso2.com`.
 * @returns {string|null} The resolved URL, or null.
 */
function resolveDocUrl(doc, origin) {
  let url;
  try {
    url = new URL(doc, `${origin}/en/`);
  } catch {
    return null;
  }
  return ALLOWED_PROTOCOLS.has(url.protocol) ? url.href : null;
}

/**
 * Turn the published versions.json into navbar dropdown items, in `list` order.
 * Relative `doc` values are resolved against `<origin>/en/`; entries that are missing, not a
 * string, unparsable or not http(s) are dropped.
 *
 * @param {unknown} json Parsed versions.json.
 * @param {string} origin Site origin without a trailing slash.
 * @returns {{items: VersionItem[]}} The dropdown items.
 * @throws {TypeError} When `json` does not have the `{list: string[], all: object}` shape.
 */
export function parseVersions(json, origin) {
  if (!isRecord(json) || !Array.isArray(json.list) || !isRecord(json.all)) {
    throw new TypeError('versions.json must be an object with a "list" array and an "all" object');
  }
  if (!json.list.every((key) => typeof key === 'string')) {
    throw new TypeError('versions.json "list" must contain only strings');
  }
  const items = [];
  for (const key of json.list) {
    const entry = Object.hasOwn(json.all, key) ? json.all[key] : undefined;
    if (!isRecord(entry) || typeof entry.doc !== 'string') {
      continue;
    }
    const href = resolveDocUrl(entry.doc, origin);
    if (href !== null) {
      items.push({label: key, href, external: ABSOLUTE_URL.test(entry.doc)});
    }
  }
  return {items};
}

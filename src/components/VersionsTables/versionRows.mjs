/**
 * Pure helpers behind the versions page: they turn the published `versions.json` into the rows of the
 * "Current version" and "Past Versions" tables. Plain ESM (no React) so they can be unit-tested with
 * `node --test`. They reproduce what the MkDocs page's `theme.js` did in the browser.
 */

/** A link that carries its own scheme or is protocol-relative, i.e. points off this docs set. */
const ABSOLUTE_URL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
/** The only URL schemes a version link may use. */
const ALLOWED_PROTOCOLS = new Set(['http:', 'https:']);

/**
 * @typedef {object} VersionLink
 * @property {string} href Where the link goes: an absolute http(s) URL, or a root-relative path under `/en/`.
 * @property {'_blank'|'_self'} target `_blank` for an off-site (absolute) URL, `_self` otherwise.
 */

/**
 * @typedef {object} VersionRow
 * @property {string} version The version key, e.g. `4.0.0`.
 * @property {VersionLink} doc The documentation link.
 * @property {VersionLink} notes The release notes link.
 */

/**
 * @param {unknown} value Candidate value.
 * @returns {boolean} True for a non-null, non-array object.
 */
function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Turn one `doc` or `notes` value into a link. Relative values are published under `/en/` (the old page
 * did `origin + '/en/' + value`), values with a scheme must be http(s) and open in a new tab.
 *
 * @param {unknown} value The value from versions.json.
 * @returns {VersionLink|null} The link, or null when the value is missing or uses another scheme.
 */
export function toLink(value) {
  if (typeof value !== 'string' || value.trim() === '') {
    return null;
  }
  if (!ABSOLUTE_URL.test(value)) {
    // Keep the path inside /en/: no scheme, no protocol-relative start, no way to climb out.
    if (value.startsWith('/') || value.split('/').includes('..')) {
      return null;
    }
    return {href: `/en/${value}`, target: '_self'};
  }
  let url;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  return ALLOWED_PROTOCOLS.has(url.protocol) ? {href: url.href, target: '_blank'} : null;
}

/**
 * Build the rows of both tables, in the order of `versions.json`.
 *
 * @param {unknown} json Parsed versions.json (`{current: string, all: {[version]: {doc, notes}}}`).
 * @returns {{current: VersionRow|null, past: VersionRow[]}} The current version and the past versions
 *   (every key of `all` except the current one and a `pre-release` key, as before).
 * @throws {TypeError} When `json` does not have the expected shape.
 */
export function buildVersionRows(json) {
  if (!isRecord(json) || typeof json.current !== 'string' || !isRecord(json.all)) {
    throw new TypeError('versions.json must be an object with a "current" string and an "all" object');
  }
  const rows = [];
  for (const [version, entry] of Object.entries(json.all)) {
    const doc = isRecord(entry) ? toLink(entry.doc) : null;
    const notes = isRecord(entry) ? toLink(entry.notes) : null;
    if (doc !== null && notes !== null) {
      rows.push({version, doc, notes});
    }
  }
  const preRelease = typeof json['pre-release'] === 'string' ? json['pre-release'] : undefined;
  return {
    current: rows.find((row) => row.version === json.current) ?? null,
    past: rows.filter((row) => row.version !== json.current && row.version !== preRelease),
  };
}

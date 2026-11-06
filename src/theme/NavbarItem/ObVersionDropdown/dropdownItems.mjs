/**
 * Pure helpers behind the version dropdown: origin resolution, loading the published versions list
 * and building the navbar items. Plain ESM (no React) so they can be unit-tested with `node --test`.
 */
import {parseVersions} from './parseVersions.mjs';

/** Where the published versions list lives, relative to the origin the site is served from. */
export const VERSIONS_JSON_PATH = '/en/versions/assets/versions.json';

/** Give up on the versions list after this long; the dropdown then shows only "Show all". */
export const FETCH_TIMEOUT_MS = 5000;

/**
 * The always-present entry. Root-relative, so it renders identically on server and client and
 * Docusaurus does not mark it external. `autoAddBaseUrl: false` stops the site's baseUrl being
 * prepended, and `_top` makes it a plain page load: `/en/versions/` is a different site build, not
 * a route of this one, so client-side routing must not handle it.
 */
export const SHOW_ALL_ITEM = Object.freeze({
  label: 'Show all',
  href: '/en/versions/',
  autoAddBaseUrl: false,
  target: '_top',
});

/**
 * Pick the origin the versions list is fetched from: the page's own origin in the browser (so a
 * local preview reads its own staged file), the configured site URL when there is no window.
 *
 * @param {string|undefined} windowOrigin `window.location.origin`, or undefined during SSR.
 * @param {string} siteUrl The configured `siteConfig.url`.
 * @returns {string} An origin without a trailing slash.
 */
export function resolveOrigin(windowOrigin, siteUrl) {
  // Opaque origins (sandboxed frames, file:) are reported as the string "null".
  if (!windowOrigin || windowOrigin === 'null') {
    return siteUrl;
  }
  return windowOrigin;
}

/**
 * Turn one parsed version into a navbar item. Entries on this origin that are not flagged external
 * become root-relative internal links (no external icon, same tab); everything else stays absolute,
 * opens in a new tab and gets `rel="noopener noreferrer"`.
 *
 * @param {import('./parseVersions.mjs').VersionItem} item A parsed version.
 * @param {string} origin The origin the page is served from.
 * @returns {object} A navbar item.
 */
function toNavbarItem(item, origin) {
  const url = new URL(item.href);
  if (!item.external && url.origin === origin) {
    return {
      label: item.label,
      href: `${url.pathname}${url.search}${url.hash}`,
      autoAddBaseUrl: false,
      target: '_top',
    };
  }
  return {label: item.label, href: item.href, target: '_blank', rel: 'noopener noreferrer'};
}

/**
 * Build the dropdown's navbar items: the versions in order, then "Show all".
 *
 * @param {import('./parseVersions.mjs').VersionItem[]} items Parsed versions (may be empty).
 * @param {string} origin The origin the page is served from.
 * @returns {object[]} Navbar items; never empty.
 */
export function buildDropdownItems(items, origin) {
  return [...items.map((item) => toNavbarItem(item, origin)), SHOW_ALL_ITEM];
}

/**
 * Fetch and parse the versions list, then build the dropdown items. Never rejects: on a network
 * error, timeout, non-OK status or unexpected JSON it logs a warning (reason only) and returns just
 * "Show all".
 *
 * @param {object} options
 * @param {typeof fetch} options.fetchFn The fetch implementation.
 * @param {string} options.origin Origin to fetch from and to resolve relative entries against.
 * @param {number} [options.timeoutMs] Abort the request after this many milliseconds.
 * @param {{warn: (message: string) => void}} [options.logger] Where to report a failure.
 * @returns {Promise<object[]>} Navbar items.
 */
export async function loadDropdownItems({fetchFn, origin, timeoutMs = FETCH_TIMEOUT_MS, logger = console}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchFn(`${origin}${VERSIONS_JSON_PATH}`, {
      signal: controller.signal,
      credentials: 'omit',
    });
    if (!response.ok) {
      throw new Error(`versions.json responded with HTTP ${response.status}`);
    }
    const {items} = parseVersions(await response.json(), origin);
    return buildDropdownItems(items, origin);
  } catch (error) {
    logger.warn(`Version list unavailable: ${error instanceof Error ? error.message : String(error)}`);
    return buildDropdownItems([], origin);
  } finally {
    clearTimeout(timeoutId);
  }
}

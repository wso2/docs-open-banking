/**
 * Pure helpers of the copy-linked-images plugin (kept free of Docusaurus so they can be unit tested).
 *
 * MkDocs served every documentation image at `<baseUrl>assets/img/<path>`. Docusaurus only bundles
 * the images used as `<img>` (under hashed names), so the plugin publishes the image files at the
 * MkDocs URL as well, which keeps old direct links to an image (and the linked, click-to-enlarge
 * images, written as `pathname:///assets/img/<path>`) working.
 */
import {lstatSync, readdirSync} from 'node:fs';
import path from 'node:path';

/** Site-relative URL prefix of linked images. */
export const LINKED_IMAGE_URL_PREFIX = 'assets/img/';

const HREF_ATTRIBUTE = /\shref=(?:"([^"]*)"|'([^']*)')/g;

/**
 * Collect the image paths that built HTML links to.
 *
 * @param {string} html Built page HTML.
 * @param {string} baseUrl Site base URL with leading and trailing slash, e.g. `/en/latest/`.
 * @returns {Set<string>} Decoded paths relative to `assets/img/` (query and fragment removed).
 */
export function findLinkedImagePaths(html, baseUrl) {
  const prefix = baseUrl + LINKED_IMAGE_URL_PREFIX;
  const found = new Set();
  for (const match of html.matchAll(HREF_ATTRIBUTE)) {
    const href = match[1] ?? match[2];
    if (!href.startsWith(prefix)) {
      continue;
    }
    const withoutSuffix = href.slice(prefix.length).split(/[?#]/)[0];
    try {
      found.add(decodeURIComponent(withoutSuffix));
    } catch {
      throw new Error(`linked image path is not valid percent-encoding: ${JSON.stringify(withoutSuffix)}`);
    }
  }
  return found;
}

/**
 * Map a linked image path to a file under the source root, refusing anything that could leave it.
 *
 * @param {string} relativePath Path relative to `assets/img/`.
 * @param {string} sourceRoot Absolute `en/docs/assets/img` directory.
 * @returns {string} Absolute source file path.
 * @throws {Error} When the path is empty, absolute, contains backslash/NUL, is not normalised or escapes the root.
 */
export function resolveLinkedImage(relativePath, sourceRoot) {
  const invalid = relativePath === ''
    || relativePath.includes('\0') || relativePath.includes('\\')
    || path.posix.isAbsolute(relativePath)
    || path.posix.normalize(relativePath) !== relativePath
    || relativePath.split('/').some((segment) => segment === '..' || segment === '' || segment === '.');
  if (invalid) {
    throw new Error(`linked image path is not a normalised relative path: ${JSON.stringify(relativePath)}`);
  }
  const root = path.resolve(sourceRoot);
  const resolved = path.resolve(root, ...relativePath.split('/'));
  if (!resolved.startsWith(root + path.sep)) {
    throw new Error(`linked image path escapes the image directory: ${JSON.stringify(relativePath)}`);
  }
  return resolved;
}

/**
 * Check that a linked image's source is a regular file reached without following any symbolic
 * link (defence in depth: the content is repo-controlled, but a symlink under the image directory
 * would otherwise let the build copy an arbitrary file into the published site).
 *
 * @param {string} relativePath Normalised path relative to `sourceRoot` (see `resolveLinkedImage`).
 * @param {string} sourceRoot Absolute `en/docs/assets/img` directory.
 * @throws {Error} When any segment is a symlink, the target is not a regular file, or it is missing.
 */
export function assertRegularSourceFile(relativePath, sourceRoot) {
  const segments = relativePath.split('/');
  let current = path.resolve(sourceRoot);
  segments.forEach((segment, index) => {
    current = path.join(current, segment);
    const stats = lstatSync(current, {throwIfNoEntry: false});
    if (stats === undefined) {
      throw new Error(`linked image source ${JSON.stringify(relativePath)} does not exist`);
    }
    if (stats.isSymbolicLink()) {
      throw new Error(`linked image source ${JSON.stringify(relativePath)} is or passes through a symbolic link`);
    }
    if (index === segments.length - 1 && !stats.isFile()) {
      throw new Error(`linked image source ${JSON.stringify(relativePath)} is not a regular file`);
    }
  });
}

/** Image file types published at their MkDocs URL. */
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp']);

/**
 * List every image file below the source directory, as normalised POSIX paths relative to it.
 * Symbolic links are refused (the build must not copy a file from outside the image directory);
 * other kinds of files are ignored.
 *
 * @param {string} sourceRoot Absolute `en/docs/assets/img` directory.
 * @returns {string[]} Sorted relative paths.
 * @throws {Error} When a symbolic link is found below the directory.
 */
export function listImageFiles(sourceRoot) {
  const found = [];
  const walk = (relativeDir) => {
    const directory = relativeDir === '' ? sourceRoot : path.join(sourceRoot, ...relativeDir.split('/'));
    for (const entry of readdirSync(directory, {withFileTypes: true})) {
      const relative = relativeDir === '' ? entry.name : `${relativeDir}/${entry.name}`;
      if (entry.isSymbolicLink()) {
        throw new Error(`image source ${JSON.stringify(relative)} is a symbolic link`);
      }
      if (entry.isDirectory()) {
        walk(relative);
      } else if (entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
        found.push(relative);
      }
    }
  };
  walk('');
  return found.sort();
}

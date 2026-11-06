/**
 * Rehype plugin for `@signalwire/docusaurus-plugin-llms-txt` (`content.beforeDefaultRehypePlugins`).
 *
 * The plugin rewrites every `<a href>` while building the Markdown mirror of a page, and aborts the
 * whole mirror when an href is not a URL (`new URL(href, base)` throws). Two pages link to
 * `https://<APIM_HOST>:9443/devportal`, a placeholder the reader substitutes, which is not a valid
 * URL. Without this plugin their mirrors are never written, so "Copy page" and "View as Markdown"
 * break. This replaces only such anchors, in the mirror only (the HTML page is untouched), with the
 * link text followed by the literal URL in a code span, so no information is lost.
 */

/** A base used only to decide whether an href is parseable as a (relative or absolute) URL. */
const PROBE_BASE = 'https://probe.invalid/';

/**
 * @param {string} href An `href` attribute value.
 * @returns {boolean} True when `new URL(href, base)` accepts it.
 */
export function isParsableHref(href) {
  try {
    new URL(href, PROBE_BASE);
    return true;
  } catch {
    return false;
  }
}

/**
 * Replace one unparsable anchor by its children plus ` (` `code` `)`.
 *
 * @param {object} anchor A hast `a` element.
 * @param {string} href Its unparsable href.
 * @returns {object[]} The replacement nodes.
 */
function replacementNodes(anchor, href) {
  return [
    ...anchor.children,
    {type: 'text', value: ' ('},
    {type: 'element', tagName: 'code', properties: {}, children: [{type: 'text', value: href}]},
    {type: 'text', value: ')'},
  ];
}

/**
 * Rewrite, in place and at any depth, the children of `node` that are anchors with an unparsable href.
 *
 * @param {object} node A hast node.
 */
function rewriteChildren(node) {
  if (!Array.isArray(node.children)) {
    return;
  }
  node.children = node.children.flatMap((child) => {
    rewriteChildren(child);
    const href = child.type === 'element' && child.tagName === 'a' ? child.properties?.href : undefined;
    return typeof href === 'string' && !isParsableHref(href) ? replacementNodes(child, href) : [child];
  });
}

/**
 * Unified attacher.
 *
 * @returns {(tree: object) => void} The tree transformer.
 */
export default function rehypeReplaceUnparsableLinks() {
  return (tree) => rewriteChildren(tree);
}

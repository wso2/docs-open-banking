import fs from 'fs';
import path from 'path';
import type {LoadContext, Plugin} from '@docusaurus/types';
import {
  LINKED_IMAGE_URL_PREFIX,
  findLinkedImagePaths,
  resolveLinkedImage,
} from './copy-linked-images-core.mjs';

/** Where the documentation images live, relative to the site directory. */
const IMAGE_SOURCE_DIR = path.join('en', 'docs', 'assets', 'img');

/** Collect the `index.html`-style files of a build directory (symlinks are not followed). */
function listHtmlFiles(directory: string): string[] {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return listHtmlFiles(entryPath);
    }
    return entry.isFile() && entry.name.endsWith('.html') ? [entryPath] : [];
  });
}

/**
 * Publish the images that pages link to (click-to-enlarge `[![alt](x.png)](x.png)`) at MkDocs's URL
 * `<baseUrl>assets/img/<path>`. Docusaurus only bundles images used as `<img>` (hashed under
 * `assets/images/`), so after the build this copies exactly the linked files from `en/docs/assets/img/`
 * to `<outDir>/assets/img/<same path>`. A missing source file fails the build.
 */
export default function copyLinkedImagesPlugin(context: LoadContext): Plugin {
  return {
    name: 'copy-linked-images-plugin',
    async postBuild({outDir}) {
      const sourceRoot = path.join(context.siteDir, IMAGE_SOURCE_DIR);
      const linked = new Set<string>();
      for (const htmlFile of listHtmlFiles(outDir)) {
        const html = fs.readFileSync(htmlFile, 'utf-8');
        findLinkedImagePaths(html, context.baseUrl).forEach((imagePath) => linked.add(imagePath));
      }
      for (const imagePath of [...linked].sort()) {
        const source = resolveLinkedImage(imagePath, sourceRoot);
        if (!fs.statSync(source, {throwIfNoEntry: false})?.isFile()) {
          throw new Error(
            `copy-linked-images: a page links to ${LINKED_IMAGE_URL_PREFIX}${imagePath} but ${source} does not exist`,
          );
        }
        const destination = resolveLinkedImage(imagePath, path.join(outDir, LINKED_IMAGE_URL_PREFIX));
        fs.mkdirSync(path.dirname(destination), {recursive: true});
        fs.copyFileSync(source, destination);
      }
      console.log(`[copy-linked-images] published ${linked.size} linked image(s)`);
    },
  };
}

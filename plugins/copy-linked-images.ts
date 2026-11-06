import fs from 'fs';
import path from 'path';
import type {LoadContext, Plugin} from '@docusaurus/types';
import {
  LINKED_IMAGE_URL_PREFIX,
  assertRegularSourceFile,
  findLinkedImagePaths,
  listImageFiles,
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
 * Publish the documentation images at MkDocs's URL `<baseUrl>assets/img/<path>`. Docusaurus only
 * bundles images used as `<img>` (hashed under `assets/images/`), so after the build this copies every
 * image file of `en/docs/assets/img/` to `<outDir>/assets/img/<same path>`. Old direct links to an
 * image, and the click-to-enlarge links `[![alt](x.png)](x.png)`, keep working. A page that links to an
 * image whose source file is missing or unusable fails the build.
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
      const published = new Set([...linked, ...listImageFiles(sourceRoot)]);
      for (const imagePath of [...published].sort()) {
        const source = resolveLinkedImage(imagePath, sourceRoot);
        try {
          assertRegularSourceFile(imagePath, sourceRoot);
        } catch (error) {
          throw new Error(
            `copy-linked-images: a page links to ${LINKED_IMAGE_URL_PREFIX}${imagePath} but the source is unusable: ${(error as Error).message}`,
          );
        }
        const destination = resolveLinkedImage(imagePath, path.join(outDir, LINKED_IMAGE_URL_PREFIX));
        fs.mkdirSync(path.dirname(destination), {recursive: true});
        fs.copyFileSync(source, destination);
      }
      console.log(`[copy-linked-images] published ${published.size} image(s) at ${LINKED_IMAGE_URL_PREFIX} (${linked.size} linked from pages)`);
    },
  };
}

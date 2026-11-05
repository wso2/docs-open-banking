export const LINKED_IMAGE_URL_PREFIX: string;
export function findLinkedImagePaths(html: string, baseUrl: string): Set<string>;
export function resolveLinkedImage(relativePath: string, sourceRoot: string): string;
export function assertRegularSourceFile(relativePath: string, sourceRoot: string): void;
export function listImageFiles(sourceRoot: string): string[];

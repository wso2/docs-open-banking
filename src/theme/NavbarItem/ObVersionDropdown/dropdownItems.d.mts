import type {VersionItem} from './parseVersions.mjs';

export type DropdownItem = {
  label: string;
  href: string;
  autoAddBaseUrl?: boolean;
  target: string;
  rel?: string;
};

export const VERSIONS_JSON_PATH: string;
export const FETCH_TIMEOUT_MS: number;
export const SHOW_ALL_ITEM: Readonly<DropdownItem>;
export function resolveOrigin(windowOrigin: string | undefined, siteUrl: string): string;
export function buildDropdownItems(items: VersionItem[], origin: string): DropdownItem[];
export function loadDropdownItems(options: {
  fetchFn: typeof fetch;
  origin: string;
  timeoutMs?: number;
  logger?: {warn: (message: string) => void};
}): Promise<DropdownItem[]>;

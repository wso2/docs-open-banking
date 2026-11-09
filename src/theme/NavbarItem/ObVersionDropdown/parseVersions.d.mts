export type VersionItem = {
  label: string;
  href: string;
  external: boolean;
};

export function parseVersions(json: unknown, origin: string): {items: VersionItem[]};

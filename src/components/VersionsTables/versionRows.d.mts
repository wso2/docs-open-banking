export type VersionLink = {href: string; target: '_blank' | '_self'};
export type VersionRow = {version: string; doc: VersionLink; notes: VersionLink};
export function toLink(value: unknown): VersionLink | null;
export function buildVersionRows(json: unknown): {current: VersionRow | null; past: VersionRow[]};

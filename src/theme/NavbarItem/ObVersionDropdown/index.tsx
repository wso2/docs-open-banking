import React, {useEffect, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import {parseVersions, type VersionItem} from './parseVersions.mjs';

/** Give up on the versions list after this long; the dropdown then shows only "Show all". */
const FETCH_TIMEOUT_MS = 5000;

type Props = {
  /** The version this build documents (`siteVersion` in site.branch.json). */
  label: string;
  mobile?: boolean;
};

/**
 * Fetch and parse the published versions list from the `versions` build of the site.
 *
 * @param origin Site origin, e.g. `https://ob.docs.wso2.com`.
 * @returns The version entries, in published order.
 * @throws When the request fails, times out, is not OK, or the JSON has an unexpected shape.
 */
async function fetchVersionItems(origin: string): Promise<VersionItem[]> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(`${origin}/en/versions/assets/versions.json`, {
      signal: controller.signal,
      credentials: 'omit',
    });
    if (!response.ok) {
      throw new Error(`versions.json responded with HTTP ${response.status}`);
    }
    return parseVersions(await response.json(), origin).items;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

/**
 * Navbar dropdown listing the published documentation versions (navbar type
 * `custom-obVersionDropdown`). Port of the MkDocs `theme.js` version selector: the list comes from
 * `/en/versions/assets/versions.json`, and "Show all" always links to `/en/versions/`. If the list
 * cannot be loaded, only the current version label and "Show all" are shown.
 */
export default function ObVersionDropdown({label, mobile}: Props): React.JSX.Element {
  // The site origin is fixed by the config, so server and client render the same hrefs.
  const {siteConfig} = useDocusaurusContext();
  const origin = siteConfig.url;
  const [items, setItems] = useState<VersionItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetchVersionItems(origin)
      .then((loaded) => {
        if (!cancelled) {
          setItems(loaded);
        }
      })
      .catch((error: Error) => {
        console.warn(`Version list unavailable: ${error.message}`);
      });
    return () => {
      cancelled = true;
    };
  }, [origin]);

  // Docusaurus opens absolute URLs in a new tab by default; only entries that point off this
  // docs set (external) should, the others are other builds of the same site and open in place.
  const dropdownItems = [
    ...items.map((item) => ({
      label: item.label,
      href: item.href,
      target: item.external ? '_blank' : '_self',
      ...(item.external && {rel: 'noopener noreferrer'}),
    })),
    {label: 'Show all', href: `${origin}/en/versions/`, target: '_self'},
  ];

  return <DropdownNavbarItem label={label} items={dropdownItems} mobile={mobile} />;
}

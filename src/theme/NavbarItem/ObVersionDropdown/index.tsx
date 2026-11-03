import React, {useEffect, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import {
  SHOW_ALL_ITEM,
  loadDropdownItems,
  resolveOrigin,
  type DropdownItem,
} from './dropdownItems.mjs';

type Props = {
  /** The version this build documents (`siteVersion` in site.branch.json). */
  label: string;
  mobile?: boolean;
};

/**
 * Navbar dropdown listing the published documentation versions (navbar type
 * `custom-obVersionDropdown`). Port of the MkDocs `theme.js` version selector: the list comes from
 * `/en/versions/assets/versions.json` on the origin the page is served from (so a local preview
 * reads its own staged copy), and "Show all" always links to `/en/versions/`. If the list cannot
 * be loaded, only the current version label and "Show all" are shown.
 */
export default function ObVersionDropdown({label, mobile}: Props): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const [items, setItems] = useState<DropdownItem[]>([SHOW_ALL_ITEM]);

  // Runs in the browser only, so server and first client render both show just "Show all"
  // (no hydration mismatch). `siteConfig.url` is the fallback when there is no window.
  useEffect(() => {
    let cancelled = false;
    const origin = resolveOrigin(
      typeof window === 'undefined' ? undefined : window.location.origin,
      siteConfig.url,
    );
    loadDropdownItems({fetchFn: window.fetch.bind(window), origin}).then((loaded) => {
      if (!cancelled) {
        setItems(loaded);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [siteConfig.url]);

  return <DropdownNavbarItem label={label} items={items} mobile={mobile} />;
}

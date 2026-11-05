import React, {type ReactNode} from 'react';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useThemeConfig} from '@docusaurus/theme-common';

/**
 * Navbar brand: the WSO2 pulse icon followed by "**Open Banking** Documentation". The icon and the
 * text form one link to the landing page. The label is built from React elements (no HTML
 * strings), so the bold word needs no innerHTML. On this site the brand links to the latest
 * documentation (a different build under /en/latest/, so a plain link). The "Documentation" link to its
 * right is an ordinary navbar item (docusaurus.config.ts).
 */
export default function NavbarLogo(): ReactNode {
  const {
    navbar: {logo},
  } = useThemeConfig();
  const sources = {
    light: useBaseUrl(logo?.src ?? ''),
    dark: useBaseUrl(logo?.srcDark ?? logo?.src ?? ''),
  };

  return (
    <a href="/en/latest/" className="navbar__brand ob-navbar-brand" aria-label="Open Banking documentation home">
      {logo && (
        <ThemedImage
          className="navbar__logo"
          sources={sources}
          alt=""
          aria-hidden="true"
          height={logo.height}
          width={logo.width}
        />
      )}
      <span className="navbar__title ob-navbar-title text--truncate">
        <strong>Open Banking</strong> Documentation
      </span>
    </a>
  );
}

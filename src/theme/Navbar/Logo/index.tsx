import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useThemeConfig} from '@docusaurus/theme-common';

/**
 * Navbar brand: the WSO2 pulse icon followed by "**Open Banking** Accelerator". The icon and the
 * text form one link to the landing page. The label is built from React elements (no HTML
 * strings), so the bold word needs no innerHTML. The "Documentation" link to its right is an
 * ordinary navbar item (docusaurus.config.ts).
 */
export default function NavbarLogo(): ReactNode {
  const {
    navbar: {logo},
  } = useThemeConfig();
  const home = useBaseUrl('/');
  const sources = {
    light: useBaseUrl(logo?.src ?? ''),
    dark: useBaseUrl(logo?.srcDark ?? logo?.src ?? ''),
  };

  return (
    <Link to={home} className="navbar__brand ob-navbar-brand" aria-label="Open Banking Accelerator documentation home">
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
        <strong>Open Banking</strong> Accelerator
      </span>
    </Link>
  );
}

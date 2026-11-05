import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/**
 * Swizzled replacement for the DocSearch metadata component. It ignores the props the theme
 * passes (locale, version, tag) and emits exactly the two tags the existing `wso2_ob` Algolia
 * index is filtered on: `docsearch:language=en` and `docsearch:version=<searchFacetVersion>`
 * (from `site.branch.json`, via `customFields`).
 */
export default function SearchMetadata(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const searchFacetVersion = String(siteConfig.customFields?.searchFacetVersion ?? '');
  return (
    <Head>
      <meta name="docsearch:language" content="en" />
      <meta name="docsearch:version" content={searchFacetVersion} />
    </Head>
  );
}

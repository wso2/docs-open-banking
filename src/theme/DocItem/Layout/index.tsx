import React from 'react';
import clsx from 'clsx';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useWindowSize } from '@docusaurus/theme-common';
import { useDoc, useDocsVersion } from '@docusaurus/plugin-content-docs/client';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import ContentVisibility from '@theme/ContentVisibility';
import DocMarkdownActions from '@site/src/components/DocMarkdownActions';
import styles from '@docusaurus/theme-classic/lib/theme/DocItem/Layout/styles.module.css';
import localStyles from './styles.module.css';

/**
 * Whether the page opts into the full-width layout (front matter `wide: true`, used by the
 * Redoc API pages): no table of contents and no "Copy page" actions.
 */
function useIsWideDoc(): boolean {
  return useCustomFrontMatter().wide === true;
}

/** Front matter keys this site adds on top of the built-in Docusaurus ones. */
type CustomFrontMatter = { wide?: unknown; hide_markdown_actions?: unknown };

function useCustomFrontMatter(): CustomFrontMatter {
  const { frontMatter } = useDoc();
  return frontMatter as CustomFrontMatter;
}

function useDocTOC() {
  const { frontMatter, toc } = useDoc();
  const windowSize = useWindowSize();
  const isWide = useIsWideDoc();
  const hidden = frontMatter.hide_table_of_contents || isWide;
  const canRender = !hidden && toc.length > 0;
  const mobile = canRender ? <DocItemTOCMobile /> : undefined;
  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined;
  return {
    hidden,
    mobile,
    desktop,
  };
}

function DocStructuredData() {
  const { metadata } = useDoc();
  const version = useDocsVersion();
  const { siteConfig } = useDocusaurusContext();
  const permalink =
    siteConfig.trailingSlash && !metadata.permalink.endsWith('/')
      ? `${metadata.permalink}/`
      : metadata.permalink;
  const url = `${siteConfig.url}${permalink}`;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: metadata.title,
    description: metadata.description || undefined,
    url,
    mainEntityOfPage: url,
    inLanguage: 'en',
    version: version.label,
    dateModified: metadata.lastUpdatedAt
      ? new Date(metadata.lastUpdatedAt).toISOString()
      : undefined,
    isPartOf: { '@id': `${siteConfig.url}${siteConfig.baseUrl}#website` },
    publisher: { '@id': `${siteConfig.url}/#organization` },
  };
  return (
    <Head>
      <meta property="og:type" content="article" />
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Head>
  );
}

export default function DocItemLayout({ children }: { children: React.ReactNode }) {
  const docTOC = useDocTOC();
  const { metadata } = useDoc();
  const customFrontMatter = useCustomFrontMatter();
  const isWide = useIsWideDoc();
  // `wide` pages and pages with `hide_markdown_actions` have no "Copy page" menu.
  const hideMarkdownActions = isWide || customFrontMatter.hide_markdown_actions === true;

  return (
    <div className={clsx('row', isWide && 'ob-wide-doc')}>
      <div className={clsx('col', !isWide && styles.docItemCol)}>
        <DocStructuredData />
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <div className={localStyles.breadcrumbRow}>
              <DocBreadcrumbs />
              {!hideMarkdownActions && (
                <DocMarkdownActions className={localStyles.inlineActions} />
              )}
            </div>
            <DocVersionBadge />
            {docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>
      {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
    </div>
  );
}

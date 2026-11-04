import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import fs from 'fs';
import copyLinkedImagesPlugin from './plugins/copy-linked-images';
import rehypeReplaceUnparsableLinks from './plugins/llms-txt-unparsable-links.mjs';
import gtmNoscriptPlugin, {GTM_CONTAINER_ID} from './plugins/gtm-noscript';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** Branch-specific values: the only file that differs between the master, 3.0.0 and versions branches. */
type SiteBranch = {
  siteVersion: string;
  editBranch: string;
  defaultBaseUrl: string;
  searchFacetVersion: string;
};
const siteBranch: SiteBranch = JSON.parse(fs.readFileSync('./site.branch.json', 'utf-8'));

/** The site is only ever published under /en/<version>/ on ob.docs.wso2.com. */
const BASE_URL_PATTERN = /^\/en\/[a-z0-9.-]+\/$/;

/**
 * Resolve the base URL from the BASE_URL environment variable (or the branch default) and fail
 * closed: anything outside /en/<version>/ aborts the build rather than publishing to a wrong path.
 */
function resolveBaseUrl(): string {
  const candidate = process.env.BASE_URL ?? siteBranch.defaultBaseUrl;
  const versionSegment = candidate.split('/')[2] ?? '';
  if (!BASE_URL_PATTERN.test(candidate) || /^\.+$/.test(versionSegment)) {
    throw new Error(
      `Invalid BASE_URL "${candidate}": it must match ${BASE_URL_PATTERN} (for example /en/latest/).`,
    );
  }
  return candidate;
}

const siteUrl = 'https://ob.docs.wso2.com';
const baseUrl = resolveBaseUrl();
const siteName = 'WSO2 Open Banking Accelerator Documentation';
const siteDescription = 'Documentation for WSO2 Open Banking Accelerator';
const docsRepoUrl = 'https://github.com/wso2/docs-open-banking';

const config: Config = {
  // The MkDocs `site_name` (en/mkdocs.yml).
  title: siteName,
  favicon: 'img/favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    // Kept off: on Docusaurus 3.10.2, v4:true pulls in the Rust-based Faster bundler, which has an
    // MDX compilation bug when near-identical docs are processed together. Revisit once that is
    // fixed upstream.
    v4: false,
  },

  url: siteUrl,
  baseUrl,

  // Matches the URLs MkDocs published (directory-style, trailing slash).
  trailingSlash: true,

  organizationName: 'wso2',
  projectName: 'docs-open-banking',

  // The documentation has pre-existing broken links, anchors and images (missing files, stale
  // heading ids). The migration keeps them exactly as written and reports them instead of
  // fixing them (spec section 6), so these cannot be 'throw'. scripts/check-links.mjs ratchets
  // them against a committed baseline in CI: new breakage fails, and the baseline only shrinks.
  onBrokenLinks: 'warn',
  onBrokenAnchors: 'warn',

  customFields: {
    searchProvider: 'auto',
    searchFacetVersion: siteBranch.searchFacetVersion,
  },

  headTags: [
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${siteUrl}/#organization`,
            name: 'WSO2 LLC',
            url: 'https://wso2.com',
            logo: `${siteUrl}${baseUrl}img/wso2-pulse.svg`,
          },
          {
            '@type': 'WebSite',
            '@id': `${siteUrl}${baseUrl}#website`,
            name: siteName,
            url: `${siteUrl}${baseUrl}`,
            inLanguage: 'en',
            publisher: {'@id': `${siteUrl}/#organization`},
          },
        ],
      }),
    },
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `
        (function(w, d, s, l, i) {
          w[l] = w[l] || [];
          w[l].push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
          });
          var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != 'dataLayer' ? '&l=' + l : '';
          j.async = true;
          j.src =
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
          f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', '${GTM_CONTAINER_ID}');
      `,
    },
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `
        (function(h, o, t, j, a, r) {
          h.hj = h.hj || function() { (h.hj.q = h.hj.q || []).push(arguments); };
          h._hjSettings = {hjid: 1000689, hjsv: 6};
          a = o.getElementsByTagName('head')[0];
          r = o.createElement('script');
          r.async = 1;
          r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
          a.appendChild(r);
        })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
      `,
    },
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Content files stay `.md` but are compiled as MDX (MDX v3, strict parser), so the format is
  // set explicitly rather than 'detect'.
  markdown: {
    format: 'mdx',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      // 8 images referenced by the docs do not exist; they stay as written.
      onBrokenMarkdownImages: 'warn',
    },
  },

  plugins: [
    [
      '@signalwire/docusaurus-plugin-llms-txt',
      {
        content: {
          // Two pages link to the placeholder https://<APIM_HOST>:9443/devportal, which makes the
          // plugin skip their Markdown mirrors. See plugins/llms-txt-unparsable-links.mjs.
          beforeDefaultRehypePlugins: [rehypeReplaceUnparsableLinks],
        },
      },
    ],
    [
      require.resolve('docusaurus-lunr-search'),
      {
        excludeRoutes: [],
      },
    ],
    // The page that used to be served at /get-started/wso2-open-banking-accelerator/ is now the landing
    // page (slug: /). Keep the old URL working.
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [{from: '/get-started/wso2-open-banking-accelerator', to: '/'}],
      },
    ],
    gtmNoscriptPlugin,
    copyLinkedImagesPlugin,
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'en/docs',
          // The docs are the whole site: mount them at the base URL.
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          // Docusaurus appends the page's path relative to the site root (en/docs/...).
          editUrl: `${docsRepoUrl}/edit/${siteBranch.editBranch}/`,
        },
        blog: false,
        sitemap: {
          changefreq: null,
          priority: null,
          ignorePatterns: [`${baseUrl}search/**`],
        },
        theme: {
          // Order matters: site-theme.css layers the site theme over
          // custom.css and relies on loading second to win on equal
          // specificity. ob-content.css (page content styles) loads last.
          // Do not reorder.
          customCss: [
            './src/css/custom.css',
            './src/css/site-theme.css',
            './src/css/ob-content.css',
          ],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [
      {property: 'og:site_name', content: siteName},
      {property: 'og:type', content: 'website'},
      {name: 'description', content: siteDescription},
    ],

    algolia: {
      appId: 'F7OGP603KZ',
      apiKey: '97c88ae4377595fa7469504c35067f8f',
      indexName: 'wso2_ob',
      contextualSearch: false,
      searchParameters: {
        facetFilters: ['language:en', `version:${siteBranch.searchFacetVersion}`],
      },
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      // Brand = icon + "Open Banking Accelerator", rendered by src/theme/Navbar/Logo (it links to
      // the landing page). The "Documentation" item to its right also links to the landing page.
      logo: {
        alt: 'WSO2 Open Banking Accelerator',
        src: 'img/wso2-pulse.svg',
        srcDark: 'img/wso2-pulse-dark.svg',
        height: 32,
        width: 32,
      },
      items: [
        {
          to: '/',
          position: 'left',
          label: 'Documentation',
          className: 'ob-navbar-docs-link',
        },
        {
          // Custom item, see src/theme/NavbarItem/ObVersionDropdown.
          type: 'custom-obVersionDropdown',
          position: 'right',
          label: siteBranch.siteVersion,
        },
        {
          href: docsRepoUrl,
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      // Grey footer ('dark' style) with MkDocs's two-line text and no link columns.
      // `copyright` is rendered as HTML by Docusaurus; this is a static literal with no
      // interpolated or user-supplied content.
      style: 'dark',
      copyright:
        'WSO2 Open Banking Accelerator - Documentation<br />' +
        'Copyright © WSO2 LLC 2025 | Content licensed under CC By 4.0 | Sample code licensed under Apache 2.0',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

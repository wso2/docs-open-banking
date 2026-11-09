# WSO2 Open Banking Documentation - versions

This branch builds the "Versions" page of the WSO2 Open Banking documentation, which is published at
`https://ob.docs.wso2.com/en/versions/` (the "Show all" entry of the version dropdown), and the file the
dropdown of the documentation sites reads: `https://ob.docs.wso2.com/en/versions/assets/versions.json`.

The documentation itself is on the `master` branch (4.0.0, published at `/en/latest/` and `/en/4.0.0/`) and the
`3.0.0` branch (published at `/en/3.0.0/`). Versions older than 3.0.0 are not in this repository; they are linked to
their own pages from the Past Versions table.

## Prerequisites

The site is built with [Docusaurus](https://docusaurus.io/) 3. You need [Node.js](https://nodejs.org/) 20 or later and npm.

## Run project locally (Dev Mode)

```bash
$ git clone https://github.com/wso2/docs-open-banking.git
$ cd docs-open-banking && git checkout versions && npm ci
$ npm run start
```

The page is served at `http://localhost:3000/en/versions/`.

## Commands

| Command | What it does |
| :------ | :----------- |
| `npm run start` | Dev server with hot reload on port 3000. |
| `npm run build` | Production build into `build/`. `BASE_URL` selects where the site is mounted (default `/en/versions/`, must look like `/en/<name>/`). |
| `npm run typecheck` | TypeScript check (`tsc`). |
| `npm run audit` | Dependency security audit (`audit-ci`), also run in CI. |

## Search

The search box uses the Algolia index of the documentation (`wso2_ob`, filters `language:en` and `version:<searchFacetVersion>` from
`site.branch.json`). Its results are pages of the documentation sites, so they open with a full page load.

## Adding or changing a version

Edit `static/assets/versions.json`; it is the only place that lists versions. The same file is the data of the Versions page
(`src/pages/index.tsx`, built at publish time) and is published unchanged at `/en/versions/assets/versions.json`.

| Key | Meaning |
| :-- | :------ |
| `current` | The stable version: shown in the "Current version (Stable)" table. |
| `list` | The versions shown in the dropdown, in order. |
| `all` | For each version, `doc` (documentation) and `notes` (release notes). A relative value is published under `/en/` (for example `4.0.0` is `/en/4.0.0`); a value starting with `https://` or `http://` opens in a new tab. |
| `staging`, `latest`, and the version keys | Which branch each version is built from. They are not read by this site. |

Past Versions lists every key of `all` except `current` (and a `pre-release` key, if there is one), in the order of `all`.

## Deploy

Pushes to `versions` run `.github/workflows/deploy.yml`, which builds the site with `BASE_URL=/en/versions/` and publishes it to the
`gh-pages` branch folder `en/versions` using `JamesIves/github-pages-deploy-action`. The same workflow publishes the files in
`root-files/` (`.nojekyll`, the `/` redirect to `/en/latest/` and `404.html`) to the root of `gh-pages`. It can also be started manually
(`workflow_dispatch`). Pull requests against `versions` run `.github/workflows/pr-checks.yml`: `npm ci`, audit, typecheck and
build. Workflow actions are pinned by commit SHA.

## License

Licenses this source under the Apache License, Version 2.0 ([LICENSE](LICENSE)), You may not use this file except in compliance with the License.

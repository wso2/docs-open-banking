import React from 'react';
import Layout from '@theme/Layout';
import VersionsTables from '@site/src/components/VersionsTables';
// The same file is published at /en/versions/assets/versions.json, where the other documentation
// sites read it for their version dropdown, so there is a single source of truth.
import versions from '../../static/assets/versions.json';

export default function VersionsPage(): React.JSX.Element {
  return (
    <Layout title="Versions" description="Documentation versions of WSO2 Open Banking">
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <article className="markdown">
              <VersionsTables versions={versions} />
            </article>
          </div>
        </div>
      </main>
    </Layout>
  );
}

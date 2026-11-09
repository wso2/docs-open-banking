import React from 'react';
import {buildVersionRows, type VersionLink, type VersionRow} from './versionRows.mjs';

type Props = {
  /** The parsed `versions.json`, imported at build time. */
  versions: unknown;
};

/** `_blank` links get `rel` so the new page cannot reach back into this one. */
function linkProps(link: VersionLink) {
  return link.target === '_blank'
    ? {href: link.href, target: '_blank', rel: 'noopener noreferrer'}
    : {href: link.href, target: '_self'};
}

function Row({row}: {row: VersionRow}): React.JSX.Element {
  return (
    <tr>
      <th>{row.version}</th>
      <td>
        <a {...linkProps(row.doc)}>Documentation</a>
      </td>
      <td>
        <a {...linkProps(row.notes)}>Release Notes</a>
      </td>
    </tr>
  );
}

/**
 * The tables of the versions page ("Current version (Stable)" and, when there are older versions, "Past Versions"). The rows are
 * rendered at build time from versions.json, so the page works without JavaScript; the old MkDocs page
 * filled them in with a script.
 */
export default function VersionsTables({versions}: Props): React.JSX.Element {
  const {current, past} = buildVersionRows(versions);
  return (
    <>
      <h3 id="current-version-stable">Current version (Stable)</h3>
      <table>
        <tbody>{current !== null && <Row row={current} />}</tbody>
      </table>
      <p>This is the current stable version of the project.</p>
      <hr />
      {past.length > 0 && (
        <>
          <h3 id="past-versions">Past Versions</h3>
          <table>
            <tbody>
              {past.map((row) => (
                <Row key={row.version} row={row} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

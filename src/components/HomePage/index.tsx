import React from 'react';
import Link from '@docusaurus/Link';

/** Small inline icons (24x24, stroke based) so the home page needs no icon font. */
const ICONS: Record<string, React.ReactNode> = {
  timer: (
    <>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2.5 2.5M9 2h6" />
    </>
  ),
  consent: (
    <>
      <circle cx="9" cy="8" r="4" />
      <path d="M2 21v-1a6 6 0 0 1 6-6h2M16 19l2 2 4-4" />
    </>
  ),
  register: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  code: <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />,
  cap: (
    <>
      <path d="M22 10v6" />
      <path d="M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </>
  ),
  check: (
    <>
      <path d="M9 11l3 3 8-8" />
      <path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 15l4-4 3 3 5-6" />
    </>
  ),
  plug: (
    <>
      <path d="M9 2v6M15 2v6" />
      <path d="M6 8h12v4a6 6 0 0 1-12 0z" />
      <path d="M12 18v4" />
    </>
  ),
  book: (
    <>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </>
  ),
  download: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5M12 15V3" />
    </>
  ),
  flask: (
    <>
      <path d="M10 2v7.5a2 2 0 0 1-.2.9L4.7 20.5a1 1 0 0 0 .9 1.5h12.8a1 1 0 0 0 .9-1.5l-5.1-10.1a2 2 0 0 1-.2-.9V2" />
      <path d="M8.5 2h7M7 16h10" />
    </>
  ),
};

function Icon({name}: {name: string}) {
  return (
    <svg
      className="ob-home__icon-svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

/** A row of feature tiles; each tile links to a page. */
export function FeatureTiles({children}: {children: React.ReactNode}) {
  return <div className="ob-home__tiles">{children}</div>;
}

export function FeatureTile(props: {to: string; icon: string; title: string; hint: string}) {
  return (
    <Link to={props.to} className="ob-home__tile">
      <span className="ob-home__icon">
        <Icon name={props.icon} />
      </span>
      <span className="ob-home__tile-text">
        <span className="ob-home__tile-title">{props.title}</span>
        <span className="ob-home__tile-hint">{props.hint}</span>
      </span>
    </Link>
  );
}

/** Summary of one section of the documentation menu: title, one line, and links to its main pages. */
export function SectionSummary(props: {
  to: string;
  icon: string;
  title: string;
  description: string;
  links: {to: string; label: string}[];
}) {
  return (
    <section className="ob-home__section">
      <Link to={props.to} className="ob-home__section-header">
        <span className="ob-home__icon ob-home__icon--round">
          <Icon name={props.icon} />
        </span>
        <span className="ob-home__section-title">{props.title}</span>
      </Link>
      <p className="ob-home__section-description">{props.description}</p>
      <ul className="ob-home__section-links">
        {props.links.map((link) => (
          <li key={link.to}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SectionSummaries({children}: {children: React.ReactNode}) {
  return <div className="ob-home__sections">{children}</div>;
}

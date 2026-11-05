import React, {useEffect, useRef, useState} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useBaseUrl from '@docusaurus/useBaseUrl';

/** Only specs published under static/internal-apis/ may be rendered. */
const SPEC_PATH_PATTERN = /^\/internal-apis\/[\w.-]+\.ya?ml$/;

/** Where the self-hosted, pinned Redoc bundle is served from (see static/assets/lib/redoc/README.md). */
const REDOC_BUNDLE_PATH = '/assets/lib/redoc/redoc.standalone.js';

/** SRI hash of the pinned redoc@2.5.4 standalone bundle. Update together with the bundle. */
const REDOC_BUNDLE_INTEGRITY =
  'sha384-w447zOpYfw/1Tv/5AK9NfHTlQIqE3RVR6KY62jCyy9zNDgO64cMwGGP1Fj0zJVf5';

type RedocApi = {
  init: (
    specUrl: string,
    options: Record<string, unknown>,
    element: HTMLElement,
  ) => void;
  destroy?: (element: HTMLElement) => void;
};

declare global {
  interface Window {
    Redoc?: RedocApi;
  }
}

let bundleLoad: Promise<RedocApi> | undefined;

/**
 * Load the Redoc bundle once per page load, verified against its SRI hash.
 * A failed load is not cached, so a later mount can retry.
 *
 * @param bundleUrl Base-URL-prefixed URL of the bundle.
 * @returns The global Redoc API.
 */
function loadRedoc(bundleUrl: string): Promise<RedocApi> {
  if (window.Redoc) {
    return Promise.resolve(window.Redoc);
  }
  if (!bundleLoad) {
    bundleLoad = new Promise<RedocApi>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = bundleUrl;
      script.integrity = REDOC_BUNDLE_INTEGRITY;
      script.crossOrigin = 'anonymous';
      script.async = true;
      script.onload = () =>
        window.Redoc ? resolve(window.Redoc) : reject(new Error('Redoc bundle did not define window.Redoc'));
      script.onerror = () => reject(new Error('Redoc bundle failed to load'));
      document.head.appendChild(script);
    }).catch((error: Error) => {
      bundleLoad = undefined;
      throw error;
    });
  }
  return bundleLoad;
}

function RedocViewer({specPath}: {specPath: string}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const specUrl = useBaseUrl(specPath);
  const bundleUrl = useBaseUrl(REDOC_BUNDLE_PATH);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }
    let cancelled = false;
    loadRedoc(bundleUrl)
      .then((redoc) => {
        if (!cancelled) {
          redoc.init(specUrl, {scrollYOffset: '.navbar'}, container);
        }
      })
      .catch((error: Error) => {
        console.error(`RedocSpec: ${error.message}`);
        if (!cancelled) {
          setFailed(true);
        }
      });
    return () => {
      cancelled = true;
      window.Redoc?.destroy?.(container);
    };
  }, [bundleUrl, specUrl]);

  if (failed) {
    return <p role="alert">The API reference could not be loaded. Please try again later.</p>;
  }
  return <div ref={containerRef} />;
}

/**
 * Render an OpenAPI spec from `static/internal-apis/` with the self-hosted Redoc bundle.
 *
 * The server-rendered fallback is a loading placeholder, not documentation. `data-verify-ignore` marks it so
 * that tools comparing the rendered text of this site with another build can skip it.
 *
 * @param props.specPath Site-relative spec path, e.g. `/internal-apis/consent-internal.yaml`.
 */
export default function RedocSpec({specPath}: {specPath: string}) {
  if (!SPEC_PATH_PATTERN.test(specPath)) {
    throw new Error(`RedocSpec: specPath must match ${SPEC_PATH_PATTERN}, got "${specPath}"`);
  }
  return (
    <BrowserOnly fallback={<p data-verify-ignore>Loading the API reference...</p>}>
      {() => <RedocViewer specPath={specPath} />}
    </BrowserOnly>
  );
}

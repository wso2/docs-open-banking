# Redoc (self-hosted)

`redoc.standalone.js` is the unmodified standalone bundle of [Redoc](https://github.com/Redocly/redoc), loaded by `src/components/RedocSpec` to render the OpenAPI specs in `static/internal-apis/`.

| | |
|---|---|
| Version | 2.5.4 |
| Source | `bundles/redoc.standalone.js` in the npm tarball `redoc@2.5.4` (`npm pack redoc@2.5.4`) |
| Tarball integrity (sha512) | `sha512-M6jWhG1qoBnH6TFmzJnstyCZ87HmOY/UzDm78mHiYihEdlV/YcS9ogOo1NlElnJMeLsyxHFe2yFc4sNjHTrABQ==` |
| Bundle size | 1,103,471 bytes |
| Bundle SRI | `sha384-w447zOpYfw/1Tv/5AK9NfHTlQIqE3RVR6KY62jCyy9zNDgO64cMwGGP1Fj0zJVf5` |
| License | MIT; `LICENSE` holds Redoc's license and the notices bundled in the file |

The SRI value is also set in `src/components/RedocSpec/index.tsx`. To upgrade, fetch the new tarball, recompute the hash with
`openssl dgst -sha384 -binary redoc.standalone.js | openssl base64 -A`, and update this file, `LICENSE` and the component together.

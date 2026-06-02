/**
 * App version system — single source of truth for the version shown in the UI.
 *
 * - APP_VERSION comes from package.json (injected at build time by Vite).
 *   It can be overridden with the VITE_APP_VERSION env var if needed.
 * - BUILD_DATE is stamped automatically every time the bundle is built.
 *
 * Used by the always-visible <VersionBadge /> so every screen shows the
 * current release, e.g.  "V1.0.0 · BUILD 02 JUN 2026".
 */

const rawVersion =
  (import.meta.env.VITE_APP_VERSION as string | undefined) ||
  (typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '0.0.0');

const rawBuildDate =
  typeof __BUILD_DATE__ !== 'undefined' ? __BUILD_DATE__ : new Date().toISOString();

/** Bare semantic version, e.g. "1.0.0". */
export const APP_VERSION = rawVersion;

/** Version with the leading "V", e.g. "V1.0.0". */
export const APP_VERSION_LABEL = `V${rawVersion}`;

/** ISO timestamp of the build. */
export const BUILD_DATE_ISO = rawBuildDate;

/** Build date formatted like "02 JUN 2026" (uppercase, locale-independent). */
export const BUILD_DATE_LABEL = formatBuildDate(rawBuildDate);

/** Full label, e.g. "V1.0.0 · BUILD 02 JUN 2026". */
export const VERSION_LABEL = `${APP_VERSION_LABEL} · BUILD ${BUILD_DATE_LABEL}`;

function formatBuildDate(iso: string): string {
  const MONTHS = [
    'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN',
    'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC',
  ];
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const day = String(d.getDate()).padStart(2, '0');
  const month = MONTHS[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

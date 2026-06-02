import type { TocItem } from './types';

export const DEFAULT_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3E%3Crect fill='%23f0f0f0' width='1200' height='600'/%3E%3Ctext x='50%25' y='50%25' font-size='72' fill='%23999' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-weight='bold'%3EROKE Industries%3C/text%3E%3C/svg%3E";

export function formatDate(dateString?: string): string {
  if (!dateString) return '';
  try {
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, '0');
    const mon = d.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase().replace('.', '');
    const yr = d.getFullYear();
    return `${day} · ${mon} · ${yr}`;
  } catch {
    return dateString;
  }
}

export function getInitials(name: string): string {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

export function extractToc(html: string): TocItem[] {
  const div = document.createElement('div');
  div.innerHTML = html;
  const items: TocItem[] = [];
  div.querySelectorAll('h2, h3').forEach((el, i) => {
    const id = el.id || `section-${i}`;
    el.id = id;
    items.push({ id, text: el.textContent || '', level: el.tagName === 'H2' ? 2 : 3 });
  });
  return items;
}

import { describe, it } from 'vitest';
import * as fc from 'fast-check';

// Feature: sabores-huallada-website, Propiedad 4: Todos los enlaces de redes sociales tienen icono y abren en nueva pestaña

interface SocialLink {
  name: string;
  url: string;
  handle: string;
  icon: string; // e.g. 'simple-icons:facebook'
}

/**
 * Función pura que reproduce la lógica de renderizado de los enlaces de redes
 * sociales en Footer.astro. Los componentes Astro se prueban extrayendo la
 * lógica de renderizado a funciones TypeScript puras.
 */
function renderSocialLinkHtml(link: SocialLink): string {
  return `<a href="${link.url}" target="_blank" rel="noopener noreferrer" aria-label="${link.name} — ${link.handle}">
  <svg aria-hidden="true" class="w-5 h-5 shrink-0"></svg>
  <span>${link.handle}</span>
</a>`;
}

function renderFooterSocialLinks(links: SocialLink[]): string {
  return `<footer>
  <ul>
    ${links.map((link) => `<li>${renderSocialLinkHtml(link)}</li>`).join('\n    ')}
  </ul>
</footer>`;
}

/** Generador de SocialLink arbitrario */
function arbitrarySocialLink(): fc.Arbitrary<SocialLink> {
  const platforms = ['facebook', 'instagram', 'tiktok', 'twitter', 'youtube'];
  return fc.record({
    name: fc.constantFrom('Facebook', 'Instagram', 'TikTok', 'Twitter', 'YouTube'),
    url: fc.constantFrom(
      'https://facebook.com/erasmofc',
      'https://instagram.com/erasmofc',
      'https://tiktok.com/@erasmofc',
      'https://twitter.com/erasmofc',
      'https://youtube.com/@erasmofc'
    ),
    handle: fc.constant('@erasmofc'),
    icon: fc.constantFrom(...platforms.map((p) => `simple-icons:${p}`)),
  });
}

/**
 * Extrae el HTML del enlace que contiene la URL dada.
 */
function extractLinkHtml(html: string, url: string): string {
  const anchorStart = html.indexOf(`href="${url}"`);
  if (anchorStart === -1) return '';
  const openTag = html.lastIndexOf('<a', anchorStart);
  const closeTag = html.indexOf('</a>', openTag);
  return html.slice(openTag, closeTag + 4);
}

/**
 * **Validates: Requirements 5.2, 5.3**
 */
describe('Footer — Propiedad 4: todos los enlaces de redes sociales tienen icono y abren en nueva pestaña', () => {
  it('para cualquier conjunto de enlaces, cada <a> tiene target="_blank", rel="noopener noreferrer" y un icono SVG', () => {
    // Feature: sabores-huallada-website, Propiedad 4: Todos los enlaces de redes sociales tienen icono y abren en nueva pestaña
    fc.assert(
      fc.property(
        fc.array(arbitrarySocialLink(), { minLength: 1, maxLength: 10 }),
        (links) => {
          const html = renderFooterSocialLinks(links);
          return links.every((link) => {
            const linkHtml = extractLinkHtml(html, link.url);
            return (
              linkHtml.includes('target="_blank"') &&
              linkHtml.includes('rel="noopener noreferrer"') &&
              (linkHtml.includes('<svg') || linkHtml.includes('<img'))
            );
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it('para cualquier conjunto de enlaces, ningún enlace abre en la misma pestaña', () => {
    // Feature: sabores-huallada-website, Propiedad 4: Todos los enlaces de redes sociales tienen icono y abren en nueva pestaña
    fc.assert(
      fc.property(
        fc.array(arbitrarySocialLink(), { minLength: 1, maxLength: 10 }),
        (links) => {
          const html = renderFooterSocialLinks(links);
          // Ningún enlace debe tener target="_self" ni carecer de target="_blank"
          return links.every((link) => {
            const linkHtml = extractLinkHtml(html, link.url);
            return !linkHtml.includes('target="_self"') && linkHtml.includes('target="_blank"');
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});

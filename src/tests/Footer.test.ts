import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Lee el archivo completo del componente Footer
const raw = readFileSync(resolve('src/components/Footer.astro'), 'utf-8');
// Elimina el bloque frontmatter (--- ... ---) para obtener solo el template
const html = raw.replace(/^---[\s\S]*?---/, '');

describe('Footer.astro — prueba unitaria', () => {
  it('el frontmatter define "@erasmofc" como handle de las redes sociales', () => {
    // Req 5.1 — el valor "@erasmofc" está definido en los datos del componente
    expect(raw).toContain("'@erasmofc'");
  });

  it('el template renderiza el handle de cada enlace social dentro de <footer>', () => {
    // Req 5.4 — el template usa {link.handle} dentro del elemento <footer>
    const footerStart = html.indexOf('<footer');
    const footerEnd = html.indexOf('</footer>');
    expect(footerStart).toBeGreaterThanOrEqual(0);
    expect(footerEnd).toBeGreaterThan(footerStart);
    const footerContent = html.slice(footerStart, footerEnd + 9);
    expect(footerContent).toContain('{link.handle}');
  });

  it('los enlaces de redes sociales tienen target="_blank"', () => {
    // Req 5.3
    expect(html).toContain('target="_blank"');
  });

  it('los enlaces de redes sociales tienen rel="noopener noreferrer"', () => {
    // seguridad al abrir en nueva pestaña
    expect(html).toContain('rel="noopener noreferrer"');
  });
});

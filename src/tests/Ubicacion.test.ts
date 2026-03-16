import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Lee el HTML estático del componente Ubicacion (la parte de template, sin el frontmatter)
const raw = readFileSync(resolve('src/components/Ubicacion.astro'), 'utf-8');
// Elimina el bloque frontmatter (--- ... ---)
const html = raw.replace(/^---[\s\S]*?---/, '');

describe('Ubicacion.astro — prueba unitaria', () => {
  it('contiene la dirección textual "Centro de Pucallpa, Perú"', () => {
    // Req 4.1
    expect(html).toContain('Centro de Pucallpa, Perú');
  });

  it('incluye un iframe de Google Maps', () => {
    // Req 4.2
    expect(html).toContain('<iframe');
    expect(html).toContain('google.com/maps');
  });

  it('el enlace a Google Maps tiene target="_blank"', () => {
    // Req 4.3
    expect(html).toContain('target="_blank"');
  });

  it('el enlace a Google Maps tiene rel="noopener noreferrer"', () => {
    // Req 4.3 — seguridad al abrir en nueva pestaña
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it('el iframe tiene un título descriptivo para accesibilidad', () => {
    expect(html).toMatch(/title="[^"]+"/);
  });
});

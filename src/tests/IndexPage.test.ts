import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Lee los archivos fuente
const indexRaw = readFileSync(resolve('src/pages/index.astro'), 'utf-8');
const layoutRaw = readFileSync(resolve('src/layouts/Layout.astro'), 'utf-8');

// Elimina el bloque frontmatter (--- ... ---)
const indexHtml = indexRaw.replace(/^---[\s\S]*?---/, '');
const layoutHtml = layoutRaw.replace(/^---[\s\S]*?---/, '');

describe('Página principal (index.astro) — prueba de integración SEO', () => {
  // Req 8.1 — <title> no vacío
  it('el layout contiene una etiqueta <title> enlazada a la prop title', () => {
    expect(layoutHtml).toMatch(/<title>[^<]+<\/title>/);
  });

  it('index.astro pasa un siteTitle no vacío al Layout', () => {
    // Verifica que la constante siteTitle tiene un valor asignado
    expect(indexRaw).toMatch(/const siteTitle\s*=\s*['"][^'"]+['"]/);
  });

  it('index.astro pasa title={siteTitle} al componente Layout', () => {
    expect(indexHtml).toContain('title={siteTitle}');
  });

  // Req 8.1 — <meta name="description"> no vacío
  it('el layout contiene <meta name="description"> enlazado a la prop description', () => {
    expect(layoutHtml).toMatch(/<meta\s+name="description"\s+content=\{description\}/);
  });

  it('index.astro pasa una siteDescription no vacía al Layout', () => {
    expect(indexRaw).toMatch(/const siteDescription\s*=\s*['"`][^'"`]+['"`]/);
  });

  it('index.astro pasa description={siteDescription} al componente Layout', () => {
    expect(indexHtml).toContain('description={siteDescription}');
  });

  // Req 8.2 — <html lang="es">
  it('el layout define <html lang="es">', () => {
    expect(layoutHtml).toContain('<html lang="es">');
  });
});

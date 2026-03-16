import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Lee el HTML estático del componente Navbar (la parte de template, sin el frontmatter)
const raw = readFileSync(resolve('src/components/Navbar.astro'), 'utf-8');
// Elimina el bloque frontmatter (--- ... ---)
const html = raw.replace(/^---[\s\S]*?---/, '');

describe('Navbar.astro — prueba unitaria', () => {
  it('contiene enlace a #menu', () => {
    expect(html).toContain('href="#menu"');
  });

  it('contiene enlace a #horarios', () => {
    expect(html).toContain('href="#horarios"');
  });

  it('contiene enlace a #ubicacion', () => {
    expect(html).toContain('href="#ubicacion"');
  });

  it('contiene enlace a #contacto', () => {
    expect(html).toContain('href="#contacto"');
  });

  it('contiene el botón hamburguesa', () => {
    expect(html).toContain('id="hamburger-btn"');
  });

  it('el botón hamburguesa tiene aria-label descriptivo', () => {
    expect(html).toMatch(/aria-label="[^"]+"/);
  });
});

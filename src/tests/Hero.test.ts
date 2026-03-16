import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Lee el HTML estático del componente Hero (la parte de template, sin el frontmatter)
const raw = readFileSync(resolve('src/components/Hero.astro'), 'utf-8');
// Elimina el bloque frontmatter (--- ... ---)
const html = raw.replace(/^---[\s\S]*?---/, '');

describe('Hero.astro — prueba unitaria', () => {
  it('renderiza el título del restaurante (prop title)', () => {
    // El template usa {title}, que en producción se reemplaza con "Sabores Huallada de Perú"
    expect(html).toContain('{title}');
  });

  it('el template incluye la prop title en el h1', () => {
    expect(html).toMatch(/<h1[^>]*>\s*\{title\}\s*<\/h1>/);
  });

  it('la imagen tiene el atributo alt enlazado a la prop imageAlt (no vacío en template)', () => {
    // Verifica que alt está vinculado a la prop imageAlt, no a una cadena vacía
    expect(html).toContain('alt={imageAlt}');
    expect(html).not.toContain('alt=""');
  });

  it('la imagen usa el componente Image de Astro para optimización', () => {
    expect(html).toContain('<Image');
  });

  it('la imagen tiene loading="eager" para el hero principal', () => {
    expect(html).toContain('loading="eager"');
  });
});

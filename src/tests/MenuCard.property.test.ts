import { describe, it } from 'vitest';
import * as fc from 'fast-check';

// Feature: sabores-huallada-website, Propiedad 1: Cada plato del menú tiene imagen, nombre y descripción renderizados

interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  imageSrc: string;
  imageAlt: string;
  price?: string;
}

/**
 * Función pura que reproduce la lógica de renderizado de MenuCard.astro.
 * Los componentes Astro se prueban extrayendo la lógica de renderizado a
 * funciones TypeScript puras cuando sea posible.
 */
function renderMenuCardHtml(item: MenuItem): string {
  const PLACEHOLDER = '/images/menu/placeholder.webp';
  const resolvedSrc = item.imageSrc?.trim() ? item.imageSrc : PLACEHOLDER;

  return `<article>
  <img src="${resolvedSrc}" alt="${item.imageAlt}" width="400" height="300" loading="lazy" />
  <span>${item.category}</span>
  <h3>${item.name}</h3>
  <p>${item.description}</p>
  ${item.price ? `<p>${item.price}</p>` : ''}
</article>`;
}

/** Generador de MenuItem arbitrario con datos realistas */
function arbitraryMenuItem(): fc.Arbitrary<MenuItem> {
  return fc.record({
    id: fc.stringMatching(/^[a-z][a-z0-9-]{0,30}$/),
    name: fc.string({ minLength: 1, maxLength: 80 }),
    description: fc.string({ minLength: 1, maxLength: 200 }),
    category: fc.constantFrom('entradas', 'principales', 'bebidas', 'postres'),
    imageSrc: fc.oneof(
      fc.constant('/images/menu/placeholder.webp'),
      fc.stringMatching(/^\/images\/menu\/[a-z0-9-]+\.webp$/)
    ),
    imageAlt: fc.stringMatching(/^[^"<>][^"<>]{0,118}[^"<>]$/).filter(s => s.trim().length > 0),
    price: fc.option(fc.stringMatching(/^S\/ \d+$/), { nil: undefined }),
  });
}

/**
 * Función pura que reproduce la lógica de renderizado de MenuGrid.astro.
 * Renderiza múltiples MenuCards concatenados.
 */
function renderMenuGrid(items: MenuItem[]): string {
  return items.map(renderMenuCardHtml).join('\n');
}

/**
 * **Validates: Requirements 2.2, 2.3**
 */
describe('MenuCard — Propiedad 1: imagen, nombre y descripción renderizados', () => {
  it('para cualquier plato, el HTML renderizado contiene su nombre, descripción e imageSrc', () => {
    // Feature: sabores-huallada-website, Propiedad 1: Cada plato del menú tiene imagen, nombre y descripción renderizados
    fc.assert(
      fc.property(
        arbitraryMenuItem(),
        (item) => {
          const html = renderMenuCardHtml(item);
          return (
            html.includes(item.name) &&
            html.includes(item.description) &&
            html.includes(item.imageSrc)
          );
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * **Validates: Requirements 8.3, 2.4**
 */
describe('MenuCard — Propiedad 3: todas las imágenes tienen atributo alt no vacío', () => {
  it('para cualquier conjunto de platos, cada <img> renderizado tiene alt presente y no vacío', () => {
    // Feature: sabores-huallada-website, Propiedad 3: Todas las imágenes tienen atributo alt no vacío
    fc.assert(
      fc.property(
        fc.array(arbitraryMenuItem(), { minLength: 1 }),
        (items) => {
          const html = renderMenuGrid(items);
          const imgMatches = [...html.matchAll(/<img[^>]+>/g)];
          return imgMatches.every(([tag]) => {
            const altMatch = tag.match(/alt="([^"]*)"/);
            return altMatch !== null && altMatch[1].trim().length > 0;
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});

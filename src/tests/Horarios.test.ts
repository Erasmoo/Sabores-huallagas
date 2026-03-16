import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Lee el HTML estático del componente Horarios (la parte de template, sin el frontmatter)
const raw = readFileSync(resolve('src/components/Horarios.astro'), 'utf-8');
// Elimina el bloque frontmatter (--- ... ---)
const html = raw.replace(/^---[\s\S]*?---/, '');

describe('Horarios.astro — prueba unitaria', () => {
  it('contiene "Lunes" en el HTML', () => {
    expect(html).toContain('Lunes');
  });

  it('contiene "Viernes" en el HTML', () => {
    expect(html).toContain('Viernes');
  });

  it('contiene el horario de inicio del primer turno: 7:00 AM', () => {
    expect(html).toContain('7:00 AM');
  });

  it('contiene el horario de fin del primer turno: 12:00 PM', () => {
    expect(html).toContain('12:00 PM');
  });

  it('contiene el horario de inicio del segundo turno: 1:30 PM', () => {
    expect(html).toContain('1:30 PM');
  });

  it('contiene el horario de fin del segundo turno: 10:00 PM', () => {
    expect(html).toContain('10:00 PM');
  });
});

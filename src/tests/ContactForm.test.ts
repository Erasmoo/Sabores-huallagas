import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Lee el HTML estático del componente ContactForm (la parte de template, sin el frontmatter)
const raw = readFileSync(resolve('src/components/ContactForm.astro'), 'utf-8');
// Elimina el bloque frontmatter (--- ... ---)
const html = raw.replace(/^---[\s\S]*?---/, '');

describe('ContactForm.astro — prueba unitaria', () => {
  // Req 6.1 — El formulario contiene los campos requeridos
  it('contiene un input para nombre', () => {
    expect(html).toContain('id="nombre"');
    expect(html).toContain('name="nombre"');
  });

  it('contiene un input para correo electrónico (email)', () => {
    expect(html).toContain('id="correo"');
    expect(html).toContain('type="email"');
  });

  it('contiene un input para asunto', () => {
    expect(html).toContain('id="asunto"');
    expect(html).toContain('name="asunto"');
  });

  it('contiene un textarea para mensaje', () => {
    expect(html).toContain('<textarea');
    expect(html).toContain('id="mensaje"');
    expect(html).toContain('name="mensaje"');
  });

  it('contiene un botón de envío', () => {
    expect(html).toContain('type="submit"');
    expect(html).toContain('Enviar mensaje');
  });

  // Req 6.5 — El mensaje de confirmación existe en el HTML (oculto por defecto)
  it('contiene el elemento de mensaje de confirmación con id "form-success"', () => {
    expect(html).toContain('id="form-success"');
  });

  it('el mensaje de confirmación contiene el texto de éxito', () => {
    expect(html).toContain('¡Mensaje enviado!');
  });

  it('el mensaje de confirmación está oculto por defecto (clase hidden)', () => {
    // El div#form-success debe tener la clase "hidden" en el HTML inicial
    expect(html).toMatch(/id="form-success"[^>]*class="[^"]*hidden/);
  });

  it('el mensaje de confirmación tiene role="alert" para accesibilidad', () => {
    expect(html).toContain('role="alert"');
  });

  it('el formulario tiene id "contact-form"', () => {
    expect(html).toContain('id="contact-form"');
  });
});

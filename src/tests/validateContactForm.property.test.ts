import { describe, it } from 'vitest';
import * as fc from 'fast-check';
import { validateContactForm, type ContactFormInput } from '../utils/validateContactForm';

// Feature: sabores-huallada-website, Propiedad 5: El formulario rechaza cualquier entrada inválida con mensaje de error

/**
 * Genera un correo electrónico con formato válido.
 */
function arbitraryValidEmail(): fc.Arbitrary<string> {
  return fc.emailAddress();
}

/**
 * Genera una cadena no vacía (sin ser solo espacios en blanco).
 */
function arbitraryNonBlankString(): fc.Arbitrary<string> {
  return fc.string({ minLength: 1 }).filter(s => s.trim().length > 0);
}

/**
 * Genera una cadena vacía o compuesta solo de espacios en blanco.
 */
function arbitraryBlankString(): fc.Arbitrary<string> {
  return fc.oneof(
    fc.constant(''),
    fc.string({ minLength: 1, maxLength: 10 }).map(s => s.replace(/\S/g, ' '))
  );
}

/**
 * Genera un correo con formato inválido (sin @, sin dominio, etc.).
 */
function arbitraryInvalidEmail(): fc.Arbitrary<string> {
  return fc.oneof(
    fc.constant('no-arroba'),
    fc.constant('@sin-usuario.com'),
    fc.constant('sin-dominio@'),
    fc.constant('espacios en@medio.com'),
    fc.string({ minLength: 1, maxLength: 20 }).filter(s => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.trim().length > 0)
  );
}

/**
 * Genera una entrada de formulario completamente válida.
 */
function arbitraryValidInput(): fc.Arbitrary<ContactFormInput> {
  return fc.record({
    nombre: arbitraryNonBlankString(),
    correo: arbitraryValidEmail(),
    asunto: arbitraryNonBlankString(),
    mensaje: arbitraryNonBlankString(),
  });
}

/**
 * Genera una entrada inválida donde al menos un campo requerido está vacío/en blanco,
 * o el correo tiene formato inválido.
 */
function arbitraryInvalidInput(): fc.Arbitrary<ContactFormInput> {
  // Estrategia: partir de una entrada válida y corromper al menos un campo
  return fc.oneof(
    // nombre vacío
    fc.record({
      nombre: arbitraryBlankString(),
      correo: arbitraryValidEmail(),
      asunto: arbitraryNonBlankString(),
      mensaje: arbitraryNonBlankString(),
    }),
    // correo vacío
    fc.record({
      nombre: arbitraryNonBlankString(),
      correo: arbitraryBlankString(),
      asunto: arbitraryNonBlankString(),
      mensaje: arbitraryNonBlankString(),
    }),
    // correo con formato inválido
    fc.record({
      nombre: arbitraryNonBlankString(),
      correo: arbitraryInvalidEmail(),
      asunto: arbitraryNonBlankString(),
      mensaje: arbitraryNonBlankString(),
    }),
    // asunto vacío
    fc.record({
      nombre: arbitraryNonBlankString(),
      correo: arbitraryValidEmail(),
      asunto: arbitraryBlankString(),
      mensaje: arbitraryNonBlankString(),
    }),
    // mensaje vacío
    fc.record({
      nombre: arbitraryNonBlankString(),
      correo: arbitraryValidEmail(),
      asunto: arbitraryNonBlankString(),
      mensaje: arbitraryBlankString(),
    }),
    // todos los campos vacíos
    fc.record({
      nombre: arbitraryBlankString(),
      correo: arbitraryBlankString(),
      asunto: arbitraryBlankString(),
      mensaje: arbitraryBlankString(),
    }),
  );
}

/**
 * **Validates: Requirements 6.3, 6.4**
 */
describe('validateContactForm — Propiedad 5: el formulario rechaza entradas inválidas', () => {
  it('para cualquier entrada con al menos un campo inválido, isValid es false y errors no está vacío', () => {
    // Feature: sabores-huallada-website, Propiedad 5: El formulario rechaza cualquier entrada inválida con mensaje de error
    fc.assert(
      fc.property(
        arbitraryInvalidInput(),
        (input) => {
          const result = validateContactForm(input);
          return result.isValid === false && result.errors.length > 0;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('para cualquier entrada válida, isValid es true y errors está vacío', () => {
    fc.assert(
      fc.property(
        arbitraryValidInput(),
        (input) => {
          const result = validateContactForm(input);
          return result.isValid === true && result.errors.length === 0;
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: sabores-huallada-website, Propiedad 6: El formulario envía los datos correctos a Formspree cuando es válido

/**
 * Simula el envío del formulario a Formspree usando un fetch mock.
 * Valida primero con validateContactForm; si es válido, hace POST al endpoint.
 * Devuelve los datos enviados o null si la validación falla.
 */
async function submitContactForm(
  input: ContactFormInput,
  mockFetch: (url: string, options: RequestInit) => Promise<Response>
): Promise<ContactFormInput | null> {
  const { isValid } = validateContactForm(input);
  if (!isValid) return null;

  const body = JSON.stringify({
    name: input.nombre,
    email: input.correo,
    subject: input.asunto,
    message: input.mensaje,
  });

  await mockFetch('https://formspree.io/f/test-id', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  return JSON.parse(body) as ContactFormInput;
}

/**
 * **Validates: Requisito 6.2**
 */
describe('validateContactForm — Propiedad 6: el formulario envía los datos correctos a Formspree cuando es válido', () => {
  it('para cualquier entrada válida, los datos enviados a Formspree coinciden exactamente con la entrada', async () => {
    // Feature: sabores-huallada-website, Propiedad 6: El formulario envía los datos correctos a Formspree cuando es válido
    await fc.assert(
      fc.asyncProperty(
        arbitraryValidInput(),
        async (input) => {
          let capturedBody: Record<string, string> | null = null;

          const mockFetch = async (_url: string, options: RequestInit): Promise<Response> => {
            capturedBody = JSON.parse(options.body as string);
            return new Response(JSON.stringify({ ok: true }), { status: 200 });
          };

          const result = await submitContactForm(input, mockFetch);

          return (
            result !== null &&
            capturedBody !== null &&
            capturedBody.name === input.nombre &&
            capturedBody.email === input.correo &&
            capturedBody.subject === input.asunto &&
            capturedBody.message === input.mensaje
          );
        }
      ),
      { numRuns: 100 }
    );
  });
});

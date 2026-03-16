export interface ContactFormInput {
  nombre: string;
  correo: string;
  asunto: string;
  mensaje: string;
}

export interface ContactFormResult {
  isValid: boolean;
  errors: string[];
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(input: ContactFormInput): ContactFormResult {
  const errors: string[] = [];

  if (!input.nombre || input.nombre.trim().length === 0) {
    errors.push("El nombre es obligatorio.");
  }

  if (!input.correo || input.correo.trim().length === 0) {
    errors.push("El correo electrónico es obligatorio.");
  } else if (!EMAIL_REGEX.test(input.correo.trim())) {
    errors.push("El formato del correo electrónico es incorrecto.");
  }

  if (!input.asunto || input.asunto.trim().length === 0) {
    errors.push("El asunto es obligatorio.");
  }

  if (!input.mensaje || input.mensaje.trim().length === 0) {
    errors.push("El mensaje es obligatorio.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

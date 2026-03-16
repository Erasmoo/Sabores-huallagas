# Plan de Implementación: Sabores Huallada de Perú — Sitio Web

## Visión General

Implementación del sitio web estático del restaurante usando Astro 6, Tailwind CSS, Formspree para el formulario de contacto y astro-icon para los iconos de redes sociales. El menú se gestiona mediante un archivo `menu.json` y los componentes se renderizan en tiempo de compilación (SSG).

## Tareas

- [~] 1. Configurar el proyecto base
  - Instalar dependencias: `@astrojs/tailwind`, `tailwindcss`, `astro-icon`, `@iconify-json/simple-icons`, `vitest`, `fast-check`
  - Crear `tailwind.config.mjs` con la paleta de colores personalizada (`peru-red`, `jungle-green`, `gold`, `cream`, `dark`) y las fuentes Playfair Display e Inter
  - Actualizar `astro.config.mjs` para integrar Tailwind y habilitar View Transitions
  - Crear `src/styles/global.css` con los estilos base y la importación de fuentes
  - _Requisitos: 7.1, 7.2, 7.3, 8.4_

- [~] 2. Crear el layout base y la página principal
  - [~] 2.1 Implementar `src/layouts/Layout.astro`
    - Recibir props `title` y `description`
    - Incluir `<html lang="es">`, metaetiquetas de título, descripción y og:title / og:description
    - Importar estilos globales y fuentes
    - _Requisitos: 8.1, 8.2_
  - [x] 2.2 Implementar `src/pages/index.astro`
    - Usar `Layout.astro` con título y descripción del restaurante
    - Incluir todos los componentes de sección en orden
    - _Requisitos: 1.1, 1.2_

- [x] 3. Implementar el componente Navbar
  - [x] 3.1 Crear `src/components/Navbar.astro`
    - Barra de navegación fija con enlaces a `#menu`, `#horarios`, `#ubicacion`, `#contacto`
    - Botón hamburguesa visible en móvil con toggle mediante `<script>` inline y atributo `data-open`
    - Menú desplegable en móvil, horizontal en escritorio (Tailwind responsive)
    - _Requisitos: 1.4, 7.4_
  - [x] 3.2 Escribir prueba unitaria para Navbar
    - Verificar que el HTML contiene los cuatro enlaces: `#menu`, `#horarios`, `#ubicacion`, `#contacto`
    - Verificar que el botón hamburguesa existe en el HTML
    - _Requisitos: 1.4, 7.4_

- [x] 4. Implementar el componente Hero
  - [-] 4.1 Crear `src/components/Hero.astro`
    - Recibir props `title`, `subtitle`, `imageSrc`, `imageAlt`
    - Mostrar nombre del restaurante, descripción breve e imagen de fondo optimizada con `<Image />`
    - Asegurar que el atributo `alt` de la imagen sea descriptivo y no vacío
    - _Requisitos: 1.1, 1.2, 1.3, 8.3_
  - [x] 4.2 Escribir prueba unitaria para Hero
    - Verificar que el HTML contiene "Sabores Huallada de Perú"
    - Verificar que la imagen tiene atributo `alt` no vacío
    - _Requisitos: 1.1, 1.3, 8.3_

- [-] 5. Crear el modelo de datos del menú e implementar MenuCard
  - [x] 5.1 Crear `src/data/menu.json`
    - Definir la estructura con `categories` e `items` según la interfaz `MenuData`
    - Incluir al menos 4 platos de ejemplo (uno por categoría: entradas, principales, bebidas, postres)
    - Referenciar imágenes en `public/images/menu/`
    - _Requisitos: 2.1, 2.5_
  - [x] 5.2 Crear `public/images/menu/placeholder.webp`
    - Imagen de reemplazo para platos sin foto disponible
    - _Requisito: 2.4_
  - [x] 5.3 Implementar `src/components/MenuCard.astro`
    - Recibir props `name`, `description`, `category`, `imageSrc`, `imageAlt`, `price?`
    - Usar `<Image />` de Astro para optimización automática (WebP, lazy loading)
    - Mostrar imagen, nombre, descripción y precio (si existe)
    - Usar `placeholder.webp` como fallback si la imagen no existe
    - _Requisitos: 2.2, 2.3, 2.4, 8.3_
  - [x] 5.4 Escribir prueba de propiedad para MenuCard (Propiedad 1)
    - **Propiedad 1: Cada plato del menú tiene imagen, nombre y descripción renderizados**
    - **Valida: Requisitos 2.2, 2.3**
  - [x] 5.5 Escribir prueba de propiedad para atributos alt (Propiedad 3)
    - **Propiedad 3: Todas las imágenes tienen atributo `alt` no vacío**
    - **Valida: Requisitos 8.3, 2.4**

- [-] 6. Implementar MenuGrid
  - [x] 6.1 Crear `src/components/MenuGrid.astro`
    - Importar `menu.json` y agrupar platos por categoría según el orden de `categories`
    - Renderizar un encabezado por categoría y un `<MenuCard>` por cada plato
    - Aplicar grid responsivo con Tailwind
    - _Requisitos: 2.1, 2.5_
  - [x] 6.2 Escribir prueba de propiedad para MenuGrid (Propiedad 2)
    - **Propiedad 2: Los platos se agrupan correctamente por categoría**
    - **Valida: Requisito 2.5**

- [x] 7. Punto de control — Verificar menú y estructura base
  - Asegurar que todas las pruebas pasan, consultar al usuario si surgen dudas.

- [~] 8. Implementar sección de Horarios
  - [x] 8.1 Crear `src/components/Horarios.astro`
    - Mostrar días de atención: Lunes a Viernes
    - Mostrar primer turno: 7:00 AM a 12:00 PM
    - Mostrar segundo turno: 1:30 PM a 10:00 PM
    - Diferenciar visualmente los dos turnos (color, separador o tarjeta distinta)
    - _Requisitos: 3.1, 3.2, 3.3, 3.4_
  - [x] 8.2 Escribir prueba unitaria para Horarios
    - Verificar que el HTML contiene "Lunes", "Viernes", "7:00 AM", "12:00 PM", "1:30 PM", "10:00 PM"
    - _Requisitos: 3.1, 3.2, 3.3_

- [x] 9. Implementar sección de Ubicación
  - [x] 9.1 Crear `src/components/Ubicacion.astro`
    - Mostrar dirección textual: "Centro de Pucallpa, Perú"
    - Incluir `<iframe>` de Google Maps con la ubicación del restaurante
    - El enlace/mapa debe tener `target="_blank"` y `rel="noopener noreferrer"`
    - _Requisitos: 4.1, 4.2, 4.3_
  - [x] 9.2 Escribir prueba unitaria para Ubicacion
    - Verificar que el HTML contiene "Centro de Pucallpa, Perú"
    - Verificar que el iframe o enlace del mapa tiene `target="_blank"`
    - _Requisitos: 4.1, 4.3_

- [-] 10. Implementar la lógica de validación del formulario de contacto
  - [x] 10.1 Crear `src/utils/validateContactForm.ts`
    - Exportar función pura `validateContactForm(input)` que retorna `{ isValid, errors }`
    - Validar que nombre, correo, asunto y mensaje no estén vacíos ni sean solo espacios
    - Validar formato de correo electrónico con expresión regular
    - _Requisitos: 6.3, 6.4_
  - [x] 10.2 Escribir prueba de propiedad para validación (Propiedad 5)
    - **Propiedad 5: El formulario rechaza cualquier entrada inválida con mensaje de error**
    - **Valida: Requisitos 6.3, 6.4**
  - [x] 10.3 Escribir prueba de propiedad para envío válido (Propiedad 6)
    - **Propiedad 6: El formulario envía los datos correctos a Formspree cuando es válido**
    - **Valida: Requisito 6.2**

- [~] 11. Implementar el componente ContactForm
  - [x] 11.1 Crear `src/components/ContactForm.astro`
    - Campos: nombre, correo electrónico, asunto y textarea de mensaje
    - Usar `validateContactForm` para validación antes del envío
    - Enviar datos a Formspree mediante `fetch` con `POST`
    - Mostrar mensajes de error inline bajo cada campo inválido
    - Mostrar mensaje de confirmación tras envío exitoso: "¡Mensaje enviado! Te contactaremos pronto."
    - Mostrar mensaje de error general ante fallo de red o error de Formspree
    - _Requisitos: 6.1, 6.2, 6.3, 6.4, 6.5_
  - [x] 11.2 Escribir prueba unitaria para ContactForm
    - Verificar que el formulario contiene inputs para nombre, email, asunto y textarea para mensaje
    - Verificar que tras un envío exitoso (mock de Formspree) aparece el mensaje de confirmación
    - _Requisitos: 6.1, 6.5_

- [-] 12. Implementar el Footer con redes sociales
  - [x] 12.1 Crear `src/components/Footer.astro`
    - Mostrar enlaces a redes sociales con handle `@erasmofc` usando `astro-icon` + Simple Icons
    - Cada enlace debe tener `target="_blank"` y `rel="noopener noreferrer"`
    - Incluir información de contacto y copyright
    - _Requisitos: 5.1, 5.2, 5.3, 5.4_
  - [x] 12.2 Escribir prueba de propiedad para Footer (Propiedad 4)
    - **Propiedad 4: Todos los enlaces de redes sociales tienen icono y abren en nueva pestaña**
    - **Valida: Requisitos 5.2, 5.3**
  - [x] 12.3 Escribir prueba unitaria para Footer
    - Verificar que los enlaces de redes sociales contienen "@erasmofc"
    - Verificar que los iconos de redes sociales están dentro del elemento `<footer>`
    - _Requisitos: 5.1, 5.4_

- [-] 13. Integrar todos los componentes en la página principal
  - [x] 13.1 Actualizar `src/pages/index.astro`
    - Importar y componer: `Navbar`, `Hero`, `MenuGrid`, `Horarios`, `Ubicacion`, `ContactForm`, `Footer`
    - Asignar `id` a cada sección: `menu`, `horarios`, `ubicacion`, `contacto`
    - Pasar las props correctas a `Hero` (título, subtítulo, imagen hero)
    - _Requisitos: 1.1, 1.2, 1.3, 1.4_
  - [x] 13.2 Escribir prueba unitaria de integración para la página principal
    - Verificar que el `<head>` contiene `<title>` y `<meta name="description">` no vacíos
    - Verificar que `<html>` tiene `lang="es"`
    - _Requisitos: 8.1, 8.2_

- [x] 14. Punto de control final — Verificar que todas las pruebas pasan
  - Asegurar que todas las pruebas pasan, consultar al usuario si surgen dudas.

## Notas

- Las tareas marcadas con `*` son opcionales y pueden omitirse para un MVP más rápido
- Cada tarea referencia requisitos específicos para trazabilidad
- Las pruebas de propiedad usan `fast-check` con mínimo 100 iteraciones por propiedad
- Las pruebas unitarias usan `vitest` con `@astrojs/test-utils`
- La lógica de validación del formulario se extrae a `src/utils/validateContactForm.ts` para facilitar las pruebas sin DOM
- El endpoint de Formspree (`{form_id}`) debe reemplazarse con el ID real del formulario creado en formspree.io

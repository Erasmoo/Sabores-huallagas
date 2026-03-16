# Documento de Requisitos

## Introducción

Este documento describe los requisitos para el sitio web del restaurante **Sabores Huallada de Perú**, ubicado en el Centro de Pucallpa, Perú. El sitio será construido desde cero usando Astro y servirá como presencia digital del restaurante, permitiendo a los clientes conocer el menú, los horarios, la ubicación y contactar al establecimiento.

---

## Glosario

- **Sitio**: El sitio web de Sabores Huallada de Perú.
- **Visitante**: Cualquier persona que accede al sitio web.
- **Menú**: Listado de platos ofrecidos por el restaurante, con fotos y descripciones.
- **Formulario_de_Contacto**: Componente del sitio que permite al visitante enviar un mensaje al restaurante.
- **Notificación**: Correo electrónico o alerta enviada al administrador del restaurante cuando se recibe un mensaje.
- **Sección_Redes_Sociales**: Área del sitio que muestra los enlaces a las redes sociales del restaurante.
- **Sección_Horarios**: Área del sitio que muestra los días y horas de atención.
- **Sección_Ubicación**: Área del sitio que muestra la dirección del restaurante.

---

## Requisitos

### Requisito 1: Página de inicio

**Historia de usuario:** Como visitante, quiero ver una página de inicio atractiva del restaurante, para conocer rápidamente de qué trata el negocio.

#### Criterios de Aceptación

1. THE Sitio SHALL mostrar el nombre "Sabores Huallada de Perú" de forma prominente en la página de inicio.
2. THE Sitio SHALL mostrar una descripción breve del restaurante en la página de inicio.
3. THE Sitio SHALL incluir una imagen o elemento visual representativo del restaurante en la sección principal (hero).
4. THE Sitio SHALL incluir una barra de navegación con enlaces a las secciones: Menú, Horarios, Ubicación y Contacto.

---

### Requisito 2: Menú con fotos

**Historia de usuario:** Como visitante, quiero ver el menú del restaurante con fotos de los platos, para decidir qué pedir antes de ir.

#### Criterios de Aceptación

1. THE Sitio SHALL mostrar una sección de Menú con los platos disponibles del restaurante.
2. WHEN el visitante accede a la sección de Menú, THE Sitio SHALL mostrar al menos una fotografía por cada plato listado.
3. THE Sitio SHALL mostrar el nombre y una descripción breve de cada plato junto a su fotografía.
4. IF una imagen de un plato no puede cargarse, THEN THE Sitio SHALL mostrar una imagen de reemplazo (placeholder) con texto alternativo descriptivo.
5. THE Menú SHALL organizar los platos en categorías (por ejemplo: entradas, platos principales, bebidas, postres).

---

### Requisito 3: Horarios de atención

**Historia de usuario:** Como visitante, quiero conocer los horarios de atención del restaurante, para planificar mi visita.

#### Criterios de Aceptación

1. THE Sección_Horarios SHALL mostrar los días de atención: Lunes a Viernes.
2. THE Sección_Horarios SHALL mostrar el primer turno de atención: 7:00 AM a 12:00 PM.
3. THE Sección_Horarios SHALL mostrar el segundo turno de atención: 1:30 PM a 10:00 PM.
4. THE Sección_Horarios SHALL diferenciar visualmente los dos turnos de atención del mismo día.

---

### Requisito 4: Ubicación del restaurante

**Historia de usuario:** Como visitante, quiero saber dónde está ubicado el restaurante, para poder llegar fácilmente.

#### Criterios de Aceptación

1. THE Sección_Ubicación SHALL mostrar la dirección textual del restaurante: Centro de Pucallpa, Perú.
2. THE Sección_Ubicación SHALL incluir un mapa embebido o enlace a Google Maps con la ubicación del restaurante.
3. WHEN el visitante hace clic en el enlace o mapa, THE Sitio SHALL abrir la ubicación en una nueva pestaña del navegador.

---

### Requisito 5: Redes sociales

**Historia de usuario:** Como visitante, quiero acceder a las redes sociales del restaurante, para seguir sus novedades y publicaciones.

#### Criterios de Aceptación

1. THE Sección_Redes_Sociales SHALL mostrar enlaces a las redes sociales del restaurante con el handle @erasmofc.
2. THE Sección_Redes_Sociales SHALL incluir iconos reconocibles para cada red social enlazada.
3. WHEN el visitante hace clic en un enlace de red social, THE Sitio SHALL abrir el perfil correspondiente en una nueva pestaña del navegador.
4. THE Sección_Redes_Sociales SHALL estar visible en el pie de página (footer) del sitio.

---

### Requisito 6: Formulario de contacto

**Historia de usuario:** Como visitante, quiero enviar un mensaje al restaurante desde el sitio web, para hacer consultas o reservas.

#### Criterios de Aceptación

1. THE Formulario_de_Contacto SHALL incluir los campos: nombre, correo electrónico, asunto y mensaje.
2. WHEN el visitante envía el formulario con todos los campos requeridos completos, THE Formulario_de_Contacto SHALL enviar una Notificación al administrador del restaurante.
3. IF el visitante intenta enviar el formulario con campos requeridos vacíos, THEN THE Formulario_de_Contacto SHALL mostrar mensajes de error indicando qué campos son obligatorios.
4. IF el visitante ingresa un formato de correo electrónico inválido, THEN THE Formulario_de_Contacto SHALL mostrar un mensaje de error indicando que el formato del correo es incorrecto.
5. WHEN el formulario es enviado exitosamente, THE Formulario_de_Contacto SHALL mostrar un mensaje de confirmación al visitante.
6. THE Notificación SHALL ser enviada al correo electrónico del administrador del restaurante.

---

### Requisito 7: Diseño responsivo

**Historia de usuario:** Como visitante que accede desde un dispositivo móvil, quiero que el sitio se vea correctamente en mi pantalla, para tener una buena experiencia de navegación.

#### Criterios de Aceptación

1. THE Sitio SHALL adaptar su diseño y contenido a pantallas de ancho mínimo de 320px (móvil).
2. THE Sitio SHALL adaptar su diseño y contenido a pantallas de ancho mínimo de 768px (tablet).
3. THE Sitio SHALL adaptar su diseño y contenido a pantallas de ancho mínimo de 1024px (escritorio).
4. WHILE el visitante navega desde un dispositivo móvil, THE Sitio SHALL mostrar un menú de navegación colapsable (hamburger menu).

---

### Requisito 8: Rendimiento y SEO básico

**Historia de usuario:** Como dueño del restaurante, quiero que el sitio sea encontrado fácilmente en buscadores, para atraer más clientes.

#### Criterios de Aceptación

1. THE Sitio SHALL incluir metaetiquetas de título y descripción en cada página.
2. THE Sitio SHALL incluir el atributo `lang="es"` en el elemento HTML raíz.
3. THE Sitio SHALL incluir texto alternativo (`alt`) descriptivo en todas las imágenes.
4. THE Sitio SHALL cargar la página de inicio en menos de 3 segundos en una conexión de banda ancha estándar.

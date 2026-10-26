# Técnico Electricista · Tucumán

Sitio de servicios de electricidad e instalación y reparación de aire acondicionado en San Miguel de Tucumán y Yerba Buena.

- Web: https://tuwebentresdias.github.io/tecnico-electricista/
- HTML, CSS y JavaScript nativos. Sin paquetes, backend ni configuración de credenciales.
- Base: `sitios-web/rubros/demo-electricista`, adaptada con identidad, contacto, horarios y cobertura del negocio.
- El formulario prepara un mensaje y abre WhatsApp para que el visitante lo revise y lo envíe. No simula confirmaciones de entrega ni almacena datos.
- Llamadas, enlaces de WhatsApp y ubicación disponibles sin JavaScript. El formulario sin JavaScript abre una consulta genérica; los detalles pueden escribirse en el chat.
- Fotografías ilustrativas mediante hotlinks de Unsplash y tipografías del sistema; no se incorporan dependencias ni copias locales de las fotos. Los SVG locales sirven como alternativa si las fotos no cargan.
- Fondos de color, tarjetas elevadas y animaciones nativas. El control «Pausar animaciones» y `prefers-reduced-motion` permiten desactivar el movimiento; el contenido no depende de las animaciones para ser visible.

## Archivos

`index.html`: contenido, contacto, formulario y datos estructurados. `styles.css`: estilos base. `custom.css`: adaptación responsive y accesibilidad. `script.js`: navegación móvil y preparación de consultas. `images/`: recursos SVG locales.

## Publicación

GitHub Pages desde la rama `main`, directorio raíz. `.nojekyll` mantiene la publicación estática.

## Fotografías y procedencia

Las fotos son de referencia: no representan al titular, su equipo ni trabajos realizados por él. Se sirven desde el CDN externo `images.unsplash.com`, que recibe las solicitudes del navegador; su disponibilidad depende de Unsplash. Las imágenes llevan `referrerpolicy="no-referrer"`.

- Electricidad: [Electrician testing electrical panel with multimeter — Toolmash Expo / Unsplash](https://unsplash.com/photos/electrician-testing-electrical-panel-with-multimeter-PkHf7BUWbtk).
- Aire acondicionado: [A white air conditioner sitting on the side of a building — Michal Balog / Unsplash](https://unsplash.com/photos/a-white-air-conditioner-sitting-on-the-side-of-a-building-I_v6T6k4Xxk).
- [Licencia de Unsplash](https://unsplash.com/license): permite uso personal y comercial; las imágenes se integran al diseño y no se redistribuyen como stock ni se presentan como respaldo del fotógrafo al servicio.

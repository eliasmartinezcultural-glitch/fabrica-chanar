# Fábrica Chañar — V4.4 BLOQUEADA

## Estado
**BASE ESTABLE BLOQUEADA**

La versión V4.4 queda establecida como base de construcción. No se debe agregar otra arquitectura de producción encima de ella.

## Regla arquitectónica
> **Un solo motor de producción + capas editoriales y de interfaz.**

Motor único:
- `v3-production.js`

Capas permitidas:
- `v3-photo-registry.js` — registro territorial de fotografías.
- `smart-editorial.js` — contenido editorial, fuentes y restricciones visuales.
- `smart-collection.js` — colección finita de 40 piezas curadas.
- `index.html` — interfaz y estilos de la aplicación.

## Lo que queda bloqueado
- 4 familias: Postales, Fichas culturales, Guías breves, Infografías.
- 14 plantillas maestras internas.
- 40 opciones curadas: 10 por familia.
- Formatos automáticos: 1080×1350, 1200×1200, 1600×1000 y A5.
- Flujo: elegir → revisar → aportar foto propia → fabricar.
- San Patricio del Chañar como territorio obligatorio.
- Foto propia/local como vía comercial principal.
- Fotos de referencia sin derechos comerciales no pueden guardarse como producción comercial.
- Biblioteca local limitada a 30 piezas.
- Exportación raster mediante el motor existente y salida A5 mediante impresión.

## Correcciones V4.4
- Se eliminó la lógica de una segunda capa de runtime: `smart-editorial.js` ahora es exclusivamente una capa editorial/estabilidad.
- Se fijaron límites de texto para evitar desbordes.
- Se fijaron áreas seguras para títulos, bajadas, cuerpo y sellos.
- Se corrigieron restricciones de ancho en columnas, tarjetas, botones, controles y fuentes.
- Se reforzó el comportamiento responsive.
- Se aisló visualmente la pieza para impedir que elementos externos invadan el render.
- Se limitó el sello de las tarjetas curadas para evitar superposición con títulos.
- Las fuentes editoriales quedan fuera de la pieza y no pueden invadir el escenario.

## No hacer sobre esta base
- No crear otro motor de producción.
- No crear otra biblioteca paralela.
- No agregar un segundo sistema de plantillas.
- No duplicar el formulario o el escenario.
- No sumar opciones infinitas de diseño.
- No declarar 40/160 pruebas visuales como aprobadas sin navegador real.

## Criterio para la próxima etapa
La próxima intervención debe ser **verificación real**, no expansión:
1. cargar la aplicación;
2. comprobar ausencia de solapamientos;
3. seleccionar una opción de cada familia;
4. comprobar cambio de foto, contenido y plantilla;
5. comprobar fabricación PNG/JPG/A5;
6. comprobar bloqueo comercial de fotografías sin derechos;
7. comprobar foto propia;
8. comprobar biblioteca;
9. repetir hasta cubrir las 40 piezas curadas cuando exista navegador automatizado disponible.

## Commit de bloqueo
`25dd7e4330cca94a0bafd1fa15c85b3cd93eed5c`

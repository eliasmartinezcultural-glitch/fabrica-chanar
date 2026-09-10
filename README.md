# Fábrica Chañar

Herramienta digital independiente para transformar información documentada sobre San Patricio del Chañar en piezas digitales e imprimibles.

## Principios

- Proyecto independiente.
- Browser-first: no requiere instalación.
- Sin cuenta para fabricar piezas.
- Generación local siempre que sea posible.
- No inventar datos.
- Cada dato sensible debe poder vincularse con una fuente.
- Tecnologías web abiertas y livianas.
- Diseño adaptable a Android, iPhone, tablet, notebook y PC.

## Motor actual

La primera versión funcional permite crear:

- Postales
- Fichas locales
- Guías
- Infografías
- Mapas esquemáticos

Incluye vista previa, carga local de imágenes, exportación PNG/JPG, impresión/PDF mediante el navegador y biblioteca local con `localStorage`.

## Arquitectura prevista

```text
index.html      interfaz
style.css       sistema visual
app.js          motor de fabricación
data/           información territorial y fuentes
templates/      modelos de piezas
assets/         recursos propios y autorizados
docs/           documentación técnica/editorial
```

## Cartografía

Las futuras capas cartográficas deberán respetar las licencias y atribuciones correspondientes. Los mapas esquemáticos de la versión inicial no deben utilizarse como navegación ni como sustituto de cartografía oficial.

## Publicación

El proyecto está preparado para GitHub Pages porque es una aplicación estática. La configuración de publicación puede hacerse desde **Settings → Pages** seleccionando la rama `main` y la carpeta raíz.

## Próximas fases

1. Motor de plantillas P/M/F/G/A.
2. Base documental territorial.
3. Fuentes y estados de verificación.
4. Cartografía real con atribución.
5. Compartir piezas mediante enlaces sin servidor.
6. Exportación PDF más controlada.
7. Biblioteca de plantillas y colecciones.
8. QA móvil/PC y pruebas de impresión.

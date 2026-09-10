# Fábrica Chañar

Sistema interno de producción digital de Ocarina Producciones para transformar información documentada sobre San Patricio del Chañar en productos digitales e imprimibles.

## Ley mundial del repositorio

- **Uso interno Ocarina:** no es una plataforma pública ni un editor para terceros.
- **Browser-first:** funciona prioritariamente desde el navegador.
- **Núcleo gratuito:** evitar servicios pagos, APIs pagas y dependencias innecesarias.
- **No inventar datos:** fechas, nombres, coordenadas, estadísticas, direcciones, teléfonos y horarios deben tener respaldo o quedar marcados como no verificados.
- **Trazabilidad:** cada producto debe poder conservar su fuente y procedencia.
- **Reutilización:** una investigación debe poder alimentar múltiples productos.
- **Modularidad:** cada versión conserva lo que funciona y agrega una capacidad concreta.
- **Producto terminado:** el objetivo es producir piezas listas para entregar, archivar o publicar.

## v0.2.2 — Producción rápida

La fábrica incorpora un primer motor de automatización productiva:

- panel explícito de **USO INTERNO**;
- biblioteca local de producción ampliada hasta 100 piezas;
- generación de una **colección** a partir del contenido de una pieza base;
- transformación controlada hacia Postal, Ficha, Guía e Infografía;
- conservación de fuente e imagen cuando existen;
- identificación de piezas generadas por lote;
- estado documental visible;
- continuidad de PNG, JPG, impresión/PDF y enlaces compartibles.

La automatización reutiliza información existente; no genera hechos nuevos ni inventa datos territoriales.

## Arquitectura actual

```text
index.html          interfaz interna
style.css           sistema visual base
automation.css      estilos del módulo productivo
app.js              motor de fabricación
data/               base territorial y documental
templates/          modelos de piezas
assets/             recursos propios y autorizados
docs/               documentación futura
```

## Motor actual

- Postales P01–P05
- Mapas M01–M05 (actualmente esquemáticos)
- Fichas F01–F05
- Guías G01–G05
- Archivos A01–A05
- Vista previa local
- Imágenes cargadas localmente
- PNG/JPG
- Impresión / guardado como PDF desde el navegador
- Biblioteca local con `localStorage`
- Enlaces de piezas mediante hash sin servidor
- Producción rápida de colecciones

## Cartografía

Los mapas esquemáticos iniciales **no son navegación ni cartografía oficial**. Las futuras capas reales deberán incorporar datos verificados, procedencia y las atribuciones/licencias correspondientes.

## Seguridad y privacidad

No se solicitan contraseñas ni datos privados innecesarios. Las imágenes seleccionadas desde el equipo se procesan localmente en el navegador.

## Camino maestro

```text
INVESTIGACIÓN
      ↓
FUENTES
      ↓
BANCO CHAÑAR
      ↓
PLANTILLA
      ↓
MOTOR VISUAL
      ↓
PRODUCCIÓN RÁPIDA
      ↓
PRODUCTO
      ↓
PDF / JPG / PNG / SVG / HTML
      ↓
BIBLIOTECA OCARINA
```

## Próxima prioridad

La siguiente etapa debe fortalecer la automatización con **Banco Chañar + Fuentes Chañar**, de modo que las colecciones se generen desde registros territoriales estructurados y no solamente desde el formulario manual. Después se profundizará la cartografía real y el exportador documental.

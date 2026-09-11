# Fábrica Chañar

Sistema **interno de producción territorial de Ocarina Producciones** para investigar, organizar, preservar y transformar información documentada sobre San Patricio del Chañar en activos y productos digitales.

## Ley mundial

- **Uso interno Ocarina:** no es plataforma pública ni editor para terceros.
- **No inventar:** hechos, fechas, coordenadas, direcciones, teléfonos, horarios y estadísticas necesitan respaldo o estado explícito.
- **Trazabilidad:** fuente, autoría, licencia/condición de uso y procedencia deben conservarse cuando corresponda.
- **Reutilización:** un registro territorial puede alimentar múltiples productos.
- **Browser-first:** el núcleo funciona en navegador y evita backend obligatorio.
- **Sin destrucción silenciosa:** cada salto conserva las capacidades útiles anteriores.

## v6.0 x10 — Memoria + activos + procedencia

La v6 conserva la fábrica v5 y agrega una capa de control documental para que la información territorial y los recursos multimedia no se mezclen sin trazabilidad.

```text
INVESTIGAR
    ↓
REGISTRAR FUENTE
    ↓
CLASIFICAR DERECHOS
    ↓
ACTIVO MULTIMEDIA
    ↓
REGISTRO / ATLAS
    ↓
PRODUCTO
    ↓
AUDITORÍA
```

### Capacidades nuevas

- carga automática al abrir de `data/chanar-core.json` y `data/sources.json`;
- banco multimedia independiente del catálogo de productos;
- registro de fotografía, mapa, documento, audio y video;
- autor/propietario, licencia, URL de origen, atribución y permisos de modificación/comerciales;
- estados `reutilizable`, `referencia` y `pendiente`;
- auditoría previa de activos marcados como reutilizables;
- exportación del manifiesto v6 como JSON;
- documentación específica de procedencia y derechos;
- conservación de Atlas, GeoJSON, biblioteca y producción rápida de v5.

### Regla crítica

**Disponible públicamente ≠ libre de reutilizar.**

Si no existe licencia clara o autorización suficiente, el material se conserva como `referencia` o `pendiente` y no debe incorporarse automáticamente a un producto comercial.

## Núcleo de datos

- `data/chanar-core.json`: registros territoriales documentados.
- `data/sources.json`: fuentes y procedencia de los registros.
- `data/media-manifest.json`: esquema persistente del banco multimedia.
- `data/map-layers.json`: registro de capas cartográficas y su procedencia.
- `data/README-v6.md`: reglas de memoria, medios y cartografía.

## Arquitectura

```text
index.html          cabina interna
style.css           sistema visual base
automation.css      producción rápida
v5.css              dashboard, activos, proyectos y atlas
v6.css              banco multimedia y auditoría
app.js              motor de producción v5
v6.js               capa documental v6

data/
  chanar-core.json
  sources.json
  media-manifest.json
  map-layers.json
  registros.json    (si existe en el repositorio)

templates/          modelos de piezas
assets/              recursos propios/autorizados
docs/                documentación
```

## Flujo productivo

```text
IMPORTAR / INVESTIGAR
        ↓
REGISTRAR FUENTE
        ↓
ORDENAR ACTIVO
        ↓
VERIFICAR DERECHOS
        ↓
UBICAR EN ATLAS
        ↓
FABRICAR
        ↓
AUDITAR
        ↓
EXPORTAR
        ↓
ARCHIVAR
```

## Estado real de la v6

La v6 implementa el banco y la trazabilidad en navegador. Todavía no descarga automáticamente fotografías ni documentos externos, ni presume que una fuente pública permita reutilización. Los archivos binarios se incorporarán en futuras etapas solo cuando su procedencia y condiciones de uso estén documentadas.

El siguiente salto fuerte es convertir el Atlas en un sistema de **capas editables y exportables**, vincular cada geometría con su fuente y construir el mecanismo de **un registro → postal + ficha + mapa + guía + archivo**, con auditoría de derechos antes de exportar.

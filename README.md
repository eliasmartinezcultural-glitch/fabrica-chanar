# Fábrica Chañar

Sistema **interno de producción territorial de Ocarina Producciones** para investigar, organizar, preservar y transformar información documentada sobre San Patricio del Chañar en activos y productos digitales.

## Ley mundial

- **Uso interno Ocarina:** no es plataforma pública ni editor para terceros.
- **No inventar:** hechos, fechas, coordenadas, direcciones, teléfonos, horarios y estadísticas necesitan respaldo o estado explícito.
- **Trazabilidad:** fuente, autoría, licencia/condición de uso y procedencia deben conservarse cuando corresponda.
- **Reutilización:** un registro territorial puede alimentar múltiples productos.
- **Browser-first:** el núcleo funciona en navegador y evita backend obligatorio.
- **Sin destrucción silenciosa:** cada salto conserva las capacidades útiles anteriores.

## v5.0 x10 — Sistema operativo territorial

Esta versión es un salto estructural: incorpora una cabina de control sobre cuatro capas conectadas:

```text
TERRITORIO
    ↓
MEMORIA
    ↓
ACTIVOS
    ↓
PRODUCTOS / PROYECTOS
```

### Capacidades nuevas

- tablero KPI de registros, activos, productos y oportunidades;
- memoria territorial local persistente en `localStorage`;
- importación de JSON y CSV desde el navegador;
- exportación de la memoria completa como JSON;
- constructor de proyectos internos;
- radar de oportunidades como hipótesis de investigación, no como datos de mercado inventados;
- Atlas territorial con Leaflet + OpenStreetMap;
- carga de GeoJSON y visualización de sus geometrías;
- popup de atributos territoriales;
- banco de activos conectado al fabricante de fichas;
- conservación de la biblioteca de productos existente;
- fabricación de postales, fichas, guías, infografías y mapas;
- exportación PNG/JPG e impresión/PDF desde navegador;
- sistema de fuente declarada y advertencia documental.

## Núcleo de datos

- `data/chanar-core.json`: estructura base del sistema territorial, deliberadamente sin hechos ficticios.
- `data/sources.json`: registro inicial de una fuente institucional oficial y su condición de uso.
- `data/registros.json`: índice histórico del Banco Chañar cuando esté presente.

La incorporación de material público **no significa automáticamente que sea reutilizable**. Para fotografías, mapas, textos y documentos se debe registrar propietario y licencia/condición de uso antes de convertirlos en producto.

## Atlas

El mapa utiliza OpenStreetMap como capa cartográfica y acepta GeoJSON cargado por el equipo. Las coordenadas del territorio no se inventan ni se generan por aproximación: deben entrar mediante datos documentados. La atribución de OpenStreetMap se mantiene visible en el mapa.

## Arquitectura

```text
index.html          cabina interna
style.css           sistema visual base
automation.css      producción rápida
v5.css              dashboard, activos, proyectos y atlas
app.js              motor operativo

data/
  chanar-core.json
  sources.json
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
UBICAR EN ATLAS
        ↓
FABRICAR
        ↓
REVISAR
        ↓
EXPORTAR
        ↓
ARCHIVAR
```

## Próximo gran salto

La siguiente generación x10 debe convertir el Atlas en un **sistema territorial de capas editables** y separar con mayor rigor tres almacenes: **datos estructurados, biblioteca multimedia y catálogo de productos**, incorporando además manifiestos de licencia y procedencia para cada recurso. Eso permitirá alimentar la fábrica con material real de San Patricio del Chañar sin confundir fuente, propiedad y permiso de reutilización.

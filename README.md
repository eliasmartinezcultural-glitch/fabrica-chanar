# Fábrica Chañar

Sistema **interno de producción territorial de Ocarina Producciones** para investigar, organizar, preservar y transformar información documentada sobre San Patricio del Chañar en activos y productos digitales.

## Ley mundial

- **Uso interno Ocarina:** no es plataforma pública ni editor para terceros.
- **No inventar:** hechos, fechas, coordenadas, direcciones, teléfonos, horarios y estadísticas necesitan respaldo o estado explícito.
- **Trazabilidad:** fuente, autoría, licencia/condición de uso y procedencia deben conservarse cuando corresponda.
- **Reutilización:** un registro territorial puede alimentar múltiples productos.
- **Browser-first:** el núcleo funciona en navegador y evita backend obligatorio.
- **Despliegue simple:** GitHub Pages es la ruta primaria; cada push a `main` intenta publicar el sitio estático mediante Actions.
- **Sin destrucción silenciosa:** cada salto conserva las capacidades útiles anteriores.

## v9.0 x10 — Operación productiva

La v9 cambia el centro de gravedad: **la fábrica empieza a administrar trabajo, no solamente contenido**. Sobre la línea v8 agrega órdenes productivas locales con destinatario, proyecto, registro, productos, estado y manifiesto exportable.

```text
REGISTRO → ORDEN → PRODUCCIÓN → CONTROL → PRODUCTO → ARCHIVO
```

### Capacidades nuevas

- tablero local de órdenes;
- creación de una orden desde cero o a partir del registro seleccionado en v8;
- destinatario/cliente y proyecto asociados a cada orden;
- selección de productos por orden: ficha, postal, guía, infografía y mapa;
- estados: Idea → Investigación → Lista para producir → En producción → Terminada;
- porcentaje de avance calculado por estado;
- manifiesto JSON de cada orden;
- estado de derechos conservado como pendiente hasta su verificación;
- almacenamiento local sin backend obligatorio;
- continuidad entre v8 y v9 sin eliminar el fabricante anterior.

## Despliegue

Ruta primaria:

`main → GitHub Actions → GitHub Pages → sitio estático`

URL:

`https://eliasmartinezcultural-glitch.github.io/fabrica-chanar/`

El pipeline de Pages ya fue verificado anteriormente como exitoso. Cada modificación posterior vuelve a generar una ejecución de Actions; el estado de cada nueva versión debe comprobarse antes de declararla desplegada.

## Núcleo de datos

- `data/chanar-core.json`: registros territoriales documentados.
- `data/sources.json`: fuentes y procedencia.
- `data/media-manifest.json`: derechos y procedencia multimedia.
- `data/map-layers.json`: capas cartográficas.
- `data/deployment-manifest.json`: ruta y estado de despliegue.

## Arquitectura

```text
index.html          cabina interna
style.css           sistema visual base
automation.css      producción rápida
v5.css              dashboard, activos, proyectos y atlas
v6.css              banco multimedia y auditoría
v7.css              puesta en marcha
v8.css              línea de producción
v9.css              tablero de órdenes
app.js              motor de fabricación
v6.js               memoria/procedencia
v7.js               readiness y despliegue
v8.js               registros y primera línea de producción
v9.js               órdenes productivas

.github/workflows/
  pages.yml         despliegue automático

data/
  chanar-core.json
  sources.json
  media-manifest.json
  map-layers.json
  deployment-manifest.json
```

## Flujo operativo actual

```text
ABRIR FÁBRICA
     ↓
CONTROL DE PUESTA EN MARCHA
     ↓
CARGA AUTOMÁTICA DE MEMORIA
     ↓
ELEGIR REGISTRO O CREAR ORDEN
     ↓
DEFINIR DESTINATARIO + PRODUCTOS
     ↓
INVESTIGAR / CARGAR FUENTES
     ↓
CARGAR FOTO PROPIA / ACTIVO CON DERECHOS
     ↓
FABRICAR
     ↓
AVANZAR ESTADO DE PRODUCCIÓN
     ↓
AUDITAR
     ↓
EXPORTAR MANIFIESTO / PRODUCTO
     ↓
ARCHIVAR
```

## Estado real

La fábrica ya tiene una ruta concreta para pasar de datos documentados a órdenes de trabajo y productos. Todavía no debe considerarse una línea comercial completa: faltan activos audiovisuales propios cargados, una auditoría más profunda de licencias por activo y persistencia fuera del navegador para trabajo multi-dispositivo.

La siguiente prioridad es **producir el primer encargo real**, medir el tiempo de fabricación y usar ese aprendizaje para construir la v10 alrededor de lo que realmente se repite, no alrededor de funciones decorativas.
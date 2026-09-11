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

## v8.0 x10 — Primera línea de producción real

La v8 cambia otra vez el centro de gravedad: **la fábrica ya no espera a estar completa para producir**. Toma automáticamente la memoria estructurada del repositorio, muestra una cola de registros documentados y permite convertir cada registro en una orden de producción.

```text
REGISTRO → FUENTE → ACTIVO → PRODUCTO → ARCHIVO
```

### Capacidades nuevas

- carga automática de `data/chanar-core.json`, `sources.json`, `media-manifest.json` y `map-layers.json`;
- sincronización inicial de los registros documentados con el banco de activos local;
- cola de producción real basada en registros existentes;
- botón **Producir** que lleva el registro al fabricante actual;
- incorporación local de fotografía propia de Ocarina;
- generación rápida de colección desde un registro;
- exportación de una **orden de producción JSON** con fuentes y control de derechos;
- separación explícita entre "derechos verificados" y "pendiente de verificación";
- nueva capa visual v8 sin eliminar v5/v6/v7.

## Despliegue verificado

Ruta:

`main → GitHub Actions → GitHub Pages → sitio estático`

URL:

`https://eliasmartinezcultural-glitch.github.io/fabrica-chanar/`

El workflow `Deploy Fábrica Chañar` fue ejecutado correctamente en GitHub Actions. El pipeline de Pages incluye checkout, configuración de Pages, carga del artefacto y despliegue mediante `actions/deploy-pages@v4`. El manifiesto `data/deployment-manifest.json` conserva el identificador de la ejecución verificada.

La aplicación sigue siendo una herramienta interna de Ocarina aunque técnicamente esté publicada en GitHub Pages.

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
app.js              motor de producción
v6.js               memoria/procedencia
v7.js               readiness y control operativo
v8.js               cola de producción y órdenes

.github/workflows/
  pages.yml         despliegue automático

data/
  chanar-core.json
  sources.json
  media-manifest.json
  map-layers.json
  deployment-manifest.json
```

## Flujo operativo desde ahora

```text
ABRIR FÁBRICA
     ↓
CONTROL DE PUESTA EN MARCHA
     ↓
CARGA AUTOMÁTICA DE MEMORIA
     ↓
ELEGIR REGISTRO
     ↓
ORDENAR PRODUCCIÓN
     ↓
CARGAR FOTO PROPIA / ACTIVO CON DERECHOS
     ↓
FABRICAR FICHA + POSTAL + GUÍA
     ↓
AUDITAR FUENTES Y DERECHOS
     ↓
EXPORTAR
     ↓
ARCHIVAR
```

## Estado real

La infraestructura ya está desplegada y el primer pipeline de Pages fue verificado como exitoso. La fábrica, sin embargo, todavía no debe considerarse una línea comercial completa: faltan activos audiovisuales propios cargados, auditoría de licencias por activo y un circuito persistente de pedidos/clientes.

La prioridad siguiente no es agregar pantallas por agregar. Es conseguir **el primer producto real terminado**, después la primera colección, y luego repetir el proceso hasta convertirlo en una capacidad productiva estable.

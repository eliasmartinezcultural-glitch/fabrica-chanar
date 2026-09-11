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

## v7.0 x10 — Puesta en marcha

La v7 cambia el foco: **menos laboratorio, más operación**. Conserva v5/v6 y agrega una capa de readiness y despliegue para poder empezar a usar la fábrica cuanto antes.

```text
DATOS → FUENTES → DERECHOS → ATLAS → PRODUCTO → CONTROL → DESPLIEGUE
```

### Capacidades nuevas

- checklist operativo de cinco controles;
- prueba automática de disponibilidad de los archivos críticos;
- comprobación de que el motor de exportación está presente;
- estado persistente del último control local;
- manifiesto de despliegue en `data/deployment-manifest.json`;
- workflow automático `.github/workflows/pages.yml` para GitHub Pages;
- interfaz preparada para trabajar como herramienta diaria, no solamente como demostrador.

## Despliegue

Ruta prevista:

`main → GitHub Actions → GitHub Pages → sitio estático`

URL prevista del proyecto:

`https://eliasmartinezcultural-glitch.github.io/fabrica-chanar/`

El repositorio ya tiene Pages habilitado a nivel de repositorio. La primera ejecución del workflow debe confirmarse en **Actions** antes de considerar el sitio públicamente desplegado. La aplicación sigue siendo una herramienta interna de Ocarina aunque técnicamente esté publicada en Pages.

## Núcleo de datos

- `data/chanar-core.json`: registros territoriales documentados.
- `data/sources.json`: fuentes y procedencia.
- `data/media-manifest.json`: derechos y procedencia multimedia.
- `data/map-layers.json`: capas cartográficas.
- `data/deployment-manifest.json`: ruta de despliegue.

## Arquitectura

```text
index.html          cabina interna
style.css           sistema visual base
automation.css      producción rápida
v5.css              dashboard, activos, proyectos y atlas
v6.css              banco multimedia y auditoría
v7.css              puesta en marcha
app.js              motor de producción
v6.js               memoria/procedencia
v7.js               readiness y control operativo

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
EJECUTAR CONTROL
     ↓
INVESTIGAR / CARGAR
     ↓
REGISTRAR FUENTE
     ↓
ORDENAR ACTIVO
     ↓
VERIFICAR DERECHOS
     ↓
FABRICAR
     ↓
AUDITAR
     ↓
EXPORTAR
     ↓
ARCHIVAR
```

## Estado real

La v7 **configura** el pipeline de GitHub Pages, pero no afirma que el primer despliegue haya terminado correctamente hasta comprobar una ejecución exitosa de Actions. No se incorporan servicios pagos ni backend obligatorio.

El próximo salto debe concentrarse en **hacer dinero/producción con la herramienta**, no en seguir agregando pantallas: carga rápida de datos reales, biblioteca propia de Ocarina, generación de colecciones y primeros productos comerciales verificables.

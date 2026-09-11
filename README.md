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

## v10.0 x10 — Control de entrega

La v10 agrega el último tramo necesario para acercarse a una operación real: **una orden no se considera terminada solamente porque exista una pieza**. Ahora tiene checklist, control de derechos, revisión visual, exportación de expediente y cierre condicionado.

```text
REGISTRO → ORDEN → PRODUCCIÓN → CONTROL → ENTREGA → ARCHIVO
```

### Capacidades nuevas

- expediente local de la orden activa;
- checklist de contenido, fuentes, derechos, formato, calidad y archivo;
- porcentaje de preparación para entrega;
- bloqueo del cierre mientras falten controles críticos;
- exportación de expediente JSON;
- conservación local del estado junto a la orden v9;
- carga automática de la capa v10 desde v9 para conservar compatibilidad;
- estilos v10 inyectados localmente para que la capa funcione incluso sin modificar el HTML principal.

## Despliegue

Ruta primaria:

`main → GitHub Actions → GitHub Pages → sitio estático`

URL:

`https://eliasmartinezcultural-glitch.github.io/fabrica-chanar/`

El run v10 se dispara automáticamente con cada push. El estado se conserva en `data/deployment-manifest.json` y debe comprobarse antes de declarar una versión desplegada.

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
v10.css             estilos de control de entrega
app.js              motor de fabricación
v6.js               memoria/procedencia
v7.js               readiness y despliegue
v8.js               registros y primera línea de producción
v9.js               órdenes productivas + activación v10
v10.js              control de entrega y expediente

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
ELEGIR REGISTRO
     ↓
CREAR ORDEN
     ↓
DEFINIR DESTINATARIO + PRODUCTOS
     ↓
INVESTIGAR / CARGAR FUENTES
     ↓
CARGAR FOTO PROPIA / ACTIVO CON DERECHOS
     ↓
FABRICAR
     ↓
REVISAR
     ↓
CONTROLAR DERECHOS Y FORMATO
     ↓
EXPORTAR
     ↓
ARCHIVAR
     ↓
CERRAR ORDEN
```

## Estado real

Fábrica Chañar ya tiene un circuito operativo completo a nivel de navegador: memoria territorial → registro → orden → fabricación → control → expediente. La persistencia sigue siendo local al navegador y todavía falta probar el ciclo con un encargo real y activos propios.

La prioridad siguiente es **hacer el primer ciclo completo con material real**, medir tiempos y convertir las tareas repetidas en automatizaciones. No agregar funciones por acumulación: cada nueva versión debe reducir trabajo, errores o tiempo de producción.
# Auditoría funcional V2 — Fábrica Chañar

Fecha: 2026-09-14  
Rama: `main`  

## Resultado ejecutivo

La consolidación anterior dejó `index.html` como runtime único visible y eliminó la dependencia de un segundo motor en la superficie activa. El flujo principal está correctamente representado en código: elegir producto → editar → seleccionar fotografía → aplicar dirección de arte → fabricar → guardar → recuperar → revisar/exportar.

Esta V2 es una **auditoría estática de código y arquitectura**. No se presenta como prueba E2E de navegador porque en esta sesión no se ejecutó un navegador automatizado contra GitHub Pages.

## Matriz

| Área | Estado | Hallazgo |
|---|---|---|
| 4 productos | OK | `postal`, `ficha`, `guide`, `infographic` tienen defaults y render común. |
| 40 fotografías | OK | El arreglo `PHOTOS` contiene 10 imágenes identificadas + 30 referencias. |
| Dirección de arte | OK | Cada foto tiene entrada `ART`; las referencias reciben configuración determinista. |
| Cambio de formato | OK | Vertical, cuadrada, horizontal y A5 cambian la clase de la pieza. |
| Edición | OK | Título, bajada, texto, categoría y formato sincronizan con el estado. |
| Guardado | OK | Usa `localStorage`, limita a 30 piezas y genera identificador. |
| Recuperación | OK | Biblioteca abre una pieza conservando producto, foto, formato y contenido. |
| Eliminación | OK | Biblioteca permite eliminar una pieza guardada. |
| Mesa de venta | OK | Lee la misma biblioteca y permite revisar piezas. |
| PNG/JPG | CONDICIONADO | Depende de `html2canvas` y de CORS/permisos de las imágenes externas. Hay manejo de error. |
| PDF | CONDICIONADO | Actualmente abre la impresión del navegador; no genera un PDF binario propio. |
| Persistencia | OK | La nueva clave `fabrica-chanar-v4` evita mezclar datos del runtime anterior. |
| XSS básico | OK | Títulos mostrados en Biblioteca/Mesa pasan por `escapeHtml`. |
| Arquitectura duplicada | OK en runtime | `index.html` no carga `app-core.js`; los archivos históricos quedan fuera del flujo visible. |

## Problemas encontrados que deben quedar como próxima intervención

### 1. Exportación: tamaño nominal vs tamaño real

Los formatos se presentan como 1080×1350, 1200×1200 y 1600×1000, pero `html2canvas` captura el tamaño CSS actual de la pieza y lo multiplica por `scale:2`. Por lo tanto, el archivo descargado no necesariamente tiene exactamente la resolución nominal indicada.

**Prioridad: alta.** La próxima versión debe renderizar a dimensiones de salida explícitas.

### 2. PDF / imprimir

El botón se denomina `PDF / imprimir`, pero la implementación solamente llama a `window.print()`. Es válido como flujo de impresión del navegador, pero no es una exportación PDF controlada por la Fábrica.

**Prioridad: media.** No conviene prometer “PDF generado” hasta implementar una salida específica o renombrar claramente el botón.

### 3. Edición en tiempo real

Actualmente los eventos de edición llaman a `render()`, que vuelve a construir productos y banco fotográfico además de actualizar la pieza. Funciona, pero es más pesado de lo necesario y puede provocar una experiencia menos estable al editar texto.

**Prioridad: media.** Separar `renderControls()` de `renderPreview()`.

### 4. Imágenes externas

El banco utiliza URLs externas. La propia interfaz ya advierte que las referencias deben verificarse antes del uso comercial. Además, la exportación puede fallar si un proveedor externo no permite CORS.

**Prioridad: alta para producción comercial.** La arquitectura definitiva debería permitir cargar/usar imágenes propias o activos con derechos documentados sin depender de terceros.

### 5. README desactualizado

El README todavía describe una arquitectura modular donde `app-core.js`, `factory-engine.js`, `localidad.js`, `atlas.js` y otros aparecen como cabina activa, mientras que el `index.html` actual ejecuta un runtime consolidado inline.

**Prioridad: alta.** La documentación debe volver a coincidir con el producto real.

## Criterio de cierre V2

No agregar nuevas funciones todavía. Primero deben cerrarse los tres puntos de producción:

1. salida con dimensiones exactas;
2. separación de render de edición y render estructural;
3. estrategia de imágenes propias/licenciadas y exportación confiable.

Después de eso corresponde una prueba manual E2E de los cuatro productos y de las 40 fotos en navegador.

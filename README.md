# Fábrica Chañar

Sistema **interno de producción digital de Ocarina Producciones** para transformar información documentada sobre San Patricio del Chañar en productos digitales e imprimibles.

## Ley mundial del repositorio

- **Uso interno Ocarina:** no es una plataforma pública ni un editor para terceros.
- **Browser-first:** funciona prioritariamente desde el navegador.
- **Núcleo gratuito:** evitar servicios pagos, APIs pagas y dependencias innecesarias.
- **No inventar datos:** fechas, nombres, coordenadas, estadísticas, direcciones, teléfonos y horarios deben tener respaldo o quedar marcados como no verificados.
- **Trazabilidad:** cada producto debe poder conservar su fuente y procedencia.
- **Reutilización:** una investigación debe poder alimentar múltiples productos.
- **Modularidad:** cada versión conserva lo que funciona y agrega una capacidad concreta.
- **Producto terminado:** el objetivo es producir piezas listas para entregar, archivar o publicar.
- **Sin destrucción silenciosa:** una mejora no debe romper ni eliminar capacidades existentes sin decisión explícita.

## v0.2.3 — Banco Chañar operativo

La fábrica incorpora el primer circuito estructurado entre datos territoriales y fabricación:

```text
FUENTE → REGISTRO → BANCO CHAÑAR → FABRICAR → PRODUCTO → BIBLIOTECA
```

Incluye:

- `data/registros.json` como índice principal del Banco Chañar;
- carga de registros, fuentes y categorías desde JSON;
- búsqueda y filtros por estado y tipo;
- estados documentales explícitos;
- botón **Fabricar desde registro**;
- prellenado de una ficha desde un registro seleccionado;
- conservación del ID del registro en la pieza y en la biblioteca;
- fuentes vinculadas visibles en el Banco;
- biblioteca local de hasta 100 piezas;
- generación por lote conservando el registro de origen;
- manejo de error si el navegador no puede cargar los datos;
- protección básica ante errores de almacenamiento local;
- corrección del control de fuente: una fuente escrita se considera **declarada**, no automáticamente verificada.

El Banco se entrega inicialmente vacío: no se cargan hechos territoriales inventados ni datos de prueba presentados como reales.

## Arquitectura actual

```text
index.html          interfaz interna
style.css           sistema visual base
automation.css      producción rápida + Banco Chañar
app.js              motor de fabricación y carga documental
data/               base territorial y documental
templates/          modelos de piezas (catálogo)
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
- Banco Chañar estructurado y filtrable

## Cartografía

Los mapas esquemáticos iniciales **no son navegación ni cartografía oficial**. Las futuras capas reales deberán incorporar datos verificados, procedencia y las atribuciones/licencias correspondientes.

## Seguridad y privacidad

No se solicitan contraseñas ni datos privados innecesarios. Las imágenes seleccionadas desde el equipo se procesan localmente en el navegador. El Banco territorial publicado en el repositorio debe contener únicamente información que Ocarina decida mantener en ese espacio.

## Camino maestro

```text
INVESTIGACIÓN
      ↓
FUENTES CHAÑAR
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

La siguiente etapa debe profundizar **Fuentes Chañar + validación documental** y después avanzar hacia **cartografía real verificable** y un **exportador documental más completo**, siempre conservando la arquitectura estática, gratuita, modular y auditable.
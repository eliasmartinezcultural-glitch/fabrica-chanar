# Fábrica Chañar

**Fábrica Chañar** es el taller digital interno de Ocarina Producciones para producir **piezas de Chañar**: recuerdos visuales, pequeñas piezas documentales, guías e infografías nacidas de San Patricio del Chañar.

## Idea central

> **No vendemos diseños en masa. Hacemos piezas de Chañar.**

La tecnología queda adentro. Afuera debe sentirse una pieza pensada, cuidada, local y guardable.

## Ley mundial

- **No inventar:** hechos, fechas, direcciones, horarios y estadísticas necesitan respaldo o estado explícito.
- **Trazabilidad:** conservar fuente, autoría, licencia/condición de uso y procedencia cuando corresponda.
- **Derechos:** las imágenes marcadas como `reference` sirven para referencia visual; no se presume permiso comercial.
- **Producción comercial:** priorizar foto propia de Ocarina, del cliente o un activo con derechos documentados.
- **Coleccionable con honestidad:** se pueden usar colección, procedencia, código de pieza y sello editorial; no se declara limitada, certificada, única u original sin una condición real que lo respalde.
- **Complejidad adentro:** la interfaz debe pedir la menor cantidad posible de decisiones.

## Experiencia activa

```text
ELEGIR → EDITAR → ENCUADRAR → FABRICAR → GUARDAR → EXPORTAR
```

Productos activos:

- **Postal:** recuerdo visual y turístico.
- **Ficha cultural:** pequeña pieza documental.
- **Guía breve:** acompañante de recorrido.
- **Infografía:** dato visual claro.

Cada pieza recibe automáticamente una familia visual, dirección de arte fotográfica, marca de taller y una frase cercana de Chañar.

## Arquitectura activa

`index.html` es el punto de entrada único y carga el runtime consolidado. `app-core.js` no es material histórico fuera del runtime: es el núcleo de estado, Biblioteca, edición y exportación utilizado por la superficie activa. El motor y los módulos especializados se enganchan sobre ese mismo estado.

```text
index.html
 ├─ interfaz central
 ├─ app-core.js · estado + Biblioteca + edición + exportación
 ├─ factory-engine.js · contrato de producto
 ├─ factory-material-selector.js · catálogo cerrado + materia + derechos
 ├─ factory-central.js · flujo único de fabricación
 ├─ factory-preview-audit.js · control de calidad
 ├─ factory-quality.js · salida y leyes editoriales
 ├─ factory-master-* · piezas maestras y foto dirigida
 ├─ factory-sales.js · mesa comercial
 └─ data/* · catálogo, realizaciones, materias, leyes e identidad Ocarina
```

Los módulos activos trabajan sobre **una sola cadena de producción**. No debe existir un segundo motor paralelo.

## Contrato cerrado

La Fábrica trabaja con **4 productos × 10 slots = 40 matrices editoriales**. El catálogo es finito y las realizaciones tienen materia, dirección, ejecución, fuente y procedencia asociadas.

La progresión de fabricación se conserva por producto dentro de `factoryMeta.closedCatalog`, y la Biblioteca conserva el `factoryMeta` completo al guardar y recuperar una pieza.

## Foto propia y derechos

La prioridad comercial es utilizar fotografías propias de Ocarina, del cliente o activos con derechos documentados. Las imágenes externas de referencia no deben interpretarse como material automáticamente autorizado para venta.

Una fotografía propia tiene prioridad sobre la materia fotográfica editorial del catálogo y no debe ser reemplazada al fabricar una pieza.

La exportación de imágenes externas puede depender de las políticas CORS del proveedor. Por eso la producción comercial definitiva debe favorecer activos controlados.

## Base congelada

Desde el **14 de septiembre de 2026** la arquitectura funcional consolidada queda documentada en `FACTORY-FREEZE.md`.

Ese documento funciona como contrato de continuidad: las piezas que ya funcionan no se reconstruyen ni se reemplazan por otra arquitectura sin una regresión demostrada o una necesidad concreta. Las futuras intervenciones deben partir de esa base y modificar el punto mínimo necesario.

## Despliegue

Ruta primaria del repositorio:

`main`

La integración Vercel fue comprobada con estado `success` en el commit `7a019bc72628423d6d3850428b6fd1166170cea5` durante esta auditoría.

No se declara una prueba E2E de navegador como realizada hasta ejecutarla realmente.

## Prioridad actual

**Cerrar el ciclo de producción antes de agregar funciones.**

Cada cambio debe hacer una de estas tres cosas:

1. mejorar la pieza;
2. reducir trabajo de Elías;
3. reducir errores o riesgos.

La auditoría funcional histórica queda documentada en `AUDITORIA-FUNCIONAL-V2.md`. La base consolidada y las reglas de continuidad quedan documentadas en `FACTORY-FREEZE.md`.

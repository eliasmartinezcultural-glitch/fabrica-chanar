# FÁBRICA CHAÑAR — BASE CONGELADA

Fecha de última consolidación: 2026-09-14

La arquitectura funcional consolidada queda congelada sobre una sola cadena de producción. No se reconstruye lo que funciona.

## Contrato

- 4 productos: `postal`, `ficha`, `guide`, `infographic`.
- 10 slots cerrados por producto = 40 matrices.
- `factoryMeta` es persistente y viaja con la pieza.
- La foto propia tiene prioridad.
- `reference` no implica autorización comercial.
- El consumo permanente vive en `fabrica-chanar-closed-ledger-v1`, independiente del límite visible de 18 piezas de Biblioteca.
- Las colecciones pasan por el mismo motor y selector cerrado.
- Una sola fabricación puede ejecutarse a la vez.
- Al agotarse los 10 slots de una familia, la familia se bloquea hasta una decisión explícita.
- `QA-GATE.md` define los gates que no deben romperse.

## Archivos congelados

`index.html` integra las versiones activas del runtime; `app-core.js` gestiona estado/Biblioteca/exportación; `factory-engine.js` define contratos; `factory-material-selector.js` controla catálogo, derechos, ledger y concurrencia; `factory-central.js` es el flujo único; `factory-collection.js` usa esa misma cadena.

## Zonas prohibidas

No crear otro runtime. No crear otra ruta de fabricación. No reabrir 4×10 sin decisión explícita. No eliminar `factoryMeta`. No convertir referencias en comerciales. No eliminar ledger o candado global. No agregar decoración antes de resolver QA funcional.

## Estado

La arquitectura está **cerrada para cambios estructurales**. La próxima fase es QA real en navegador de fabricación individual, consumo 1→10, agotamiento, persistencia, colecciones, concurrencia, derechos y exportación.

La prueba E2E no se declara realizada hasta ejecutarla realmente.

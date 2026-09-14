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
- El guardado se confirma antes de habilitar la siguiente fabricación central.
- Al agotarse los 10 slots de una familia, la familia se bloquea hasta una decisión explícita.
- `QA-GATE.md` define los gates que no deben romperse.

## Archivos canónicos congelados

| Archivo | Versión | SHA del contenido |
|---|---:|---|
| `index.html` | integración actual | `143d2c6822f7af860ed0e0bb49b4a210ed572b94` |
| `app-core.js` | runtime base + commit de slots al guardar | `58abebc10db012cf7e938a50bb4b949ac30866cc` |
| `factory-engine.js` | v7 | `30412e09fd5c7aed8989073a646e8f0a9ffa34ae` |
| `factory-central.js` | v12 | `b851a14222b71e07daaefeeca412e77c5a76c9d6` |
| `factory-material-selector.js` | v10 | `03475ffd1ea8e25624a63fedfa99723ec8c62ce5` |
| `factory-collection.js` | v6 | `907677b8e3d458b1d76abfc8d076e54aa5a076c1` |
| `factory-preview-audit.js` | v5 | `8f7325beb375f17237e66f780a427c0d724e4033` |
| `factory-quality.js` | v3 | `66753743fa69ec1b1b74b914e96d2538bffbe0cf` |
| `factory-image-resilience.js` | v2 | `06908a30984b09ef0d287121ed5bd993e2e0ff27` |
| `factory-master-photo-layer.js` | v5 | `47da585830eb6488958215a61e12bf2daa0632e0` |
| `factory-product-template.js` | v3 | `dd229760ba4f572122a73fedd519727fbdc02a14` |
| `factory-piece.js` | v3 | `0b3d567b62e1f3ff9974345ac5e5641d25f2a1a3` |
| `factory-master-products.js` | v8 | `488c83042a6ac54438dd4f840fec3925dc1f78dc` |
| `factory-master-visuals.js` | v4 | `661ddc3450407b7e45d7277f703570b51eecc10d` |
| `factory-sales.js` | v4 | `08aaf5db420fe3c2f98a690060d0df0261af631d` |
| `factory-art-direction.js` | v1 | `5f7d1eca157192bd1dea5bf6090a6be10f0ede6d` |
| `factory-curation.css` | activa | `62227562ce9888a9d779a308f94485b34fecf437` |
| `factory-final.css` | v3 | `e77c1151169bf4046f0021a0450c755ed162a565` |
| `data/factory-closed-catalog.js` | v2 | `de389bfb689ec79d34eba12ec6bf7b23bea6278a` |
| `data/editorial-realizations.js` | v1 | `e86027628fcf454cdd5d8082b30e599860060348` |
| `data/factory-raw-materials.js` | v2 | `78e167ffba957efd00e06df43a68aae2b9890cda` |
| `data/master-products.js` | v6 | `10aa9e6f31d8dc8f2f311b1c962d52de839f5d97` |
| `data/product-laws.js` | v1 | `d6e621107711f60a246eaed8d1d5d44018bb4065` |
| `data/ocarina-system.js` | v1 | `86824e6ce1fc810826a5e5bf5165188a878b6f4b` |
| `QA-GATE.md` | v1 | `db027faa72a062de0c1405422d9896d0ec47cdf5` |
| `README.md` | contrato público | `ed560211edc3e8ac925a512ae91caf727260ef47` |

## Zonas bloqueadas

No crear otro runtime. No crear otra ruta de fabricación. No reabrir 4×10 sin decisión explícita. No eliminar `factoryMeta`. No convertir referencias en comerciales. No eliminar ledger, candado global ni confirmación de guardado. No agregar decoración antes de resolver QA funcional.

## Estado

La arquitectura está **cerrada para cambios estructurales**. La próxima fase es QA real en navegador de fabricación individual, consumo 1→10, agotamiento, persistencia, colecciones, concurrencia, derechos y exportación.

La prueba E2E no se declara realizada hasta ejecutarla realmente.

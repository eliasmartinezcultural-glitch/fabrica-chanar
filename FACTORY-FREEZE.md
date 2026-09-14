# FÁBRICA CHAÑAR — BASE CONGELADA

Fecha de congelación: 2026-09-14  
Rama: `main`

## Propósito

Este documento define la **base funcional consolidada** de Fábrica Chañar.

La regla desde este punto es simple: **no se reconstruye lo que ya funciona**. Toda intervención futura debe partir de esta base y modificar solamente el punto que haya sido auditado como necesario.

## Contrato que queda congelado

- 4 productos soberanos: `postal`, `ficha`, `guide`, `infographic`.
- 10 slots cerrados por producto.
- 40 matrices editoriales cerradas en total.
- La materia prima, fotografía, realización editorial, identidad, procedencia y derechos viajan dentro de `factoryMeta`.
- Una foto propia nunca es reemplazada por una foto editorial del catálogo.
- Las fotos `reference` no se consideran automáticamente aptas para venta.
- Biblioteca conserva y restaura el estado editorial completo.
- La fabricación automática espera a que esté instalada la curaduría cerrada.
- El reverso agrega contexto, procedencia, fuente y crédito; no duplica el frente.
- `factory-preview-audit.js` es el control de calidad de la vista.
- `factory-sales.js` solo considera comercialmente listas las piezas con derechos explícitos.

## Archivos canónicos

| Archivo | Versión | SHA del contenido |
|---|---:|---|
| `index.html` | integración actual | `5b763c468675a31b420490bbe12968d2851614b2` |
| `app-core.js` | runtime base | `a1b7286f96deb36e1eedc63d3df85565eae3025f` |
| `factory-engine.js` | v6 | `b41c675f3cdbf303d8ea809486e30b40a122d465` |
| `factory-central.js` | v9 | `d9b61113c1fbf3d866ddb2f5be127f92451358db` |
| `factory-material-selector.js` | v7 | `b148016d1aa9473e14c8dd2ceb47bc7e26521806` |
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

## Zonas congeladas

No reemplazar el runtime base por otro runtime.  
No crear una segunda ruta de fabricación paralela.  
No reabrir el catálogo de 4×10 salvo decisión explícita.  
No eliminar `factoryMeta` de los guardados.  
No convertir referencias públicas en material comercial por comodidad.  
No volver a introducir archivos de preview eliminados como dependencia obligatoria.  
No agregar decoración si antes no está resuelto el flujo funcional correspondiente.

## Regla de intervención

Antes de modificar un archivo canónico:

1. identificar una regresión o una necesidad concreta;
2. conservar la función vigente;
3. cambiar el punto mínimo necesario;
4. volver a auditar la cadena afectada;
5. actualizar este documento solo cuando cambie realmente el contrato.

Una mejora visual que rompa persistencia, derechos, catálogo, exportación o fabricación **no se considera mejora**.

## Estado de producción

El último estado de `main` con integración comprobada por Vercel fue reportado como `success` en el commit `7a019bc72628423d6d3850428b6fd1166170cea5`.

La verificación E2E de navegador no se declara realizada hasta ejecutarla realmente.

## Próxima etapa

La siguiente intervención debe ser de **QA funcional sobre los 4 productos y los 10 slots de cada uno**, partiendo exactamente de esta base. No se debe reiniciar la arquitectura ni reconstruir los módulos congelados.

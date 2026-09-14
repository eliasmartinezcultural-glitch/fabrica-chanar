# FÁBRICA CHAÑAR — BASE CONGELADA

Fecha de última consolidación: 2026-09-14  
Rama: `main`

## Propósito

Este documento define la **base funcional consolidada** de Fábrica Chañar.

La regla desde este punto es simple: **no se reconstruye lo que ya funciona**. Toda intervención futura debe partir de esta base y modificar solamente el punto que haya sido auditado como necesario.

## Contrato congelado

- 4 productos soberanos: `postal`, `ficha`, `guide`, `infographic`.
- 10 slots cerrados por producto.
- 40 matrices editoriales cerradas en total.
- La materia prima, fotografía, realización editorial, identidad, procedencia y derechos viajan dentro de `factoryMeta`.
- Una foto propia nunca es reemplazada por una foto editorial del catálogo.
- Las fotos `reference` no se consideran automáticamente aptas para venta.
- Biblioteca conserva y restaura el estado editorial completo.
- La fabricación automática espera a que esté instalada la curaduría cerrada.
- Cada slot cerrado se consume una sola vez por producto a través de la Biblioteca; al agotar los 10 slots, la familia se bloquea hasta una decisión explícita de reinicio.
- Las colecciones utilizan obligatoriamente el mismo motor y selector cerrado que la fabricación individual; no existe una segunda ruta de producción.
- El reverso agrega contexto, procedencia, fuente y crédito; no duplica el frente.
- `factory-preview-audit.js` es el control de calidad de la vista.
- `factory-sales.js` solo considera comercialmente listas las piezas con derechos explícitos.

## Archivos canónicos

| Archivo | Versión | SHA del contenido |
|---|---:|---|
| `index.html` | integración actual | `bf24b266a270664f84e78c13fd45220b2ec8aa3e` |
| `app-core.js` | runtime base | `a1b7286f96deb36e1eedc63d3df85565eae3025f` |
| `factory-engine.js` | v7 | `30412e09fd5c7aed8989073a646e8f0a9ffa34ae` |
| `factory-central.js` | v10 | `f4eb6f35eaa834a61387d8ccb82087753b9e654f` |
| `factory-material-selector.js` | v8 | `e23457059d717fa42235e637dee68b2f6fe264dd` |
| `factory-collection.js` | v3 | `62be4d8e55444237b17f17070cf9b0af74ac9d17` |
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
No modificar el comportamiento de consumo de slots sin una nueva decisión explícita de edición/reutilización.

## Regla de intervención

Antes de modificar un archivo canónico:

1. identificar una regresión o una necesidad concreta;
2. conservar la función vigente;
3. cambiar el punto mínimo necesario;
4. volver a auditar la cadena afectada;
5. actualizar este documento solo cuando cambie realmente el contrato.

Una mejora visual que rompa persistencia, derechos, catálogo, exportación o fabricación **no se considera mejora**.

## Estado de producción

El último estado histórico de `main` con integración comprobada por Vercel fue reportado como `success` en el commit `7a019bc72628423d6d3850428b6fd1166170cea5`.

El estado actual debe considerarse pendiente de verificación E2E hasta ejecutar una prueba real de navegador.

## Próxima etapa

La siguiente intervención debe continuar por **QA funcional**, no por reconstrucción: comprobar en navegador la fabricación individual, consumo 1→10 por cada producto, agotamiento, Biblioteca, colecciones, derechos y exportación. No se debe reiniciar la arquitectura.

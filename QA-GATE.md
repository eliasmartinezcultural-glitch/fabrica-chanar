# FÁBRICA CHAÑAR — QA GATE

Fecha: 2026-09-14

Este archivo define las condiciones mínimas para considerar estable la arquitectura congelada.

## Contratos estructurales

- 4 familias soberanas: `postal`, `ficha`, `guide`, `infographic`.
- 10 slots cerrados por familia.
- 40 matrices editoriales cerradas.
- El selector cerrado decide la próxima matriz disponible.
- El consumo permanente vive en `fabrica-chanar-closed-ledger-v1`, separado de la Biblioteca visible.
- La Biblioteca puede conservar hasta 18 piezas sin alterar el historial de consumo.
- Una fotografía propia no puede ser reemplazada por material editorial del catálogo.
- Las referencias no se transforman automáticamente en material comercial.
- Las colecciones pasan por el mismo motor y selector cerrado que la fabricación individual.
- Solo una fabricación puede ejecutarse al mismo tiempo dentro del runtime compartido.

## Gates funcionales

Antes de modificar arquitectura deben mantenerse estos resultados:

1. Fabricación individual: una familia consume sus slots en orden sin repetir los ya registrados.
2. Agotamiento: después de 10 consumos, la familia devuelve `closed-catalog-exhausted`.
3. Persistencia: cerrar, recargar o borrar piezas de Biblioteca no libera slots consumidos.
4. Colecciones: cada pieza se fabrica y guarda antes de fabricar la siguiente.
5. Concurrencia: una segunda fabricación durante una fabricación activa devuelve `production-busy`.
6. Derechos: una pieza con imagen `reference` no queda habilitada para venta/exportación comercial.
7. Foto propia: permanece prioritaria al fabricar otra pieza.
8. Metadatos: `factoryMeta`, procedencia, realización editorial y derechos sobreviven al guardado/recuperación.

## Estado de verificación

Este gate es una especificación de QA y no equivale a una prueba E2E de navegador.

La prueba real de navegador continúa pendiente hasta ejecutarse y registrar resultados observables.

## Regla de bloqueo

Una futura intervención no debe eliminar, debilitar ni sustituir estos gates sin una decisión explícita y una nueva auditoría completa.

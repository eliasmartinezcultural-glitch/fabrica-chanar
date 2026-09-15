# FÁBRICA CHAÑAR — QA GATE

Este gate queda congelado junto con la arquitectura actual.

## No regresión

- 4 productos soberanos.
- 10 slots cerrados por producto.
- 40 matrices totales.
- Ledger persistente separado de la Biblioteca.
- Biblioteca limitada a 18 piezas sin liberar slots.
- Foto propia con prioridad.
- `reference` no implica derechos comerciales.
- Colecciones usan el mismo motor y selector cerrado.
- Una fabricación global a la vez, incluyendo colecciones completas.
- Las series toman un token de lote válido y no se auto-bloquean contra su propia fabricación.
- Los slots quedan reservados transitoriamente desde la selección hasta el commit para impedir doble asignación durante guardados asíncronos.
- El candado global bloquea producción central y otras series mientras un lote está activo.
- El preview mantiene una sola superficie visual por pieza; la pieza maestra reemplaza la previsualización base y no se apila sobre ella.
- El guardado confirma el slot antes de habilitar la siguiente fabricación central.
- Agotamiento devuelve `closed-catalog-exhausted`.
- Segunda fabricación concurrente devuelve `production-busy`.
- `factoryMeta` sobrevive a guardado y recuperación.

## Regla

No se modifica ninguno de estos contratos sin una nueva auditoría completa.

Este documento es una especificación de QA; no equivale a una prueba E2E de navegador.

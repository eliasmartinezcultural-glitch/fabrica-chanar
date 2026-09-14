# Fábrica Chañar

Fábrica editorial local de **Ocarina Producciones** para producir piezas de Chañar: recuerdos visuales, piezas documentales, guías e infografías.

## Runtime activo

`index.html` es la entrada única y trabaja sobre un solo estado/runtime.

```text
index.html → app-core → engine → selector cerrado → datos/visuales → auditoría → ventas
```

El selector cerrado controla 4 productos × 10 slots = 40 matrices. El consumo queda registrado en `fabrica-chanar-closed-ledger-v1`, separado de la Biblioteca visible de hasta 18 piezas. La foto propia tiene prioridad y `reference` no implica permiso comercial.

Las colecciones utilizan exactamente la misma cadena de producción y existe un candado global contra fabricaciones concurrentes.

## Continuidad

`FACTORY-FREEZE.md` y `QA-GATE.md` son los contratos de continuidad. No se reconstruye lo que funciona ni se crea un segundo runtime para resolver una regresión.

## QA

La auditoría estructural está consolidada. La prueba E2E real de navegador sigue pendiente y no se declara aprobada hasta ejecutarla.

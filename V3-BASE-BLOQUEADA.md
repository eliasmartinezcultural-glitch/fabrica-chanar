# Fábrica Chañar — V3 base bloqueada

## Objetivo
Esta capa define el contrato de producción sobre el que se construirá lo siguiente. La prioridad práctica pasa a ser doble: **fabricar la primera tanda territorial en preproducción mientras se cierra el banco fotográfico comercial**. No se abre una nueva arquitectura.

## Contrato V3
- 4 productos: postal, ficha cultural, guía breve, infografía.
- 4 salidas: 1080×1350, 1200×1200, 1600×1000 y A5.
- Render de edición separado conceptualmente del render estructural.
- Exportación raster con dimensiones de salida fijadas explícitamente.
- A5 mediante documento de impresión con `@page A5`.
- Biblioteca local V3 independiente de la clave histórica.
- Política fotográfica explícita: propia, licenciada o del cliente son estados comerciales válidos; referencia/sin verificar/pending quedan fuera del guardado comercial.
- Regla territorial dura: toda entrada debe declarar `location: San Patricio del Chañar`.
- Banco fotográfico V3 con registro canónico de 40 entradas y sin dependencia de `index.html`.
- Estado actual del banco: **10 referencias fotográficas locales + 30 objetivos de fotografía local pendientes + 0 fotos comerciales habilitadas**.
- Una referencia local puede utilizarse para revisión y prototipo interno, pero no se presenta como material comercial autorizado.
- Las 30 entradas pendientes son objetivos territoriales concretos; no deben sustituirse por paisajes genéricos ni por fotos de otras localidades.
- Límite de biblioteca: 30 piezas comerciales.

## Reparación V3.2
Se consolidó el flujo de primera tanda sin relajar la protección comercial:
- `v3.html` ahora identifica explícitamente la etapa como **PREPRODUCCIÓN TERRITORIAL**.
- La interfaz informa 10 referencias locales, 30 fotografías locales pendientes y 0 comerciales habilitadas.
- Las entradas sin URL real se muestran como pendientes, no como fotografías falsas.
- Las referencias llevan una marca visible de `PREPRODUCCIÓN · REFERENCIA` dentro del render.
- PNG/JPG pueden fabricarse como prototipo cuando existe una fotografía real del Chañar; el archivo queda identificado como `prototipo`.
- El guardado en Biblioteca continúa siendo exclusivamente comercial y exige foto local real + derechos comerciales válidos.
- La impresión A5 puede preparar un prototipo con fotografía local real; no convierte una referencia en material autorizado.
- El motor valida territorio y derechos antes del guardado comercial.

## Archivos canónicos
- `v3.html`: interfaz V3.
- `v3-photo-registry.js`: banco fotográfico territorial canónico de 40 entradas.
- `v3-production.js`: único motor de producción V3.
- `index.html`: runtime anterior consolidado; no forma parte del motor V3.

## Regla de bloqueo
No se agregan decoración, productos, formatos, funciones comerciales ni nueva arquitectura. La siguiente ampliación funcional solo puede justificarse para cerrar el banco fotográfico territorial o certificar el motor.

## Estado de prueba
La arquitectura está consolidada, pero **160/160 todavía NO está certificada**. Tampoco se declara una prueba E2E ejecutada porque no se dispone de una ejecución de navegador confiable en esta intervención.

## Próximo trabajo práctico
### Línea A — Primera tanda
1. Seleccionar las 10 referencias locales para diseñar prototipos.
2. Fabricar las primeras piezas en los cuatro productos y formatos que resulten útiles para el lote inicial.
3. Revisar composición, textos, encuadres, jerarquía y legibilidad.
4. No vender ni presentar como material comercial una pieza que conserve una fotografía `reference`.

### Línea B — Banco comercial
1. Conseguir primero fotografías propias de Ocarina del Chañar.
2. Incorporar fotografías de terceros solo con licencia comercial comprobable.
3. Incorporar material de clientes solo con autorización de uso comercial registrada.
4. Reemplazar progresivamente las 30 entradas `PENDIENTE_FOTO_LOCAL` por fotos reales.
5. Registrar procedencia y estado de derechos de cada incorporación.
6. Cuando existan 40 fotos reales y comercialmente habilitadas, ejecutar la batería 4 × 40 = 160.

## Gate final V3
1. 40 fotografías reales del territorio.
2. 40/40 con derechos comerciales válidos.
3. 4 × 40 = 160 combinaciones recorridas en navegador.
4. Producto, foto, render y formato correctos en cada combinación.
5. PNG/JPG/A5 verificados.
6. Guardado y recuperación comercial verificados.
7. Solo entonces se descongela V4.

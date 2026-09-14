# Fábrica Chañar — V3 base bloqueada

## Objetivo
Esta capa define el contrato de producción sobre el que se construirá lo siguiente. No se agregan funciones estructurales hasta pasar la batería 4 × 40.

## Contrato V3
- 4 productos: postal, ficha cultural, guía breve, infografía.
- 4 salidas: 1080×1350, 1200×1200, 1600×1000 y A5.
- Render de edición separado conceptualmente del render estructural.
- Exportación raster con dimensiones de salida fijadas explícitamente.
- A5 mediante documento de impresión con `@page A5`.
- Biblioteca local V3 independiente de la clave histórica.
- Política fotográfica explícita: propia, licenciada o del cliente son estados comerciales válidos; referencia/sin verificar quedan fuera del guardado comercial.
- Banco fotográfico V3 con registro canónico de 40 entradas; no depende de `index.html`.
- Límite de biblioteca: 30 piezas.

## Reparación V3.1
Se corrigieron los bloqueadores detectados en la auditoría:
- `v3.html` ya carga explícitamente el registro fotográfico y el motor V3.
- Se eliminó la dependencia de `iframe`/`index.html` para descubrir `PHOTOS`.
- `v3-photo-registry.js` es ahora la única fuente del banco 40/40.
- `v3-production.js` usa el contrato real de botones `data-format`; ya no espera un `#format` inexistente.
- El formato A5 utiliza la clave `print` correctamente.
- El motor activo de V3 es único; no queda el runtime inline duplicado.
- PNG/JPG usan las dimensiones explícitas del formato seleccionado.
- La política de derechos permanece bloqueada: una foto sin derechos verificados no se guarda como pieza comercial.

## Archivos canónicos
- `v3.html`: interfaz V3 reparada.
- `v3-photo-registry.js`: banco fotográfico canónico 40/40.
- `v3-production.js`: único motor de producción V3.
- `index.html`: runtime anterior consolidado; no forma parte del motor V3.

## Regla de bloqueo
No se agregan decoración, productos, formatos, funciones comerciales ni nueva arquitectura hasta completar la prueba real de 160 combinaciones (4 productos × 40 fotografías) en navegador.

## Estado de prueba
La reparación está aplicada en GitHub, pero **160/160 todavía NO está certificada**. No se declara una prueba E2E ejecutada porque en esta intervención no se dispone de una ejecución de navegador confiable.

## Próximo gate
1. cargar V3 en navegador;
2. comprobar que aparecen exactamente 40 fotografías;
3. recorrer 4 × 40 = 160 combinaciones;
4. en cada combinación comprobar producto, foto, render y formato;
5. verificar guardado/recuperación únicamente cuando la foto tenga derechos comerciales válidos;
6. probar PNG, JPG y A5 con dimensiones verificables;
7. registrar cualquier fallo y reparar sin ampliar alcance;
8. repetir hasta obtener 160/160 estable;
9. recién entonces abrir V4.
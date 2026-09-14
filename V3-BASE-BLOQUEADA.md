# Fábrica Chañar — V3 base bloqueada

## Objetivo
Esta capa define el contrato de producción sobre el que se construirá lo siguiente. No se deben agregar nuevas funciones estructurales hasta pasar la batería 4 × 40.

## Contrato V3
- 4 productos: postal, ficha cultural, guía breve, infografía.
- 4 salidas: 1080×1350, 1200×1200, 1600×1000 y A5.
- Render de edición separado conceptualmente del render estructural.
- Exportación raster con dimensiones de salida fijadas explícitamente.
- A5 mediante documento de impresión con @page A5.
- Biblioteca local V3 independiente de la clave histórica.
- Política fotográfica explícita: propia, licenciada o del cliente son estados comerciales válidos; referencia/sin verificar quedan fuera del guardado comercial.
- Banco heredado: se intenta reutilizar el PHOTOS existente del runtime anterior para evitar duplicación de catálogo.
- Límite de biblioteca: 30 piezas.

## Archivos
- `v3.html`: espacio de producción V3.
- `v3-production.js`: contrato/motor V3 aislado.
- `index.html`: runtime anterior consolidado, no se modifica destructivamente durante esta etapa.

## Regla de bloqueo
No se vuelve a tocar arquitectura, formatos, persistencia ni motor de exportación mientras no se complete la prueba real de 160 combinaciones (4 productos × 40 fotografías) en navegador.

## Estado de prueba
La batería 160 todavía **no se declara aprobada**. En esta intervención se consolidó la base y se dejó preparado el gate de prueba; falta ejecutar la prueba E2E real en navegador.

## Próximo gate
1. cargar V3 en navegador;
2. verificar 40/40 fotografías;
3. ejecutar 4 × 40 = 160 combinaciones;
4. por combinación verificar selección, render, formato, guardado y recuperación;
5. probar exportación de cada formato al menos una vez por producto y con fotografías con derechos verificados;
6. registrar fallos antes de abrir V4.

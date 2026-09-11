# Fábrica Chañar v6 · Arquitectura de memoria

La v6 separa tres cosas que no deben mezclarse:

1. **Información territorial:** registros, hechos, lugares y acontecimientos.
2. **Activos multimedia:** fotografías, mapas, documentos, audio y video con procedencia y derechos.
3. **Cartografía:** geometrías y capas con fuente, estado y licencia.

## Estados multimedia

- `reutilizable`: existe base suficiente para reutilizar según las condiciones registradas.
- `referencia`: sirve para investigar, pero no se incorpora automáticamente a productos.
- `pendiente`: falta verificar autoría, licencia o autorización.

## Regla central

Que una imagen, mapa o documento esté disponible públicamente en internet **no significa que sea libre de reutilizar**.

La fábrica debe conservar como mínimo: fuente, autor, licencia, URL, fecha de consulta, permiso de modificación, permiso comercial y texto de atribución cuando corresponda.

## Capas cartográficas

La fábrica acepta GeoJSON documentado. Una geometría sin procedencia se considera pendiente y no debe presentarse como dato verificado.

## Flujo v6

`INVESTIGAR → REGISTRAR FUENTE → CLASIFICAR DERECHOS → INCORPORAR ACTIVO → VINCULAR REGISTRO → PRODUCIR → AUDITAR`

# Datos territoriales

Esta carpeta es la base documental de Fábrica Chañar.

## Regla principal

Un dato local no se considera confirmado por estar escrito en internet. Cada registro debe indicar su estado documental:

- `verificado`
- `pendiente`
- `a_confirmar`
- `aporte_ocarina`
- `material_propio`
- `fuente_externa`

No se incorporan nombres, fechas, coordenadas, direcciones, teléfonos, horarios, estadísticas o hechos históricos como datos confirmados sin una fuente identificable.

## Archivos

- `registros.json`: índice principal del Banco Chañar.
- `lugares.json`: lugares y referencias territoriales.
- `fuentes.json`: registro de procedencia y fuentes consultadas.
- `historia.json`: acontecimientos y registros históricos documentados.
- `categorias.json`: vocabulario controlado para clasificar contenidos.
- `plantillas.json`: catálogo inicial de plantillas de la fábrica.

## Esquema mínimo de un registro

```json
{
  "id": "registro-unico",
  "tipo": "lugar",
  "nombre": "",
  "resumen": "",
  "categoria": "",
  "estado": "pendiente",
  "fuentes": [],
  "coordenadas": null,
  "direccion": "",
  "telefono": "",
  "horarios": "",
  "media": [],
  "notas": ""
}
```

Los campos identificatorios o sensibles deben permanecer vacíos hasta contar con respaldo suficiente. `coordenadas` debe ser `null` hasta disponer de procedencia cartográfica identificable.

## Fuentes

Una fuente debe tener un identificador estable que pueda ser referenciado desde `registros.json`. Como mínimo se recomienda conservar título, tipo, procedencia y fecha de consulta; cuando corresponda, también URL y observaciones sobre licencia o atribución.

## Principio de trazabilidad

La fábrica distingue entre información documentada, información pendiente y material aportado por Ocarina. Una fotografía propia no convierte automáticamente en verificable cualquier afirmación escrita sobre ella.

## Cartografía

Las coordenadas y geometrías deberán incorporarse únicamente cuando su procedencia sea identificable y se respeten las licencias y atribuciones correspondientes. Los mapas esquemáticos no deben presentarse como cartografía de navegación.

## Operación

El Banco Chañar se carga desde JSON para mantener un núcleo estático, gratuito y auditable. La interfaz puede seleccionar registros y fabricar productos, pero no altera silenciosamente la fuente documental. Las piezas de trabajo y la biblioteca local se conservan en el navegador mediante `localStorage`.

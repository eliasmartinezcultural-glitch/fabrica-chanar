# Datos territoriales

Esta carpeta es la base documental de Fábrica Chañar.

## Regla principal

Un dato local no se considera confirmado por estar escrito en internet. Cada registro deberá indicar su estado documental:

- `verificado`
- `pendiente`
- `a_confirmar`
- `aporte_ocarina`
- `material_propio`
- `fuente_externa`

No se incorporan nombres, fechas, coordenadas, direcciones, teléfonos, horarios, estadísticas o hechos históricos como datos confirmados sin una fuente identificable.

## Archivos

- `lugares.json`: lugares y referencias territoriales.
- `fuentes.json`: registro de procedencia y fuentes consultadas.
- `historia.json`: acontecimientos y registros históricos documentados.
- `categorias.json`: vocabulario controlado para clasificar contenidos.
- `plantillas.json`: catálogo inicial de plantillas de la fábrica.

## Principio de trazabilidad

Los datos sensibles deberán poder relacionarse con uno o más identificadores de fuente. La fábrica distingue entre información documentada, información pendiente y material aportado por Ocarina. Una fotografía propia no convierte automáticamente en verificable cualquier afirmación escrita sobre ella.

## Cartografía

Las coordenadas y geometrías deberán incorporarse únicamente cuando su procedencia sea identificable y se respeten las licencias y atribuciones correspondientes. Los mapas esquemáticos no deben presentarse como cartografía de navegación.

## Próxima etapa

Con esta estructura preparada, el motor de la aplicación puede cargar plantillas y datos sin depender de una base de datos paga ni mezclar contenido documental con la interfaz.
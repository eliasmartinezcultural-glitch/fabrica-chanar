# Fábrica Chañar

**Fábrica Chañar** es el taller digital interno de Ocarina Producciones para producir **piezas de Chañar**: recuerdos visuales, pequeñas piezas documentales, guías e infografías nacidas de San Patricio del Chañar.

## Idea central

> **No vendemos diseños en masa. Hacemos piezas de Chañar.**

La tecnología queda adentro. Afuera debe sentirse una pieza pensada, cuidada, local y guardable.

## Ley mundial

- **No inventar:** hechos, fechas, direcciones, horarios y estadísticas necesitan respaldo o estado explícito.
- **Trazabilidad:** conservar fuente, autoría, licencia/condición de uso y procedencia cuando corresponda.
- **Derechos:** las imágenes marcadas como `reference` sirven para referencia visual; no se presume permiso comercial.
- **Producción comercial:** priorizar foto propia de Ocarina, del cliente o un activo con derechos documentados.
- **Coleccionable con honestidad:** se pueden usar colección, procedencia, código de pieza y sello editorial; no se declara limitada, certificada, única u original sin una condición real que lo respalde.
- **Complejidad adentro:** la interfaz debe pedir la menor cantidad posible de decisiones.

## Experiencia activa

```text
ELEGIR → LA FÁBRICA CURA → MIRAR → GUARDAR
```

Productos activos:

- **Postal:** recuerdo visual y turístico.
- **Ficha cultural:** pequeña pieza documental.
- **Guía breve:** acompañante de recorrido.
- **Infografía:** dato visual claro.

Cada pieza recibe automáticamente una familia visual, colección, código de pieza, marca de taller y una frase cercana de Chañar.

## Lenguaje de pieza

La Fábrica puede generar expresiones como:

- “Un recuerdito de San Patricio del Chañar.”
- “Para llevarte un pedacito de Chañar.”
- “Un pequeño recuerdo de este rincón del valle.”
- “Para guardar un pedacito de este lugar.”
- “Andá despacio. Mirá. Disfrutá Chañar.”

No se afirma que una pieza digital haya sido fabricada físicamente a mano. La idea de taller se refiere a la selección, composición, curaduría y cuidado editorial.

## Foto propia

La interfaz ofrece una opción mínima para cargar una fotografía propia directamente en el navegador. La imagen se procesa localmente y se conserva al cambiar de producto o plantilla mientras dura la sesión.

## Arquitectura activa

```text
index.html
 ├─ app-core.js          datos, productos, plantillas y exportación
 ├─ factory-engine.js    contratos y curaduría automática
 ├─ localidad.js         capa territorial
 ├─ atlas.js              motivos y decisiones locales
 ├─ beta2.js              interacción de producción
 ├─ factory-motion.js     microinteracciones
 ├─ factory-curation.js   colecciones, procedencia y sello
 └─ factory-piece.js      lenguaje local + foto propia
```

Los módulos históricos `v8.js`, `v9.js`, `v10.js` y `v16.js` permanecen en el repositorio como infraestructura experimental/documental, pero **no forman parte de la cabina activa** mientras no se integren deliberadamente. Esto evita que el README describa una aplicación distinta de la que realmente se carga.

## Derechos y datos locales

El repositorio conserva además capas de memoria territorial y manifiestos de fuentes/media en `data/`. La base municipal confirma, entre otros elementos, el Balneario Municipal, la Chacra Municipal Valles del Chañar, el Dique Compensador, el Centro Cultural, el Muro de la Identidad y el Mirador La Virgen; la historia oficial también documenta la identidad ligada al nombre “El Chañar”.

## Despliegue

Ruta primaria:

`main → GitHub Actions → GitHub Pages`

URL:

`https://eliasmartinezcultural-glitch.github.io/fabrica-chanar/`

No se declara un despliegue verificado hasta comprobar el workflow y, cuando sea posible, la carga real del sitio.

## Prioridad actual

**Producir el primer ciclo real.**

No agregar funciones por acumulación. Cada cambio debe hacer una de estas tres cosas:

1. mejorar la pieza;
2. reducir trabajo de Elías;
3. reducir errores o riesgos.

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
ELEGIR → EDITAR → ENCUADRAR → FABRICAR → GUARDAR → EXPORTAR
```

Productos activos:

- **Postal:** recuerdo visual y turístico.
- **Ficha cultural:** pequeña pieza documental.
- **Guía breve:** acompañante de recorrido.
- **Infografía:** dato visual claro.

Cada pieza recibe automáticamente una familia visual, dirección de arte fotográfica, marca de taller y una frase cercana de Chañar.

## Arquitectura activa

El runtime visible está consolidado en una única superficie:

```text
index.html
 ├─ interfaz
 ├─ catálogo de 4 productos
 ├─ banco fotográfico 40/40
 ├─ dirección de arte por fotografía
 ├─ estado + localStorage
 ├─ Biblioteca
 ├─ Mesa de venta
 └─ exportación PNG/JPG + impresión
```

`app-core.js` y los demás módulos históricos permanecen en el repositorio como material experimental/documental y **no forman parte del runtime que carga actualmente `index.html`**. Esto evita mantener dos motores activos al mismo tiempo.

## Foto propia y derechos

La prioridad comercial es utilizar fotografías propias de Ocarina, del cliente o activos con derechos documentados. Las imágenes externas de referencia no deben interpretarse como material automáticamente autorizado para venta.

La exportación de imágenes externas puede depender de las políticas CORS del proveedor. Por eso la estrategia definitiva de producción debe favorecer activos controlados.

## Despliegue

Ruta primaria:

`main → GitHub Pages`

URL:

`https://eliasmartinezcultural-glitch.github.io/fabrica-chanar/`

No se declara una prueba E2E de navegador como realizada si no se ejecutó realmente.

## Prioridad actual

**Cerrar el ciclo de producción antes de agregar funciones.**

Cada cambio debe hacer una de estas tres cosas:

1. mejorar la pieza;
2. reducir trabajo de Elías;
3. reducir errores o riesgos.

La auditoría funcional V2 queda documentada en `AUDITORIA-FUNCIONAL-V2.md`.

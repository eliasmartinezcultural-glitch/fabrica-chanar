# Auditoría funcional — Fábrica Chañar

**Fecha:** 2026-09-14  
**Rama auditada:** `main`

## Resultado ejecutivo

La aplicación tiene una base funcional identificable, pero todavía no corresponde declarar una consolidación técnica completa. El núcleo actual está concentrado en `app-core.js`, mientras que el repositorio conserva capas históricas y módulos experimentales. La prioridad es evitar que vuelvan a coexistir runtimes o superficies duplicadas.

## Hallazgos verificados

### 1. Runtime

- `app.js` está marcado explícitamente como **legacy entrypoint**.
- `app-core.js` se presenta como el runtime principal restaurado desde una versión estable.
- El repositorio contiene módulos históricos y experimentales que deben permanecer fuera de la cabina activa salvo integración deliberada.

**Criterio de cierre:** `index.html` debe cargar un único runtime de producción y cada módulo adicional debe tener una función comprobable.

### 2. Modelo de producción

El núcleo declara cuatro productos activos:

- Postal
- Ficha cultural
- Guía breve
- Infografía

También declara plantillas con datos, fotografía, procedencia y fuente editorial.

**Riesgo:** el catálogo contiene contenidos territoriales y direcciones que necesitan verificación individual antes de uso comercial. La interfaz no debe presentar como dato confirmado aquello que no tenga fuente o estado explícito.

### 3. Banco fotográfico y derechos

El banco contiene imágenes de procedencia externa con estados como `usable` y `reference`.

**Riesgo crítico:** `reference` no equivale a permiso de uso comercial. La producción debe priorizar fotografía propia, material del cliente o activos con licencia documentada. La exportación no debe ocultar la procedencia cuando sea necesaria.

### 4. Persistencia

El núcleo utiliza almacenamiento local del navegador con una clave de versión y limita la biblioteca guardada.

**Criterios de cierre:**

- recuperación segura si el almacenamiento está bloqueado o corrupto;
- migración explícita de versiones anteriores;
- no perder una pieza al cambiar de producto o plantilla;
- diferenciar borrador, pieza fabricada y pieza guardada.

### 5. Exportación

La interfaz declara exportación PNG, JPG, PDF e impresión y utiliza una dependencia externa para la captura visual.

**Riesgos a probar:** dependencia no disponible, imágenes externas bloqueadas por CORS, fotografía propia no cargada, pieza sin datos, exportación repetida y exportación desde móvil.

## Consolidación aplicada en este corte

Se incorpora este documento como contrato de auditoría para que el repositorio no vuelva a crecer por acumulación. Desde este punto, cada cambio debe clasificarse como:

1. **Corrección:** elimina un fallo reproducible.
2. **Consolidación:** elimina duplicación, legado activo o ambigüedad.
3. **Mejora:** reduce trabajo o mejora la pieza sin abrir otro runtime.

## Puerta de entrada para la próxima intervención de código

Antes de modificar la interfaz visual, se debe verificar en `index.html`:

1. qué scripts se cargan realmente;
2. si existe más de un listener o runtime de producción;
3. si los selectores usados por `app-core.js` existen;
4. si el flujo completo funciona: elegir → editar → foto → fabricar → revisar → guardar → exportar;
5. si los errores se muestran al usuario sin romper la cabina.

**No se agregan nuevas plantillas ni decoración hasta cerrar esta lista.**

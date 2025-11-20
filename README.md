# Calendario — Organiza tu vida

Aplicación web simple (sin frameworks) para gestionar tareas asociadas a fechas en un calendario mensual, con soporte de notificaciones nativas del navegador y almacenamiento persistente en `localStorage`.

## Características
- Vista mensual del calendario con resaltado del día actual y selección interactiva.
- CRUD de tareas por día (título, descripción, hora opcional, imagen opcional).
- Indicador en el calendario (punto rojo) cuando un día tiene tareas.
- Estados de tarea: Realizada, Pendiente, Sin horario (derivados del tiempo y flags).
- Notificaciones (Web Notifications) y alerta modal sonora cerca de la hora programada.
- **🌙 Modo oscuro** con toggle animado y persistencia.
- **📊 Contador de tareas** visible en tiempo real.
- **🔍 Búsqueda instantánea** de tareas por texto.
- **⌨️ Navegación con teclado** (ESC para cerrar modales).
- **🎨 Animaciones suaves** y micro-interacciones pulidas.
- Persistencia local en `localStorage` (clave `calendario_v1`).
- Animación de pantalla de bienvenida.
- Refactor a módulos ES para separar responsabilidades.

## Estructura Actual
```
calendario.html       # Página principal (usa <script type="module">)
estilos.css            # Estilos globales y componentes
js/
  storage.js          # Capa de almacenamiento (load/save)
  utils.js            # Utilidades: fechas, formato, meses
  notifications.js    # Notificaciones y alerta sonora
  calendar.js         # Render del calendario
  tasks.js            # Render y operaciones sobre tareas
  features.js         # Modo oscuro, búsqueda, confetti
  main.js             # Inicialización y unión de módulos
README.md             # Documentación
```

## Flujo Principal
1. Al cargar la página se muestra una pantalla de bienvenida (2 s).
2. Se inicializa estado (`selectedISO` y vista del mes actual).
3. Se renderiza el calendario y las tareas del día seleccionado.
4. Un bucle de temporización revisa cada minuto si hay tareas que disparar (notificar + marcar realizadas).

## Módulos
- `storage.js`: Encapsula la clave y acceso a `localStorage`.
- `utils.js`: Fecha ISO local (`YYYY-MM-DD`), formateo `DD/MM/YYYY`, meses.
- `notifications.js`: Lógica de notificación y modal de alerta + sonido.
- `calendar.js`: Construcción de la tabla mensual y selección de fecha.
- `tasks.js`: Estados, listado de tareas, agregar/editar/borrar.
- `features.js`: Modo oscuro, búsqueda, confetti, navegación con teclado.
- `main.js`: Orquestador: eventos de UI, inicialización y exposición opcional de estado para depuración.

## Cómo Ejecutar
Opción más simple: abrir `calendario.html` en tu navegador (doble clic).

## Notificaciones
- Debes otorgar permiso al navegador con el botón "Activar avisos".
- El chequeo se hace cada minuto. Si la pestaña se suspende, la notificación podría retrasarse.
- Futuro: migrar a Service Worker + Push / Alarms para mayor fiabilidad.

## Persistencia y Límites
- Las imágenes se almacenan como DataURL en `localStorage` (máx ~5MB total dependiendo del navegador). Se valida tamaño ≤ 500KB por imagen.
- Recomendado: mover imágenes a `IndexedDB` o almacenamiento remoto si escalas el uso.

## Accesibilidad (Pendiente)
Mejoras sugeridas:
- Añadir roles ARIA y etiquetas en el modal (`role="dialog"`, `aria-modal="true"`).
- Gestionar foco al abrir/cerrar modales (focus trap).
- Evitar `innerHTML` para contenido dinámico si se incorpora HTML introducido por el usuario (sanitización).

## Mejoras Futuras
- Service Worker para notificaciones persistentes.
- Resumen semanal y métricas avanzadas (gráficos de productividad).
- Internacionalización (traducción de meses / idiomas).
- Migrar almacenamiento de imágenes a IndexedDB.
- Arrastrar y soltar para reordenar tareas.
- Etiquetas/categorías de colores para tareas.
- Vista semanal alternativa.

## Próximo Paso Recomendado
Crear pruebas unitarias para funciones puras (`getTaskStatus`, `localISO`, etc.) y aplicar mejoras avanzadas de accesibilidad.

---
**Licencia**: (Añadir si corresponde; actualmente no especificada.)

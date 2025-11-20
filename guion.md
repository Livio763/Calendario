# Guion sencillo para explicar la aplicación

## 1. ¿Qué es esta aplicación?
Es un calendario en el que puedes guardar recordatorios (tareas) para cada día. Cada recordatorio puede tener:
- Un título (lo más importante)
- Una descripción (detalles)
- Una hora (para avisos y orden)
- Una imagen (opcional; si no pones, aparece un icono por defecto)

El programa guarda todo automáticamente dentro del navegador (no se necesita internet y los datos se quedan mientras no borres la memoria del navegador).

## 2. ¿Cómo se usa?
1. Abre el archivo `calendario.html` en el navegador.
2. Espera 2 segundos la pantalla de bienvenida.
3. Haz clic en un día del calendario.
4. Pulsa el botón "Nuevo recordatorio" para ver el formulario y rellenar datos.
5. Pulsa "Guardar tarea" para añadirlo.
6. Pulsa "Ver recordatorios" para ver la lista de ese día.
7. Puedes editar o borrar cada recordatorio con los botones.
8. Si pusiste una hora y activaste avisos, el sistema te mostrará una alerta cerca de la hora.

## 3. ¿Qué hace cada archivo?
Explicado en palabras simples, sin tecnicismos pesados:

### `calendario.html` (Página principal)
Es la estructura base de la aplicación. Define dónde van los elementos: el encabezado con el botón de modo oscuro, el calendario, el panel de tareas (que tiene dos botones: "Nuevo recordatorio" y "Ver recordatorios"), el formulario para agregar tareas y la lista de tareas. También incluye la pantalla de bienvenida que aparece al inicio. Es como el "esqueleto" que el navegador lee para mostrar todo en pantalla.

### `estilos.css` (Diseño y apariencia)
Contiene todas las reglas visuales: colores, tamaños, espacios, animaciones. Aquí se definen:
- Los colores del tema claro y oscuro (variables CSS)
- El estilo del calendario (cuadrícula de días, colores de hover, puntitos rojos)
- El diseño de las tarjetas de tareas (borde, sombra, imagen, botones)
- Las animaciones (entrada suave, efecto confetti, ventanas modal)
- El estilo de los botones (nuevo/ver recordatorios, guardar, editar, borrar)
- La apariencia del modal de alerta (centrado, colores, icono animado)

Sin este archivo todo se vería plano y sin color, solo texto simple. Los estilos hacen que la aplicación sea atractiva y fácil de usar.

### Carpeta `js/` (Lógica del programa)

#### `principal.js`
Es el director de la orquesta. Arranca todo al cargar la página: conecta botones, muestra el calendario, lista las tareas y maneja los modos (ver / nuevo recordatorio). También se encarga de iniciar las notificaciones y el tema oscuro.

### `calendario_logica.js`
Se ocupa de dibujar el calendario (los días del mes). Decide qué días muestran un puntito rojo (día con recordatorios) y qué pasa cuando haces clic en un día.

### `tareas.js`
Gestiona la lista de recordatorios: cómo se muestran, en qué orden (primero los que tienen hora), cómo se añaden, editan y borran. También decide si una tarea aparece como Pendiente, Realizada o Sin horario.

### `notificaciones.js`
Revisa cada minuto si llega la hora de un recordatorio con hora y muestra una alerta sonora y una ventana (modal). También pide permiso para enviar avisos del navegador.

### `utilidades.js`
Aquí están funciones de ayuda: formato de fechas, lista de nombres de meses y el dibujo (icono) que se usa si una tarea no tiene imagen.

### `datos.js`
Guarda y carga toda la información de los recordatorios usando el almacenamiento interno del navegador (localStorage). Es la "caja" donde se guardan los datos.

### `extras.js`
Funciones adicionales: modo oscuro, búsqueda rápida de recordatorios por texto, contador total de tareas, soporte para cerrar ventanas con la tecla Esc.

## 4. ¿Dónde se almacena la información?
En el navegador (localStorage) bajo la clave `calendario_v1`. Si abres el mismo archivo en otra computadora, tendrás un calendario vacío porque los datos no viajan; quedan solo en tu equipo.

## 5. Relación entre HTML, CSS y JavaScript
- **HTML** (`calendario.html`): Define **qué** elementos hay (botones, calendario, lista).
- **CSS** (`estilos.css`): Define **cómo** se ven esos elementos (colores, tamaños, posiciones).
- **JavaScript** (carpeta `js/`): Define **qué hacen** los elementos cuando interactúas (guardar tarea, cambiar de día, mostrar alerta).

Los tres trabajan juntos: HTML crea la estructura, CSS la embellece, JavaScript le da vida y funcionalidad.

## 6. ¿Cómo están organizados los recordatorios?
Por fecha en formato Año-Mes-Día (ejemplo: `2025-11-19`). Cada fecha guarda una lista de tareas. Si una tarea tiene hora se muestra primero y ayuda a lanzar avisos.

## 6. ¿Qué pasa si no pongo imagen?
Se muestra un icono de calendario bonito para que nunca se vea un espacio vacío.

## 8. ¿Qué ventajas tiene para presentar?
- Fácil de usar sin instalación.
- Visual moderno (modo claro y oscuro).
- Avisos y sonidos para tareas con hora.
- Orden automático por hora.
- Búsqueda rápida.
- Código organizado por partes (cada archivo con una función clara).
- Estructura profesional: HTML para contenido, CSS para diseño, JavaScript para interactividad.

## 9. Palabras clave fáciles
- Recordatorio = tarea que guardas.
- Modal = ventanita que aparece encima (la alerta).
- LocalStorage = memoria del navegador.
- Placeholder = imagen por defecto.
- HTML = lenguaje que estructura la página.
- CSS = lenguaje que da estilo visual.
- JavaScript = lenguaje que programa la funcionalidad.

## 10. ¿Qué mejorar en el futuro? (Opcional para mostrar interés)
- Exportar e importar tareas a archivo.
- Resumen semanal.
- Más accesibilidad (lector de pantalla).
- Estadísticas (porcentaje completadas).

## 11. Frase final para exponer
"Esta aplicación de calendario permite a cualquier persona organizar sus días agregando recordatorios con hora e imagen, todo guardado directamente en el navegador, sin necesidad de servidores ni instalación adicional. Usa HTML para la estructura, CSS para el diseño visual moderno con modo oscuro, y JavaScript modular para gestionar las tareas, notificaciones y la interacción del usuario."
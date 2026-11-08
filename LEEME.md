# Maqueta IEEE ESPOCH v3

Maqueta navegable de la plataforma de la Rama Estudiantil IEEE ESPOCH, para presentarla y recoger comentarios. Solo usa HTML, CSS y JavaScript, sin instalar nada.

## Cómo abrirla
Abre `index.html` con doble clic. Se ve en cualquier navegador moderno; Chrome o Edge muestran también las animaciones al hacer scroll. Necesita internet solo para las fuentes (Archivo y Open Sans); sin conexión usa las del sistema.

## Qué tiene
- **Inicio público:** hero con logo y foto real, cifras, próximos eventos, capítulos, voluntario del mes, trayectoria, galería y cierre.
- **Área de directivos:**
  - **Resumen:** «Tu semana», proyectos, tareas y acciones pendientes.
  - **Tablero SCRUM:** prueba el menú ⋮ → «Mover a…» para mover una tarea sin arrastrar.
  - **Personas:** tabla con panel de detalle.
  - **Nueva tarea:** diálogo que se abre desde el botón del mismo nombre.
- **Barra superior oscura** (no es parte del diseño): cambia de pantalla, de tema (claro u oscuro) y de vista (escritorio o móvil).

Los textos entre corchetes, como `[Año]`, son contenido pendiente. Los nombres y cifras del área de directivos son de ejemplo.

## Cómo dejar comentarios
1. Pulsa **Comentar** en la barra superior.
2. Haz clic en la parte de la pantalla que quieras comentar.
3. Escribe tu nombre, elige «Me gusta», «Cambiar» o «Duda», y guarda. Aparece una marca numerada en ese lugar.
4. En **Comentarios** ves la lista. Desde ahí puedes:
   - **Copiar para WhatsApp:** copia todo en texto, listo para pegar en un chat.
   - **Descargar:** guarda un archivo `.json` con tus comentarios para enviárselo a Yosef.

Los comentarios se guardan solo en tu navegador. **Esc** sale del modo comentario.

## Para quien reúne los comentarios
Pide a cada persona su archivo `.json` y cárgalos con **Comentarios → Importar**. Se juntan sin duplicarse y las marcas aparecen sobre cada pantalla.

## Archivos
- `index.html`: las pantallas.
- `css/estilos.css`: colores, tipografía, movimiento y diseño adaptable.
- `js/app.js`: navegación, tablero, personas, diálogo y comentarios.
- `img/`: logos y fotos de la rama.

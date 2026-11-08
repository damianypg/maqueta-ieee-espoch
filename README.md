# Plataforma IEEE ESPOCH · maqueta v3

Maqueta navegable de la plataforma de la Rama Estudiantil IEEE ESPOCH, hecha para presentarla y recoger comentarios. Incluye el sitio público y el área de directivos. Solo usa HTML, CSS y JavaScript, sin dependencias ni paso de compilación.

**Ver en vivo:** https://damianypg.github.io/maqueta-ieee-espoch/

## Qué tiene
- **Inicio público:** hero con logo y foto real, cifras, próximos eventos, capítulos, voluntario del mes, trayectoria, galería y cierre.
- **Área de directivos:**
  - **Resumen:** «Tu semana», proyectos, tareas y acciones pendientes.
  - **Tablero SCRUM:** prueba el menú ⋮ → «Mover a…» para mover una tarea sin arrastrar.
  - **Personas:** tabla con panel de detalle.
  - **Nueva tarea:** diálogo que se abre desde el botón del mismo nombre.
- **Barra superior oscura** (no es parte del diseño): cambia de pantalla, de tema (claro u oscuro) y de vista (escritorio o móvil).

> **Datos de ejemplo:** los nombres, cargos y cifras del área de directivos son ficticios. Los textos entre corchetes, como `[Año]`, son contenido pendiente.

## Cómo dejar comentarios
1. Abre la maqueta y pulsa **Comentar** en la barra superior.
2. Haz clic en la parte de la pantalla que quieras comentar.
3. Escribe tu nombre, elige «Me gusta», «Cambiar» o «Duda», y guarda. Aparece una marca numerada en ese lugar.
4. En **Comentarios** ves la lista. Desde ahí puedes:
   - **Copiar para WhatsApp:** copia todo en texto, listo para pegar en un chat.
   - **Descargar:** guarda un archivo `.json` con tus comentarios para enviárselo a Yosef.

Los comentarios se guardan solo en tu navegador. **Esc** sale del modo comentario.

### Para quien reúne los comentarios
Pide a cada persona su archivo `.json` y cárgalos con **Comentarios → Importar**. Se juntan sin duplicarse y las marcas aparecen sobre cada pantalla.

## Abrirla en local
Descarga o clona el repositorio y abre `index.html` con doble clic. Necesita internet solo para las fuentes (Archivo y Open Sans); sin conexión usa las del sistema.

## Archivos
- `index.html`: las pantallas.
- `css/estilos.css`: colores, tipografía, movimiento y diseño adaptable.
- `js/app.js`: navegación, tablero, personas, diálogo y comentarios.
- `img/`: logos y fotos de la rama.
- `LEEME.md`: guía original de la maqueta.

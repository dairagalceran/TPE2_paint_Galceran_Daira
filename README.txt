Proyecto Paint
Programador: Galcerán Daira


// - -----------------------
            Interfaz
// - ----------------------

Formada por:  barra superior , canvas y barra inferior.

Se inicializa con el lápiz con color negro por default, de 5px de grosor.

Barra superior:
lápiz -> permite seleccionar color y grosor
goma -> permite seleccionar grosor

Cuadrícula de colores primarios y secundarios

Input tipo color (selector color RGB): cuidar de  hacer click en el círculo del gotero para que el pen tome el color

Input tipo range  para seleccionar grosor, se dibuja debajo del mismo 
una línea con el grosor y el color seleccionado en el momento a dibujar.
Grosor mínimo 1 px, máximo 24px y default 5px.

Trash para borrar canvas

Subir imágenes desde disco con formato gif, jpg, png

Descargar imágen del canvas con formato "canvas.png".


Canvas de 900px por 600px manteniedo una proporción de imágen de 3:2 con fondo blanco.


Barra inferior:
Filtros y botón para restaurar la última imagen subida.
filtros:
- Balck and white
- Binarizar
- Negatico
- Sepia
- Brillo
- Contraste
- Blur
- Relieve
- Bordes

Aplicación sucesiva del mismo filtro o de diferentes filtros.

Brillo no admite más de 5 veces seguidas de aplicación, se stura y elcanvas queda blanco.

// - --------------------------
            Imágen
// - -------------------------
la imagen se carga siempre desde el vértice superior izquierdo del canvas (0, 0).

Permite subir imágenes con formato gif, jpg, png.

Si la imagen tiene un tamaño mayor a 900x600 pixeles, el tamaño de la imagen se ajusta al ancho si está apaisada 
y al alto si es vertical manteniendo la proporción del ancho.

Restaurar: pinta el canvas con la última imagen cargada

// - ---------------------------    
            Filtros
// - --------------------------

Se permite la selección y aplicación sucesiva de filtros para permitirle al usuario la posibilidad de diseñar y crear.

Ejemplos:
- Selección de bordes + negativo -> filtro de bordes con fondo blanco
- Selección de bordes + relieve -> filtro de bordes más grueso con fondo oscuro
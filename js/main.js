// -  Cuerpo del proyecto 

// - Variables
// - -----------

// -  Context
let canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let mouseDown = false;
let mouseUp = true;

// - Pen
let penPrevColor =  'rgb(0, 0, 0)';
let color;
let penThick = 5;
let myPen = null;
let pencilSelected = true;
let eraserSelected = false;
let btn_pen = document.getElementById('myPen');
let btn_eraser = document.getElementById('myEraser');
let  colors = document.getElementsByClassName('colors')[0];
let colorRGB = document.getElementById('colorRGB');
let selectThickness = document.getElementById('thickness');
let btn_clear_canvas = document.getElementById('clearCanvas');

// - Image
let myImage = null;
let resetImage = null;
let resetImageFile;
let file_input_btn = document.getElementById('selectImage');
let file_input = document.getElementById('upload');
let btn_save = document.getElementById('btn_download');   
let btn_reset = document.getElementById('btn_reset');

//- Filters
let btn_black_and_white_filter = document.getElementById('btn_blackAndWhite');
let btn_binarize_filter = document.getElementById('btn_binarize');
let btn_negative_filter = document.getElementById('btn_invert');
let btn_sepia_filter = document.getElementById('btn_sepia');
let btn_brightness_filter = document.getElementById('btn_brightness');
let btn_contrast_filter = document.getElementById('btn_contrast');
let btn_blur_filter = document.getElementById('btn_blur');
let btn_embossed_filter = document.getElementById('btn_embossed');
let btn_sharpening_filter = document.getElementById('btn_sharpening');
let btn_edges_filter = document.getElementById('btn_edges');

    


// - -------------------------
// - Comportamiento del mouse

canvas.addEventListener('mousedown' , (e) => {
    mouseDown = true;
    mouseUp = false;
    myPen = new Pen(ctx, e.offsetX, e.offsetY, color, penThick);
})

canvas.addEventListener('mouseup', (e) => {
    mouseUp = true;
    mouseDown = false;
})

canvas.addEventListener('mousemove' , (e) => {
    let paintOnMovement = pencilSelected || eraserSelected
    if(mouseDown &&  paintOnMovement ){
        myPen.moveTo(e.offsetX, e.offsetY);
        myPen.draw();
    }  
})


// - --------------------------
// - Comportamiento botones
// - -------------------------


// - Presiona botón lápiz
btn_pen.addEventListener('click' , (e) => {
    pencilSelected = !pencilSelected;
    eraserSelected = false;
    color =  penPrevColor;
    setButtonsStyles()
})

// - Presiona botón Goma
btn_eraser.addEventListener('click' , (e) => {
    eraserSelected = !eraserSelected;
    pencilSelected = false;
    penPrevColor = color;
    color = 'rgb(255, 255, 255)';
    setButtonsStyles()

})

 // - Seleccionar color pre seleccionado
colors.addEventListener('click', function(e) {
    color = e.target.value ;
    penPrevColor = color;
    setButtonsStyles();
});

// - Seleccionar color RGB
colorRGB.addEventListener('change' , (e) => {
    color = e.target.value;
    penPrevColor = color;
    setButtonsStyles();
})

// - Seleccionar grosor para el lápiz y la goma
selectThickness.addEventListener('change', (e) => {
    penThick = e.target.value ;
    setThicknessLineStyle();
})

// - Presiona botón borrar canvas
btn_clear_canvas.addEventListener('click', (e) => {
    myImage = null;
    main();
})

// - Presiona botón descargar imagen del canvas        
btn_save.addEventListener('click',  (e) => {               
    saveCanvas();
})

// - Seleccionar imagen desde un  disco
file_input_btn.addEventListener('click',  (e) => {  
    file_input.click()
})

// - Presiona botón para subir al canvas la imagen seleccionada - CARGA IMAGEN 
file_input.addEventListener("change" , (e) =>{      
    myImage = new Imagen(ctx, canvasWidth, canvasHeight);
    resetImageFile = e.target.files[0];
    myImage.cargarImage(e.target.files[0]);

})

// - Presiona botón restaurar imagen en el canvas
btn_reset.addEventListener('click', (e) => {
    resetPicture();
})


// - ----------------------------------------------------
//-         Botones Filtros
// - ---------------------------------------------------

// - Presiona botón de blackAndWhite
btn_black_and_white_filter.addEventListener('click', (e) => {
    myImage.blackAndWhiteFilter();
})

// - Presiona botón de binarización 
btn_binarize_filter.addEventListener('click', (e) => {
        myImage.binarizationFilter();
})

// - Presiona botón Filtro: negativo 
btn_negative_filter.addEventListener('click' , (e) =>{
    myImage.negativeFilter();
} )

// - Presiona botón filtro Sepia
btn_sepia_filter.addEventListener('click' , (e) => {
    myImage.sepiaFilter();
})

// - Presiona botón filtro brillo
btn_brightness_filter.addEventListener('click', (e) => {
    myImage.brightnessFilter();
})

// - Presiona botón filtro Contraste
btn_contrast_filter.addEventListener('click' , (e) => {
    myImage.contrastFilter();
})

// - Presiona botón filtro blur
btn_blur_filter.addEventListener('click', (e) => {
    myImage.blurFilter();
})

// - Presiona botón filtro relieve
btn_embossed_filter.addEventListener('click', (e) => {
    myImage.embossedFilter();
})

// - Presiona botón filtro bordes
btn_edges_filter.addEventListener('click', (e) => {
    myImage.edgesFilter();
})


// - Establece  los estilos de "border" del objeto pen por default
function setButtonsStyles(){
    let penBtn = document.getElementById('myPen');
    let eraserBtn = document.getElementById('myEraser');
    
    penBtn.style.border = ""
    eraserBtn.style.border = ""
    if(pencilSelected){
        penBtn.style.border = "1px black solid"
        
    } 
    if (eraserSelected){
        eraserBtn.style.border = "1px black solid"
    }
    penBtn.style.background = penPrevColor
    setThicknessLineStyle();

}

// Determina estilos para el div contenedor del elemento thickness
function setThicknessLineStyle() {
    const item = document.getElementById('thicknessLine');
    item.style.height = penThick + 'px';
    item.style.background = penPrevColor;
    item.style.width =  '100%';
}

// - restaurar imagen en el canvas
function resetPicture() {
    resetImage = new Imagen(ctx, canvasWidth, canvasHeight);
    resetImage.cargarImage(resetImageFile);
}

// - Descargar canvas
function saveCanvas(){
    // - Creamos un elemento a en el DOM para descargar la imagen o canvas
    let link = document.createElement('a'); 
    // - nombre del archivo  genérico              
    link.download = "canvas.png";  
    // - URL de la imagen, se construye con la función , convierte la imagen a formato de 64bits
    link.href = canvas.toDataURL();  
    // - Se dispara la descarga haciendo click en "a" mediante el link.
    link.click();
}

// - ------------------------------
// - Entrada principal de l proyecto

function main(){
    ctx.fillStyle = 'RGB(255,255,255)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.lineWidth = penThick
    selectThickness.value = penThick
    setButtonsStyles();
    setThicknessLineStyle();

}
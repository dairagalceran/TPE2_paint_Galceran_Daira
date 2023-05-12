class Imagen{

    constructor( context, width, height){ //ctx y width = canvas.width y  height = canvas.height
        this.ctx = context;
        this.width = width;
        this.height = height;
    }

    init(){
        this.ctx.fillStyle= 'RGB (255,255,255)';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    cargarImage(file){
        let origWidth = this.width;
        let origHeight = this.height;
        let newImg =  new Image();
        newImg.src = URL.createObjectURL(file);
        newImg.onload = function(){
            
            let imgWidth = newImg.width;
            let imgHeight = newImg.height;
            let canvasHeight = origHeight;
            let canvasWidth = origWidth;
            let newWidth = null;
            let newHeight = null;
            let ratio = null;

            //verifico si la imagen tiene una dimensión mayor que los pixeles del canvas, ingreso para redimensionar alto y ancho
            if (imgWidth >= canvasWidth || imgHeight >= canvasHeight) { 
                //imagen  tiene una  posición horizontal
                if (imgWidth > imgHeight) {  

                    ratio = imgWidth / canvasWidth; //calculo proporción
                    newWidth = imgWidth/ratio;      //aplico proporción al ancho
                    newHeight = imgHeight / ratio;  //aplico proporción al alto
                    
                } else {
                    // si la imagen tiene una posición vertical
                    ratio = imgHeight / canvasHeight;   //calculo proporción
                    newHeight = imgHeight/ratio;        //aplico proporción al alto
                    newWidth = imgWidth / ratio;        //aplico proporción al ancho
                }
                ctx.drawImage(this, 0, 0, newWidth,newHeight);    //dibujo el canvas
            } else {            
                //si la imagen tiene  medidas menores a las del canvas, mantiene suancho y alto
                newHeight = imgHeight;
                newWidth = imgWidth;
                ctx.drawImage(this, 0, 0, this.newWidth, this.newHeight);   //dibujo el canvas
            }

        } // - Fin cargar
    }

    // - --------------------
    // -       FILTROS
    // - --------------------



   // - Aplicar filtro de binarización
    binarizationFilter(){

        // Se obtienen los  datos de la imagen
        let editedImage = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        let data = editedImage.data;

        // Se recorren los pixeles del array de la imagen
        for(let i =0; i < data.length; i+=4){                    
            let binarizationAVG = (data[i] + data[i + 1] + data[i + 2] )/3;
            if(binarizationAVG >128){
                data[i] =  data[i + 1] =  data[i + 2] = 255;
            }else{
                data[i] =  data[i + 1] =  data[i + 2] = 0;
            }
        }
        // Pintar el canvas con la imagen filtrada
        ctx.putImageData(editedImage, 0, 0);
    }

   // - Aplicar filtro blanco y negros (escalas de grises)
    blackAndWhiteFilter(){
        // Se obtienen los  datos de la imagen
        let editedImage = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        let data = editedImage.data;
        // Se recorn los pixeles del array de la imagen
        for(let i =0; i < data.length; i+=4){                    
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            data[i] = (r + g + b) / 3;
            data[i + 1] = (r + g + b) / 3;
            data[i + 2] = (r + g + b) / 3;
        }
        // Pintar el canvas con la imagen filtrada
        ctx.putImageData(editedImage, 0, 0);
    }

    // -  Filtro Negativo
    negativeFilter(){

        //- El método getImageData() de Canvas 2D  retorna un objeto ImageData
         //que representa los datos de píxeles subyacentes para una parte específica del lienzo.
        
        let editedImage = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        let pixels = editedImage.data;

        // - Recorre los pixeles del array de la imagen
        for(let i = 0; i < pixels.length ; i += 4 ) {
            pixels[i + 0] = 255 - pixels[i + 0]; 
            pixels[i + 1] = 255 - pixels[i + 1];   
            pixels[i + 2] = 255 - pixels[i + 2];    
        }
        // - Pinta los datos del objeto ImageData dado en el lienzo.
        ctx.putImageData(editedImage, 0, 0);
    }

    // - Filtro sepia
    sepiaFilter(){

       //- El método getImageData() de Canvas 2D  retorna un objeto ImageData
         //que representa los datos de píxeles subyacentes para una parte específica del lienzo.

        let editedImage = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        let pixels = editedImage.data;

        // - Recorre los pixeles del array de la imagen
        for(let i = 0; i < pixels.length ; i += 4 ) {
        let luminosidad = 0.3 * pixels[i] + 0.6 * pixels[i + 1] + 0.1 * pixels[i + 2];  //calculo de luminosidad se pudene variar los parámetros
        pixels[i] = Math.min(luminosidad + 40, 255);                                    // rojo toma el mínimo valor entre la suma (luminosidad + 40) y 255
        pixels[i + 1] = Math.min(luminosidad + 15, 255);                                // verde	 toma el mínimo valor entre la suma (luminosidad + 15) y 255
        pixels[i + 2] = luminosidad; // azul																	
        }
        // Pintar el canvas con la imagen filtrada
        ctx.putImageData(editedImage, 0, 0);
    }

     // -  Filtro Contraste
    contrastFilter() {

        //- El método getImageData() de Canvas 2D  retorna un objeto ImageData
        //que representa los datos de píxeles subyacentes para una parte específica del lienzo.
        let editedImage = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        let pixels = editedImage.data;

        //
        let numPixels = editedImage.width * editedImage.height;
        let factor;

        let contrast_default = 40; // valor para que el usuario pueda aplicar sucesivamente el filtro 
        contrast_default || (contrast_default = 10); // Default value - El valor de contraste varia entre -100 y 100
        factor = (259 * (contrast_default + 255)) / (255 * (259 - contrast_default));

        //Recorro los pixeles r , g ,b  y asigno el valor a las variables
        for (let i = 0; i < numPixels; i++) {
            let r = pixels[i * 4];
            let g = pixels[i * 4 + 1];
            let b = pixels[i * 4 + 2];

            //Aplico el factor de contraste a cada color de cada pixel
            pixels[i * 4] = factor * (r - 128) + 128;
            pixels[i * 4 + 1] = factor * (g - 128) + 128;
            pixels[i * 4 + 2] = factor * (b - 128) + 128;
        }
        // Pintar el canvas con la imagen filtrada
        ctx.putImageData(editedImage, 0, 0);
    }

    // - Filtro brillo
    brightnessFilter(){
        const brightnessValue =  50; //parseInt(brightnessSlider.value);

        //- El método getImageData() de Canvas 2D  retorna un objeto ImageData
        //que representa los datos de píxeles subyacentes para una parte específica del lienzo.
        let editedImage = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        let pixels = editedImage.data;

    // Aplicar el filtro de brillo a cada píxel de la imagen
        for (let i = 0; i < pixels.length; i += 4) {
            pixels[i] += brightnessValue; // R
            pixels[i + 1] += brightnessValue; // G
            pixels[i + 2] += brightnessValue; // B
        }

        // Actualizar la imagen con los datos de píxeles modificados
        ctx.putImageData(editedImage, 0, 0);
    }

    // - Kernel Sharpening -
    createKernelSharpening(radio){
        let kernel = [];

        //Inicializa 1ra fila
        let i = 0
        kernel[i] = [];
        kernel[i][0] = (0); kernel[i][1] = (-0.5);  kernel[i][2] = (0);

        //Inicializa 2da fila
        i = 1
        kernel[i] = [];
        kernel[i][0] = (-0.5); kernel[i][1] = (3);  kernel[i][2] = (-0.5);

          //Inicializa 3ra fila
        i = 2
        kernel[i] = [];
        kernel[i][0] = (0); kernel[i][1] = (-0.5);  kernel[i][2] = (0); 

        return kernel;
    }

    // - Kernel Embossed - Relieve  -
    createKernelEmbossed(radio){
        let kernel = [];

        //Inicializa 1ra fila
        let i = 0
        kernel[i] = [];
        kernel[i][0] = (-2); kernel[i][1] = (-1);  kernel[i][2] = (0);

        //Inicializa 2da fila
        i = 1
        kernel[i] = [];
        kernel[i][0] = (-1); kernel[i][1] = (1);  kernel[i][2] = (1);

          //Inicializa 3ra fila
        i = 2
        kernel[i] = [];
        kernel[i][0] = (0); kernel[i][1] = (1);  kernel[i][2] = (2); 

        return kernel;
    }

    createKernelEdges(radio){
        let kernel = [];

        //Inicializa 1ra fila
        let i = 0
        kernel[i] = [];
        kernel[i][0] = (0); kernel[i][1] = (1);  kernel[i][2] = (0);

        //Inicializa 2da fila
        i = 1
        kernel[i] = [];
        kernel[i][0] = (1); kernel[i][1] = (-4);  kernel[i][2] = (1);

          //Inicializa 3ra fila
        i = 2
        kernel[i] = [];
        kernel[i][0] = (0); kernel[i][1] = (1);  kernel[i][2] = (0); 

        return kernel;
    }

    // - Kernel Blur Matriz Guassiana
    createKernelBlur(radio){
        //let size = radio * 2 + 1;
        let kernel = [];

        //Inicializa 1ra fila
        let i = 0
        kernel[i] = [];
        kernel[i][0] = (1/256); kernel[i][1] = (4/256);  kernel[i][2] = (6/256); kernel[i][3] = (4/256) ;; kernel[i][4]=(1/256);

        //Inicializa 2da fila
        i = 1
        kernel[i] = [];
        kernel[i][0] = (4/256); kernel[i][1] = (16/256);  kernel[i][2] = (24/256); kernel[i][3] = (16/256) ;; kernel[i][4]=(4/256);

        //Inicializa 3ra fila
        i = 2
        kernel[i] = [];
        kernel[i][0] = (6/256); kernel[i][1] = (24/256);  kernel[i][2] = (36/256); kernel[i][3] = (24/256) ;; kernel[i][4]=(6/256);

        i = 3
        kernel[i] = [];
        kernel[i][0] = (4/256); kernel[i][1] = (16/256);  kernel[i][2] = (24/256); kernel[i][3] = (16/256) ;; kernel[i][4]=(4/256);

        i=4
        kernel[i] = [];
        kernel[i][0] = (1/256); kernel[i][1] = (4/256);  kernel[i][2] = (6/256); kernel[i][3] = (4/256) ;; kernel[i][4]=(1/256);

        return kernel;
    }

    // - Filtro Blur o Desenfoque
    blurFilter(){
        let radio = 2   //crea una matriz de centro en el valor del radio , , que va de 0, 1, 2, 3, 4 
        let preserveAlpha = false;    //Determina  que no  se preserve un valor específico de "a"
        let imageData = this.ctx.getImageData(0, 0, this.width , this.height);   // Se obtienen los  datos de la imagen
        let kernel = this.createKernelBlur(radio);        // Se obtiene la matrisz de convolución del filtro Blur con radio 2
        let filteredImage = this.applyFilter( imageData, kernel, radio, preserveAlpha);     //Se obtienen los pixeles filtrados por la funcion aplicar filtro
        this.ctx.putImageData(filteredImage, 0, 0);             // Pintar el canvas con la imagen filtrada
    }

    // - Filtro Embossed o Relieve
    embossedFilter(){
        let radio = 1   //crea una matriz de centro en  el valor del radio , que toma los valores 0, 1, 2
        let preserveAlpha = false;      //Determina  que no  se preserve un valor específico de "a"
        let imageData = this.ctx.getImageData(0, 0, this.width , this.height);      // Se obtienen los  datos de la imagen
        let kernel = this.createKernelEmbossed(radio);           // Se obtiene la matriz de convolución del filtro  relieve con radio 1
        let filteredImage = this.applyFilter( imageData, kernel, radio, preserveAlpha);     //Se obtienen los pixeles filtrados por la funcion aplicar filtro
        this.ctx.putImageData(filteredImage, 0, 0);         // Pintar el canvas con la imagen filtrada
    }

    // - Filtro detección de bordes
    edgesFilter(){
        let radio = 1   //crea una matriz de centro en  el valor del radio , que toma los valores 0, 1, 2
        let preserveAlpha = true;       //Determina  que SI se preserve un valor específico de "a"
        let imageData = this.ctx.getImageData(0, 0, this.width , this.height);      // Se obtienen los  datos de la imagen
        let kernel = this.createKernelEdges(radio);         // Se obtiene la matriz de convolución del filtro  bordes con radio 1
        let filteredImage = this.applyFilter( imageData, kernel, radio, preserveAlpha);      //Se obtienen los pixeles filtrados por la funcion aplicar filtro
        this.ctx.putImageData(filteredImage, 0, 0);         // Pintar el canvas con la imagen filtrada
    }

    // - Aplicador de filtros con Kernel
    //Un kernel o máscara de convolución puede entenderse como una matriz de coeficientes 
    //que al ser aplicada en un pixel objetivo (considérese el pixel como un punto (x,y) del plano) 
    //obteniendo una transformación en el pixel objetivo como en sus vecinos
    applyFilter(imageData, kernel, radio, preserveAlpha){

        let imagePixels = imageData.data;
        let filteredImagePixels = new Uint8ClampedArray(imagePixels.length);  //declaro una variable  e inicializo un nuevo array ldonde se guardarán los pixeles que serán filtados 
        
        //Recorre la imagen
        for (let y =0; y < this.height; y++){
            for(let x = 0; x < this.width; x++){

                let index = (x + y * this.width) * 4; // Indice  del pixel  sobre el cual me posiciono
                let r = 0,  g =  0 , b = 0 , s = 0 ; //variables para guardar los valores de los pixels   en srgb
        
                //recorre el kernel
                for( let i = -radio; i <= radio; i++){
                    for(let j = -radio; j <= radio; j++){
            
                        let  neighborPixels =   index + (i * this.width + j)*  4; //indice de los pixeles vecinos conrespecto al pixel "index"
                    
                        if(neighborPixels >= 0 &&  neighborPixels < imagePixels.length){ //Si el pixel vecino es positivo y menor a la longitud del array 
                                                                                            //donde se guardarán los nuevos valores de color

                            let value = kernel[i + radio] [j + radio]; //Se obtiene el valor determinado para cada elemento del kerner 

                            //Suma del producto entre el valor del color del pixel y el valor del kerner
                            r += imagePixels[neighborPixels] * value;
                            g += imagePixels[neighborPixels + 1] * value;
                            b += imagePixels[neighborPixels + 2] * value;
                            s += imagePixels[neighborPixels + 3] * value;
                        }

                    }
                }
                //se asignan los valores a los pixeles filtrados de cada color
                filteredImagePixels[index + 1] = g;
                filteredImagePixels[index + 2] = b;
                filteredImagePixels[index + 3] = s;
                if(preserveAlpha != true){
                    //Guarda los nuevos valores de los colores red, green, blue y opacity en el array de pixeles filtrados
                    filteredImagePixels[index] = r;
                }else{
                    filteredImagePixels[index + 3] = 190; //Asignación del rango específico de  opacidad "a" cuando se aplica filtro de bordes
                }
            }
        }
        //Crea la imagen filtrada
        let filteredImageData = new ImageData(filteredImagePixels, this.width, this.height);
        return filteredImageData ;
    }


}

let xLente, yLente, xRatio, yRatio;

let imgFinal    = document.querySelector('#imgfinal');
let talla       = document.querySelector("#talla");
let lente       = document.querySelector("#lente");
let img         = document.querySelector("#img");
let foto        = document.querySelector('#foto');

class Imagen {
    static 
    zoom(N) {
        /*calculate the ratio between result DIV and lente:*/
        xRatio = imgFinal.offsetWidth / N;
        yRatio = imgFinal.offsetHeight / N;

        lente.style.width   = talla.value + "px";
        lente.style.height  = talla.value + "px";
    
        imgFinal.style.backgroundImage  = "url(" + img.src + ")";
        imgFinal.style.backgroundSize   = (img.width * xRatio) + "px " + (img.height * yRatio) + "px";
        /*execute a function when someone moves the cursor over the image, or the lente:*/
        lente.addEventListener("mousemove", Imagen.lente);
//        img.addEventListener("mousemove", Imagen.lente);
        /* Celular
         * and also for touch screens:*/
        lente.addEventListener("touchmove", Imagen.lente);
//        img.addEventListener("touchmove", Imagen.lente); 
    }
    static
    cargar(evt) {
        var files = evt.target.files; // FileList object
        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {
            // Only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();
            // Closure to capture the file information.
            reader.onload = (function (laImg) {
                return function (e) { //console.log(f, laImg.name);
                    // Render thumbnail.
                    img.src = e.target.result;
                };
            })(f);
            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
        }
    }
    static
    lente(e) {
        let posicion;
        /*prevent any other actions that may occur when moving over the image:*/
        e.preventDefault();
        /*get the cursor's x and y positions:*/
        posicion = Imagen.cursor(e);
        /*calculate the position of the lente:*/
        xLente = posicion.x - (lente.offsetWidth / 2);
        yLente = posicion.y - (lente.offsetHeight / 2);
        /*prevent the lente from being positioned outside the image:*/
        if(xLente > img.width - lente.offsetWidth) {
            xLente = img.width - lente.offsetWidth;
        }
        if(xLente < 0) {
            xLente = 0;
        }
        if(yLente > img.height - lente.offsetHeight) {
            yLente = img.height - lente.offsetHeight;
        }
        if(yLente < 0) {
            yLente = 0;
        }
        /*set the position of the lente:*/
        lente.style.left = xLente + "px";
        lente.style.top = yLente + "px";
    }
    static
    cursor(e) {
        var posicion, x = 0, y = 0;

        e = e || window.event;
        /*get the x and y positions of the image:*/
        posicion = img.getBoundingClientRect();
        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - posicion.left;
        y = e.pageY - posicion.top;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;

        return { x: x, y: y };
    }
}

Imagen.zoom(Number(talla.value));

foto.onchange = function(e) { 
    e.preventDefault();
    Imagen.cargar(e);
};
/*display what the lente "sees":*/
lente.onclick = function() {
    Imagen.zoom(Number(talla.value));
    imgFinal.style.backgroundPosition = "-" + (xLente * xRatio) + "px -" + (yLente * yRatio) + "px";
};
talla.oninput = function(e) {
    e.preventDefault();
    Imagen.zoom(Number(talla.value));
};






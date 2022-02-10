let perfil  = document.querySelector('#perfil');
let foto    = document.querySelector('#files');
let span    = document.createElement('span');
let base64  = document.querySelector('#base64');

function 
cargarImagen(evt) {
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
            return function (e) { console.log(e.target.result);
                // Render thumbnail.
                span.innerHTML = ['<img class="img" src="', e.target.result, '" title="', escape(laImg.name), '"/>'].join('');
                base64.insertBefore(span, null);
                perfil.style.backgroundImage = "url(" + e.target.result + ")";
            };
        })(f);
        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}

foto.addEventListener('change', cargarImagen, false);

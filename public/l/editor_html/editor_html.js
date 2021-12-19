var editorDoc, editorBody;

let cuadro = document.querySelector('#editor');
//let res = document.querySelector('#res');
//let boton = document.querySelector('#boton');

class Editor {
    static
    iniciar() {
        editorDoc   = cuadro.contentWindow.document;
        editorBody  = editorDoc.body;
        // turn off spellcheck
        if ('spellcheck' in editorBody) {    // Firefox
            editorBody.spellcheck = false;
        }

        if ('contentEditable' in editorBody) { // allow contentEditable
            editorBody.contentEditable = true;
        } else {  // Firefox earlier than version 3
            if ('designMode' in editorDoc) { // turn on designMode
                editorDoc.designMode = "on";
            }
        }
    }
}
/* Disparadores
--------------------------------------------------------------------------------*/
window.onload = function() {
    Editor.iniciar();
};
document.querySelector('#bold').onclick = function() {
    editorDoc.execCommand('bold', false, null);
};
document.querySelector('#copy').onclick = function() {
    editorDoc.execCommand('copy', false, null);
};
document.querySelector('#cut').onclick = function() {
    editorDoc.execCommand('cut', false, null);
};
document.querySelector('#undo').onclick = function() {
    editorDoc.execCommand('undo', false, null);
};
document.querySelector('#redo').onclick = function() {
    editorDoc.execCommand('redo', false, null);
};
document.querySelector('#justifyLeft').onclick = function() {
    editorDoc.execCommand('justifyLeft', false, null);
};
document.querySelector('#justifyCenter').onclick = function() {
    editorDoc.execCommand('justifyCenter', false, null);
};
document.querySelector('#justifyRight').onclick = function() {
    editorDoc.execCommand('justifyRight', false, null);
};
document.querySelector('#justifyFull').onclick = function() {
    editorDoc.execCommand('justifyFull', false, null);
};

/* Disparadores: incompletos
--------------------------------------------------------------------------------*/
document.querySelector('#paste').onclick = function() {
    editorDoc.execCommand('paste', false, null);
};










/* uno: funciona para obtener el contenido del iframe
 --------------------------------------------------------------------------------*/
function
getFrameContents() {
    var cuadroBody;

    if (cuadro.contentDocument) { // FF
        cuadroBody = cuadro.contentDocument.getElementsByTagName('body')[0];
    } else if (cuadro.contentWindow) { // IE
        cuadroBody = cuadro.contentWindow.document.getElementsByTagName('body')[0];
    }

    alert(cuadroBody.innerHTML);
}

/* dos: funciona para obtener el contenido del iframe
--------------------------------------------------------------------------------*/
function
obtenerCuadroDos() {
    alert(cuadro.contentWindow.document.body.innerHTML);
}









/* otros: funciona
--------------------------------------------------------------------------------*/
//var editorDoc;
//function 
//InitEditable() {
//    var editor      = document.querySelector('#editor');
//    editorDoc       = editor.contentWindow.document;
//    var editorBody  = editorDoc.body;
//    // turn off spellcheck
//    if ('spellcheck' in editorBody) {    // Firefox
//        editorBody.spellcheck = false;
//    }
//
//    if ('contentEditable' in editorBody) { // allow contentEditable
//        editorBody.contentEditable = true;
//    } else {  // Firefox earlier than version 3
//        if ('designMode' in editorDoc) { // turn on designMode
//            editorDoc.designMode = "on";
//        }
//    }
//}

//function 
//ToggleBold() {
//    editorDoc.execCommand('bold', false, null);
//}

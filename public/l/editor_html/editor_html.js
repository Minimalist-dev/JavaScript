let cuadro = document.querySelector('#editor');
//let res = document.querySelector('#res');
//let boton = document.querySelector('#boton');

/* uno: funciona
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

/* dos: funciona
--------------------------------------------------------------------------------*/
function
obtenerCuadroDos() {
    alert(cuadro.contentWindow.document.body.innerHTML);
}

/* otros: funciona
--------------------------------------------------------------------------------*/
var editorDoc;
function 
InitEditable() {
    var editor = document.getElementById("editor");
    editorDoc = editor.contentWindow.document;
    var editorBody = editorDoc.body;

    // turn off spellcheck
    if ('spellcheck' in editorBody) {    // Firefox
        editorBody.spellcheck = false;
    }

    if ('contentEditable' in editorBody) {
        // allow contentEditable
        editorBody.contentEditable = true;
    } else {  // Firefox earlier than version 3
        if ('designMode' in editorDoc) {
            // turn on designMode
            editorDoc.designMode = "on";
        }
    }
}

function 
ToggleBold() {
    editorDoc.execCommand('bold', false, null);
}

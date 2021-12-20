//user_pref("capability.policy.policynames", "allowclipboard");
//user_pref("capability.policy.allowclipboard.sites", "https://www.mozilla.org");
//user_pref("capability.policy.allowclipboard.Clipboard.cutcopy", "allAccess");
//user_pref("capability.policy.allowclipboard.Clipboard.paste", "allAccess");

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
}var copyText;
/* Disparadores
--------------------------------------------------------------------------------*/
window.onload = function() {
    Editor.iniciar();
};
document.querySelector('#bold').onclick = function() {
    editorDoc.execCommand('bold', false, null);
};
document.querySelector('#italic').onclick = function() {
    editorDoc.execCommand('italic', false, null);
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
document.querySelector('#delete').onclick = function() {
    editorDoc.execCommand('delete', false, null);
};
document.querySelector('#createLink').onclick = function() {
    editorDoc.execCommand('createLink', false, 'https://www.google.com/');
};
document.querySelector('#fontSize').onclick = function() {
    editorDoc.execCommand('fontSize', false, '100px');
};
document.querySelector('#fontName').onclick = function() {
    editorDoc.execCommand('fontName', false, "Lucida Console, Courier, monospace");
};
document.querySelector('#foreColor').onclick = function() {
    editorDoc.execCommand('foreColor', false, 'red');
};
document.querySelector('#backColor').onclick = function() {
    editorDoc.execCommand('backColor', false, 'red');
};
document.querySelector('#insertImage').onclick = function() {
    editorDoc.execCommand('insertImage', false, '/i_img/i/neury-dev.jpg');
};
document.querySelector('#insertHTML').onclick = function() {
    editorDoc.execCommand('insertHTML', false, "<h1>HTML</h1>");
};
document.querySelector('#insertHorizontalRule').onclick = function() {
    editorDoc.execCommand('insertHorizontalRule', false, 'hr');
};
document.querySelector('#forwardDelete').onclick = function() {
    editorDoc.execCommand('forwardDelete', false, null);
};
document.querySelector('#formatBlock').onclick = function() {
    editorDoc.execCommand('formatBlock', false, 'h1');
};
document.querySelector('#insertLineBreak').onclick = function() {
    editorDoc.execCommand('insertLineBreak', false, 'br');
};
document.querySelector('#insertOrderedList').onclick = function() {
    editorDoc.execCommand('insertOrderedList', false, null);
};
document.querySelector('#insertParagraph').onclick = function() {
    editorDoc.execCommand('insertParagraph', false, 'p');
};
document.querySelector('#insertText').onclick = function() {
    editorDoc.execCommand('insertText', false, '<Texto');
};
document.querySelector('#insertUnorderedList').onclick = function() {
    editorDoc.execCommand('insertUnorderedList', false, null);
};
document.querySelector('#outdent').onclick = function() {
    editorDoc.execCommand('outdent', false, null);
};
document.querySelector('#indent').onclick = function() {
    editorDoc.execCommand('indent', false, null);
};
document.querySelector('#selectAll').onclick = function() {
    editorDoc.execCommand('selectAll', false, null);
};
document.querySelector('#strikethrough').onclick = function() {
    editorDoc.execCommand('strikethrough', false, null);
};
document.querySelector('#superscript').onclick = function() {
    editorDoc.execCommand('superscript', false, null);
};
document.querySelector('#subscript').onclick = function() {
    editorDoc.execCommand('subscript', false, null);
};
document.querySelector('#hiliteColor').onclick = function() {
    editorDoc.execCommand('hiliteColor', false, "#000000");
};
document.querySelector('#removeFormat').onclick = function() {
    editorDoc.execCommand('removeFormat', false, null);
};
document.querySelector('#underline').onclick = function() {
    editorDoc.execCommand('underline', false, null);
};
document.querySelector('#unlink').onclick = function() {
    editorDoc.execCommand('unlink', false, null);
};

/* Disparadores: incompletos
--------------------------------------------------------------------------------*/
//paste
//    Pega el contenido del portapapeles en el punto de inserción (reemplaza la selección actual). Capacidad del Portapapeles debe estar habilitado en el archivo de preferencias user.js. Ver
//document.querySelector('#paste').onclick = function() {
//    editorDoc.execCommand('paste', false, copyText);
//};










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

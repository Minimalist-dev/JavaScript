const PDFDocument   = require('pdfkit');
const fs            = require('fs');
const doc           = new PDFDocument;
const objeto        = {};

class Global {
    static
    cambios() {

    }
}
objeto.guardar = function(req, res) {
//    doc.text('Hola mundo con PDF kit', 30, 30);
//    
//    doc.pipe(fs.createWriteStream('public/s_db/l/generar_pdf/file3.pdf')); 
//    doc.pipe(res);                               
//
//    doc.end();
    var i = 0;
    const filename = `file${ (i += 1) }.pdf`;

    const  stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-desposition': `attachment;filename=${filename}`
    });
    
    doc.on('data', (data) => { stream.write(data); });
    doc.on('end', () => { stream.end(); });
};

module.exports = objeto;


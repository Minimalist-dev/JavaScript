const PDFDocument   = require('pdfkit');
const fs            = require('fs');
const objeto        = {};
//const PdfTable      = require('voilab-pdf-table');
const doc           = new PDFDocument;

class PDF {
    static 
    texto(doc, text, color, fuente, size, alinear, espacio, brecha, ancho, altura) {
        doc.x = ancho;
        
        if(altura !== null) { doc.y = altura; } 
        else if(altura === null) { }
        
        doc.fillColor(color);
        doc.font(fuente);
        doc.fontSize(size);
        doc.text(text, {
            paragraphGap: espacio,
            lineGap: brecha,
            indent: 5,
            align: alinear,
            columns: 1
        });
        return doc;
    }
    static 
    linea(doc, heigth) {
        doc.lineWidth(1).lineCap('butt').moveTo(35, heigth).lineTo(540, heigth).stroke();
        return doc;
    }
}
objeto.guardar = function(req, res) {
//    doc.addPage({ size: 'A4' });
    
//    doc.addPage({
//        margins: {
//            top: 50,
//            bottom: 50,
//            left: 72,
//            right: 72
//        }
//    });

// Fit the image within the dimensions
//doc.image('public/i_img/i/neury-dev.jpg', 320, 15, {fit: [100, 100]})
//   .rect(320, 15, 100, 100)
//   .stroke()
//   .text('Fit', 320, 0);

// Fit the image in the dimensions, and center it both horizontally and vertically
doc.image('public/i_img/i/neury-dev.jpg', 430, 30, {fit: [100, 100], align: 'center', valign: 'center'})
   .rect(430, 30, 100, 100).stroke();
//   .text('Centered', 430, 0);

var color_1 = '#457725';
var color_2 = '#1c1d22';
var size_1 = 50;
var size_2 = 14;
var size_3 = 10;
var brecha_1 = 1;
var brecha_2 = 5;

PDF.texto(doc, 'FACTURA', color_1, 'Helvetica-Bold', size_1, 'left', 5, brecha_1, 30, null);
PDF.texto(doc, 'Rojo Polo Paella Inc.', color_2, 'Helvetica-Bold', size_3, 'left', 1, brecha_1, 30, null);
PDF.texto(doc, 'Carretera Muelle 38', color_2, 'Helvetica-Bold', size_3, 'left', 1, brecha_1, 30, null);
PDF.texto(doc, '37531 Ávila, Ávila', color_2, 'Helvetica', size_3, 'left', 10, brecha_1, 30, null);

PDF.texto(doc, 'FACTURAR A', color_1, 'Helvetica-Bold', size_2, 'left', 1, brecha_1, 30, null);
PDF.texto(doc, 'Leda Villareal', color_2, 'Helvetica', size_3, 'left', 1, brecha_1, 30, null);
PDF.texto(doc, 'Virgen Blanca 63', color_2, 'Helvetica', size_3, 'left', 1, brecha_1, 30, null);
PDF.texto(doc, '08759 Burgos, Burgos', color_2, 'Helvetica', size_3, 'left', 1, brecha_1, 30, null);

PDF.texto(doc, 'ENVIAR A', color_1, 'Helvetica-Bold', size_2, 'left', 1, brecha_1, 170, 184);
PDF.texto(doc, 'Leda Villareal', color_2, 'Helvetica', size_3, 'left', 1, brecha_1, 170, null);
PDF.texto(doc, 'Cercas Bajas 68', color_2, 'Helvetica', size_3, 'left', 1, brecha_1, 170, null);
PDF.texto(doc, '47300 Cádiz, Cádiz', color_2, 'Helvetica', size_3, 'left', 1, brecha_1, 170, null);

PDF.texto(doc, 'Nº DE FACTURA', color_1, 'Helvetica-Bold', size_2, 'left', 1, brecha_1, 290, 184);
PDF.texto(doc, 'FECHA', color_1, 'Helvetica-Bold', size_2, 'left', 1, brecha_1, 290, null);
PDF.texto(doc, 'Nº DE PEDIDO', color_1, 'Helvetica-Bold', size_2, 'left', 1, brecha_1, 290, null);
PDF.texto(doc, 'FECHA VENCIMIENTO', color_1, 'Helvetica-Bold', size_2, 'left', 1, brecha_1, 290, null);

PDF.texto(doc, 'Es-001', color_2, 'Helvetica', size_3, 'right', 1, brecha_1, 450, 187);
PDF.texto(doc, '24/12/2021', color_2, 'Helvetica', size_3, 'right', 1, brecha_1, 450, 206);
PDF.texto(doc, '1730/2021', color_2, 'Helvetica', size_3, 'right', 1, brecha_1, 450, 224.5);
PDF.texto(doc, '24/12/2021', color_2, 'Helvetica', size_3, 'right', 10, brecha_1, 450, 243);

PDF.texto(doc, 'CANT.', color_1, 'Helvetica-Bold', size_2, 'left', 1, brecha_1, 30, 275);
PDF.texto(doc, 'DESCRICIÓN', color_1, 'Helvetica-Bold', size_2, 'left', 1, brecha_1, 100, 275);//170
PDF.texto(doc, 'PRECIO UNITARIO', color_1, 'Helvetica-Bold', size_2, 'left', 1, brecha_1, 280, 275);//290
PDF.texto(doc, 'IMPORTE', color_1, 'Helvetica-Bold', size_2, 'right', 1, brecha_1, 450, 275);//mas

PDF.linea(doc, 270);
PDF.linea(doc, 290);

PDF.texto(doc, '1', color_2, 'Helvetica', size_3, 'left', 1, brecha_1, 45, null);
PDF.texto(doc, '2', color_2, 'Helvetica', size_3, 'left', 1, brecha_1, 45, null);
PDF.texto(doc, '3', color_2, 'Helvetica', size_3, 'left', 1, brecha_1, 45, null);

PDF.texto(doc, 'Talla pequeña traje de luces en rojo', color_2, 'Helvetica', size_3, 'left', 1, brecha_1, 100, 293.5);
PDF.texto(doc, 'Mui grande churrolito', color_2, 'Helvetica', size_3, 'left', 1, brecha_1, 100, null);
PDF.texto(doc, 'Equipaje de Fútbol', color_2, 'Helvetica', size_3, 'left', 1, brecha_1, 100, null);

doc.fontSize(10).fillColor(color_2).text('100.00', 308, 293.5, {
    width: 100,
    paragraphGap: 1,
    lineGap: 1,
    indent: 5,
    align: 'right',
    columns: 1
});
doc.fontSize(12).fillColor(color_2).text('25.00', 308, null, {
    width: 100,
    paragraphGap: 1,
    lineGap: 1,
    indent: 5,
    align: 'right',
    columns: 1
});
doc.fontSize(12).fillColor(color_2).text('5.00', 308, null, {
    width: 100,
    paragraphGap: 1,
    lineGap: 1,
    indent: 5,
    align: 'right',
    columns: 1
});

PDF.texto(doc, '100.00', color_2, 'Helvetica', size_3, 'right', 1, brecha_1, 450, 293.5);
PDF.texto(doc, '50.00', color_2, 'Helvetica', size_3, 'right', 1, brecha_1, 450, null);
PDF.texto(doc, '15.00', color_2, 'Helvetica', size_3, 'right', 10, brecha_1, 450, null);

doc.font('Helvetica');
doc.fontSize(size_3).fillColor(color_2).text('Subtotal', 308, 353.5, {
    width: 100,
    paragraphGap: 1,
    lineGap: 1,
    indent: 5,
    align: 'right',
    columns: 1
});
doc.fontSize(size_3).fillColor(color_2).text('165.00', 308, 353.5, {
    paragraphGap: 1,
    lineGap: 1,
    indent: 5,
    align: 'right',
    columns: 1
});

doc.fontSize(size_3).fillColor(color_2).text('IVA 21.0%', 308, 383.5, {
    width: 100,
    paragraphGap: 1,
    lineGap: 1,
    indent: 5,
    align: 'right',
    columns: 1
});
doc.fontSize(size_3).fillColor(color_2).text('34.65', 308, 383.5, {
    paragraphGap: 1,
    lineGap: 1,
    indent: 5,
    align: 'right',
    columns: 1
});

doc.font('Helvetica-Bold');
doc.fontSize(size_2).fillColor(color_1).text('TOTAL', 308, 413.5, {
    width: 100,
    paragraphGap: 1,
    lineGap: 1,
    indent: 5,
    align: 'right',
    columns: 1
});
doc.fontSize(size_2).fillColor(color_1).text('199.65 $', 308, 413.5, {
    paragraphGap: 1,
    lineGap: 1,
    indent: 5,
    align: 'right',
    columns: 1
});

doc.pipe(fs.createWriteStream('public/s_db/l/generar_pdf/archivo.pdf')); 
doc.pipe(res);                               

doc.end();

//    row(doc, 90);
//    row(doc, 110);
//    row(doc, 130);
//    row(doc, 150);
//    row(doc, 170);
//    row(doc, 190);
//    row(doc, 210);
//
//    textInRowFirst(doc, 'Nombre o razón social', 100);
//    textInRowFirst(doc, 'RUT', 120);
//    textInRowFirst(doc, 'Dirección', 140);
//    textInRowFirst(doc, 'Comuna', 160);
//    textInRowFirst(doc, 'Ciudad', 180);
//    textInRowFirst(doc, 'Telefono', 200);
//    textInRowFirst(doc, 'e-mail', 220);
//    function textInRowFirst(doc, text, heigth) {
//        doc.y = heigth;
//        doc.x = 30;
//        doc.fillColor('black');
//        doc.text(text, {
//            paragraphGap: 5,
//            indent: 5,
//            align: 'justify',
//            columns: 1
//        });
//        return doc;
//    }
//    function row(doc, heigth) {
//        doc.lineJoin('miter')
//                .rect(30, heigth, 500, 20)
//                .stroke();
//        return doc;
//    }
};

module.exports = objeto;


const PDFDocument       = require('pdfkit');
const PDFTable          = require("pdfkit-table");
const PDFTables         = require("./pdfkit-tables");//local
const PdfkitConstruct   = require('pdfkit-construct');
const fs                = require('fs');
const objeto            = {};
const URL               = "public/s_db/l/pdf/";

const patients = require("./patients.json");

const doc = new PDFDocument({
    size: 'A4',
    margins: {
            top: 50,
            bottom: 50,
            left: 72,
            right: 72
        }
});
const docTables = new PDFTables();
const docTable = new PDFTable({ 
    margin: 30, 
    size: 'A4' 
});
const docConstruct = new PdfkitConstruct({
    size: 'A4',
    margins: {
        top: 20, 
        left: 10, 
        right: 10, 
        bottom: 20
    },
    bufferPages: true
});

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
    documento(req, doc, res) {
        doc.image('public/i_img/i/neury-dev.jpg', 430, 30, {fit: [100, 100], align: 'center', valign: 'center'})
           .rect(430, 30, 100, 100).stroke();
        //   .text('Centered', 430, 0);

        var color_1 = '#457725';
        var color_2 = '#1c1d22';
        var size_1 = 50;
        var size_2 = 14;

        PDF.texto(doc, 'Documento ' + req, color_1, 'Helvetica-Bold', size_1, 'left', 5, 1, 30, null);
        PDF.texto(doc, '37531 Ávila, Ávila', color_2, 'Helvetica', size_2, 'left', 10, 1, 30, null);

        doc.pipe(fs.createWriteStream(URL + `doc_${req}.pdf`)); 
        doc.pipe(res);                               
        doc.end();    
    }
    static
    tabla(req, doc, res) {
            // require
            // A4 595.28 x 841.89 (portrait) (about width sizes)
            const table = {
                title: "Title",
                subtitle: "Subtitle",
                headers: [
                    { label: "Name",        property: 'name',           width: 60,  renderer: null  },
                    { label: "Description", property: 'description',    width: 150, renderer: null  },
                    { label: "Price 1",     property: 'price1',         width: 100, renderer: null  },
                    { label: "Price 2",     property: 'price2',         width: 100, renderer: null  },
                    { label: "Price 3",     property: 'price3',         width: 80,  renderer: null  },
                    { label: "Price 4",     property: 'price4',         width: 43,
                        renderer: function(value, indexColumn, indexRow, row) {
                            return `U$ ${Number(value).toFixed(2)}`;
                        }
                    }
                ],
                datas: [
                    {
                        name: 'Name 1',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis ante in laoreet egestas. ',
                        price1: '$1',
                        price3: '$ 3',
                        price2: '$2',
                        price4: '4'
                    },
                    {
                        options: { 
                            fontSize: 10, 
                            separation: true 
                        },
                        name: 'bold:Name 2',
                        description: 'bold:Lorem ipsum dolor.',
                        price1: 'bold:$1',
                        price3: '$3',
                        price2: '$2',
                        price4: '4'
                    },
                    {
                        name: 'Name 3',
                        description: 'Lorem ipsum dolor.',
                        price1: 'bold:$1',
                        price4: '4',
                        price2: '$2',
                        price3: {
                            label: 'PRICE $3', 
                            options: {
                                fontSize: 12
                            }
                        }
                    }
                ],
                rows: [
                    [
                        "Apple",
                        "Nullam ut facilisis mi. Nunc dignissim ex ac vulputate facilisis.",
                        "$ 105,99",
                        "$ 105,99",
                        "$ 105,99",
                        "105.99"
                    ],
                    [
                        "Tire",
                        "Donec ac tincidunt nisi, sit amet tincidunt mauris. Fusce venenatis tristique quam, nec rhoncus eros volutpat nec. Donec fringilla ut lorem vitae maximus. Morbi ex erat, luctus eu nulla sit amet, facilisis porttitor mi.",
                        "$ 105,99",
                        "$ 105,99",
                        "$ 105,99",
                        "105.99"
                    ]
                ]
            };

            docTable.table(table, {
                prepareHeader: function() { docTable.font("Helvetica-Bold").fontSize(8); },
                prepareRow: function(row, indexColumn, indexRow, rectRow) {
                    docTable.font("Helvetica").fontSize(8);
                    indexColumn === 0 && docTable.addBackground(rectRow, 'blue', 0.15);
                }
            });
        doc.pipe(fs.createWriteStream(URL + `table_${req}.pdf`));
        doc.pipe(res);
        doc.end();
    }
    static
    docAndTable(req, doc, res) {
         getDbData().then(function(products) {

            for (let i = 0; i < products.length; i++) {
                products[i].amount = (products[i].price * products[i].quantity).toFixed(2);
                products[i].price = products[i].price.toFixed(2);
            }
            // Create a document
//            const doc = new PdfkitConstruct({
//                size: 'A4',
//                margins: {top: 20, left: 10, right: 10, bottom: 20},
//                bufferPages: true
//            });
            // set the header to render in every page
            doc.setDocumentHeader({}, function() {
                doc.lineJoin('miter')
                    .rect(0, 0, doc.page.width, doc.header.options.heightNumber).fill("#ededed");

                doc.fill("#115dc8")
                    .fontSize(20)
                    .text("Hello world header", doc.header.x, doc.header.y);
            });
            // set the footer to render in every page
            doc.setDocumentFooter({}, function() {
                doc.lineJoin('miter')
                    .rect(0, doc.footer.y, doc.page.width, doc.footer.options.heightNumber).fill("#c2edbe");

                doc.fill("#7416c8")
                    .fontSize(8)
                    .text("Hello world footer", doc.footer.x, doc.footer.y + 10);
            });
            // add a table (you can add multiple tables with different columns)
            // make sure every column has a key. keys should be unique
            doc.addTable(
                [
                    {key: 'name', label: 'Product', align: 'left'},
                    {key: 'brand', label: 'Brand', align: 'left'},
                    {key: 'price', label: 'Price', align: 'right'},
                    {key: 'quantity', label: 'Quantity'},
                    {key: 'amount', label: 'Amount', align: 'right'}
                ],
                products, {
                    border: null,
                    width: "fill_body",
                    striped: true,
                    stripedColors: ["#f6f6f6", "#d6c4dd"],
                    cellsPadding: 10,
                    marginLeft: 45,
                    marginRight: 45,
                    headAlign: 'center'
                });
            // render tables
            doc.render();
            // this should be the last
            // for this to work you need to set bufferPages to true in constructor options 
            doc.setPageNumbers((p, c) => `Page ${p} of ${c}`, "bottom right");

            doc.pipe(fs.createWriteStream(URL + `doc_and_table_${req}.pdf`)); 
            doc.pipe(res);                               
            doc.end();
        }).catch(error => {
            res.status(200).send(error.stack);
        });
        function 
        getDbData() {
            return new Promise(function(resolve, reject) {
                resolve([
                    {
                        "id": 7631,
                        "SKU": "HEH-9133",
                        "name": "On Cloud Nine Pillow On Cloud Nine Pillow On Cloud Nine Pillow On Cloud Nine Pillow",
                        "price": 24.99,
                        "brand": "FabDecor",
                        "quantity": 1,
                        "created_at": "2018-03-03 17:41:13"
                    },
                    {
                        "id": 7615,
                        "SKU": "HEH-2245",
                        "name": "Simply Sweet Blouse",
                        "price": 42,
                        "brand": "Entity Apparel",
                        "quantity": 2,
                        "created_at": "2018-03-20 22:24:21"
                    },
                    {
                        "id": 8100,
                        "SKU": "WKS-6016",
                        "name": "Uptown Girl Blouse",
                        "price": 58,
                        "brand": "Entity Apparel",
                        "quantity": 3,
                        "created_at": "2018-03-16 21:55:28"
                    }]);
            });
        }
    }
}
objeto.guardar = function(req, res) { 
    let { formato, medida } = req.body;
    console.log(formato, medida);
    if(formato === 'Doc')               { PDF.documento(medida, doc, res);              }
    else if(formato === 'Table')        { PDF.tabla(medida, docTable, res);             }
    else if(formato === 'Construct')    { PDF.docAndTable(medida, docConstruct, res);   }
    else {
        docTables
            .image("public/i_img/i/neury-dev.jpg", 50, 45, { width: 50 })
            .fillColor("#444444")
            .fontSize(20)
            .text("Patient Information.", 110, 57)
            .fontSize(10)
            .text("725 Fowler Avenue", 200, 65, { align: "right" })
            .text("Chamblee, GA 30341", 200, 80, { align: "right" })
            .moveDown();
        // Create the table - https://www.andronio.me/2017/09/02/pdfkit-tables/
        const table = {
            headers: ["Name", "Address", "Phone", "Birthday", "Email Address", "Blood Type", "Height", "Weight"],
            rows: []
        };
        // Add the patients to the table
        for (const patient of patients) {
            table.rows.push([patient.name, patient.address, patient.phone, patient.birthday, patient.emailAddress, patient.bloodType, patient.height, patient.weight]);
        }
        // Draw the table
        docTables.moveDown().table(table, 10, 125, { width: 590 });

        docTables.pipe(fs.createWriteStream(URL + "generar_" + req.params.id + ".pdf"));
        docTables.pipe(res);
//        res.send(req.params.id);
        docTables.end(); 
    } 
};

module.exports = objeto;


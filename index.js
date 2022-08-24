const express = require("express");
const ptp = require("unix-print");
const path = require("path");
const app = express();
const public = path.join(__dirname, 'public');
const port = 3000;
const pdfFile = './assets/dummy.pdf';

app.get('/', function (req, res) {
    res.sendFile(path.join(public, 'index.html'));
});

app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root

app.use('/print', async (req, res) => {
    // const printers = await ptp.getPrinters();
    // const defaultPrinter = await ptp.getDefaultPrinter();
    // console.log('printers', printers);
    // console.log('defaultPrinter', defaultPrinter);
    const printer = 'Rollo';
    const options = ["-o landscape", "-o fit-to-page", "-o media=A4"];
    const result = await ptp.print(pdfFile, printer, options);
    console.log('result', result);
    res.status(204);
    res.send();
})

app.listen(port, () => {
    console.log(`PDF Printing Service listening on http://localhost:${port}`)
});
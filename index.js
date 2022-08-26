const express = require("express");
const ptp = require("unix-print");
const path = require("path");
const logger = require("./logger");
const app = express();
const public = path.join(__dirname, 'public');
const port = process.env.PORT || 9000;
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
    // const printer = 'Rollo';
    // const options = ["-o landscape", "-o fit-to-page", "-o media=A4"];
    // const result = await ptp.print(pdfFile, printer, options);
    try {
        const result = await ptp.print(pdfFile);
        console.log('result', result);
        logger.info(`Print result -> ${JSON.stringify(result)}`)
        res.status(204);
        res.send();
    } catch (error) {
        logger.info(`Print error -> ${JSON.stringify(error)}`)
        res.status(204);
        res.send();
    }

})

app.listen(port, async () => {
    console.log(`${process.env.PROJECT} is listening on http://localhost:${port}`)
    // logger.info(`${process.env.PROJECT} is listening on http://localhost:${port}`)
    // const printers = await ptp.getPrinters();
    // const defaultPrinter = await ptp.getDefaultPrinter();
    // logger.info(`Available Printers -> ${JSON.stringify(printers)}`)
    // logger.info(`defaultPrinter -> ${JSON.stringify(defaultPrinter)}`)
});
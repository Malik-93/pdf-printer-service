const express = require("express");
const ptp = require("unix-print");
const path = require("path");
const logger = require("./logger");
const upload = require("./multer");
const fs = require("fs");
const cors = require('cors');
const app = express();
const public = path.join(__dirname, 'public');
const port = process.env.PORT || 9000;
// const pdfFile = './assets/dummy.pdf';
app.get('/', function (req, res) {
    res.sendFile(path.join(public, 'index.html'));
});
app.use(cors())
app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); //  "public" off of current is root

app.post('/print', upload('uploads').single('file'), async (req, res) => {
    try {
        // const printer = 'Rollo';
        // const options = ["-o landscape", "-o fit-to-page", "-o media=A4"];
        // const result = await ptp.print(pdfFile, printer, options);
        const filePath = `${req.file.path}`;
        console.log('filePath', filePath);
        logger.info(`filePath -> ${filePath}`)
        const result = await ptp.print(filePath);
        console.log(`Print result -> ${JSON.stringify(result)}`)
        logger.info(`Print result -> ${JSON.stringify(result)}`)
        fs.unlink(filePath, err => {
            if (err) {
                console.log(`An error accured while deleting the ${filePath} file ..`)
                logger.error(`An error accured while deleting the ${filePath} file ..`)
            }
            else {
                console.log(`${filePath} file has been deleted..`)
                logger.info(`${filePath} file has been deleted..`)
            }
        });
        return res.status(200).json({ success: true, message: "Request has been sent to printer..." });
    } catch (error) {
        console.log(`Print error -> ${JSON.stringify(error)}`)
        logger.error(`Print error -> ${JSON.stringify(error)}`)
        return res.status(500).json({ success: false, message: "Ooops! Something went wrong..." });
    }

})

app.listen(port, async () => {
    console.log(`${process.env.PROJECT} is listening on http://localhost:${port}`)
    logger.info(`${process.env.PROJECT} is listening on http://localhost:${port}`)
    // const printers = await ptp.getPrinters();
    // const defaultPrinter = await ptp.getDefaultPrinter();
    // logger.info(`Available Printers -> ${JSON.stringify(printers)}`)
    // logger.info(`defaultPrinter -> ${JSON.stringify(defaultPrinter)}`)
});
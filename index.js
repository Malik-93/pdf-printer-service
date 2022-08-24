const express = require("express");
const ptp = require("unix-print");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;
const public = path.join(__dirname, 'public');

app.get('/', function (req, res) {
    res.sendFile(path.join(public, 'index.html'));
});

app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root

app.use('/print', async (req, res) => {
    // const data = await ptp.getDefaultPrinter();
    // console.log(data);
    const printer = "Rollo";
    const options = ["-o landscape", "-o fit-to-page", "-o media=A4"];
    ptp.print("./assets/pdfFile.pdf", printer, options).then(console.log);
    res.status(204);
    res.send();
})

app.listen(port, () => {
    console.log(`PDF Printing Service listening on port ${port}`)
});
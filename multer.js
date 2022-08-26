const multer = require('multer');
const fs = require('fs')
const path = require('path');
const crypto = require('crypto');
const storage = dirPath => multer.diskStorage({
    destination: (req, file, next) => {
        fs.exists(dirPath, (exist) => {
            if (exist) {
                next(null, dirPath)
            } else {
                fs.mkdir(dirPath, (err, folder) => {
                    next(null, dirPath);
                })
            }
        })
    },
    filename: (req, file, next) => {
        var hash = `${crypto.randomBytes(20).toString('hex')}`;
        next(null, file.fieldname + '-' + hash + path.extname(file.originalname));
    }
})
const upload = (dirName) => multer({
    storage: storage(dirName),
});

module.exports = upload;
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = async (req, _res, next) => {
    if (req.file) {
        const { filename, path:temp_image } = req.file;

        await sharp(req.file.path)
            .resize(800)
            .jpeg({ quality: 100 })
            .toFile(path.resolve(req.file.destination, '', filename.replace('_temp','')));
        fs.unlinkSync(temp_image);
    }

    next();
};

const jimp = require('jimp');

module.exports = async (req, _res, next) => {
    // // Read the image.
    // console.log(req.file);
    // const image = await jimp.read(req.file.path);
    // console.log("a");

    // // Resize the image to width 150 and auto height.
    // await image.resize(1200 * .9, jimp.AUTO);
    // console.log("b");

    // // Save and overwrite the image
    // await image.writeAsync('images/a.gif');
    // // await image.writeAsync(req.file.path);
    // console.log("c");

    // next();

    jimp.read(req.file.path)
    .then(image => {
     const hash = image.hash() + '.gif'
     image.write('images/' + hash)
     resolve({ success: true, hash: hash })
    })
    .catch(err => {
     reject({ err: err })
    })
};


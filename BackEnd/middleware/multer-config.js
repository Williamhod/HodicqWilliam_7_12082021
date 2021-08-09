const multer = require('multer');

//prettier-ignore
const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg': 'jpg',
    'image/png' : 'png',
};

//dictionnaire des type de fichier pris par le front jpeg qui sera traduis en jpg

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
        //destination des images dans le dossier images
  },
    filename: (req, file, callback) => {
        let name = file.originalname.replaceAll(' ', '_');          // remplace les espace par un _
        name = name.substring(0, name.lastIndexOf('.'));            //ici enleve a partir du dernier point tout le contenu
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + '_' + Date.now() + '.' + extension);  //nom + _ +date+ .+ extension
    },
});

module.exports = multer({ storage: storage }).single('image');

//middlewar servant a la gestion de fichier ici les images

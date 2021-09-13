const multer = require('multer');

/****************************
 **  Files    controller    *
 ***************************/

// file type accepted 
//prettier-ignore
const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg': 'jpg',
    'image/png' : 'jpg',
    'image/gif' : 'gif',
};



const storage = multer.diskStorage({
    destination: (_req, _file, callback) => {
        callback(null, 'images');
        //destination des images dans le dossier images
  },
    filename: (_req, file, callback) => {
        let name = file.originalname.replace(/\s/g, '_');          // remplace les espace par un _
        name = name.substring(0, name.lastIndexOf('.'));            //ici enleve a partir du dernier point tout le contenu
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + '_' + Date.now() + '.' + extension);  //nom + _ +date+ .+ extension   
    },
});

module.exports = multer({ storage: storage }).single('image');

//middlewar servant a la gestion de fichier ici les images

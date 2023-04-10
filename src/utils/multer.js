// import {fileURLToPath} from 'url';

// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);


// export default __dirname


const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, `${__dirname}/public/uploads`)
    },
    filename: function(req, file, cb){
        console.log('file: ',file)
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const uploader = multer({
    storage,
    onError: function(error, next){
        console.log(error)
        next()
    }
})



module.exports = {
    uploader
}

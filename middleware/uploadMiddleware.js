const multer = require('multer');
const path = require('path');


const generateRandomString = (length) => {
    return Math.random().toString(36).substring(2, 2 + length);
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const timestamp = Date.now();
        const randomString = generateRandomString(12);
        cb(null, `${file.fieldname}-${Date.now()}-${randomString}${ext}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },  //5 mb limit    
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
             'image/png',
             'image/jpeg',
             'image/png',
             'image/bmp',
             'image/webp',
              'image/jpg',
             'image/svg+xml'
             ];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Unsupported file type'), false);
        }
        cb(null, true);
    }
});

module.exports = upload;
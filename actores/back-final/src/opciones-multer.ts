
const multer = require('multer');
export const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './subidos');
    },
    filename(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + '.jpg');
    },
});
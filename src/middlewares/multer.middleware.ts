import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log(file);
    cb(null, path.join(__dirname, '../controllers/uploads'));
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({
  storage,
}).single('fileUpload');

export default upload
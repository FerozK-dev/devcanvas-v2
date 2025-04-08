import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../../tmp/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const allowedMimeTypes: Record<string, RegExp> = {
  profilePicture: /^image\/(jpeg|png|jpg|webp)$/,
  resume: /^application\/pdf$/,
  displayImage: /^image\/(jpeg|png|jpg|webp)$/,
};

const fileFilter: multer.Options['fileFilter'] = (req, file, cb) => {
  const field = file.fieldname;

  if (field in allowedMimeTypes) {
    const regex = allowedMimeTypes[field];
    if (regex.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type for ${field}`));
    }
  } else {
    cb(new Error("Unexpected field"));
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter
});

export default upload;

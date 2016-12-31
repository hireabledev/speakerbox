import path from 'path';
import multer from 'multer';
import multerS3 from 'multer-s3';
import uuid from 'uuid';
import { s3 } from './aws';
import { AWS_S3_BUCKET } from './config';

export const upload = multer({
  storage: multerS3({
    s3,
    bucket: AWS_S3_BUCKET,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
      cb(null, `${uuid.v4()}${path.extname(file.originalname)}`);
    },
  }),
});

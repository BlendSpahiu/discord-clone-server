import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import {
    AWS_BUCKET_NAME,
    AWS_ENDPOINT_URL,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_FILE_UPLOAD_MAX_SIZE_MB,
} from '../config/aws';

const spacesEndpoint = new AWS.Endpoint(AWS_ENDPOINT_URL);
const maxSize = parseInt(AWS_FILE_UPLOAD_MAX_SIZE_MB) * 1024 * 1024;

export const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
});

export const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: AWS_BUCKET_NAME,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString());
        },
    }),
    limits: { fileSize: maxSize, files: 1 },
});

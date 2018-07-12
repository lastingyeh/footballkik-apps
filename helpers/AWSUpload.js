const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEYID,
	secretAccessKey: process.env.SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});

const S0 = new AWS.S3({});

const upload = multer({
	storage: multerS3({
		s3: S0,
		bucket: 'footballkik',
		acl: 'public-read',
		metadata: function(req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function(req, file, cb) {
			cb(null, file.originalname);
		},
	}),
});

exports.Upload = upload;

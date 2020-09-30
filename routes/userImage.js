/* eslint-disable consistent-return */
const aws = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const { connection } = require('../database/dbConnect.js');
const logger = require('../logger');
const auth = require('../middleware/auth');
const config = require('../config/config');
const updateUserProfile = require('../database/updateUserProfile');

const router = express.Router();

const s3 = new aws.S3({
  accessKeyId: config.accessId,
  secretAccessKey: config.secretAccessKey,
  Bucket: config.s3BucketName,
});

const profileImgUpload = multer({
  storage: multerS3({
    s3,
    bucket: config.s3BucketName,
    acl: 'public-read',
    key(req, file, cb) {
      cb(null, `userImages/${path.basename(file.originalname, path.extname(file.originalname))}-${Date.now()}${path.extname(file.originalname)}`);
    },
  }),
  limits: { fileSize: 40000000 },
  fileFilter(req, file, cb) {
    // eslint-disable-next-line no-use-before-define
    checkFileType(file, cb);
  },
}).single('profileImage');

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb('Error: Images Only!');
}

router.post('/upload', auth, (req, res, next) => {
  profileImgUpload(req, res, (error) => {
    if (error) {
      logger.error(error);
      next(error);
    }
    // If File not found
    if (req.file === undefined) {
      res.json('Error: No File Selected');
    } else {
      // If Success
      const imageLocation = req.file.location;
      updateUserProfile(connection, req.user.id, imageLocation)
        .then(() => {
          res.status(200).json({ msg: 'User image added successfully' });
        })
        .catch((err) => {
          logger.error(err);
          next(err);
        });
    }
  });
});

module.exports = router;

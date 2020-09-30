const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  secretToken: process.env.SECRET_TOKEN,
  port: process.env.PORT,
  accessId: process.env.ACCESS_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  s3BucketName: process.env.S3_BUCKET,
};

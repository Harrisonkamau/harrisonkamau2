// load environment variables
require('dotenv').config();

// module for exports
module.exports = {
  PORT: process.env.PORT,
  SENDGRID_API: process.env.SENDGRID_API_KEY,
  API_USERNAME: process.env.SENDGRID_USERNAME,
  API_KEY: process.env.SENDGRID_PASSWORD
}
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  // auth: {
  //   user: 'salmannaqvi461@gmail.com',
  //   pass: 'dkvbuemvdjprycwt'
  // }
  auth: {
    user: 'salmannaqvi@metavystic.com',
    pass: 'naqvi@44_'
  }
});

module.exports = transporter;
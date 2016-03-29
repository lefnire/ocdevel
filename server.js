'use strict';
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const _ = require('lodash');

const nconf = require('nconf');
nconf.argv().env().file({ file: 'config.json' });
const transporter = nodemailer.createTransport(nconf.get("mail")); //config.json#mail needs a full config object

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.post('/email', (req, res) => {
  let body = req.body,
    email = body.email,
    subject = body.subject,
    text = body.text;

  if (!(email && subject && text)) {
    return res.send(400, {error: 'Email error: email, subject, and body required'});
  }

  text += ' -- From ' + email;

  let message = {
    from: 'tylerrenelle@gmail.com',
    to: 'tylerrenelle@gmail.com',
    subject: subject,
    text,
    html: text
  }

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.error(error);
      return res.send(500, {error})
    };
    res.sendStatus(200);
  });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const expressServer = express();
const router = require('./routes');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(
  'mongodb+srv://audric:audric@cluster0-setl5.mongodb.net/test?retryWrites=true',
  { useNewUrlParser: true }
);
mongoose.connection
  .once('open', () => console.log('connecté'))
  .on('error', err => console.log('erreur', err));

expressServer.use(morgan('combined'));
expressServer.use(bodyParser.json({ type: '*/*' }));
expressServer.use(cors());

const port = 3090;
const server = http.createServer(expressServer);
router(expressServer);
server.listen(port);
console.log('Serveur lancé');

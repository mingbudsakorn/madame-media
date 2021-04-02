'use strict';

var express = require('express');
var app = express();
app.use('/',express.static(__dirname));
var port = 8000; // you can use any port
app.listen(port);
console.log('server on ' + port);


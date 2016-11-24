var express = require('express');
var path = require('path');
var artTemplate = require('art-template');
var indexRouter = require('./router/index');
var app = express();

//view 

app.set('view engine','html');
app.set('views','E:\\Documents\\FE\\project\\JobMes\\page');
app.engine('html',artTemplate.__express);
artTemplate.config('base','');
artTemplate.config('extname','html');

//model router

app
.use(indexRouter)
.listen(3000);

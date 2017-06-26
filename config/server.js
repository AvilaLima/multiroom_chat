// importar o módulo do Framework express
var express = require('express');

//importar o módulo do consign
var consign = require('consign');

//importar o módulo do body-parser 
var bodyParser = require('body-parser');

//importar o módulo do express-validator
var expressValidator = require('express-validator');

//inicar o obj do express
var app = express();

//setando as variáveis 'view engine' e 'views' do express
app.set('view engine','ejs');
app.set('views', './app/views');

//configurando o middleware express
app.use(express.static('./app/public'));

//configurando o middleware body-parser
app.use(bodyParser.urlencoded({extended: true}));

//configurando o middleware express-validator
app.use(expressValidator());

//utilizando o consign para dar autoload de rotar, models e controllers
consign()
    .include('app/routes')
    .then('app/controllers')
    .then('app/models')
    .into(app);

//exportando o objeto app
module.exports = app;   
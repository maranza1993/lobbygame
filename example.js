steam   = require('./index.js');
discord   = require('./discord.js');

global.num = 0;
global.arr = [];
global.arrayValoriDiscord = [];
global.nomeUtente = '';
global.SocketID = [];
global.inAscolto = 0;

var connectCounter = 0;

var fs = require('fs');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

var fs = require('fs');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(require('express-session')({ resave: false, saveUninitialized: false, secret: 'a secret' }));

app.engine('html', require('ejs').renderFile);

app.use(steam.middleware({
  realm: 'http://localhost:8080/', 
  verify: 'http://localhost:8080/verify',
  apiKey: process.argv[2]}
));

app.get('/', function(req, res) {
  var user = req.user == null ? '' : '' + req.user.username;
      try {
      var country = req.user.country;
      } catch (err) {
        // Handle the error here.
      }
    res.render( __dirname+'/views/index.html', { user:user, country:country} );
});

app.get('/authenticate', steam.authenticate(), function(req, res) {
  res.redirect('/form');
});

app.get('/form', function (req, res) {
    var user = "test user";
    //console.log(user);
    res.render( __dirname+'/views/form.html', { user:user } );
});

app.post('/ricerca', urlencodedParser, function (req, res){

      inAscolto = 1;
      var Game = req.body.selectbasic;
      var Gruppo = req.body.radios;


      //reply += "ID: " + req.user.steamid;
      //reply += "Username: " + req.user.username;
      //nomeUtente = req.user.username;
      //se mette PUBG 2v2

      res.render( __dirname+'/views/ricerca.html', { Game:Game, Gruppo:Gruppo } );
    
  //num++;
 });

 function remove(arr, item) {
      for(var i = arr.length; i--;) {
          if(arr[i] === item) {
              arr.splice(i, 1);
          }
      }
  }

app.get('/ricerca/attendiPUBG2Slot', function (req, res){
    PUBG2Slot.push('2'); //qui ci va ID steam

  if(PUBG2Slot.length == 2){res.redirect('/ricerca/DiscordPUBG2Slot');
  } 
  else {
    var reply='';
    var numeroGiocatori = PUBG2Slot.length;
    reply += numeroGiocatori + "/" + "2";
    //console.log(num);
    res.send(reply);
  }
  //num++;


 });


app.get('/ricerca/DiscordPUBG2Slot', function (req, res){
  var reply='';
  //console.log(num);
  reply += "link discord";
  res.send(reply);
  //num++;
 });


app.get('/verify', steam.verify(), function(req, res) {
    res.redirect('/');
  //res.send(req.user).end();
});

app.get('/logout', steam.enforceLogin('/'), function(req, res) {
  req.logout();
  res.redirect('/');
});


http.listen(8080);
console.log('Server Online');
discord.discord();
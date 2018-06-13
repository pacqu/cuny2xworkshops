var express = require('express');
var pug = require('pug');
var app = express();
app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/static'))

var artists = [
{name:'Kendrick Lamar',page:'/kungfukenny'},
{name:'Chance The Rapper',page:'/igh'},
{name:'Pusha-T',page:'/adidon'},
];

app.get('/', function(req,res){
  console.log(artists)
  res.render('list', {artists: artists});
});

app.get('/kungfukenny', function(req,res){
  res.render('kenny');
});

app.get('/igh', function(req,res){
  res.render('chance');
});

app.get('/adidon', function(req,res){
  res.render('pusha');
});


app.listen(3000, function(){
  console.log('Friend wants a pug!');
});

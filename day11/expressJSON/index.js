var express = require('express');
var pug = require('pug');
var fs = require('fs');
var bodyParser = require("body-parser");
var app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/static'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

var teams;
var winners;
var losers;
function updateTeams(callback){
  var exists = fs.existsSync("teams.json");
  if (exists){
    console.log("getting teams");
    var temp = fs.readFileSync("teams.json","utf8");
    teams = JSON.parse(temp);
  }
  callback();
}
app.listen(3000, function(){
  console.log('Up and running!');
});

app.get('/', function(req,res){
  updateTeams(function(){
    generateWinnersLosers();
    console.log(teams);
    res.render("list", {won:winners, lost: losers});
  });
});

app.post('/', function(req,res){
  var teamname = req.body.teamname;
  var teamwon = req.body.teamwon;
  teamwon = (teamwon === "on");
  var newteam ={
    "team": teamname,
    "won": teamwon
  }
  updateTeams( function(){
    teams.push(newteam);
    fs.writeFile('teams.json', JSON.stringify(teams, null, 2), 'utf8', function(err){
      console.log("Wrote Successfully!");
      generateWinnersLosers();
      console.log(teams);
      res.render("list",{won:winners, lost: losers});
    });
  });
});

app.get("/json",function(req,res){
  updateTeams(function(){
    res.send(JSON.stringify(teams, null, 2));
  });
});

function generateWinnersLosers(){
  winners = teams.filter(team => team.won);
  losers = teams.filter(team => !team.won);
}

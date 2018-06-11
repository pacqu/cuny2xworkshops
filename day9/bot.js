var Twit = require('twit');
var config = require('./config');
var configgenius = require('./config-genius');

setInterval(function(){
  var T = new Twit(config)
  var Genius = require("genius-api");
  var genius= new Genius(configgenius);
  T.get('statuses/mentions_timeline', {screen_name: 'spiritlyricbot' }, function (err,data,response) {
    while (err !== undefined){
      setTimeout(function(){
        T.get('statuses/mentions_timeline', {screen_name: 'spiritlyricbot' }, function (errWait,dataWait,responseWait) {
          data = dataWait;
          err = errWait;
          response = responseWait;
        });
      },
      100000);
    }
    data.forEach(function(mention){
      parseMention(mention,T,genius);
    });
  });
},5000);

function parseMention(mention,T,genius){
  console.log(mention);
  if (!(mention.favorited)){
    T.post('favorites/create', { id: mention.id_str } )
    if (!(mention.retweeted)){
      T.post('statuses/retweet/:id', { id: mention.id_str } , function(){
        var tweetAt = '@' + mention.user.screen_name;
        var lyric = removeMention(mention.text);
        genius.search(lyric).then(function(response) {
          var song = response.hits[0].result;
          var newTweet = tweetAt + ' ' + song.full_title
          + ' ' + song.primary_artist.name + ' ' + song.url;
          T.post('statuses/update', { status: newTweet }, function(err, data, response) {
            var newTweetId = data.id_str;
            T.post('statuses/retweet/:id', { id: newTweetId} , function(){
              T.post('favorites/create', { id: newTweetId } )
            })
          })
        })
      })
    }
  };
}

function removeMention(tweet){
  tweet = tweet.replace('@SpiritLyricBot','')
  return tweet;
}

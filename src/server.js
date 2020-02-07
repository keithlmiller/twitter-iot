const express = require('express')
const path = require('path');
const Twit = require('twit')
const app = express()
app.use(express.static(path.join(__dirname, 'build')));

const consumerKey = process.env.REACT_APP_CONSUMER_KEY;
const consumerSecret = process.env.REACT_APP_CONSUMER_SECRET;
const accessToken = process.env.REACT_APP_ACCESS_TOKEN;
const accessTokenSecret = process.env.REACT_APP_ACCESS_TOKEN_SECRET;

var client = new Twit({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token: accessToken,
  access_token_secret: accessTokenSecret,
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.get('/tweets', function (req, res) {
  client.get('search/tweets', { q: '%23iot', count: 100, lang: 'en' }, function(err, tweets, response) {
    if (err) {
      return res.status(400).send(new Error('There was an error'))
    }
    res.send(tweets)
  })
})

app.listen(process.env.PORT || 8080);

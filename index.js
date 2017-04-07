var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 3000));

// Server frontpage
app.get('/', function (req, res) {
    res.send('This is TestBot Server - fuck off!');
});

// handler receiving messages
app.post('/webhook', function (req, res) {
    var events = req.body.entry[0].messaging;
    for (i = 0; i < events.length; i++) {
        var event = events[i];
        var message = event.message;
        var text = event.message.text.toLowerCase();

        if (message && text.includes('1st' || 'firstblood' || 'esports' || '1ST' || 'FirstBlood')) {
                  // res.send(message.text);
                    sendMessage(event.sender.id, 'first-blood');
        }

        else if (message && text.includes('eth' || 'ethereum' || 'ether' || 'ETH')) {
                  // res.send(message.text);
                    sendMessage(event.sender.id, 'ethereum');
        }

        else if (message && text.includes('augur' || 'rep' || 'REP' || 'Augur')) {
                  // res.send(message.text); Hel
                    sendMessage(event.sender.id, 'augur');
        }

        else if (message && text.includes('singulardtv' || 'SNGLS' || 'singular' || 'SingularDTV')) {
                  // res.send(message.text);
                    sendMessage(event.sender.id, 'singulardtv');
        }

        else if (message && text.includes('gnt' || 'golem' || 'Golem')) {
                  // res.send(message.text);
                    sendMessage(event.sender.id, 'golem-network-tokens');
        }

        else if (message && text.includes('btc' || 'bitcoin' || 'Bitcoin' || 'BTC')) {
                  // res.send(message.text);
                    sendMessage(event.sender.id, 'bitcoin');
        }

        else if (message && text.includes('kyle' || 'kyle potter')) {
                  // res.send(message.text);
                  sendMessage_text(event.sender.id, {text: "Yo! Kyle Potter is the gayest person in the world!!"});
        }

        else if (message && text.includes('help' || 'help?' || 'HELP' || 'How')) {
              sendMessage_text(event.sender.id, {text: "Yo! I heard you need some help! Try typing FirstBlood"});
        }

        else if (message && text) {
              sendMessage_text(event.sender.id, {text: "I am sorry, I didn't understand you! Try to type a crypto ticker or project name to start..."});
        }
    }

    res.sendStatus(200);
});


// generic function sending messages
function sendMessage_text(recipientId, message) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: recipientId},
            message: message,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
};


// // generic function sending messages
function sendMessage(recipientId, ticker) {
  var link = 'https://api.coinmarketcap.com/v1/ticker/' + ticker + '/';
  request(link, function(err,res,body){
    if(err) {
      console.log(err);
    } else {
      var price = res.body;
      var obj = JSON.parse(price);
      var spot = obj[0].price_usd;
      var volume = obj[0]['24h_volume_usd'];
      var cap = obj[0].market_cap_usd;
      request({
          url: 'https://graph.facebook.com/v2.6/me/messages',
          qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
          method: 'POST',
          json: {
              recipient: {id: recipientId},
              message: {text: 'You asked for ' + ticker + '? Here you go...\n' + 'Current Price: $' + spot + '\n' + 'Total Volume: $' + volume + '\n' + 'Market Cap: $' + cap},
          }
      }, function(error, response, body) {
          if (error) {
              console.log('Error sending message: ', error);
          } else if (response.body.error) {
              console.log('Error: ', response.body.error);
          }
      });
    };
    });
};


// send rich message with kitten
function kittenMessage(recipientId, text) {

    text = text || "";
    var values = text.split(' ');

    if (values.length === 3 && values[0] === 'kitten') {
        if (Number(values[1]) > 0 && Number(values[2]) > 0) {

            var imageUrl = "https://placekitten.com/" + Number(values[1]) + "/" + Number(values[2]);

            message = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [{
                            "title": "Kitten",
                            "subtitle": "Cute kitten picture",
                            "image_url": imageUrl ,
                            "buttons": [{
                                "type": "web_url",
                                "url": imageUrl,
                                "title": "Show kitten"
                                }, {
                                "type": "postback",
                                "title": "I like this",
                                "payload": "User " + recipientId + " likes kitten " + imageUrl,
                            }]
                        }]
                    }
                }
            };

            sendMessage(recipientId, message);

            return true;
        }
    }

    return false;

};

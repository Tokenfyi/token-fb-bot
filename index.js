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
        console.log('message is:', message);
        // console.log('test is:', message.text);
        var text = message.text.toLowerCase();
        // console.log('2 text is:', message.text);


        if (message && (text.includes('1st') || text.includes('firstblood') || text.includes('esports') || text.includes('1ST') || text.includes('FirstBlood'))) {
                    sendPrice(event.sender.id, 'first-blood');
        }

        else if (message && (text.includes('eth') || text.includes('ethereum') || text.includes('ether') || text.includes('ETH'))) {
                    sendPrice(event.sender.id, 'ethereum');
        }

        else if (message && (text.includes('augur') || text.includes('rep') || text.includes('REP') || text.includes('Augur') || text.includes('prediction') || text.includes('Predict'))) {
                    sendPrice(event.sender.id, 'augur');
        }

        else if (message && (text.includes('singulardtv') || text.includes('SNGLS') || text.includes('singular') || text.includes('SingularDTV') || text.includes('entertainment'))) {
                    sendPrice(event.sender.id, 'singulardtv');
        }

        else if (message && (text.includes('gnt') || text.includes('golem') || text.includes('Golem') || text.includes('Decentralized Computing'))) {
                    sendPrice(event.sender.id, 'golem-network-tokens');
        }

        else if (message && (text.includes('doge') || text.includes('doge') || text.includes('dogecoin'))) {
                    sendPrice(event.sender.id, 'dogecoin');
        }

        else if (message && (text.includes('btc') || text.includes('bitcoin') || text.includes('Bitcoin') || text.includes('BTC'))) {
                    sendPrice(event.sender.id, 'bitcoin');
        }

        else if (message && text.includes('kyle')) {
                  // res.send(message.text);
                  sendMessage_text(event.sender.id, {text: "Yo! Kyle Potter is the gayest person in the world!!"});
        }

        else if (message && text.includes('joe')) {
                  // res.send(message.text);
                  sendMessage_text(event.sender.id, {text: "Yo! Joe is the smartest person in the world!!"});
        }

        else if (message && (text.includes('help') && text.includes('/'))) {
                  sendMessage_text(event.sender.id, {text: "Currently only available command is '/help' and '/price_checking'; \n\n You may check your favorite project by typing their name directly, and leave the rest to me! \n\n For example, 'Check Ethereum' or 'Check FirstBlood'... \n\n I am also pretty smart too, you can try to type keywords like 'Esports or Prediction', I will be able to give you the answer!"});
        }

        else if (message && (text.includes('price_checking') && text.includes('/'))) {
                  sendMessage_text(event.sender.id, {text: "Current Available Projects: /Bitcoin, /Ethereum, /FirstBlood, /Golem, /SingularDTV, /Augur"});
        }

        else if (message && text) {
              sendMessage_text(event.sender.id, {text: randomM()});
        }
    }

    res.sendStatus(200);
});



function randomM() {

  var response = [
    "I am sorry, I didn't understand you! Try to type a crypto ticker or project name to start...",
    "Hey!! I am not that advanced yet, could you try to type a name of the token or project instead?",
    "I don't recognize what you are trying to say, if you want to learn how to talk to me -- you may type '/help' to start!",
    "I don't seem to understand, luckily my master is trying to make me smarter! In the mean time, could you type a crypto project to start?",
    "Blah blah blah blah. It's not you! It's me! Have you tried to type '/help' to see how you can talk to me yet?",
    "Are you speaking Korean? Because I can't understand you! Try '/help'!",
    "Please don't talk human to me, I only understand commands! My creator made me this way! Try '/help' command"
  ];

  var random = Math.floor(Math.random()*response.length);
  return response[random]
}
// helper function to print out number way nicer!

function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

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




// generic function sending messages
function sendPrice(recipientId, ticker) {
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
      var predict_up = spot*1.50;
      var predict_down = spot*0.50;

      request({
          url: 'https://graph.facebook.com/v2.6/me/messages',
          qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
          method: 'POST',
          json: {
              recipient: {id: recipientId},
              message: {text: 'You asked for ' + ticker + '? Here you go...\n' + 'Current Price: $' + spot + '\n' + 'Total Volume: $' + formatNumber(volume) + '\n' + 'Market Cap: $' + formatNumber(cap) + '\n' + ':D I am also 99.99% confident that tomorrow the price will be between $' + predict_down.toFixed(4) + ' to $' + predict_up.toFixed(4)},
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

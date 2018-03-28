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

// Facebook Webhook
app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === 'hello_world_12345678') {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
    res.send('Successfully Connected');
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
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


        //Ethereum Tokens Starting Here

        if (message && (text.includes('1st') || text.includes('firstblood') || text.includes('esports') || text.includes('1ST') || text.includes('FirstBlood'))) {
                    sendPrice(event.sender.id, 'firstblood', '$1ST');
        }

        else if (message && (text.includes('eth') || text.includes('ethereum') || text.includes('ether') || text.includes('ETH'))) {
                    sendPrice(event.sender.id, 'ethereum', '$ETH');
        }

        else if (message && (text.includes('augur') || text.includes('rep') || text.includes('REP') || text.includes('Augur') || text.includes('prediction') || text.includes('Predict'))) {
                    sendPrice(event.sender.id, 'augur', '$REP');
        }

        else if (message && (text.includes('singulardtv') || text.includes('SNGLS') || text.includes('singular') || text.includes('SingularDTV') || text.includes('entertainment'))) {
                    sendPrice(event.sender.id, 'singulardtv', '$SNGLS');
        }

        else if (message && (text.includes('gnt') || text.includes('golem') || text.includes('Golem') || text.includes('Decentralized Computing'))) {
                    sendPrice(event.sender.id, 'golem-network-tokens', '$GNT');
        }

        else if (message && (text.includes('digix') || text.includes('DGX') || text.includes('DGD') || text.includes('digixdao') || text.includes('gold'))) {
                    sendPrice(event.sender.id, 'digixdao', '$DGX');
        }

        else if (message && (text.includes('iconomi') || text.includes('ICN') || text.includes('ICO'))) {
                    sendPrice(event.sender.id, 'iconomi', '$ICN');
        }

        else if (message && (text.includes('EDG') || text.includes('edgeless') || text.includes('casino') || text.includes('gambling'))) {
                    sendPrice(event.sender.id, 'edgeless', '$EDG');
        }

        else if (message && (text.includes('Gnosis') || text.includes('WIZ') || text.includes('GNO') || text.includes('gnosis'))) {
                    sendPrice(event.sender.id, 'gnosis-gno', '$GNO');
        }

        //Ethereum Tokens Ends Here

        //Added: digibyte
        else if (message && (text.includes('digibyte') || text.includes('digibyte coin') || text.includes('DGB') || text.includes('dgb'))) {
                    sendPrice(event.sender.id, 'digibyte', '$DGB');
        }

        else if (message && (text.includes('litecoin') || text.includes('lite coin') || text.includes('LTC') || text.includes('ltc'))) {
                    sendPrice(event.sender.id, 'litecoin', '$LTC');
        }

        else if (message && (text.includes('doge') || text.includes('doge') || text.includes('dogecoin'))) {
                    sendPrice(event.sender.id, 'dogecoin', '$DOGE');
        }

        else if (message && (text.includes('btc') || text.includes('bitcoin') || text.includes('Bitcoin') || text.includes('BTC'))) {
                    sendPrice(event.sender.id, 'bitcoin', '$BTC');
        }

        //Misc Handlers

        else if (message && text.includes('creators')) {
                  // res.send(message.text);
                  sendMessage_text(event.sender.id, {text: "Yo! This app is created by JMCZ and Kpotts!!"});

        }

        else if (message && (text.includes('help') && text.includes('/'))) {
                  sendMessage_text(event.sender.id, {text: "Currently only available commands are '/help', '/tokens' and 'learn [project name]'; \n\n You may check your favorite project by typing their name directly, and leave the rest to me! \n\n For example, 'Check Ethereum' or 'Check FirstBlood'... \n\n I am also pretty smart too, you can try to type keywords like 'Esports or Prediction', I will be able to give you the answer!"});
        }

        else if (message && (text.includes('learn') && text.includes('/'))) {
                  sendMessage_text(event.sender.id, {text: "Currently only available commands are '/help' and '/price_checking'; \n\n You may check your favorite project by typing their name directly, and leave the rest to me! \n\n For example, 'Check Ethereum' or 'Check FirstBlood'... \n\n I am also pretty smart too, you can try to type keywords like 'Esports or Prediction', I will be able to give you the answer!"});
        }

        else if (message && (text.includes('tokens') && text.includes('/'))) {
                  sendMessage_text(event.sender.id, {text: "Current Available Projects: /Bitcoin, /Ethereum, ,/Litecoin, /Dogecoin, /Augur, /FirstBlood, /Golem, /SingularDTV, /Gnosis, /DigixDAO, /Edgeless, /Iconomi"});
        }

        // Learning Intents Starts Here:

        else if (message && (text.includes('learn') && (text.includes('augur') || text.includes('rep') || text.includes('REP') || text.includes('Augur') || text.includes('prediction') || text.includes('Predict')))) {
                  sendMessage_text(event.sender.id, {text: learn('augur')});
        }

        else if (message && (text.includes('learn') && (text.includes('1st') || text.includes('firstblood') || text.includes('esports') || text.includes('1ST') || text.includes('FirstBlood')))) {
                  sendMessage_text(event.sender.id, {text: learn('firstblood')});
        }

        else if (message && (text.includes('learn') && (text.includes('gnt') || text.includes('golem') || text.includes('Golem') || text.includes('Decentralized Computing')))) {
                  sendMessage_text(event.sender.id, {text: learn('golem')});
        }

        else if (message && text) {
              sendMessage_text(event.sender.id, {text: random_handler()});
        }
    }

    res.sendStatus(200);
});



function random_handler() {

  var response = [
    "I am sorry, I didn't understand you! Try to type a crypto ticker or project name to start...",
    "Hey!! I am not that advanced yet, could you try to type a name of the token or project instead?",
    "I don't recognize what you are trying to say, if you want to learn how to talk to me -- you may type '/help' to start!",
    "I don't seem to understand, luckily my master is trying to make me smarter! In the mean time, could you type a crypto project to start?",
    "Blah blah blah blah. It's not you! It's me! Have you tried to type '/help' to see how you can talk to me yet?",
    "Are you speaking Korean? Because I can't understand you! Try '/help'!",
    "Please don't talk human to me, I only understand commands! My creator made me this way! Try '/help' command",
    "Did you just type a project? We haven't listed that in our backend yet! Contact us at human@token.fyi to list it"
  ];

  var random = Math.floor(Math.random()*response.length);
  return response[random]
}


function learn(name) {
  var projects = {
    firstblood: {
      platform:'Ethereum',
      description: 'FirstBlood.io (“FirstBlood”) is a decentralized Esports gaming platform that is powered by the blockchain',
      website: 'https://fb.io',
      community: 'slack, forum, and discord'
    },
    golem: {
      platform:'Ethereum',
      description: 'Golem ("Golem Network") is going to create the first decentralized global market for computing power',
      website: 'https://golem.network',
      community: 'slack, reddit and forum'
    },
    augur: {
      platform:'Ethereum',
      description: 'Augur combines the magic of prediction markets with the power of a decentralized network to create a stunningly accurate forecasting tool',
      website: 'https://augur.net',
      community: 'slack, redditand forum'
    },
    gnosis: {
      platform:'Ethereum',
      description: 'Crowd Sourced Wisdom - The next generation blockchain network. Speculate on anything with an easy-to-use prediction market; ',
      website: 'https://augur.net',
      community: 'slack, reddit and forum'
    },
    singulardtv: {
        platform:'Ethereum',
        description: 'A Blockchain Entertainment Studio, Smart Contract Rights Management Platform and Video On-Demand Portal',
        website: 'https://singulardtv.net',
        community: 'slack, reddit and forum'
    },
    iconomi: {
        platform:'Ethereum',
        description: 'ICONOMI Digital Assets Management platform enables simple access to a variety of digital assets and combined Digital Asset Arrays',
        website: 'https://iconomi.net',
        community: 'slack, reddit and forum'
    },

  }

  return projects.name.description
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
function sendPrice(recipientId, ticker, name) {
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
              message: {text: 'You asked for ' + name + '? Here you go...\n' + 'Current Price: $' + spot + '\n' + 'Total Volume: $' + formatNumber(volume) + '\n' + 'Market Cap: $' + formatNumber(cap) + '\n' + ':D I am also 99.99% confident that tomorrow the price will be between $' + predict_down.toFixed(4) + ' to $' + predict_up.toFixed(4)},
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

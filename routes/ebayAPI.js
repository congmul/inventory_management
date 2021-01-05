module.exports = function (app) {

    // Route for logging user out
//   app.get("/api/orders", function(req, res) {
     
//     let eBay = require('ebay-node-api');
//     let db = require("../models");

//     let ebay = new eBay({
//         clientID: 'JEHYUNJU-inventor-SBX-8736b19af-6bb7b927',
//         clientSecret: 'SBX-736b19afa56c-23c5-45bf-a597-5b4a',
//         body: {
//             grant_type: 'client_credentials',
//             scope: 'https://api.ebay.com/oauth/api_scope'
//         },
//         env: 'SANDBOX',
//         headers: {
//             'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US'
//         }
//     });
//     ebay.getAccessToken().then((data) => {
//         console.log(data);
//     }, (error) => {
//         console.log(error);
//     });

//   });
}

// https://auth.ebay.com/oauth2/authorize?client_id=JEHYUNJU-inventor-SBX-8736b19af-6bb7b927&response_type=code&redirect_uri=JEHYUN_JUNG-JEHYUNJU-invent-ucgtrpq&scope=https://api.ebay.com/oauth/api_scope%20https://api.ebay.com/oauth/api_scope/sell.marketing.readonly%20https://api.ebay.com/oauth/api_scope/sell.marketing
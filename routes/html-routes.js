// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("index");
    }else{
      res.sendFile(path.join(__dirname, "../public/login.html"));
    }
  });

  app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/cymbals", (req, res) => {
    if (req.user) {
      console.log("test");
      res.render("cymbals");
    }else{
      res.sendFile(path.join(__dirname, "../public/login.html"));
    }
  });

  app.get("/orders", (req, res) => {
    if (req.user) {
        let db = require("../models");
        // let eBay = require('ebay-node-api');
        const EbayAuthToken = require('ebay-oauth-nodejs-client');
        
        const ebayAuthToken = new EbayAuthToken({
          clientId: 'JEHYUNJU-inventor-SBX-8736b19af-6bb7b927',
          clientSecret: 'SBX-736b19afa56c-23c5-45bf-a597-5b4a',
          redirectUri: 'JEHYUN_JUNG-JEHYUNJU-invent-ucgtrpq'
      });

      (async () => {
        const token = await ebayAuthToken.getApplicationToken('SANDBOX');
        console.log(token);
    })();
        

    // https://auth.sandbox.ebay.com/oauth2/authorize?
    // client_id=JEHYUNJU-inventor-PRD-77363a9e5-81219f03&
    // redirect_uri=JEHYUN_JUNG-JEHYUNJU-invent-fupwnxh&
    // response_type=code&
    // scope=https://api.ebay.com/oauth/api_scope&
    // prompt=login
        // let ebay = new eBay({
        //     clientID: 'JEHYUNJU-inventor-SBX-8736b19af-6bb7b927',
        //     clientSecret: 'SBX-736b19afa56c-23c5-45bf-a597-5b4a',
        //     body: {
        //         grant_type: 'client_credentials',
        //         scope: 'https://api.ebay.com/oauth/api_scope/buy.order.readonly'
        //     },
        //     env: 'SANDBOX',
        //     headers: {
        //         'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US'
        //     }
        // });
        // ebay.getAccessToken().then((data) => {
        //     console.log(data); // Token Data
        //     res.json(data);
        // }, (error) => {
        //     console.log(error);
        // });
      res.render("orders");
    }else{
      res.sendFile(path.join(__dirname, "../public/login.html"));
    }
  });
  app.get("/api/ebayCode/", (req, res) =>{
    console.log(req.query);
    console.log(req.query.code);
    console.log(req.query.expires_in);
  })
};

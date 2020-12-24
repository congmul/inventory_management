// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // GET ROUTE!! <--

      // Route for get Package's information with cymbals
      app.get("/api/package/:id", (req, res) => {
        if (req.user) {
          console.log(req.params.id);
          let packageWithCymbals = [];
          db.Packages.findAll({
            where: {
              id: req.params.id
            },
            include : db.Inventory
          }).then((data) => {
            // console.log(data[0].dataValues);
            for(let i=0; i < data[0].dataValues.Inventories.length; i++){
              packageWithCymbals.push({
                "category": data[0].dataValues.category,
                "description_pack": data[0].dataValues.description,
                "code_pack": data[0].dataValues.group_code,
                "dealer_price": data[0].dataValues.dealer_price,
                "code": data[0].dataValues.Inventories[i].dataValues.code,
                "category02": data[0].dataValues.Inventories[i].category02,
                "size": data[0].dataValues.Inventories[i].size,
                "description": data[0].dataValues.Inventories[i].description,
                "qty": data[0].dataValues.Inventories[i].qty,
                "ebay_price": data[0].dataValues.Inventories[i].ebay_price,
                "website_price": data[0].dataValues.Inventories[i].website_price
              });
            }
            console.log(packageWithCymbals);
            res.json(packageWithCymbals);
            // console.log(data[0].dataValues.Inventories[0].dataValues);
            // res.render("newItem", {packageLists : packageLists});
          });
          
        }else{
          res.sendFile(path.join(__dirname, "../public/login.html"));
        }
      });

};

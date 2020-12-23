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

    // Route for add a Package
    app.post("/api/pakage", (req, res) => {
      console.log(req.body);
      db.Packages.create(req.body).then((data) => {
        res.status(200);
        res.redirect("back");
      }).catch((err) => {
        res.status(500).json(err);
      });

    });

    // Route for add a Packages
    app.post("/api/packages", (req, res) => {
      console.log(req.body.contents);
      db.Packages.bulkCreate(req.body.contents).then((data) => {
        res.status(200);
        res.redirect("back");
      }).catch((err) => {
        res.status(500).json(err);
      });
    });

    app.get("/newItem", (req, res) => {
      if (req.user) {
        let packageLists = [];
        db.Packages.findAll().then((data) => {
          for(let i = 0; i < data.length; i++){
            // console.log(data[i].dataValues.id);
            // console.log(data[i].dataValues.description);
            let tempObj = {}
            tempObj["id"] = data[i].dataValues.id; 
            tempObj["discription"] = data[i].dataValues.description;
            packageLists.push(tempObj);
          }
          console.log(packageLists);
          res.render("newItem", {packageLists : packageLists});
        });
        
      }else{
        res.sendFile(path.join(__dirname, "../public/login.html"));
      }
    });



    // Route for add a new cymbal
    app.post("/api/newitem", (req, res) => {
      console.log(req.body);
      db.Inventory.create(req.body).then((data) => {
        res.status(200);
        res.redirect("back");
      }).catch((err) => {
        res.status(500).json(err);
      });
    });

       // Route for add a cymbals
       app.post("/api/cymbals", (req, res) => {
        console.log(req.body.contents);
        db.Inventory.bulkCreate(req.body.contents).then((data) => {
          res.status(200);
          res.redirect("back");
        }).catch((err) => {
          res.status(500).json(err);
        });
      });

};

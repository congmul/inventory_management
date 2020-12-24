// Requiring our models and passport as we've configured it
let db = require("../models");

module.exports = function (app) {

  // ============================== --> FOR CYMBALS ==============================
  // --> HTML ROUTE

  app.get("/uploadCymbalsCSV", (req, res) => {
    if (req.user) {
      res.render("uploadCymbalsCSV");
    } else {
      res.sendFile(path.join(__dirname, "../public/login.html"));
    }
  });

  // HTML ROUTE <--
  // --> API ROUTE
  // --> GET ROUTE!!
  // Add New Item Page with Package ID & Name
  app.get("/newcymbals", (req, res) => {
    if (req.user) {
      let packageLists = [];
      db.Packages.findAll().then((data) => {
        for (let i = 0; i < data.length; i++) {
          let tempObj = {}
          tempObj["id"] = data[i].dataValues.id;
          tempObj["discription"] = data[i].dataValues.description;
          packageLists.push(tempObj);
        }
        console.log(packageLists);
        res.render("newcymbals", { packageLists: packageLists });
      });
    } else {
      res.sendFile(path.join(__dirname, "../public/login.html"));
    }
  });
  // GET ROUTE!! <--

  // POST ROUTE!! -->
  // Route for add a new cymbal
  app.post("/api/newcymbal", (req, res) => {
    console.log(req.body);
    db.Inventory.create(req.body).then((data) => {
      res.status(200);
      res.redirect("back");
    }).catch((err) => {
      res.status(500).json(err);
    });
  });

  // Route for add cymbals with CSV file
  app.post("/api/newcymbals", (req, res) => {
    console.log(req.body.contents);
    db.Inventory.bulkCreate(req.body.contents).then((data) => {
      res.status(200);
      res.redirect("back");
    }).catch((err) => {
      res.status(500).json(err);
    });
  });
  // POST ROUTE!! <--
  // ============================== FOR CYMBALS <-- ==============================

  // ============================== --> FOR Shure Parts ==============================
  // --> HTML ROUTE

  app.get("/newshureparts", (req, res) => {
    if (req.user) {
      res.render("newshureparts");
    } else {
      res.sendFile(path.join(__dirname, "../public/login.html"));
    }
  });

  // HTML ROUTE <--
  // --> API ROUTE
  // --> GET ROUTE!!



  // GET ROUTE!! <--
  //============================== FOR CYMBALS <-- ==============================

}
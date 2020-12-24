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

  app.get("/newItem", (req, res) => {
    if (req.user) {
      res.render("newItem");
    }else{
      res.sendFile(path.join(__dirname, "../public/login.html"));
    }
  });

  app.get("/newPackage", (req, res) => {
    if (req.user) {
      res.render("newPackage");
    }else{
      res.sendFile(path.join(__dirname, "../public/login.html"));
    }
  });

  app.get("/viewAll", (req, res) => {
    if (req.user) {
    db.Inventory.findAll({
      include: db.Packages
    } 
    ).then((data) => {
      let allItems = [];
      for(let i = 0; i < data.length; i++){
        allItems.push({
          "group_id": data[i].dataValues.Package.dataValues.id,
          "group_code": data[i].dataValues.Package.dataValues.group_code,
          "category01": data[i].dataValues.category01,
          "category02": data[i].dataValues.category02,
          "size": data[i].dataValues.size,
          "description": data[i].dataValues.description,
          "code": data[i].dataValues.code,
          "qty": data[i].dataValues.qty,
          "ebay_price": data[i].dataValues.ebay_price,
          "website_price": data[i].dataValues.website_price
        });
      }
      console.log(allItems);

      res.render("viewAll", {allItems: allItems});
    });
    }else{
      res.sendFile(path.join(__dirname, "../public/login.html"));
    }
  });

  app.get("/viewAll/:category01/:category02/:size", (req, res) => {
    if (req.user) {
      console.log(req.params);
    // db.Inventory.findAll({
    //   include: db.Packages
    // } 
    // ).then((data) => {
    //   let allItems = [];
    //   for(let i = 0; i < data.length; i++){
    //     allItems.push({
    //       "group_id": data[i].dataValues.Package.dataValues.id,
    //       "group_code": data[i].dataValues.Package.dataValues.group_code,
    //       "category01": data[i].dataValues.category01,
    //       "category02": data[i].dataValues.category02,
    //       "size": data[i].dataValues.size,
    //       "description": data[i].dataValues.description,
    //       "code": data[i].dataValues.code,
    //       "qty": data[i].dataValues.qty,
    //       "ebay_price": data[i].dataValues.ebay_price,
    //       "website_price": data[i].dataValues.website_price
    //     });
    //   }
    //   console.log(allItems);

    //   res.render("viewAll", {allItems: allItems});
    // });
    }else{
      res.sendFile(path.join(__dirname, "../public/login.html"));
    }
  });


};

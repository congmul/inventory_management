// Requiring our models and passport as we've configured it
let db = require("../models");
const { Op } = require("sequelize");

module.exports = function (app) {

    // ==================== View Cymbal Route ============================
    // --> HTML Route


    // HTML Route <--

    // --> API Route
    // --> Get Route
    app.get("/api/cymbals/:category01onView/:category02onView/:sizeonView", (req, res) => {
        console.log(req.params);
        let firstCondition = {category01 : req.params.category01onView.toLowerCase()};
        let secondCondition = {category02 : req.params.category02onView.toLowerCase()};
        let thirdCondition = {size : req.params.sizeonView};
        // console.log(firstCondition);
        // console.log(secondCondition);
        // console.log(thirdCondition);
        if(req.params.category01onView.toLowerCase() === "all"){
          firstCondition ={}
        }
        if(req.params.category02onView.toLowerCase() === "all"){
          secondCondition ={}
        }
        if(req.params.sizeonView === "all"){
          thirdCondition ={}
        }
        if (req.user) {
            db.Inventory.findAll({
                where: {
                  [Op.and]: [
                    firstCondition,
                    secondCondition,
                    thirdCondition
                  ]
                },
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
                res.json(allItems);
              });
    }else{
        res.sendFile(path.join(__dirname, "../public/login.html"));
    }
        
    });
    // Get Route <--
    // --> Put Route

    app.put("/api/inventory", (req, res) =>{
      console.log(req.body);
      let updateData = {};
      for( let key in req.body){
        if(key === "ebay_price"){
          console.log("ebay_price");
          updateData[key] = req.body.ebay_price;
        }else if(key === "website_price"){
          console.log("website_price");
          updateData[key] = req.body.website_price;
        }
      }
      db.Inventory.update(updateData, {
        where: {
          id: req.body.id
        }
      }).then(data => {
        res.json(data);
      });
    });

    // Put Route <--

    // API Route <--

}
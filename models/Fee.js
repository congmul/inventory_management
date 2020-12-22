module.exports = function(sequelize, DataTypes) {
    const Fee = sequelize.define("Fee", {
        ebay_fee: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        paypal_fee: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        website_fee: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    });
    
    
    return Fee;
  };
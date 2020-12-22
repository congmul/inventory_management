module.exports = function(sequelize, DataTypes) {
    const Inventory = sequelize.define("Inventory", {
        category01: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        category02: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        size: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        code: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        qty: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        ebay_price: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        website_price: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });
    

    Inventory.associate = function (models) {
        // Associating Inventory with Packages model
        Inventory.belongsTo(models.Packages, {
            foreignKey: {
                name: "group_id",
            },
            onDelete: "cascade",
        });
    };

    
    return Inventory;
  };
module.exports = function(sequelize, DataTypes) {
    const Packages = sequelize.define("Packages", {
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1],
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1],
        },
        group_code: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1],
        },
        dealer_price: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }
    });
    

    Packages.associate = function (models) {
        // Associating Packages with Inventory model
        Packages.hasMany(models.Inventory, {
            foreignKey: {
                name: "group_id",
            },
            onDelete: "cascade",
        });
    };
    
    return Packages;
  };
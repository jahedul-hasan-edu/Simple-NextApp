module.exports = function (sequelize, DataTypes) {
  return sequelize.define("document", {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      // allowNull: false,
    },
    url: {
      type: DataTypes.STRING(1500),
      // allowNull: false,
    },
  });
};

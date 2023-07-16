module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "ledger",
    {
      id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      sheetNo: {
        type: DataTypes.STRING(255),
        allowNull: false,
        as: "sheet-no",
      },
      schemeName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        as: "scheme-name",
      },
      structureName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        as: "structure-name",
      },
      chainage: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      lat: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      lon: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      geom: {
        type: DataTypes.GEOMETRY,
        allowNull: true,
        field: "geom",
      },
      sketch: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      damageHistory: {
        type: DataTypes.STRING(255),
        allowNull: false,
        as: "damage-history",
      },
      uploadImage: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        as: "upload-image",
      },
      designation: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      visitedDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        as: "visited-date",
      },
      visitedPerson: {
        type: DataTypes.STRING(255),
        allowNull: false,
        as: "visited-person",
      },
      signature: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "ledger",
      schema: "public",
      indexes: [
        {
          name: "ledger_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};

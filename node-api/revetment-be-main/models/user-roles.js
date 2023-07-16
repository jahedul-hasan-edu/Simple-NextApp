module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "user_roles",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      roleName: {
        type: DataTypes.STRING(2500),
        field: "role_name",
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "user_roles",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "user_roles_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};

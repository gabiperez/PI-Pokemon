const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    HP: {
      type: DataTypes.DECIMAL,
    },

    AP: {
      type: DataTypes.DECIMAL,
    },

    speed: {
      type: DataTypes.DECIMAL,
    },

    height: {
      type: DataTypes.DECIMAL,
    },

    weight: {
      type: DataTypes.DECIMAL,
    },
  });
};

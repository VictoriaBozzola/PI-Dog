const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,

    },

    height_min: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    
    height_max: {
      type: DataTypes.STRING,
      allowNull: false,

    },

    weight_min:{
      type: DataTypes.STRING,
      allowNull: false,

    },
    
    weight_max:{
      type: DataTypes.STRING,
      allowNull: false,

    },

    life_span: {
      type: DataTypes.STRING,
      allowNull: true,

    },

    image: {
      type: DataTypes.STRING, 
      allowNull: true,
    },

    origin: {
      type: DataTypes.STRING, 
      allowNull: true,
    },

    createdInDb: {           //para distinguir entre los que me trae la api y los creados en la base de datos
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  });
};

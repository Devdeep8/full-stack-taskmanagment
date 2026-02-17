import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Task, {
        foreignKey: "assigneeId",
        as: "assignedTasks",
      });

      User.hasMany(models.Task, {
        foreignKey: "createdBy",
        as: "createdTasks",
      });
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      phone: DataTypes.STRING,
      gender: DataTypes.STRING,
      dob: DataTypes.DATEONLY,
      address: DataTypes.TEXT,
      zipCode: DataTypes.STRING,
      state: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      paranoid: true, 
      tableName: "users",
    },
  );

  return User;
};

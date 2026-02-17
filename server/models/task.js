import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.User, {
        foreignKey: "assigneeId",
        as: "assignee",
      });

      Task.belongsTo(models.User, {
        foreignKey: "createdBy",
        as: "creator",
      });
    }
  }

  Task.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("todo", "in-progress", "done"),
        defaultValue: "todo",
      },

      priority: {
        type: DataTypes.ENUM("low", "medium", "high"),
        defaultValue: "medium",
      },

      dueDate: DataTypes.DATE,

      assigneeId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Task",
      tableName: "tasks",
      paranoid: true,        
      timestamps: true,
    }
  );

  return Task;
};

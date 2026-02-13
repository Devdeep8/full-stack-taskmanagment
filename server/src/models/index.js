// src/models/index.js
import { sequelize } from "../config/db.js";
import { Task } from "./Task.model.js";
import { User } from "./User.model.js";
export const associateModels = () => {
    // Define associations with inverse option for v7
  User.hasMany(Task, {
    foreignKey: 'createdBy',
    as: 'createdTasks',
    inverse: {
      as: 'creator'  // The alias on Task side
    }
  });

  User.hasMany(Task, {
    foreignKey: 'assigneeId',
    as: 'assignedTasks',
    inverse: {
      as: 'assignee'  // The alias on Task side
    }
  });

  // Task belongs to User (creator)
};
export const db = {
  users: User,
  tasks: Task,
  sequelize: sequelize,
};

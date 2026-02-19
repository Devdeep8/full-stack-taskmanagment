require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || "admin",
    password: process.env.DB_PASS || "password",
    database: process.env.DB_NAME || "tasks_db",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
  },
};

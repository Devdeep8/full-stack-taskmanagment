import dotenv from "dotenv";
import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";

dotenv.config();

export const sequelize = new Sequelize({
  dialect: PostgresDialect,
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    require : true
  },
 
  logging: process.env.DB_LOGGING === "true" ? console.log : false,
  pool: {
    max: 10,
    min: 2,
    acquire: 30000,
    idle: 10000,
  },
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected with pool.");
  } catch (error) {
    console.error("Database not authenticated", 502, { cause: error });
  }
};

import dotenv from "dotenv";
import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export const sequelize = new Sequelize({
  dialect: PostgresDialect,
  url: process.env.DATABASE_URL,

  logging:
    process.env.DB_LOGGING === "true" && !isProduction
      ? console.log
      : false,

  // ✅ Sequelize v7 SSL config (root level)
  ...(isProduction && {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  }),

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
    console.error("❌ Database authentication failed:", error);
    process.exit(1);
  }
};

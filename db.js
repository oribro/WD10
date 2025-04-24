const sql = require("mssql");
require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: { encrypt: false, trustServerCertificate: true },
};

async function connectDB() {
  try {
    let pool = await sql.connect(config);
    console.log("Connected to DB");
    return pool;
  } catch (err) {
    console.error("DB Connection Error: ", err);
    throw err;
  }
}

module.exports = { connectDB };

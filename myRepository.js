const sql = require("mssql");
const { connectDB } = require("./db");

async function getUserByUsername(username) {
  let pool = await connectDB();
  let result = await pool
    .request()
    .input("username", sql.VarChar, username)
    .execute("getUserByUsername");

  return result.recordset[0];
}

async function addUser(username, hashedPassword) {
  let pool = await connectDB();
  await pool
    .request()
    .input("username", sql.VarChar, username)
    .input("password", sql.VarChar, hashedPassword)
    .execute("addUser");
}

module.exports = { getUserByUsername, addUser };

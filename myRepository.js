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

async function addUser(
  firstName,
  lastName,
  email,
  username,
  hashedPassword,
  phone
) {
  let pool = await connectDB();
  await pool
    .request()
    .input("firstName", sql.VarChar, firstName)
    .input("lastName", sql.VarChar, lastName)
    .input("email", sql.VarChar, email)
    .input("username", sql.VarChar, username)
    .input("password", sql.VarChar, hashedPassword)
    .input("phone", sql.VarChar, phone)
    .execute("addUser");
}

module.exports = { getUserByUsername, addUser };

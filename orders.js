const sql = require("mssql");

const config = {
  user: "sa10",
  password: "1234",
  server: "localhost",
  database: "TripsDB",
  options: {
    encrypt: false, // for azure change to true
    trustServerCertificate: true, // change to false for production
  },
};

async function getOrders(userId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("UserId", sql.Int, userId)
      .execute("spGetOrdersForUser");

    console.log(result.recordset);
    return result.recordset;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    sql.close();
  }
}

async function postOrders(tripId, userId, date, status) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("TripId", sql.Int, tripId)
      .input("UserId", sql.Int, userId)
      .input("Date", sql.Date, date)
      .input("Status", sql.VarChar, status)
      .execute("spPostOrders");

    console.log(result.recordset);
    return result.recordset;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    sql.close();
  }
}

module.exports = { getOrders, postOrders };

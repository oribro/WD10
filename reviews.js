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

async function getReviews(tripId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("TripId", sql.Int, tripId)
      .execute("spGetReviewsForTrip");

    console.log(result.recordset);
    return result.recordset;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    sql.close();
  }
}

async function postReview(tripId, userId, rating, comment) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("TripId", sql.Int, tripId)
      .input("UserId", sql.Int, userId)
      .input("Rating", sql.Int, rating)
      .input("Comment", sql.VarChar, comment)
      .execute("spPostReviewForTrip");

    console.log(result.recordset);
    return result.recordset;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    sql.close();
  }
}

module.exports = { getReviews, postReview };

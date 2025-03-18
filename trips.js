
const sql = require('mssql');

const config = {
    user: 'sa10',
    password: '1234',
    server: 'localhost',
    database: 'TripsDB',
    options: {
        encrypt: false, // for azure change to true
        trustServerCertificate: true // change to false for production
    }
};

async function getTrips(startDate, endDate) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('StartDate', sql.DateTime, startDate)
            .input('EndDate', sql.DateTime, endDate)
            .execute('spTripsBetween_Date1_Date2');

        console.log(result.recordset);
        return result.recordset;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        sql.close();
    }
}

module.exports.getTrips = getTrips;

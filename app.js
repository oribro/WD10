
const express = require('express');
const trips = require('./trips');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); // Middleware to parse requests with JSON body 
app.use(express.static('public')); // folder to serve our static files

app.get('/trips', async (req, res) => {
    const startDate = req.query.startDate; // Get startDate from query parameter
    const endDate = req.query.endDate; // Get endDate from query parameter

    if (!startDate || !endDate) {
        return res.status(400).send({ error: 'startDate and endDate are required query parameters.' });
    }

    try {
        const requestedTrips = await myRepository.getTrips(startDate, endDate);
        res.json(requestedTrips);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: 'Failed to fetch trips.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

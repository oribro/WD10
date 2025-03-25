const express = require("express");
const trips = require("./trips");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); // Middleware to parse requests with JSON body
app.use(express.static("public")); // folder to serve our static files

app.get("/trips", async (req, res) => {
  const startDate = req.query.startDate; // Get startDate from query parameter
  const endDate = req.query.endDate; // Get endDate from query parameter

  if (!startDate || !endDate) {
    return res
      .status(400)
      .send({ error: "startDate and endDate are required query parameters." });
  }

  try {
    const requestedTrips = await trips.getTrips(startDate, endDate);
    res.json(requestedTrips);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "Failed to fetch trips." });
  }
});

app.post("/trips", async (req, res) => {
  const name = req.body.name;
  const endDate = req.body.endDate;
  const startDate = req.body.startDate;
  const price = req.body.price;

  if (!name || !startDate || !endDate || !price) {
    return res.status(400).send({
      error:
        "name, price, startDate and endDate are required query parameters.",
    });
  }

  try {
    await trips.postTrips(name, startDate, endDate, price);
    res.send("Posted trips");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "Failed to post trips." });
  }
});

app.put("/trips/:id", async (req, res) => {
  const name = req.body.name;
  const endDate = req.body.endDate;
  const startDate = req.body.startDate;
  const price = req.body.price;
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({ error: "Must send id." });
  }
  if (!name && !startDate && !endDate && !price) {
    return res.status(400).send({ error: "Must send at least one parameter." });
  }

  try {
    await trips.putTrips(id, name, startDate, endDate, price);
    res.send(`Trip ${id} changed`);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "Failed to change trips." });
  }
});

app.delete("/trips/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({ error: "Must send id." });
  }

  try {
    await trips.deleteTrips(id);
    res.send(`Trip ${id} deleted`);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "Failed to delete trips." });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

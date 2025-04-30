const express = require("express");
const trips = require("./trips");
const cookieparser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./authMiddleware");
const myRepository = require("./myRepository");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse requests with JSON body
app.use(express.static("public")); // folder to serve our static files
app.use(cookieparser());

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

app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, username, password, phone } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await myRepository.addUser(
      firstName,
      lastName,
      email,
      username,
      hashedPassword,
      phone
    );
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Error registering user" });
  }
});

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await myRepository.getUserByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //     --- Dont forget to add JWT_SECRET in .env ---
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch {
    res.status(500).json({ message: "Error signing in" });
  }
});

app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}, you have access!` });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

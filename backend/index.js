require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

let db;

async function startServer() {
  try {
    await client.connect();
    console.log("✅ MongoDB Connected");

    db = client.db("scholarDB");

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });

  } catch (err) {
    console.error(err);
  }
}

startServer();


// =============================
// 🔐 AUTH ROUTES
// =============================

// REGISTER
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔐 CHECK DOMAIN
    if (!email.endsWith("@ched.gov.ph")) {
      return res.status(400).json({
        message: "Only CHED emails are allowed. Please Contact Admin for access.",
      });
    }

    // 🔍 CHECK EXISTING USER
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔒 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🎯 CREATE USER
    const newUser = {
      email,
      password: hashedPassword,
      role: "admin", // 🔥 default role
      createdAt: new Date(),
    };

    await db.collection("users").insertOne(newUser);

    res.json({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// =============================
// 📌 SCHOLAR ROUTES (CRUD)
// =============================

// GET all scholars
app.get("/scholars", async (req, res) => {
  const data = await db.collection("scholars").find().toArray();
  res.json(data);
});

// ADD scholar
app.post("/scholars", async (req, res) => {
  const result = await db.collection("scholars").insertOne(req.body);
  res.json(result);
});

// UPDATE scholar
app.put("/scholars/:id", async (req, res) => {
  const id = req.params.id;

  const result = await db.collection("scholars").updateOne(
    { _id: new ObjectId(id) },
    { $set: req.body }
  );

  res.json(result);
});

// DELETE scholar
app.delete("/scholars/:id", async (req, res) => {
  const id = req.params.id;

  const result = await db.collection("scholars").deleteOne({
    _id: new ObjectId(id),
  });

  res.json(result);
});
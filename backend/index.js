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

// 🔐 REGISTER (SUPERADMIN ONLY)
app.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // 🔐 TOKEN CHECK
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    // 🔒 ONLY SUPERADMIN
    if (decoded.role !== "superadmin") {
      return res.status(403).json({
        message: "Only super admin can add users",
      });
    }

    // 🔐 CHECK DOMAIN
    if (!email.endsWith("@ched.gov.ph")) {
      return res.status(400).json({
        message: "Only CHED emails are allowed.",
      });
    }

    // 🔍 CHECK EXISTING USER
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔒 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🎯 CREATE USER WITH ROLE
    const newUser = {
      email,
      password: hashedPassword,
      role: role || "user", // ✅ dynamic role
      createdAt: new Date(),
    };

    await db.collection("users").insertOne(newUser);

    res.json({ message: "User created successfully" });

  } catch (err) {
    res.status(500).json({ message: "Invalid or expired token" });
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

    // ✅ INCLUDE ROLE HERE
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
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
// 👤 GET LOGGED-IN USER
// =============================
app.get("/user", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // 🔐 VERIFY TOKEN
    const decoded = jwt.verify(token, JWT_SECRET);

    // 🔍 FIND USER IN DB
    const user = await db.collection("users").findOne({
      _id: new ObjectId(decoded.id),
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ❗ REMOVE PASSWORD BEFORE SENDING
    delete user.password;

    res.json(user);

  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid or expired token" });
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
// =============================
// 👑 USER MANAGEMENT (SUPER ADMIN ONLY)
// =============================

// 🔹 GET ALL USERS
app.get("/users", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const currentUser = await db.collection("users").findOne({
      _id: new ObjectId(decoded.id),
    });

    // 🔒 ONLY SUPERADMIN
    if (currentUser.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await db.collection("users").find().toArray();

    // ❗ REMOVE PASSWORDS
    const safeUsers = users.map((u) => {
      delete u.password;
      return u;
    });

    res.json(safeUsers);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 🔹 UPDATE USER ROLE
app.put("/users/:id/role", async (req, res) => {
  try {
    const { role } = req.body;

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const currentUser = await db.collection("users").findOne({
      _id: new ObjectId(decoded.id),
    });

    // 🔒 ONLY SUPERADMIN
    if (currentUser.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    // ⚠️ prevent self-role change (recommended)
    if (decoded.id === req.params.id) {
      return res.status(400).json({ message: "Cannot change your own role" });
    }

    await db.collection("users").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { role } }
    );

    res.json({ message: "Role updated successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
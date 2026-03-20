require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

// =============================
// 🌐 CORS (UPDATED)
// =============================
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://osds-three.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ HANDLE PREFLIGHT MANUALLY (WORKS IN EXPRESS 5)
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());

// =============================
// 🔌 MONGODB
// =============================
const client = new MongoClient(process.env.MONGO_URI);
const JWT_SECRET = process.env.JWT_SECRET || "secret123";

let db;

// =============================
// 🔐 VERIFY TOKEN
// =============================
const verifyToken = (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ message: "No token provided" });
      return null;
    }

    const token = authHeader.split(" ")[1];
    return jwt.verify(token, JWT_SECRET);

  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// =============================
// 🩺 HEALTH CHECK
// =============================
app.get("/", (req, res) => {
  res.send("API is running...");
});

// =============================
// 🚀 START SERVER
// =============================
async function startServer() {
  try {
    await client.connect();
    console.log("✅ MongoDB Connected");

    db = client.db("scholarDB");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ DB Connection Error:", err);
  }
}

// =============================
// 🔐 REGISTER
// =============================
app.post("/register", async (req, res) => {
  try {
    const decoded = verifyToken(req, res);
    if (!decoded) return;

    if (decoded.role !== "superadmin") {
      return res.status(403).json({
        message: "Only super admin can add users",
      });
    }

    const {
      firstName,
      lastName,
      middleInitial,
      suffix,
      email,
      password,
      role,
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const fullName = `${lastName}, ${firstName} ${
      middleInitial ? middleInitial.toUpperCase() + "." : ""
    } ${suffix || ""}`.trim();

    await db.collection("users").insertOne({
      firstName,
      lastName,
      middleInitial: middleInitial?.toUpperCase() || "",
      suffix: suffix || "",
      fullName,
      email,
      password: hashedPassword,
      role: role || "user",
      status: "active",
      createdAt: new Date(),
    });

    res.json({ message: "User created successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =============================
// 🔐 LOGIN
// =============================
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

    if (user.status === "inactive") {
      return res.status(403).json({
        message: "Account is inactive",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =============================
// 👤 GET USER
// =============================
app.get("/user", async (req, res) => {
  const decoded = verifyToken(req, res);
  if (!decoded) return;

  const user = await db.collection("users").findOne({
    _id: new ObjectId(decoded.id),
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  delete user.password;

  res.json({
    ...user,
    status: user.status || "active",
  });
});

// =============================
// 📌 SCHOLARS
// =============================
app.get("/scholars", async (req, res) => {
  res.json(await db.collection("scholars").find().toArray());
});

app.post("/scholars", async (req, res) => {
  res.json(await db.collection("scholars").insertOne(req.body));
});

app.put("/scholars/:id", async (req, res) => {
  res.json(
    await db.collection("scholars").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    )
  );
});

app.delete("/scholars/:id", async (req, res) => {
  res.json(
    await db.collection("scholars").deleteOne({
      _id: new ObjectId(req.params.id),
    })
  );
});

// =============================
// 👑 USERS
// =============================
app.get("/users", async (req, res) => {
  const decoded = verifyToken(req, res);
  if (!decoded) return;

  const currentUser = await db.collection("users").findOne({
    _id: new ObjectId(decoded.id),
  });

  if (currentUser.role !== "superadmin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const users = await db.collection("users").find().toArray();

  const safeUsers = users.map((u) => {
    delete u.password;
    return {
      ...u,
      status: u.status || "active",
    };
  });

  res.json(safeUsers);
});

// UPDATE ROLE
app.put("/users/:id/role", async (req, res) => {
  const decoded = verifyToken(req, res);
  if (!decoded) return;

  if (decoded.id === req.params.id) {
    return res.status(400).json({ message: "Cannot change your own role" });
  }

  await db.collection("users").updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { role: req.body.role } }
  );

  res.json({ message: "Role updated" });
});

// UPDATE STATUS
app.put("/users/:id/status", async (req, res) => {
  const decoded = verifyToken(req, res);
  if (!decoded) return;

  if (decoded.id === req.params.id) {
    return res.status(400).json({
      message: "Cannot deactivate yourself",
    });
  }

  await db.collection("users").updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { status: req.body.status } }
  );

  res.json({ message: "Status updated" });
});

// DELETE USER
app.delete("/users/:id", async (req, res) => {
  const decoded = verifyToken(req, res);
  if (!decoded) return;

  if (decoded.id === req.params.id) {
    return res.status(400).json({
      message: "Cannot delete yourself",
    });
  }

  await db.collection("users").deleteOne({
    _id: new ObjectId(req.params.id),
  });

  res.json({ message: "User deleted" });
});

startServer();
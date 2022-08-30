const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();
const app = express();

//db
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.error(err);
    console.log("Connected to Database");
  }
);

const port = process.env.PORT;

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});

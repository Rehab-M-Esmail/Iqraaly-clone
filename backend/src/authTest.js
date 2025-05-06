const express = require("express");
const mongoose = require("mongoose");
const imageRoute = require("./routes/authRoute");
const dotenv = require("dotenv");
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/audiobooks", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB error:", err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log("From authTest.js");
app.use("/auth", imageRoute);
const PORT = process.env.IMAGE_SERVCE_PORT || 3000;
app.listen(PORT, () => console.log(`Running on port http://localhost:${PORT}`));

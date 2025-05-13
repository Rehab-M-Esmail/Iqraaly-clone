const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

const userRoutes = require("./routes/userRoute");
const adminRoutes = require("./routes/adminRoute");
const authRoutes = require("./routes/authRoute");
const bookRoutes = require("./routes/bookRoute");
const bookseriesRoutes = require("./routes/bookseriesRoute");
const statRoutes = require("./routes/statRoute");
const favoriteRoutes = require("./routes/favoriteRoute");
const playbackRoutes = require("./routes/playbackRoute");

// app.use(cors({ origin: "*" }));
// app.use(bodyParser.json());
app.use(express.json());
//app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/audiobooks", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB error:", err));

app.use("/auth", authRoutes); //working
app.use("/users", userRoutes); // working
app.use("/admin", adminRoutes); //working
app.use("/books", bookRoutes); //working
app.use("/bookseries", bookseriesRoutes);
app.use("/stats", statRoutes); //working
app.use("/favorites", favoriteRoutes); //working
app.use("/playback", playbackRoutes);

app.get("/", (req, res) => {
  res.send("Backend is working!");
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const userRoutes = require("./routes/user.route");
const adminRoutes = require("./routes/admin.route");
const authRoutes = require("./routes/auth.route");
const bookRoutes = require("./routes/book.route");
const bookseriesRoutes = require("./routes/bookseries.route");
const statRoutes = require("./routes/stat.route");
const subscriptionRoutes = require("./routes/subscription.route");
const favoriteRoutes = require("./routes/favorite.route");
const playbackRoutes = require("./routes/playback.route");


app.use(cors({ origin: "*" })); 
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));


mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/audiobooks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB error:", err));


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/bookseries", bookseriesRoutes);
app.use("/api/stats", statRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/playback", playbackRoutes);


app.get("/", (req, res) => {
  res.send("Backend is working!");
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
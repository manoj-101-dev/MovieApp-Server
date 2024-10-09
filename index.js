import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import moviesRouter from "./routes/Movies.js";
import bookingsRouter from "./routes/Bookings.js";
import authRouter from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/movies", moviesRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/auth", authRouter);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the Movie Booking API");
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));

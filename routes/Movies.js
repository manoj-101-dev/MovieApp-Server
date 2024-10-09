import express from "express";
import Movie from "../models/Movie.js";

const router = express.Router();

// Get all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single movie by ID
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// (Optional) Add a new movie via API
// Not required as per user request, but can be kept if needed
router.post("/", async (req, res) => {
  const { title, description, posterUrl, showtimes } = req.body;
  const movie = new Movie({ title, description, posterUrl, showtimes });
  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;

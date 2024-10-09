import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  posterUrl: String,
  showtimes: [String], // e.g., ["10:00 AM", "1:00 PM", "4:00 PM"]
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;

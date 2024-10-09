import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  showtime: { type: String, required: true },
  seats: { type: Number, default: 1 },
  bookingDate: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;

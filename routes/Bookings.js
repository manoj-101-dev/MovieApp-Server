import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// Create a new booking
router.post("/", async (req, res) => {
  const { movie, userName, userEmail, showtime, seats } = req.body;
  const booking = new Booking({ movie, userName, userEmail, showtime, seats });
  try {
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all bookings or bookings by user email
router.get("/", async (req, res) => {
  const { email } = req.query;
  try {
    let bookings;
    if (email) {
      bookings = await Booking.find({ userEmail: email }).populate("movie");
    } else {
      bookings = await Booking.find().populate("movie");
    }
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a booking by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Update a booking by ID
router.put("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Update fields if they are present in the request body
    const { userName, userEmail, showtime, seats } = req.body;
    if (userName) booking.userName = userName;
    if (userEmail) booking.userEmail = userEmail;
    if (showtime) booking.showtime = showtime;
    if (seats) booking.seats = seats;

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single booking by ID
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("movie");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

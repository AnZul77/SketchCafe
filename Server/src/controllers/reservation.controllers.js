import Reservation from "../models/Reservation.js";

export const createReservation = async (req, res) => {
  try {
    const { guests, date, time, specialRequests } = req.body;
    const newReservation = new Reservation({
      user: req.userId,
      guests,
      date,
      time,
      specialRequests,
    });
    await newReservation.save();
    res.status(201).json({ message: "Reservation created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;
    const reservation = await Reservation.findOne({
      _id: reservationId,
      user: req.userId,
    });
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    reservation.status = "cancelled";
    await reservation.save();
    res.status(200).json({ message: "Reservation cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const reservationId = req.params.id;
    
    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const reservation = await Reservation.findByIdAndUpdate(
      reservationId,
      { status },
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.status(200).json({ message: "Reservation status updated", reservation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

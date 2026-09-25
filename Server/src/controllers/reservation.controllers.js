import Reservation from "../models/Reservation.js";

export const createReservation = async (req, res) => {
  try {
    const { guests, date, time, specialRequests } = req.body;

    if (!guests || Number(guests) < 1) {
      return res.status(400).json({ message: "Guest count must be at least 1" });
    }

    if (!date) {
      return res.status(400).json({ message: "Reservation date is required" });
    }

    const reservationDate = new Date(date);
    if (isNaN(reservationDate.getTime())) {
      return res.status(400).json({ message: "Invalid reservation date format" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (reservationDate < today) {
      return res.status(400).json({ message: "Reservation date cannot be in the past" });
    }

    if (!time || typeof time !== "string" || !time.trim()) {
      return res.status(400).json({ message: "Reservation time slot is required" });
    }

    const newReservation = new Reservation({
      user: req.userId,
      guests: Number(guests),
      date: reservationDate,
      time: time.trim(),
      specialRequests: specialRequests ? String(specialRequests).trim() : undefined,
    });
    await newReservation.save();
    res.status(201).json({ message: "Reservation created successfully", reservation: newReservation });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to create reservation" });
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
    const limit = Math.min(Math.max(Number(req.query.limit) || 100, 1), 200);
    const page = Math.max(Number(req.query.page) || 1, 1);
    const skip = (page - 1) * limit;

    const reservations = await Reservation.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch all reservations" });
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

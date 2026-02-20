import { Router } from "express";
import {
  createBooking,
  getBookingsByEmail,
  updateBookingStatus,
} from "../controllers/booking.controller";

const router = Router();

router.post("/", createBooking);
router.get("/", getBookingsByEmail);
router.patch("/:id/status", updateBookingStatus);

export default router;
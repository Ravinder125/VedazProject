import { Request, Response } from "express";
import mongoose from "mongoose";
import { Booking } from "../models/booking.model";
import { Expert } from "../models/expert.model";
import { asyncHandler } from "../utils/asyncHandler";
import { z } from "zod";
import { io } from "../index.js";

/* ------------------ VALIDATION SCHEMA ------------------ */

const bookingSchema = z.object({
    expertId: z.string(),
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
    date: z.string(),
    timeSlot: z.string(),
    notes: z.string().optional(),
});

/* ------------------ CREATE BOOKING ------------------ */

export const createBooking = asyncHandler(
    async (req: Request, res: Response) => {
        const parsed = bookingSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: parsed.error.flatten(),
            });
        }

        const { expertId, name, email, phone, date, timeSlot, notes } =
            parsed.data;

        if (!mongoose.Types.ObjectId.isValid(expertId)) {
            return res.status(400).json({ message: "Invalid Expert ID" });
        }

        const expert = await Expert.findById(expertId);
        if (!expert) {
            return res.status(404).json({ message: "Expert not found" });
        }

        try {
            const booking = await Booking.create({
                expertId,
                name,
                email,
                phone,
                date: new Date(date),
                timeSlot,
                notes,
            });

            /* 🔥 Emit real-time event */
            io.emit("slotBooked", {
                expertId,
                date,
                timeSlot,
            });

            res.status(201).json({
                success: true,
                message: "Booking successful",
                data: booking,
            });
        } catch (error: any) {
            // 🔥 Handle duplicate booking
            if (error.code === 11000) {
                return res.status(400).json({
                    message: "This time slot is already booked.",
                });
            }

            throw error;
        }
    }
);

/* ------------------ GET BOOKINGS BY EMAIL ------------------ */

export const getBookingsByEmail = asyncHandler(
    async (req: Request, res: Response) => {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const bookings = await Booking.find({ email })
            .populate("expertId", "name category")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: bookings,
        });
    }
);

/* ------------------ UPDATE BOOKING STATUS ------------------ */

export const updateBookingStatus = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const { status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id as string)) {
            return res.status(400).json({ message: "Invalid Booking ID" });
        }

        if (!["pending", "confirmed", "completed"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const booking = await Booking.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json({
            success: true,
            message: "Booking status updated",
            data: booking,
        });
    }
);
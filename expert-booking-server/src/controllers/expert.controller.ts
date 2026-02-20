import { Request, Response } from "express";
import { Expert } from "../models/expert.model";
import { Booking } from "../models/booking.model";
import { asyncHandler } from "../utils/asyncHandler";
import mongoose from "mongoose";

/*
 GET /api/experts
 Query:
   ?page=1
   ?limit=10
   ?search=rahul
   ?category=fitness
*/
export const getExperts = asyncHandler(
    async (req: Request, res: Response) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search as string;
        const category = req.query.category as string;

        const query: any = {};

        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        if (category) {
            query.category = category;
        }

        const total = await Expert.countDocuments(query);

        const experts = await Expert.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            page,
            totalPages: Math.ceil(total / limit),
            total,
            data: experts,
        });
    }
);

/*
 GET /api/experts/:id
 Return expert with booked slots removed
*/
export const getExpertById = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id as string)) {
            return res.status(400).json({ message: "Invalid Expert ID" });
        }

        const expert = await Expert.findById(id);

        if (!expert) {
            return res.status(404).json({ message: "Expert not found" });
        }

        // Get all bookings for this expert
        const bookings = await Booking.find({ expertId: id });

        // Remove booked slots from availableSlots
        const updatedSlots = expert.availableSlots.map((slotGroup) => {
            const bookedSlotsForDate = bookings
                .filter(
                    (b) =>
                        b.date.toISOString().split("T")[0] ===
                        slotGroup.date.toISOString().split("T")[0]
                )
                .map((b) => b.timeSlot);

            return {
                date: slotGroup.date,
                slots: slotGroup.slots.filter(
                    (slot) => !bookedSlotsForDate.includes(slot)
                ),
            };
        });

        res.json({
            success: true,
            data: {
                ...expert.toObject(),
                availableSlots: updatedSlots,
            },
        });
    }
);
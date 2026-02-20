import { Schema, model } from "mongoose";
import { IBooking } from "../types/models/booking.model.js";

const bookingSchema = new Schema<IBooking>(
    {
        expertId: {
            type: Schema.Types.ObjectId,
            ref: "Expert",
            required: true,
        },
        name: { type: String, required: true },
        email: { type: String, required: true, lowercase: true },
        phone: { type: String, required: true },
        date: { type: Date, required: true },
        timeSlot: { type: String, required: true },
        status: {
            type: String,
            enum: ["pending", "confirmed", "completed"],
            default: "pending",
        },
        notes: String,
    },
    { timestamps: true }
);

/*
 Prevent Double Booking
*/
bookingSchema.index(
    { expertId: 1, date: 1, timeSlot: 1 },
    { unique: true }
);

export const Booking = model<IBooking>("Booking", bookingSchema);
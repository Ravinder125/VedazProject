import { Schema, model } from "mongoose";
import { IExpert } from "../types/models/expert.model.js";

const timeSlotSchema = new Schema(
    {
        date: { type: Date, required: true },
        slots: { type: [String], required: true },
    },
    { _id: false }
);

const expertSchema = new Schema<IExpert>(
    {
        name: { type: String, required: true, trim: true },
        category: { type: String, required: true },
        experience: { type: Number, required: true },
        rating: { type: Number, required: true, min: 0, max: 5 },
        bio: String,
        availableSlots: { type: [timeSlotSchema], default: [] },
    },
    { timestamps: true }
);

export const Expert = model<IExpert>("Expert", expertSchema);
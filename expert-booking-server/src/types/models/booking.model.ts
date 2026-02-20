import { Document, Types } from "mongoose";

export type BookingStatus = "pending" | "confirmed" | "completed";

export interface IBooking extends Document {
    expertId: Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    date: Date;
    timeSlot: string;
    status: BookingStatus;
    notes?: string;
}
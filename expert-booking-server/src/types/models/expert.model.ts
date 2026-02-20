import { Document } from "mongoose";

export interface ITimeSlot {
    date: Date;
    slots: string[];
}

export interface IExpert extends Document {
    name: string;
    category: string;
    experience: number;
    rating: number;
    bio?: string;
    availableSlots: ITimeSlot[];
}
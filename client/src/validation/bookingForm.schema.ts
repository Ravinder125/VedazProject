import { z } from "zod";

export const bookingSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name is too long")
        .trim(),

    email: z
        .string()
        .email("Invalid email address")
        .toLowerCase()
        .trim(),

    phone: z
        .string()
        .regex(/^[6-9]\d{9}$/, "Invalid Indian phone number"),

    notes: z
        .string()
        .max(500, "Notes cannot exceed 500 characters")
        .trim()
        .optional()
});

export type BookingFormData = z.infer<typeof bookingSchema>;
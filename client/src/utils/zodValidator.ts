import type { ZodType } from "zod";

export const zodValidator = <T>(data: T, schema: ZodType<T>): {
    success: boolean;
    message: string;
    data: T | null,
    errors?: string[] | null
} => {
    const result = schema.safeParse(data);

    if (!result.success) {
        return {
            success: false,
            message: "Data Validation failed",
            data: null,
            errors: result.error.issues.map(e => e.message)
        }
    }

    return {
        success: true,
        message: "Data is validated",
        data: result.data
    }
}
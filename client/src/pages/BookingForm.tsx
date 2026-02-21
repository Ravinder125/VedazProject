import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../api/axios";
import type { BookingState } from "../types/Booking";
import { zodValidator } from "../utils/zodValidator";
import { bookingSchema, type BookingFormData } from "../validation/bookingForm.schema";
import Layout from "../components/ui/Layout";
import { InputBox } from "../components/ui/InputBox";




const InitialBookingForm = {
    name: "",
    email: "",
    phone: "",
    notes: "",
} as BookingFormData


const BookingForm = () => {
    const location = useLocation();
    const state = location.state as BookingState | undefined;

    const navigate = useNavigate();

    const [form, setForm] = useState<BookingFormData>(InitialBookingForm);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleInputChange = (key: keyof BookingFormData, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const {
            data,
            message = "Something went wrong", // For future use
            success,
            errors
        } = zodValidator<BookingFormData>(form, bookingSchema);

        if (!success) {
            console.error(message)
            setError(errors!?.[0])
            return
        }

        try {
            setLoading(true);
            if (!state) {
                return;
            }
            await api.post("/bookings", {
                ...data,
                expertId: state.expertId,
                date: state.date,
                timeSlot: state.timeSlot,
            });

            alert("Booking successful!");
            navigate("/");
        } catch (error: any) {
            alert(error.response?.data?.message || "Booking failed");
        } finally {
            setLoading(false);
        }
    };

    if (!state) return <p>No booking data found</p>;

    return (
        <Layout>
            <div
                className="card"
            >
                <h1 className="text-center">BOOK SLOT</h1>

                <div className="flex justify-between text-sm mt-6">
                    <div className="">Date :
                        <span className="text-gray-500">
                            {" "}{state.date.split("T")[0]}
                        </span>
                    </div>
                    <div>Time :
                        <span className="text-gray-500">
                            {" "}{state.timeSlot}
                        </span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">

                    <InputBox
                        id="name"
                        label="Name"
                        props={{
                            name: "name",
                            value: form.name,
                            onChange: (e) =>
                                handleInputChange("name", e.target.value),
                        }}
                    />

                    <InputBox
                        id="email"
                        label="Email"
                        props={{
                            type: "email",
                            name: "email",
                            value: form.email,
                            onChange: (e) =>
                                handleInputChange("email", e.target.value),
                        }}
                    />

                    <InputBox
                        id="phone"
                        label="Phone"
                        props={{
                            name: "phone",
                            value: form.phone,
                            onChange: (e) =>
                                handleInputChange("phone", e.target.value),
                        }}
                    />

                    <div className="flex flex-col gap-2">
                        <label>Notes</label>
                        <textarea
                            className="form-input"
                            value={form.notes}
                            onChange={(e) =>
                                handleInputChange("notes", e.target.value)
                            }
                        />
                    </div>

                    {error && (
                        <p className="text-red-600">{error}</p>
                    )}

                    <button
                        disabled={loading}
                        className="bg-blue-600 text-white p-2 rounded"
                    >
                        {loading ? "Booking..." : "Confirm Booking"}
                    </button>

                </form>
            </div >

        </Layout>
    );
};

export default BookingForm;






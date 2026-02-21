import { useState } from "react";
import { api } from "../api/axios";
import Search from "../components/Search";
import Layout from "../components/ui/Layout";
import Container from "../components/ui/Container";


const MyBookings = () => {
    const [email, setEmail] = useState<string>("");
    const [bookings, setBookings] = useState<any[]>([]);

    const fetchBookings = async () => {
        try {
            const { data } = await api.get("/bookings", {
                params: { email },
            });
            console.log(data)
            setBookings(data.data);
        } catch (error) {
            alert("Error fetching bookings");
        }
    };

    return (
        <Layout>
            <Container className="p-10">

                <h1>My Bookings</h1>
                <div className="flex gap-2">
                    <Search
                        className="border p-2 rounded w-full"
                        placeholder="Search by name"
                        autoFocus
                        value={email}
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        disabled={email?.trim() === ""}
                        className="submit-btn " onClick={fetchBookings}>
                        Get Bookings
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3 mt-6">
                    {bookings.map((b) => (
                        <BookingCard
                            key={b._id}
                            id={b._id}
                            date={b.date}
                            expertName={b.expertId.name}
                            status={b.status}
                            timeSlot={b.timeSlot}
                        />
                    ))}

                </div>
            </Container>
        </Layout>
    );
};

export default MyBookings;

type BookingCadStatus = "pending" | "confirmed" | "completed";

interface BookingCardProps {
    id: string;
    expertName: string;
    timeSlot: string;
    status: BookingCadStatus;
    date: string
}

export const BookingCard = ({
    id,
    expertName,
    status,
    timeSlot,
    date
}: BookingCardProps) => {

    const getCardStatus = (status: BookingCadStatus) => {
        switch (status) {
            case "pending":
                return "border border-yellow-800 text-yellow-600 bg-yellow-100"
            case "completed":
                return "border border-green-800 text-green-600 bg-green-100"
            default:
                return "border border-purple-800 text-purple-600 bg-purple-100"
        }
    }


    return (
        <div
            key={id}
            className="p-5 w-full border border-gray-300 mt-3 rounded shadow-md"
        >
            <h3>{expertName}</h3>
            <p className="mt-3">
                <span className="text-gray-500">Date : </span>
                {date.split("T")[0]}
            </p>
            <p className="font-medium">
                <span className="text-gray-500">Time : </span>
                {timeSlot}</p>
            <p
                className={`w-fit px-3 py-1 rounded-sm mt-3 ${getCardStatus(status)}
                    }`}
            >
                {status}
            </p>
        </div>
    )
}


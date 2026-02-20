import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { socket } from "../hooks/useSocket";

interface SlotGroup {
    date: string;
    slots: string[];
}

interface Expert {
    _id: string;
    name: string;
    category: string;
    experience: number;
    rating: number;
    bio?: string;
    availableSlots: SlotGroup[];
}

const ExpertDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [expert, setExpert] = useState<Expert | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchExpert = async () => {
        try {
            setLoading(true);
            const { data } = await api.get(`/experts/${id}`);
            setExpert(data.data);
        } catch (error) {
            console.error("Error loading expert");
        } finally {
            setLoading(false);
        }
    };

    const onViewDetails = ({ id, date, timeSlot }: {
        id: string;
        date: string;
        timeSlot: string;
    }) => {
        navigate("/bookings", {
            state: {
                expertId: id,
                date: date,
                timeSlot: timeSlot,
            },
        })
    }

    useEffect(() => {
        fetchExpert();
    }, [id]);

    /* 🔥 Real-time listener */
    useEffect(() => {
        socket.on("slotBooked", (data) => {
            if (!expert) return;

            if (data.expertId !== expert._id) return;

            setExpert((prev) => {
                if (!prev) return prev;

                const updatedSlots = prev.availableSlots.map((group) => {
                    if (
                        group.date.split("T")[0] ===
                        data.date.split("T")[0]
                    ) {
                        return {
                            ...group,
                            slots: group.slots.filter(
                                (slot) => slot !== data.timeSlot
                            ),
                        };
                    }
                    return group;
                });

                return { ...prev, availableSlots: updatedSlots };
            });
        });

        return () => {
            socket.off("slotBooked");
        };
    }, [expert]);

    if (loading) return <p>Loading...</p>;
    if (!expert) return <p>Expert not found</p>;

    return (
        <div style={{ padding: 40 }}>
            <h1>{expert.name}</h1>
            <h2 className="mb-1">{expert.category}</h2>
            <p className="italic">{expert.experience} years experience</p>
            <p>Rating: ⭐ {expert.rating.toFixed(1)}</p>

            <h2 className="mt-10 mb-1">Available Slots</h2>

            {expert.availableSlots.map((group) => (
                <div key={group.date} >
                    <h4>{group.date.split("T")[0]}</h4>
                    {group.slots.length === 0 ? (
                        <p>No slots available</p>
                    ) : (
                        group.slots.map((slot) => (
                            <button
                                key={slot}
                                className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700 mr-2 mb-2 cursor-pointer"
                                onClick={() =>
                                    onViewDetails({
                                        id: expert._id,
                                        date: group.date,
                                        timeSlot: slot
                                    })}
                            >
                                {slot}
                            </button>
                        ))
                    )}
                </div>
            ))}
        </div>
    );
};

export default ExpertDetail;
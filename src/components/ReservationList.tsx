"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import getCoworkings from "@/libs/getCoworkings";
import getReservations from "@/libs/getReservations";
import deleteReservation from "@/libs/deleteReservation";

export default function ReservationList() {
    const { data: session } = useSession();
    const [reservations, setReservations] = useState<ReservationItem[]>([]);
    const [coworkingMap, setCoworkingMap] = useState<{ [key: string]: string }>({});
    const router = useRouter();

    useEffect(() => {
        const fetchReservations = async () => {
            if (!session?.user?.token) return;

            try {
                const reservationsData = await getReservations(session.user.token, session.user._id, session.user.role);
                setReservations(reservationsData);
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        };

        const loadCoworkings = async () => {
            try {
                const coworkingData = await getCoworkings();
                const coworkingNameMap: { [key: string]: string } = {};
                coworkingData.data.forEach((coworking: CoworkingItem) => {
                    coworkingNameMap[coworking._id] = coworking.name;
                });
                setCoworkingMap(coworkingNameMap);
            } catch (error) {
                console.error("Error fetching coworking details:", error);
            }
        };

        fetchReservations();
        loadCoworkings();
    }, [session]);

    const handleEdit = (reservation: ReservationItem) => {
        router.push(
            `/myreservation/edit?reservationId=${reservation._id}&name=${reservation.name}&telephone=${reservation.telephone}&resvTime=${reservation.resvTime}&coworking=${reservation.coworking}`
        );
    };

    const handleDelete = async (reservationId: string) => {
        if (!confirm("Are you sure you want to delete this reservation?")) return;

        try {
            // console.log("Deleting reservation:", reservationId); // Debugging

            const success = await deleteReservation(session?.user.token!, reservationId);
            if (success) {
                alert("🚀 Reservation deleted!");
                setReservations(reservations.filter((r) => r._id !== reservationId)); // ✅ Remove from UI
            } else {
                alert("Failed to delete reservation.");
            }
        } catch (error) {
            console.error("Error deleting reservation:", error);
            alert("Failed to delete reservation.");
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold mb-6">
                {session?.user.role === "admin" ? "All Reservations" : "My Reservations"}
            </h2>
            {reservations.length === 0 ? (
                <div className="text-gray-500 text-lg">No Coworking Reservation</div>
            ) : (
                <div className="space-y-4 w-full max-w-2xl">
                    {reservations.map((reservationItem: ReservationItem) => (
                        <div key={reservationItem.coworking} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
                            <div>
                                <div className="text-lg font-semibold">Name: {reservationItem.name}</div>
                                <div className="text-gray-600">Tel: {reservationItem.telephone}</div>
                                <div className="text-gray-600">Location: {coworkingMap[reservationItem.coworking]}</div>
                                <div className="text-gray-600">Reservation Date: {new Date(reservationItem.resvTime).toLocaleString()}</div>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleEdit(reservationItem)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-indigo-600 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(reservationItem._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

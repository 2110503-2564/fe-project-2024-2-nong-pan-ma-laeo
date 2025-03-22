"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { AppDispatch } from "../redux/store";
import { removeReservation } from "../redux/features/reserveSlice";
import getCoworkings from "@/libs/getCoworkings";
import getUserProfile from "@/libs/getUserProfile";

export default function ReservationList() {
    const { data: session } = useSession();
    const dispatch = useDispatch<AppDispatch>();
    const [reservations, setReservations] = useState<ReservationItem[]>([]);
    const [coworkingMap, setCoworkingMap] = useState<{ [key: string]: string }>({});
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchReservations = async () => {
            if (!session?.user.token) return;

            try {
                const response = await fetch("https://backend-coworking-z1ql.onrender.com/api/v1/reservations", {
                    headers: { Authorization: `Bearer ${session.user.token}` }
                });
                const data = await response.json();
                if (data.success) {
                    setReservations(data.data);
                }
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

    useEffect(() => {
        async function fetchProfile() {
            if (session?.user?.token) {
                try {
                    const profile = await getUserProfile(session.user.token);
                    setUserProfile(profile);
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                }
            }
        }
        fetchProfile();
    }, [session?.user?.token]);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold mb-6">
                {userProfile?.data.role === "admin" ? "All Reservations" : "My Reservations"}
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
                            <button
                                onClick={() => dispatch(removeReservation(reservationItem))}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

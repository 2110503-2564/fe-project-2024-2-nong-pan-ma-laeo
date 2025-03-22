"use client"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { AppDispatch } from "../redux/store"
import { removeReservation } from "../redux/features/reserveSlice"
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
            if (!session?.user.token) return; // If no session, do nothing

            try {
                const response = await fetch("https://backend-coworking-z1ql.onrender.com/api/v1/reservations", {
                    headers: {
                        Authorization: `Bearer ${session.user.token}` // Send token in headers
                    }
                });
                const data = await response.json();
                if (data.success) {
                    setReservations(data.data); // Set reservations from API
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
        <>
            <h2 className="text-xl font-bold text-center mt-5">
                {userProfile?.data.role === "admin" ? "All Reservations" : "My Reservations"}
            </h2>
            {reservations.length === 0 ? (
                <div className="text-center text-gray-500 text-lg mt-5">
                    No Coworking Reservation
                </div>
            ) : (
                reservations.map((reservationItem: ReservationItem) => (
                    <div key={reservationItem.coworking} className="bg-slate-200 rounded px-5 mx-5 py-2 my-2 flex justify-between items-center">
                        <div>
                            <div>Name: {reservationItem.name}</div>
                            <div className="text-md">Tel: {reservationItem.telephone}</div>
                            <div className="text-md">Location: {coworkingMap[reservationItem.coworking]}</div>
                            <div className="text-md">Reservation Date: {new Date(reservationItem.resvTime).toLocaleString()}</div>
                        </div>
                        <button
                            onClick={() => dispatch(removeReservation(reservationItem))}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition">
                            Remove
                        </button>
                    </div>
                ))
            )}
        </>
    )
}

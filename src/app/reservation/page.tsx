"use client";

import DateReserve from "@/components/DateReserve";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useSearchParams } from "next/navigation";
import makeReservation from "@/libs/makeReservation";

export default function Reservation() {
    // State Management
    const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);
    const [reserveTime, setReserveTime] = useState<string>("");
    const [coworkingId, setCoworkingId] = useState<string>("");
    const [coworkingName, setCoworkingName] = useState<string>("67bd6139cc4d71cc9c05ad56");
    const [name, setName] = useState<string>("");
    const [telephone, setTelephone] = useState<string>("");
    const [token, setToken] = useState<string | null>(null);

    const dispatch = useDispatch<AppDispatch>();
    const urlParams = useSearchParams();

    // Fetch Token from Local Storage
    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);

    // Pre-fill fields from URL parameters
    useEffect(() => {
        const model = urlParams.get("model");
        const tel = urlParams.get("tel");
        const coworkingIdFromURL = urlParams.get("_id");

        if (model) setName(model);
        if (tel) setTelephone(tel);
        if (coworkingIdFromURL) setCoworkingId(coworkingIdFromURL);
    }, [urlParams]);

    // Handle Input Changes
    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setter(event.target.value);
        };

    // Handle Reservation Submission
    const handleReservation = async () => {
        if (!reserveDate || !reserveTime || !name || !telephone || !coworkingId) {
            alert("⚠️ Please fill in all fields before making a reservation.");
            console.warn("Missing fields:", { name, telephone, coworkingId, reserveDate, reserveTime });
            return;
        }

        const formattedDateTime = `${dayjs(reserveDate).format("YYYY-MM-DD")} ${reserveTime}`;

        const reservationData = {
            name,
            telephone,
            coworking: coworkingId,
            resvTime: formattedDateTime,
        };

        try {
            const response = await makeReservation(reservationData);
            console.log("✅ Reservation Successful:", response);
            alert("🎉 Reservation successful!");
        } catch (error) {
            console.error("❌ Error making reservation:", error);
            alert("Failed to make a reservation. Please try again.");
        }
    };

    return (
        <main className="w-full flex flex-col items-center space-y-4">
            <h1 className="text-xl font-medium">New Reservation</h1>

            {/* Personal Information Section */}
            <section className="w-fit space-y-2">
                <h2 className="text-md text-left text-gray-600">Personal Information</h2>
                <div className="bg-slate-100 rounded-lg space-y-4 w-full px-10 py-5 flex flex-col justify-center">
                    <TextField
                        className="w-full"
                        variant="standard"
                        label="Name-Lastname"
                        value={name}
                        onChange={handleInputChange(setName)}
                    />
                    <TextField
                        className="w-full"
                        variant="standard"
                        label="Contact Number"
                        value={telephone}
                        onChange={handleInputChange(setTelephone)}
                    />
                </div>
            </section>

            {/* Reservation Details */}
            <section className="w-fit space-y-2">
                <h2 className="text-md text-left text-gray-600">Reservation Date</h2>
                <DateReserve
                    onDateChange={setReserveDate}
                    onLocationChange={(value: string) => {
                        setCoworkingName(value);
                        setCoworkingId(value);
                    }}
                    onTimeChange={setReserveTime}
                />
            </section>

            {/* Submit Button */}
            <button
                className="rounded-md bg-sky-600 hover:bg-indigo-600 px-4 py-2 text-white shadow-md transition duration-200"
                onClick={handleReservation}
            >
                Reserve Coworking
            </button>
        </main>
    );
}

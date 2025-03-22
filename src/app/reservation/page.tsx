"use client";

import DateReserve from "@/components/DateReserve";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "next/navigation";
import makeReservation from "@/libs/makeReservation";

export default function Reservation() {
    const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);
    const [reserveTime, setReserveTime] = useState<string>("");
    const [coworkingId, setCoworkingId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [telephone, setTelephone] = useState<string>("");

    const urlParams = useSearchParams();

    useEffect(() => {
        const model = urlParams.get("model");
        const tel = urlParams.get("tel");
        const coworkingIdFromURL = urlParams.get("_id");

        if (model) setName(model);
        if (tel) setTelephone(tel);
        if (coworkingIdFromURL) setCoworkingId(coworkingIdFromURL);
    }, [urlParams]);

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setter(event.target.value);
        };

    const handleReservation = async () => {
        if (!reserveDate || !reserveTime || !name || !telephone || !coworkingId) {
            alert("⚠️ Please fill in all fields before making a reservation.");
            return;
        }

        const formattedDateTime = `${dayjs(reserveDate).format("YYYY-MM-DD")} ${reserveTime}`;

        try {
            await makeReservation({ name, telephone, coworking: coworkingId, resvTime: formattedDateTime });
            alert("🎉 Reservation successful!");
        } catch (error) {
            alert("Failed to make a reservation. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-3xl font-bold mb-6">New Reservation</h2>
            <div className="w-96 p-8 bg-white shadow-lg rounded-lg space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <TextField
                    className="w-full"
                    variant="outlined"
                    label="Name-Lastname"
                    value={name}
                    onChange={handleInputChange(setName)}
                />
                <TextField
                    className="w-full"
                    variant="outlined"
                    label="Contact Number"
                    value={telephone}
                    onChange={handleInputChange(setTelephone)}
                />

                <h3 className="text-lg font-semibold">Reservation Details</h3>
                <DateReserve
                    onDateChange={setReserveDate}
                    onLocationChange={setCoworkingId}
                    onTimeChange={setReserveTime}
                />

                <button
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                    onClick={handleReservation}
                >
                    Reserve Now
                </button>
            </div>
        </div>
    );
}

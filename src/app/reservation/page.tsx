"use client";


import DateReserve from "@/components/DateReserve";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "next/navigation";
import makeReservation from "@/libs/makeReservation";
import { useSession } from "next-auth/react";

export default function Reservation() {
    const [reserveDate, setReserveDate] = useState<string>("");
    const [reserveTime, setReserveTime] = useState<string>("");
    const [coworkingId, setCoworkingId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [telephone, setTelephone] = useState<string>("");
    const { data: session } = useSession();
    const urlParams = useSearchParams();

    useEffect(() => {
        const model = urlParams.get("model");
        const tel = urlParams.get("tel");
        const coworkingIdFromURL = urlParams.get("_id");
        useEffect(() => {
            const model = urlParams.get("model");
            const tel = urlParams.get("tel");
            const coworkingIdFromURL = urlParams.get("_id");

            if (model) setName(model);
            if (tel) setTelephone(tel);
            if (coworkingIdFromURL) setCoworkingId(coworkingIdFromURL);
        }, [urlParams]);
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
            if (!session?.user.token) {
                return null;
            }
            await makeReservation({ name, telephone, coworking: coworkingId, resvTime: formattedDateTime, token: session?.user.token });
            alert("🎉 Reservation successful!");
        } catch (error) {
            alert("Failed to make a reservation. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            {/* Title */}
            <h2 className="text-3xl font-bold mb-8 text-center">New Reservation</h2>

            {/* Reservation Form */}
            <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-center">Personal Information</h3>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Name-Lastname"
                        value={name}
                        onChange={handleInputChange(setName)}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Contact Number"
                        value={telephone}
                        onChange={handleInputChange(setTelephone)}
                    />
                </div>

                {/* Reservation Details */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-center">Reservation Details</h3>
                    <div className="w-full flex flex-col items-center">
                        <div className="w-full max-w-md">
                            <DateReserve
                                onDateChange={setReserveDate}
                                onLocationChange={setCoworkingId}
                                onTimeChange={setReserveTime}
                            />
                        </div>
                    </div>
                </div>

                {/* Reserve Button */}
                <button
                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200 text-lg font-medium"
                    onClick={handleReservation}
                >
                    Reserve Coworking
                </button>
            </div>
        </div>
    );
}

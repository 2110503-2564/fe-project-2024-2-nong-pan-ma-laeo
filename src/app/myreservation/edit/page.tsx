"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TextField from "@mui/material/TextField";
import dayjs, { Dayjs } from "dayjs";
import DateReserve from "@/components/DateReserve";
import updateReservation from "@/libs/updateReservation";

export default function EditReservation() {
    const { data: session } = useSession();
    const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);
    const [reserveTime, setReserveTime] = useState<string>("");
    const [coworkingId, setCoworkingId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [telephone, setTelephone] = useState<string>("");
    const [reservationId, setReservationId] = useState<string>("");

    const router = useRouter();
    const urlParams = useSearchParams();

    useEffect(() => {
        const resId = urlParams.get("reservationId");
        const model = urlParams.get("name");
        const tel = urlParams.get("telephone");
        const time = urlParams.get("resvTime");
        const coworkingIdFromURL = urlParams.get("coworking");
        if (resId) setReservationId(resId);
        if (model) setName(model);
        if (tel) setTelephone(tel);
        if (time) setReserveTime(time);
        if (coworkingIdFromURL) setCoworkingId(coworkingIdFromURL);
    }, [urlParams]);

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setter(event.target.value);
        };

    const handleUpdateReservation = async () => {
        if (!reserveDate || !reserveTime || !name || !telephone || !coworkingId) {
            alert("⚠️ Please fill in all fields before updating the reservation.");
            return;
        }

        const formattedDateTime = `${dayjs(reserveDate).format("YYYY-MM-DD")} ${reserveTime}`;

        console.log("Updating reservation with:", {
            reservationId,
            name,
            telephone,
            coworking: coworkingId,
            resvTime: formattedDateTime
        });

        try {
            await updateReservation(reservationId, { name, telephone, coworking: coworkingId, resvTime: formattedDateTime }, session?.user.token);
            alert("✅ Reservation updated successfully!");
            router.push("/myreservation"); // Redirect to My Reservations
        } catch (error) {
            alert("❌ Failed to update reservation. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-3xl font-bold mb-6">Edit Reservation</h2>
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg space-y-6">
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
                
                <div className="w-full max-w-md">
                    <DateReserve
                        onDateChange={setReserveDate}
                        onLocationChange={setCoworkingId}
                        onTimeChange={setReserveTime}
                    />
                </div>
                <button
                    className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-200"
                    onClick={handleUpdateReservation}
                >
                    Update Reservation
                </button>
            </div>
        </div>
    );
}

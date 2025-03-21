"use client"
import DateReserve from "@/components/DateReserve"
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addReservation } from "../../redux/features/reserveSlice";
import { useSearchParams } from "next/navigation";
import makeReservation from "@/libs/makeReservation";
import getCoworking from "@/libs/getCoworking";

export default function Reservation() {
    const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);
    const [reserveTime, setReserveTime] = useState<string>("");
    const [coworkingId, setCoworkingId] = useState<string>("");
    const [coworkingName, setCoworkingName] = useState<string>("Bloom");
    const [name, setName] = useState<string>("");
    const [telephone, setTelephone] = useState<string>("");

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }
    const handleTelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTelephone(event.target.value);
    }

    const dispatch = useDispatch<AppDispatch>();
    const urlParams = useSearchParams();

    // Pre-fill fields from URL params (if available)
    useEffect(() => {
        if (urlParams.get("model")) setName(urlParams.get("model")!);
        if (urlParams.get("tel")) setTelephone(urlParams.get("tel")!);
        if (urlParams.get("coworking")) {
            setCoworkingId(urlParams.get("coworking")!);
        }
    }, [urlParams]);

    // Fetch coworking space details using `getCoworking`
    useEffect(() => {
        if (coworkingId) {
            getCoworking(coworkingId)
                .then((data) => {
                    setCoworkingName(data.name);
                })
                .catch((error) => {
                    console.error("Error fetching coworking:", error);
                    alert("Failed to fetch coworking space.");
                });
        }
    }, [coworkingId]);

    const handleReservation = async () => {
        if (!reserveTime || !name || !telephone) {
            alert("Please fill in all fields before making a reservation.");
            return;
        }

        const formattedDateTime = new Date(`${dayjs(reserveDate).format("YYYY-MM-DD")}T${reserveTime}:00Z`);

        const reservationData: ReservationItem = {
            name: name,
            telephone: telephone,
            coworking: coworkingId,
            resvTime: formattedDateTime,
        };

        dispatch(addReservation(reservationData));

        try {
            const response = await makeReservation(reservationData);
            console.log("Reservation Successful:", response);
            alert("Reservation successful!");
        } catch (error) {
            console.error("Error making reservation:", error);
            alert("Failed to make a reservation.");
        }
    };


    return (
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-xl font-medium">New Reservation</div>
            <div className="w-fit space-y-2">
                <div className="text-md text-left text-gray-600">
                    Personal Information
                </div>
                <div className="bg-slate-100 rounded-lg space-y-4 w-full px-10 py-5 flex flex-col justify-center">
                    <TextField
                        className="w-full"
                        variant="standard"
                        label="Name-Lastname"
                        value={name}
                        onChange={handleNameChange}
                    />
                    <TextField
                        className="w-full"
                        variant="standard"
                        label="Contact-Number"
                        value={telephone}
                        onChange={handleTelChange}
                    />
                </div>

                <div className="text-md text-left text-gray-600">Reservation Date</div>
                <DateReserve
                    onDateChange={(value: Dayjs) => setReserveDate(value)}
                    onLocationChange={(value: string) => setCoworkingName(value)}
                    onTimeChange={(value: string) => setReserveTime(value)}
                />
            </div>

            <button
                className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white"
                onClick={handleReservation}
            >
                Reserve Coworking
            </button>
        </main>
    )
}

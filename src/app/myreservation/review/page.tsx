"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TextField from "@mui/material/TextField";
import makeReview from "@/libs/makeReview";
import { Rating } from "@mui/material";

export default function ReviewReservation() {
    const [rating, setRating] = useState<number>(0);
    const [coworkingId, setCoworkingId] = useState<string>("");
    const [name, setName] = useState<string>("")
    const [user, setUser] = useState<string>("");
    const [telephone, setTelephone] = useState<string>("");
    const [review, setReview] = useState<string>("");

    const router = useRouter();
    const urlParams = useSearchParams();

    useEffect(() => {
        const model = urlParams.get("user");
        const reviews = urlParams.get("review");
        const coworkingIdFromURL = urlParams.get("coworking");
        const users = urlParams.get("user")
        if (model) setUser(model);
        if (users) setUser(users)
        if (reviews) setReview(reviews);
        if (coworkingIdFromURL) setCoworkingId(coworkingIdFromURL);
    }, [urlParams]);

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setter(event.target.value);
        };

    const handleUpdateReservation = async () => {
        if (!rating || !review || !user || !coworkingId) {
            alert("⚠️ Please fill in all fields before updating the reservation.");
            return;
        }

        console.log("Review reservation with:", {
            rating,
            comment: review,
            user,
            coworking: coworkingId,
        });
        try {
            await makeReview({ rating, comment: review, coworkingID: coworkingId })
            alert("🎉 Review sucessful!");
        } catch (error) {
            alert("Failed to make a reservation. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-3xl font-bold mb-6">Review Reservation</h2>
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
                <h3 className="text-lg font-semibold">Review Details</h3>
                <TextField
                    className="w-full"
                    variant="outlined"
                    label="Review"

                    onChange={handleInputChange(setReview)}
                />
                <Rating className="w-full h-auto " value={(rating == undefined) ? 0 : rating}
                    onChange={(e, newValue) => { if (newValue != null) setRating(newValue) }} />
                <button
                    className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-200"
                    onClick={handleUpdateReservation}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
"use client"
import { useDispatch } from "react-redux";
import { useAppSelector, AppDispatch } from "../redux/store"
import { removeReservation } from "../redux/features/reserveSlice"

export default function ReservationList() {
    const dispatch = useDispatch<AppDispatch>();
    const reserveItems = useAppSelector((state) => state.reserveSlice.reserveItems)

    return (
        <>
            {reserveItems.length === 0 ? (
                <div className="text-center text-gray-500 text-lg mt-5">
                    No Coworking Reservation
                </div>
            ) : (
                reserveItems.map((reservationItem: ReservationItem) => (
                    <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2 flex justify-between items-center">
                        <div>
                            <div>Name: {reservationItem.nameLastname}</div>
                            <div className="text-md">Tel: {reservationItem.tel}</div>
                            <div className="text-md">Location: {reservationItem.coworking}</div>
                            <div className="text-md">Reservation Date: {reservationItem.reserveDate}</div>
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

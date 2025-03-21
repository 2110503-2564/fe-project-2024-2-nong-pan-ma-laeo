import dayjs, { Dayjs } from "dayjs"
import { DatePicker, TimePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Select, MenuItem, TextField } from "@mui/material"
import { useState, useEffect } from "react"
import getCoworkings from "@/libs/getCoworkings"

export default function DateReserve({ onDateChange, onLocationChange, onTimeChange }
    : { onDateChange: Function, onLocationChange: Function, onTimeChange: Function }) {
    const [reserveDate, setReserveDate] = useState<Dayjs | null>(null)
    const [reserveTime, setReserveTime] = useState<string>("")
    const [location, setLocation] = useState("")
    const [coworkingSpaces, setCoworkingSpaces] = useState<CoworkingItem[]>([]);

    // Fetch coworking spaces
    useEffect(() => {
        async function fetchCoworkings() {
            try {
                const data = await getCoworkings();
                if (data.success && data.data.length > 0) {
                    setCoworkingSpaces(data.data);
                    setLocation(data.data[0]._id); // Set first coworking space as default
                }
            } catch (error) {
                console.error("Failed to fetch coworking spaces:", error);
            }
        }
        fetchCoworkings();
    }, []);

    return (
        <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-10 py-5 
        flex flex-row justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white"
                    value={reserveDate}
                    onChange={(value) => { setReserveDate(value); onDateChange(value) }} />
            </LocalizationProvider>
            <TextField
                className="bg-white"
                label="Reservation Time (HH:MM-HH:MM)"
                variant="standard"
                value={reserveTime}
                onChange={(e) => { setReserveTime(e.target.value); onTimeChange(e.target.value); }}
            />
            <Select variant="standard" name="coworking" id="coworking" className="k-[2em] w-[200px]" value={location}
                onChange={(e) => { setLocation(e.target.value); onLocationChange(e.target.value); }}>
                {
                    coworkingSpaces.map((coworking) => (
                        <MenuItem key={coworking._id} value={coworking._id}>
                            {coworking.name}
                        </MenuItem>
                    ))
                }
            </Select>
        </div>
    )
}
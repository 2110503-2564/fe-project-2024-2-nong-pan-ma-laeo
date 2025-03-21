import dayjs, { Dayjs } from "dayjs"
import { DatePicker, TimePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Select, MenuItem, TextField } from "@mui/material"
import { useState } from "react"

export default function DateReserve({ onDateChange, onLocationChange, onTimeChange }
    : { onDateChange: Function, onLocationChange: Function, onTimeChange: Function }) {
    const [reserveDate, setReserveDate] = useState<Dayjs | null>(null)
    const [reserveTime, setReserveTime] = useState<string>("")
    const [location, setLocation] = useState('Bloom')
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
                <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                <MenuItem value="Spark">Spark Space</MenuItem>
                <MenuItem value="GrandTable">The Grand Table</MenuItem>
            </Select>
        </div>
    )
}
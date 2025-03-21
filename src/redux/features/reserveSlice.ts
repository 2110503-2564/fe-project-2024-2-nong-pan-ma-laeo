import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

type ReserveState = {
    reserveItems: ReservationItem[];
};

const initialState: ReserveState = { reserveItems: [] };

export const fetchReservations = createAsyncThunk(
    "reserve/fetchReservations",
    async (token: string) => {
        const response = await fetch("http://localhost:5000/api/v1/reservations", {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        return data.success ? data.data : [];
    }
);

export const reserveSlice = createSlice({
    name: "reserve",
    initialState,
    reducers: {
        addReservation: (state, action: PayloadAction<ReservationItem>) => {
            const newReservation = action.payload;
            const existingIndex = state.reserveItems.findIndex(
                (item) =>
                    item.coworking === newReservation.coworking &&
                    item.resvTime === newReservation.resvTime
            );
            if (existingIndex !== -1) {
                state.reserveItems[existingIndex] = newReservation;
            } else {
                state.reserveItems.push(newReservation);
            }
        },
        removeReservation: (state, action: PayloadAction<ReservationItem>) => {
            const index = state.reserveItems.findIndex(obj =>
                obj.name === action.payload.name &&
                obj.telephone === action.payload.telephone &&
                obj.coworking === action.payload.coworking &&
                obj.resvTime === action.payload.resvTime
            );

            if (index !== -1) {
                state.reserveItems.splice(index, 1); // Remove only the first found match
            }
        }
    }
});

export const { addReservation, removeReservation } = reserveSlice.actions;
export default reserveSlice.reducer;

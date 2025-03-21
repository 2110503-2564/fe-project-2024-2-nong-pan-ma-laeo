import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ReserveState = {
    reserveItems: ReservationItem[];
};

const initialState: ReserveState = { reserveItems: [] };

export const reserveSlice = createSlice({
    name: "reserve",
    initialState,
    reducers: {
        addReservation: (state, action: PayloadAction<ReservationItem>) => {
            const newReservation = action.payload;
            const existingIndex = state.reserveItems.findIndex(
                (item) =>
                    item.coworking === newReservation.coworking &&
                    item.reserveDate === newReservation.reserveDate
            );
            if (existingIndex !== -1) {
                state.reserveItems[existingIndex] = newReservation;
            } else {
                state.reserveItems.push(newReservation);
            }
        },
        removeReservation: (state, action: PayloadAction<ReservationItem>) => {
            const index = state.reserveItems.findIndex(obj =>
                obj.nameLastname === action.payload.nameLastname &&
                obj.tel === action.payload.tel &&
                obj.coworking === action.payload.coworking &&
                obj.reserveDate === action.payload.reserveDate
            );

            if (index !== -1) {
                state.reserveItems.splice(index, 1); // Remove only the first found match
            }
        }
    }
});

export const { addReservation, removeReservation } = reserveSlice.actions;
export default reserveSlice.reducer;

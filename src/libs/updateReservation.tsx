export default async function updateReservation(reservationId: string, updatedData: Partial<ReservationItem>,token:string) {
   
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reservations/${reservationId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },

        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        throw new Error("Failed to update reservation");
    }

    return await response.json();
}

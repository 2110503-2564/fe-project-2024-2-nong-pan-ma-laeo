export default async function updateReservation(reservationId: string, updatedData: Partial<ReservationItem>) {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }
    const response = await fetch(`https://backend-coworking-z1ql.onrender.com/api/v1/reservations/${reservationId}`, {
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

export default async function deleteReservation(token: string, reservationId: string) {
    try {
        // console.log("Sending DELETE request to backend for reservation:", reservationId);

        const response = await fetch(`https://backend-coworking.vercel.app//api/v1/reservations/${reservationId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        // console.log("Delete Response:", data);

        if (!response.ok) {
            throw new Error(data.message || "Failed to delete reservation");
        }

        return true;
    } catch (error) {
        console.error("Error deleting reservation:", error);
        return false;
    }
}

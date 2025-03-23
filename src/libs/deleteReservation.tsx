export default async function deleteReservation(token: string, reservationId: string) {
    try {
        // console.log("Sending DELETE request to backend for reservation:", reservationId);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reservations/${reservationId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            mode: 'no-cors'
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

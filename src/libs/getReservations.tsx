export default async function getReservations() {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No authentication token found. Please log in.");
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reservations`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch reservations");
        }

        return data.data; // Return only the reservations
    } catch (error) {
        console.error("Error fetching reservations:", error);
        return [];
    }
}

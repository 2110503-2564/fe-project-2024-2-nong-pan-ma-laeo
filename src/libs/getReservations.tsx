export default async function getReservations(token: string, userId?: string, role?: string) {
    try {
        const endpoint =
            role === "admin"
                ? "https://backend-coworking-z1ql.onrender.com/api/v1/reservations"
                : `https://backend-coworking-z1ql.onrender.com/api/v1/users/${userId}/reservations`;

        const response = await fetch(endpoint, {
            headers: { Authorization: `Bearer ${token}` }
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

export default async function getReservations(token: string, userId?: string, role?: string) {
    try {
        const endpoint =
            role === "admin"
                ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reservations`
                : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/reservations`;

        const response = await fetch(endpoint, {
            headers: { Authorization: `Bearer ${token}` },
            mode: 'cors'
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

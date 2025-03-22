export default async function makeReservation({ name, telephone, coworking, resvTime }
    : { name: string, telephone: string, coworking: string, resvTime: string }) {
    console.log("Sending Reservation Data:", { name, telephone, coworking, resvTime });
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

    console.log("Using Token:", token);
    const response = await fetch(`http://localhost:5000/api/v1/coworkings/${coworking}/reservations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            telephone,
            coworking,
            resvTime
        }),
    })
    if (!response.ok) {
        throw new Error("Failed to make a reservation")
    }
    return await response.json()
}
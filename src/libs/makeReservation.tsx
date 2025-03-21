export default async function makeReservation({ name, telephone, coworking, resvTime }
    : { name: string, telephone: string, coworking: string, resvTime: Date }) {
    console.log("Sending Reservation Data:", { name, telephone, coworking, resvTime });
    const response = await fetch(`http://localhost:5000/api/v1/coworkings/${coworking}/reservations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",

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
export default async function getCoworking(id: string) {
    const response = await fetch(`http://localhost:5000/api/v1/coworkings/${id}`)
    if (!response.ok) {
        throw new Error("Failed to fetch coworking")
    }
    const responseData = await response.json();
    return responseData.data;
}
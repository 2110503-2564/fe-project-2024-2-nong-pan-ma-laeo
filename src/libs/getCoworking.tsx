export default async function getCoworking(id: string) {
    const response = await fetch(`https://backend-coworking.vercel.app//api/v1/coworkings/${id}`)
    if (!response.ok) {
        throw new Error("Failed to fetch coworking")
    }
    const responseData = await response.json();
    return responseData.data;
}
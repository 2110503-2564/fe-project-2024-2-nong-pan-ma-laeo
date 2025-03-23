export default async function getCoworking(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/coworkings/${id}`,
        { mode: 'cors' })
    if (!response.ok) {
        throw new Error("Failed to fetch coworking")
    }
    const responseData = await response.json();
    return responseData.data;
}
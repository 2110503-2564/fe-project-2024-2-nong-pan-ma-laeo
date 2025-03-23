
export default async function getCoworkings(): Promise<CoworkingJson> {
    const response = await fetch("https://backend-coworking.vercel.app//api/v1/coworkings", { mode: 'no-cors' })
    if (!response.ok) {
        throw new Error("Failed to fetch coworkings")
    }
    return await response.json() as CoworkingJson
}
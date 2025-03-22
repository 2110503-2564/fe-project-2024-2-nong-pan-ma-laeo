
export default async function getCoworkings(): Promise<CoworkingJson> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const response = await fetch("https://backend-coworking-z1ql.onrender.com/api/v1/coworkings")
    if (!response.ok) {
        throw new Error("Failed to fetch coworkings")
    }
    return await response.json() as CoworkingJson
}
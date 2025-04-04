export default async function getUserProfile() {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },

    })
    if (!response.ok) {
        throw new Error("Failed to fetch user Profile")
    }
    const userData = await response.json();

    // ✅ Save token in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData)); // Save user info (optional)

    return userData;
}

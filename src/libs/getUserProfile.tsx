export default async function getUserProfile(token: string) {
    const response = await fetch("http://localhost:5000/api/v1/auth/me", {
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

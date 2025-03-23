export default async function userLogIn(userEmail: string, userPassword: string) {
    const response = await fetch("https://backend-coworking.vercel.app//api/v1/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user data");
    }

    const data = await response.json();
    // console.log("🔹 API Response:", data); // Debugging

    // Ensure the response contains user data
    if (!data || !data.user || !data.user.id) {
        throw new Error("Invalid user data received");
    }

    // Return correct structure expected by NextAuth
    return {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        token: data.token, // Ensure token is included
    };
}

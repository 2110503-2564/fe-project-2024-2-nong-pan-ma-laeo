"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import userRegister from "@/libs/userRegister";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            await userRegister(name, email, password); // Pass name to the function
            alert("Registration successful! Redirecting to login...");
            router.push("/login"); // Redirect user to login page
        } catch (err: any) {
            setError(err.message || "Registration failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="w-80 space-y-4">
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2 border rounded" />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 border rounded" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 border rounded" />
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full p-2 border rounded" />
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    );
}

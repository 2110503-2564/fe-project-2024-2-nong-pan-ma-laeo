import userLogIn from "@/libs/userLogIn";
import getUserProfile from "@/libs/getUserProfile";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials) return null;

                const user = await userLogIn(credentials.email, credentials.password);
                console.log("User after login:", user);

                if (user) {
                    return user;  // Ensure full user data is returned
                }
                return null;
            }
        })
    ],
    pages: { signIn: "/login" },
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
                token.token = user.token;
            }

            // Fetch user profile from MongoDB if token exists
            if (token.token && !token.name) {
                try {
                    const userProfile = await getUserProfile(token.token);
                    console.log("Fetched User Profile:", userProfile);

                    token.id = userProfile._id;
                    token.name = userProfile.name;
                    token.email = userProfile.email;
                    token.role = userProfile.role;
                } catch (error) {
                    console.error("Failed to fetch user profile:", error);
                }
            }

            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id,
                name: token.name,
                email: token.email,
                role: token.role,
                token: token.token,
            };
            return session;
        },
    }
};

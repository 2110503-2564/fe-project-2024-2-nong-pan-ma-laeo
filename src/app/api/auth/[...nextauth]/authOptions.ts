import userLogIn from "@/libs/userLogIn";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {

    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                if (!credentials) return null
                const user: User = await userLogIn(credentials.email, credentials.password)
                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        token: user.token, // Store the token if you need it for API requests
                    };
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token, // Spread existing token
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: user.token, // Store JWT token
                };
            }
            return token;
        },

        async session({ session, token }) {
            session.user = {
                id: token.id || null,
                name: token.name || null,
                email: token.email || null,
                role: token.role || null,
                token: token.token || null, // Ensure token persists
            };
            console.log("✅ Session Data in Callback (AFTER FIX):", session);
            return session;
        },
    }
};

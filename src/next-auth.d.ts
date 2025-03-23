import NextAuth from 'next-auth'
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            name: string | null,
            email: string | null,
            role: string,
            token: string | null
        }
    }
    interface User {
        id: string,
        name: string,
        email: string,
        role: string,
        token: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string,
        name: string,
        email: string,
        role: string,
        token: string
    }
}
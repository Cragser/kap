import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prismadb"

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: 'Credentials',
            credentials: {
                username: {label: "Username", type: "text", placeholder: "jsmith"},
                password: {label: "Password", type: "password"}
            },
            // credentials: {},
            async authorize(credentials, req) {
                const {email, password} = credentials
                if (email === undefined && password === undefined) {
                    return null
                }
                return {
                    id: '1234',
                    name: "User Filled",
                }
            }
        })
    ],
})

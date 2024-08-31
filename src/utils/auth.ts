import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { cookies } from "next/headers"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
          credentials: 'include',
        })
        const user = await res.json()

        if (res.ok && user) {
          // Extract the JWT from the response cookies
          const cookieHeader = res.headers.get('set-cookie')
          if (cookieHeader) {
            const jwtCookie = cookieHeader.split(';').find(c => c.trim().startsWith('jwt='))
            if (jwtCookie) {
              user.jwt = jwtCookie.split('=')[1]
            }
          }
          return user
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.jwt = user.jwt
      }
      return token
    },
    async session({ session, token }: any) {
      session.jwt = token.jwt
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  url: process.env.NEXTAUTH_URL,
}

export default NextAuth(authOptions)
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize(credentials) {
        const users = [
          { id: 1, name: "Admin User", email: "admin@mail.com", password: "admin", role: "admin" },
          { id: 2, name: "Finance Manager", email: "finance@mail.com", password: "finance", role: "finance-manager" },
          { id: 3, name: "Accountant", email: "accountant@mail.com", password: "accountant", role: "accountant" },
          { id: 4, name: "Viewer", email: "viewer@mail.com", password: "viewer", role: "viewer" },
        ];

        const user = users.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );

        if (user) return user;
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (token?.role) session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET ,
});

export { handler as GET, handler as POST };

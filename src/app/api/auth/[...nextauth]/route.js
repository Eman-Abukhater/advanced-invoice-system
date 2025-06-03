import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const users = [
  { id: 1, name: "Admin User", email: "admin@mail.com", password: "admin", role: "admin" },
  { id: 2, name: "Finance Manager", email: "finance@mail.com", password: "finance", role: "finance-manager" },
  { id: 3, name: "Accountant", email: "accountant@mail.com", password: "accountant", role: "accountant" },
  { id: 4, name: "Viewer", email: "viewer@mail.com", password: "viewer", role: "viewer" },
];

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize(credentials) {
        const user = users.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );
        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role, 
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; 
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role) {
        session.user.role = token.role; 
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

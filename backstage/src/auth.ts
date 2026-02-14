import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import authServices from "./services/auth.service";
import environment from "./config/environment";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        identifier: { label: "identifier", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          return null;
        }

        try {
          const res = await authServices.login({
            identifier: credentials.identifier as string,
            password: credentials.password as string,
          });

          if (res.status !== 200) {
            return null;
          }

          const accessToken = res.data.data;
          const me = await authServices.getProfileWithToken(accessToken);

          if (me.status !== 200) {
            return null;
          }

          return {
            id: me.data.data.id,
            fullName: me.data.data.fullName,
            role: me.data.data.role,
            accessToken,
          };
        } catch (err) {
          console.error("Login error:", err);

          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  secret: environment.AUTH_SECRET,
  trustHost: true,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // For credentials login
        token.user = user;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.provider = "credentials";
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user = {
        ...session.user,
        role: token.role as
          | "ADMIN"
          | "SUBADMIN"
          | "DAERAH"
          | "SUBDAERAH"
          | "DESA"
          | "SUBDESA"
          | "KELOMPOK"
          | "SUBKELOMPOK",
      };
      return session;
    },
  },
});

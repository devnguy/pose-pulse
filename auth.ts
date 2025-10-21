import NextAuth from "next-auth";
import "next-auth/jwt";
import Pinterest from "next-auth/providers/pinterest";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Pinterest({
      authorization: {
        params: {
          scope:
            "user_accounts:read boards:read boards:read_secret pins:read pins:read_secret",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Initial sign-in
      if (account) {
        return {
          ...token,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          expires_at: Math.floor(
            Date.now() / 1000 + (account.expires_in ?? 3600),
          ),
        };
      }

      // Still valid
      if (token.expires_at && Date.now() < token.expires_at * 1000) {
        return token;
      }

      // Try refresh
      if (!token.refresh_token) throw new TypeError("Missing refresh_token");

      try {
        const auth = `${process.env.AUTH_PINTEREST_ID}:${process.env.AUTH_PINTEREST_SECRET}`;
        const b64auth = Buffer.from(auth).toString("base64");

        const response = await fetch(
          "https://api.pinterest.com/v5/oauth/token",
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${b64auth}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              grant_type: "refresh_token",
              refresh_token: token.refresh_token,
              scope:
                "user_accounts:read boards:read boards:read_secret pins:read pins:read_secret",
            }),
          },
        );

        const tokens = await response.json();

        if (!response.ok) throw tokens;

        return {
          ...token,
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token ?? token.refresh_token,
          expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
        };
      } catch (err) {
        console.error("Error refreshing access_token", err);
        return { ...token, error: "RefreshTokenError" as const };
      }
    },
    async session({ session, token }) {
      session.access_token = token.access_token;
      session.error = token.error;
      return session;
    },
  },
});

declare module "next-auth" {
  interface Session {
    error?: "RefreshTokenError";
    access_token: string;
  }
}

// https://github.com/nextauthjs/next-auth/discussions/8945#discussioncomment-7799831
declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token?: string;
    error?: "RefreshTokenError";
  }
}

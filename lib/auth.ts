// lib/auth.ts
import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import * as schema from "@/db/schema";

const adminRole = "admin";
const userRole = "user";

export const auth = betterAuth({
  appName: "Assetra",
  secret: process.env.NEXT_PUBLIC_BETTER_AUTH_SECRET!,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
      user: schema.user,
      account: schema.account,
      sessions: schema.sessions,
      verification: schema.verification,
    },
  }),
  plugins: [
    admin({ adminRoles: [adminRole], defaultRole: userRole }),
    nextCookies(),
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 6,
    maxPasswordLength: 128,
    autoSignIn: true,
  },
  session: {
    modelName: "sessions",
    expiresIn: 604800, // 7 days
    updateAge: 86400, // 1 day
    disableSessionRefresh: true,
    cookieCache: { enabled: true, maxAge: 300 },
  },
  advanced: {
    useSecureCookies: process.env.NEXT_PUBLIC_NODE_ENV === "production",
    defaultCookieAttributes: {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
      mapProfileToUser: (profile) => ({
        name: profile.name,
        email: profile.email,
        image: profile.picture,
        role: userRole,
      }),
    },
    github: {
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET!,
    },
  },
});

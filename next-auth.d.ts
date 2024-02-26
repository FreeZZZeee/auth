import NextAuth, { type DefaultSession } from "next-auth"
import { JWT } from "@auth/core/jwt"
import { UserRole } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
    login: string | null;
    role: UserRole;
};

declare module "next-auth" {
    interface Session {
      user: ExtendedUser
    }
  }

  declare module "@auth/core/jwt" {
    interface JWT {
        login: string | null,
        role?: UserRole
    }
  }
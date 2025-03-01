import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user?: {
        id?: string ;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        picture?: string | null;
        } & DefaultSession["user"];
    }
}

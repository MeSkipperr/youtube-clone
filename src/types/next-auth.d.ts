import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id?: string | null;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            picture?: string | null;
            userName?:string | null;
            accessToken?:string | null;
        } & DefaultSession["user"];
    }
}

import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { encode } from "@/libs/jwt";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: User }) {
            if (user) {
                token.id = user.id as string ;
                token.email = user.email as string;
                token.name = user.name as string;
                token.picture = user.image as string;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            session.user = token;
            return session;
        },
    },
    events: {
        async signIn({ user }: { user: User }) {
            const userToken: string = encode({
                id: user.id,
                email: user.email,
                name: user.name,
                picture: user.image,
            });

            // Perbaikan: Gunakan await untuk mendapatkan objek cookies
            const cookieStore = await cookies();
            cookieStore.set("user_session", userToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                path: "/",
            });
        },
        async signOut() {
            const cookieStore = await cookies();
            cookieStore.delete("user_session");
        },
    },
    secret: process.env.NEXTAUTH_SECRET as string,
};

export const { handlers, auth } = NextAuth(authOptions);

export const authUserSession = async (): Promise<Session | null> => {
    const session: Session | null = await getServerSession(authOptions);
    return session;
};

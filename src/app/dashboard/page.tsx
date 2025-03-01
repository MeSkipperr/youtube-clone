import { authUserSession } from "@/libs/auth";

export default async function Dashboard() {
  const session = await authUserSession(); // Ambil session dari NextAuth di server


  if (!session) {
    return(
      <>
      <h1>Dashboard no account</h1>
      </>
    )
  }

  return (
    <pre>{session ? JSON.stringify(session, null, 2) : "Loading..."}</pre>
  );
}

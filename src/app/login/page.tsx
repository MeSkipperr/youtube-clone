"use client";

import { useIsLogin } from "@/context/is-login";

export default function AuthButton() {
  const {session, status } = useIsLogin();
  
  if (status === "loading") return <p>Loading...</p>;

  return  (
      <pre>{session ? JSON.stringify(session, null, 2) : "Loading..."}</pre>m run de
  )
}

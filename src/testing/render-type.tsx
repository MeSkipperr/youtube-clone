import { useEffect, useState } from "react";

export default function CheckRenderType() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(typeof window !== "undefined");
  }, []);

  return <div>{isClient ? "Ini CSR" : "Ini SSR"}</div>;
}

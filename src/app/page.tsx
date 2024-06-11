"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";

export default function Home() {
  const { isConnected, address } = useAccount();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    if (isConnected) {
      localStorage.setItem("isConnected", "true");
    } else {
      localStorage.removeItem("isConnected");
      router.push("/login");
    }
    setLoading(false);
  }, [isConnected, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-white px-3 py-5 flex flex-col space-y-3">
      <h1 className="text-black font-bold text-2xl">Home</h1>
      <p className="text-gray-500">Address: {address}</p>
      <ConnectButton />
    </main>
  );
}

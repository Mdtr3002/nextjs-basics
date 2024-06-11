"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount, useEnsName } from "wagmi";

export default function Login() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (isConnected) {
      localStorage.setItem("isConnected", "true");
      router.push("/");
    } else {
      localStorage.removeItem("isConnected");
    }
    setLoading(false);
  }, [isConnected, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-white flex flex-col py-10 space-y-5 items-center">
      <h1 className="text-black">Connect to MetaMask to log in</h1>
      <ConnectButton />
    </main>
  );
}

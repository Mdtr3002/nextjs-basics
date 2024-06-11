"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Connector, useAccount, useConnect, useEnsName } from "wagmi";
import { ConnectBtn } from "../components/connectButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { connectBtnClassName } from "@/constant";

function WalletOptions() {
  const { connectors, connect } = useConnect();
  const [walletList, setWalletList] = useState<Connector[]>([] as Connector[]);

  useEffect(() => {
    setWalletList([...connectors]);
  }, [connectors]);

  return walletList.map((connector) => (
    <button
      key={connector.uid}
      onClick={() => connect({ connector })}
      className="text-black font-medium p-1 rounded-lg hover:bg-gray-200"
    >
      {connector.name}
    </button>
  ));
}

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

  const handleConnect = () => {
    const btn = document.getElementsByClassName(
      connectBtnClassName
    )[0] as HTMLButtonElement;
    console.log(btn);
    if (btn) btn.click();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-white flex flex-col py-10 space-y-5 items-center">
      <div className="bg-white rounded-xl shadow-md p-4 flex space-x-5 items-center">
        <h1 className="text-black font-bold text-center text-xl">
          Connect to a Wallet
          <br /> to log in
        </h1>
        <div className="flex flex-col items-start space-y-1 pl-2 border-l-[1px] border-gray-300">
          {/* <WalletOptions /> */}
          <ConnectBtn />
          <button
            className="text-black border-[1px] border-black bg-gray-300 hover:bg-gray-500 hover:text-white p-2 rounded-lg hover:border-white"
            onClick={handleConnect}
          >
            Connect MetaMask Wallet
          </button>
          <div className="hidden">
            <ConnectButton />
          </div>
        </div>
      </div>
    </main>
  );
}

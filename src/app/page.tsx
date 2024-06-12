"use client";

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import {
  useAccount,
  useBalance,
  useDisconnect,
  useEnsName,
  useSwitchChain,
} from "wagmi";

export default function Home() {
  const { isConnected, address, chain } = useAccount();
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const router = useRouter();
  const { data, isFetching } = useBalance({
    address: address,
  });
  const { chains, switchChain, isPending } = useSwitchChain();

  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const [currentChain, setCurrentChain] = useState(chain?.name);
  const [token, setToken] = useState("");

  useEffect(() => {
    const curToken = localStorage.getItem("token");
    if (curToken) {
      setToken(curToken);
    }
    if (chain) {
      setCurrentChain(chain.name);
    }
  }, [chain]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-white px-3 py-5 flex flex-col space-y-3">
      <h1 className="text-black font-bold text-2xl">Home</h1>
      <div className="bg-white shadow-lg rounded-xl p-4 w-fit max-w-full flex flex-col">
        <p className="text-gray-500">
          <b>Adress:</b> {ensName ? `${ensName} (${address})` : address}
        </p>
        <div className="text-gray-500 flex space-x-1">
          <b>UserBalance:</b>
          {isFetching || isPending ? (
            <p>Loading...</p>
          ) : (
            <p>
              {" "}
              {(
                Math.round(Number(BigInt(data?.value || 0)) * 100) /
                10 ** 20
              ).toFixed(2)}{" "}
              {data?.symbol}
            </p>
          )}
        </div>
        <div className="flex flex-col text-gray-500">
          <p>
            <b>Access token:</b>
          </p>
          <p className="break-all p-2 bg-gray-100 rounded-lg">{token || ""}</p>
        </div>
        <div className="relative inline-block mt-2">
          <button
            onClick={() => setToggle(!toggle)}
            className="bg-white text-black py-1 px-4 rounded-lg cursor-pointer border-[1px] border-black hover:bg-gray-200 hover:text-black hover:border-black"
          >
            {currentChain || "Select Chain"}
          </button>
          <div
            id="myDropdown"
            className={`absolute z-10 flex flex-col space-y-1 bg-white rounded-lg border-[1px] border-gray-200 py-1 ${
              !toggle && "hidden"
            }`}
          >
            {chains.map((el) => (
              <button
                key={el.id}
                className="text-black hover:bg-gray-200 px-1"
                onClick={() => {
                  setToggle(false);
                  setCurrentChain(el.name);
                  switchChain({ chainId: el.id });
                }}
              >
                {el.name}
              </button>
            ))}
          </div>
        </div>
        <button
          className="bg-[#4285f4] text-white px-2 py-1 rounded-lg w-fit font-medium mt-5 hover:bg-[#4285f4]/80"
          onClick={() => {
            localStorage.removeItem("isConnected");
            localStorage.removeItem("token");
            disconnect();
            router.push("/login");
          }}
        >
          Disconnect
        </button>
      </div>
    </main>
  );
}

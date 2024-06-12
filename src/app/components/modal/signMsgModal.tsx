"use client";

import { useSignStore } from "@/store/sign";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDisconnect } from "wagmi";

export default function SignMsgModal() {
  const { setSignInformation, setSignModalOpen } = useSignStore((state) => ({
    setSignInformation: state.setSignInformation,
    setSignModalOpen: state.setSignModalOpen,
  }));
  const router = useRouter();
  const { disconnect } = useDisconnect();

  const handleSign = () => {
    localStorage.setItem("isConnected", "true");
    router.push("/");
    setSignModalOpen(false);
  };

  const handleSignCancel = () => {
    setSignInformation({
      public_address: "",
      signature: "",
      nonce: "",
      chain_id: 1,
    });
    disconnect();
    setSignModalOpen(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-20 flex animate-fade items-center justify-center bg-black/40">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col overflow-hidden rounded-lg bg-white p-5"
      >
        <div className="flex flex-col space-y-4">
          <p className="font-medium text-xl">Signature request</p>
          <div>
            <p className="font-medium mb-1">You are signing</p>
            <p>Signature: I am signing to Innovaz with nonce: 38437940</p>
            <p>Nonce: 38437940</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleSignCancel}
              className="text-blue-400 px-5 py-1 rounded-xl border-[1px] border-blue-400 hover:text-white hover:bg-blue-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSign}
              className="text-white bg-blue-400 px-5 py-1 rounded-xl border-[1px] border-blue-400 hover:text-blue-400 hover:bg-white"
            >
              Sign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

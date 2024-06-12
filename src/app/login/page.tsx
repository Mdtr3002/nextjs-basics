"use client";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import { ConnectBtn } from "../components/connectButton";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { signMsgService } from "@/services/sign.service";
import { SignInProps } from "@/types";

export default function Login() {
  const { isConnected, address, chainId, status } = useAccount();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [nonce, setNonce] = useState("");
  const [curAddress, setCurAddress] = useState<string>("");
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect({
    mutation: {
      onSuccess: () => {
        console.log("disconnected", address);
      },
    },
  });
  const { data, signMessageAsync } = useSignMessage({
    mutation: {
      onError: () => {
        localStorage.removeItem("isConnected");
        localStorage.removeItem("token");
        setCurAddress("");
        disconnect();
      },
    },
  });

  useEffect(() => {
    setLoading(true);
    const isAuthen = localStorage.getItem("isConnected");
    const token = localStorage.getItem("token");
    console.log("here", status);
    if (address && status === 'connected' && !isAuthen && !token) {
      console.log("here2");
      signMsgService
        .getSignMsg()
        .then(async (res) => {
          setNonce(res.data.data.nonce);
          setCurAddress(address?.toString() || "");
          await signMessageAsync({
            message: res.data.data.sign_msg,
          });
        })
        .catch((err) => {
          localStorage.removeItem("isConnected");
        });
    }
    setLoading(false);
  }, [address]);

  useEffect(() => {
    if (data) {
      console.log("here");
      const signData: SignInProps = {
        public_address: curAddress,
        signature: data.toString(),
        nonce: nonce,
        chain_id: 1,
      };
      signMsgService
        .signIn(signData)
        .then((res) => {
          localStorage.setItem("token", res.data.data.access_token);
          localStorage.setItem("isConnected", "true");
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data, router, chainId, nonce, curAddress]);

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
          <ConnectBtn />
          <button
            className="text-black border-[1px] border-black bg-gray-300 hover:bg-gray-500 hover:text-white p-2 rounded-lg hover:border-white"
            onClick={openConnectModal}
          >
            Connect MetaMask Wallet
          </button>
        </div>
      </div>
    </main>
  );
}

"use client";
import { useAccount, useEnsName } from "wagmi";

export default function Profile() {
  const { address } = useAccount();
  const { data, error, status } = useEnsName({
    address: "0xAe7A972F56d61Cd573b9579a48Df4f816893f74f",
  });
  if (status === "pending") return <div>Loading ENS name</div>;
  if (status === "error")
    return <div>Error fetching ENS name: {error.message}</div>;
  return <div>ENS name: {data}</div>;
}

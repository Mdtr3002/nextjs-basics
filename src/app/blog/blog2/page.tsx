"use client";
import { CatInfo, PokeInfo } from "@/types";
import { useEffect, useState } from "react";

export default function Blog2() {
  const [info, setInfo] = useState<CatInfo>();
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setInfo(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="flex flex-col space-y-1">
      <h2 className="text-white">Cat Fact</h2>
      <p>{info?.fact}</p>
    </div>
  );
}

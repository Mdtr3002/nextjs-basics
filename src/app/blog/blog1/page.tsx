"use client";

import { fetchService } from "@/services/fetch.service";
import { PokeInfo } from "@/types";
import { useEffect, useState } from "react";

export default function Blog1() {
  const [pokeInfo, setPokeInfo] = useState<PokeInfo[]>([]);
  useEffect(() => {
    fetchService
      .fetchPokeInfo()
      .then((res) => {
        setPokeInfo(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col space-y-1">
      <h2 className="text-white">Pokemon Info</h2>
      <ul>
        {pokeInfo.map((info, idx) => (
          <li key={idx}>
            {idx + 1}. {info.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

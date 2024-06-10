import { fetchPokeInfoServer } from "@/services/fetch.service";
import { PokeInfo } from "@/types";

export default async function Blog3() {
  const pokeInfo = await fetchPokeInfoServer();
  return (
    <div className="flex flex-col space-y-1">
      <h2 className="text-white">Pokemon Info</h2>
      <ul>
        {pokeInfo.map((info: PokeInfo, idx: number) => (
          <li key={idx}>
            {idx + 1}. {info.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

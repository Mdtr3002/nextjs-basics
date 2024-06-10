import axios from "axios";


const fetchPokeInfo = () => axios.get("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");


export const fetchService = {
    fetchPokeInfo
};

export async function fetchPokeInfoServer() {
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=10&offset=1"
    );
    if (!res.ok) throw new Error("Failed to fetch data");
    const response = await res.json();
    return response.results;
}
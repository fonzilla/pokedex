import axios from "axios";

function getSpecies(id) {
  return axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
}

function getDetail(id) {
  return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
}

function getEvolutionChain(url) {
  return axios.get(url);
}

export function getPokeData(id) {
  let pokeDetails = {};
  return axios
    .all([getDetail(id), getSpecies(id)])
    .then(data => {
      const { name, stats, id } = data[0].data;
      const { habitat, flavor_text_entries, evolution_chain } = data[1].data;
      pokeDetails = {
        id,
        name,
        stats,
        habitat,
        flavor_text_entries
      };
      return getEvolutionChain(evolution_chain.url);
    })
    .then(chain => {
      pokeDetails.chain = chain.data.chain;
      return pokeDetails;
    });
}

export async function fetchAllPokemon() {
  return axios.get("https://pokeapi.co/api/v2/pokedex/1").then(pokemon => {
    return pokemon.data.pokemon_entries;
  });
}

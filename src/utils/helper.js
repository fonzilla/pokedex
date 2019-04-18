export function getDescription(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].language.name === "en") {
      return arr[i].flavor_text;
    }
  }
}

export function getEvolutionChain(chain) {
  let evolution_chain = [];
  evolution_chain.push([[chain.species]]);
  chain = chain.evolves_to;
  while (chain.length > 0) {
    let evolution = [];
    chain.forEach(evoObj => {
      evoObj.species.via = evoObj.evolution_details[0].trigger.name;
      evolution.push([evoObj.species]);
    });
    evolution_chain.push(evolution);
    chain = chain[0].evolves_to;
  }
  return evolution_chain;
}

export function getStats(arr) {
  return arr.map(obj => obj.stat.name);
}

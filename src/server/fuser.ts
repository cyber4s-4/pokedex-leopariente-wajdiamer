import { Pokemon } from "src/client/tsc/data";
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../data/data.json");
export let listOfPokemon: Pokemon[] = JSON.parse(
  fs.readFileSync(filePath, "utf8")
);

export function generateFusedPokemons(arr: Pokemon[]) {
  let newId = 898;
  let fusedPokemonsArr = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 1; j < arr.length; j++) {
      if (i !== j && arr[i].id < 152 && arr[j].id < 152) {
        const fusedPokemon = fusePokemons(arr[i], arr[j], newId);
        fusedPokemonsArr.push(fusedPokemon);
        newId++;
      }
    }
  }
  return fusedPokemonsArr;
}

function fusePokemons(pokemon1: Pokemon, pokemon2: Pokemon, newId: number) {
  let newPokemon: Pokemon = {
    id: newId,
    name: pokemon1.name.slice(0, 4) + pokemon2.name.slice(3, 7),
    height: Math.floor(
      (parseInt(pokemon1.height) + parseInt(pokemon2.height)) / 2
    ).toString(),
    weight: Math.floor(
      (parseInt(pokemon1.weight) + parseInt(pokemon2.weight)) / 2
    ).toString(),
    img: `https://images.alexonsager.net/pokemon/fused/${pokemon1.id}/${pokemon1.id}.${pokemon2.id}.png`,
  };
  return newPokemon;
}

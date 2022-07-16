import { Pokemon } from 'src/client/tsc/data';
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../data/data.json");
export let listOfPokemon: Pokemon[] = JSON.parse(fs.readFileSync(filePath, "utf8"));

export function generateFusedPokemons(arr: Pokemon[]) {
    let fusedPokemonsArr = [];
    for (let i = 0 ; i < arr.length ; i++) {
      for (let j = 1 ; j < arr.length ; j++ ){
        if (i !== j) {
         const fusedPokemon = fusePokemons(arr[i], arr[j]);
         fusedPokemonsArr.push(fusedPokemon);
        }
      }
    }
    return fusedPokemonsArr;
  }
  
  function fusePokemons(pokemon1: Pokemon, pokemon2: Pokemon) {
    let newPokemon: Pokemon = {
      id: 1,
      name: pokemon1.name.slice(0, 4) + pokemon2.name.slice(3, 7),
      height: Math.floor((parseInt(pokemon1.height) + parseInt(pokemon2.height)) / 2 ).toString(),
      weight: Math.floor((parseInt(pokemon1.weight) + parseInt(pokemon2.weight)) / 2 ).toString(),
      img: `https://images.alexonsager.net/pokemon/fused/${pokemon1.id}/${pokemon1.id}.${pokemon2.id}.png`
    };
    return newPokemon;
  }
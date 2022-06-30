import { Pokemon, PokemonComponent } from "./pokemonComponent";
import { PokedexComponent } from "./pokedexComponent";

const button = document.querySelector("button") as HTMLButtonElement;
const input = document.querySelector("input") as HTMLInputElement;
const pokedex = document.querySelector("#pokedex") as HTMLDivElement;
button.addEventListener('click', fetchPokemon);
let listOfPokemon: Pokemon[] = []


async function fetchAllPokemon() {
    let response = await fetch("https://pokeapi.co/api/v2/pokedex/1")
    let data = await response.json();
    for (let entry of data.pokemon_entries) {
        try {
        let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + entry.pokemon_species.name);
        let pokemonData = await response.json();
        const pokemon: Pokemon = {
                        id: entry.entry_number,
                        name: entry.pokemon_species.name,
                        height: pokemonData.height,
                        weight: pokemonData.weight,
                        img: pokemonData.sprites.front_default
                    }
                   listOfPokemon.push(pokemon);
                   new PokedexComponent(pokemon, pokedex);
                }
                catch (err) {
                    console.log("api not comlete");
                }
            }
}

function fetchPokemon() {
    const pokemonToSearch: string = input.value;
    const pokemonToRender: Pokemon | undefined = listOfPokemon.find((pokemon) => {
        if (pokemon.name === pokemonToSearch) return pokemon;
        else return undefined
    })
    if (pokemonToRender) {
        new PokemonComponent(pokemonToRender, pokedex);
    } else {
        alert("No such Pokemon!")
    }
}

fetchAllPokemon();
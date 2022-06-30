import { Pokemon, PokemonComponent } from "./pokemonComponent";
import { PokedexComponent } from "./pokedexComponent";

const button = document.querySelector("button") as HTMLButtonElement;
const input = document.querySelector("input") as HTMLInputElement;
const pokedex = document.querySelector("#pokedex") as HTMLDivElement;
button.addEventListener('click', fetchPokemon);
let listOfPokemon: Pokemon[] = []


async function fetchAllPokemon() {
    let response = await fetch("https://pokeapi.co/api/v2/pokedex/1")
    await response.json().then((data) => {
        for (let entry of data.pokemon_entries) {
            fetch("https://pokeapi.co/api/v2/pokemon/" + entry.pokemon_species.name)
            .then((data) => data.json()).catch(() => console.log("no picture found"))
            .then((data) => {
                const pokemon: Pokemon = {
                    id: entry.entry_number,
                    name: entry.pokemon_species.name,
                    height: data.height,
                    weight: data.weight,
                    img: data.sprites.front_default
                }
                listOfPokemon.push(pokemon)
                new PokedexComponent(pokemon, pokedex);
            })
        }
    });
}

async function fetchPokemon() {
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
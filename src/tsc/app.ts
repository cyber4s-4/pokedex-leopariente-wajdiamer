import { Pokemon, PokemonComponent } from "./pokemonComponent";

const button = document.querySelector("#submit") as HTMLButtonElement;
const input = document.querySelector("#pokemon") as HTMLInputElement;
const parent = document.querySelector("#data") as HTMLDivElement;
button.addEventListener('click', fetchPokemon);


async function fetchPokemon() {
    try {
    if (input.value !== "") {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + input.value);
    let data = await response.json().then((data) => {return data});
    const pokemon: Pokemon = {
        name: data.name,
        height: data.height,
        weight: data.weight, 
        img: data.sprites.front_default
    }
    new PokemonComponent(pokemon, parent)
    }
    }
    catch(err) {
        alert("No Pokemon found!")
    }
}

import { PokemonComponent } from './pokemonComponent';
import { PokedexComponent } from './pokedexComponent';
import { Pokemon } from './data';

const button = document.querySelector('button') as HTMLButtonElement;
const input = document.querySelector('input') as HTMLInputElement;
const pokedex = document.querySelector('#pokedex') as HTMLDivElement;
const surpriseButton = document.querySelector('#surpriseButton') as HTMLButtonElement;
const pokemonParent = document.createElement("div");
pokemonParent.classList.add("pokemonParent");
button.addEventListener('click', () => fetchPokemon(null));
let listOfPokemon: Pokemon[] = [];
surpriseButton.addEventListener('click', () => fetchPokemon((listOfPokemon[Math.floor(Math.random()*listOfPokemon.length)].name)));


function fetchPokemon(name: string | null) {
	let pokemonToSearch: string;
	if (name === null) {
	pokemonToSearch = input.value.toLowerCase();
	} else {
		pokemonToSearch = name;
	}
	const pokemonToRender: Pokemon | undefined = listOfPokemon.find((pokemon) => {
		if (pokemon.name === pokemonToSearch) return pokemon;
		else return undefined;
	});
	if (pokemonToRender) {
    pokedex.remove();
    document.body.appendChild(pokemonParent);
		new PokemonComponent(pokemonToRender, pokemonParent);
	} else {
		alert('No such Pokemon!');
	}
}
fetch("http://localhost:4000/pokedex").then(res => res.json()).then((data) => {
	for (const pokemon of data) {
		listOfPokemon.push(pokemon);
		const pokedexComponent = new PokedexComponent(pokemon, pokedex);
		const pokemonCard = pokedexComponent.render(pokemon);
		pokemonCard.addEventListener("click", () => fetchPokemon(pokemon.name));
	}
});
console.log(listOfPokemon);

// if (listOfPokemon.length === 0) {
// 	fetchAllPokemon();
// } else {
// 	for (const pokemon of listOfPokemon) {
// 		const pokedexComponent = new PokedexComponent(pokemon, pokedex);
// 		const pokemonCard = pokedexComponent.render(pokemon);
// 		pokemonCard.addEventListener("click", () => fetchPokemon(pokemon.name));
// 	}
// }

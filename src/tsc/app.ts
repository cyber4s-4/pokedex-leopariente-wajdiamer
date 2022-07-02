import { PokemonComponent } from './pokemonComponent';
import { PokedexComponent } from './pokedexComponent';
import { Pokemon } from './data';

const button = document.querySelector('button') as HTMLButtonElement;
const input = document.querySelector('input') as HTMLInputElement;
const pokedex = document.querySelector('#pokedex') as HTMLDivElement;
const pokemonParent = document.createElement("div");
pokemonParent.classList.add("pokemonParent");
button.addEventListener('click', () => fetchPokemon(null));

let listOfPokemon: Pokemon[] = JSON.parse(window.localStorage.getItem('pokemon')!);
if (listOfPokemon === null) listOfPokemon = [];

async function fetchAllPokemon() {
	const response = await fetch('https://pokeapi.co/api/v2/pokedex/1');
	const data = await response.json();
	for (const entry of data.pokemon_entries) {
		try {
			const response = await fetch(
				'https://pokeapi.co/api/v2/pokemon/' + entry.pokemon_species.name
			);
			const pokemonData = await response.json();
			const pokemon: Pokemon = {
				id: pokemonData.id,
				name: pokemonData.name,
				height: pokemonData.height,
				weight: pokemonData.weight,
				img: pokemonData.sprites.front_default,
			};
			listOfPokemon.push(pokemon);
			const pokedexComponent = new PokedexComponent(pokemon, pokedex);
			const pokemonCard = pokedexComponent.render(pokemon);
			pokemonCard.addEventListener("click", () => fetchPokemon(pokemon.name));
		} catch (err) {
			console.log('api missing this pokemon');
		}
	}
	localStorage.setItem('pokemon', JSON.stringify(listOfPokemon));
}

function fetchPokemon(name: string | null) {
	let pokemonToSearch: string;
	if (name === null) {
	pokemonToSearch = input.value;
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

if (listOfPokemon.length === 0) {
	fetchAllPokemon();
} else {
	for (const pokemon of listOfPokemon) {
		const pokedexComponent = new PokedexComponent(pokemon, pokedex);
		const pokemonCard = pokedexComponent.render(pokemon);
		pokemonCard.addEventListener("click", () => fetchPokemon(pokemon.name));
	}
}

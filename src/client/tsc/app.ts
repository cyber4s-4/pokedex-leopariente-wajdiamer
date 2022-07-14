import { PokemonComponent } from './pokemonComponent';
import { PokedexComponent } from './pokedexComponent';
import { Pokemon } from './data';

const baseURL: string = "http://localhost:4000/";
const button = document.querySelector('button') as HTMLButtonElement;
const input = document.querySelector('input') as HTMLInputElement;
const pokedex = document.querySelector('#pokedex') as HTMLDivElement;
const surpriseButton = document.querySelector('#surpriseButton') as HTMLButtonElement;
const pokemonParent = document.createElement("div");
pokemonParent.classList.add("pokemonParent");
let listOfPokemon: Pokemon[] = [];

surpriseButton.addEventListener('click', () => {
	fetch('/random').then(res => res.json())
	.then((data) => {
		pokedex.remove();
		document.body.appendChild(pokemonParent);
		new PokemonComponent(data, pokemonParent);
	})
});

button.addEventListener('click', () => {
	if (input.value.length !== 0) {
		fetchPokemon(null);
	} else {
		alert("Please type a Pokemon name to search..");
	}
});


function fetchPokemon(name: string | null) {
	let pokemonToSearch: string;
	if (name === null) {
		pokemonToSearch = input.value.toLowerCase();
	} else {
		pokemonToSearch = name;
	}

	fetch(baseURL + "pokedex/" + pokemonToSearch)
		.then(res => res.json())
		.then((data) => {
			pokedex.remove();
			document.body.appendChild(pokemonParent);
			new PokemonComponent(data, pokemonParent);
		})
		.catch(err => {
			console.log("Pokemon Not Found, Error: " + err)
			alert('Pokemon Not Found')
		})
}
fetch(baseURL + "reset");
fetch(baseURL + "pokedex").then(res => res.json()).then((data) => {
	for (const pokemon of data) {
		listOfPokemon.push(pokemon);
		const pokedexComponent = new PokedexComponent(pokemon, pokedex);
		const pokemonCard = pokedexComponent.render(pokemon);
		pokemonCard.addEventListener("click", () => fetchPokemon(pokemon.name));
	}
});

window.onscroll = function() {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        fetch(baseURL + "pokedex").then(res => res.json()).then((data) => {
			for (const pokemon of data) {
				listOfPokemon.push(pokemon);
				const pokedexComponent = new PokedexComponent(pokemon, pokedex);
				const pokemonCard = pokedexComponent.render(pokemon);
				pokemonCard.addEventListener("click", () => fetchPokemon(pokemon.name));
			}
		}).catch(() => console.log("No more pokemon!"));
    }
};
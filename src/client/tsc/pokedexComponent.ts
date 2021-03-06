
import { Pokemon } from './data';

export class PokedexComponent {
	data: Pokemon;
	parent: HTMLElement;

	constructor(data: Pokemon, parent: HTMLElement) {
		this.data = data;
		this.parent = parent;
	}

	render(pokemon: Pokemon) {
		const pokemonCard = document.createElement('div');
		pokemonCard.classList.add('pokedexItem');
		pokemonCard.classList.add('card');

		const pokemonIMG = document.createElement('img');
		pokemonIMG.src = pokemon.img;

		const pokemonID = document.createElement('h4');
		pokemonID.textContent = '#' + pokemon.id;

		const pokemonName = document.createElement('h3');
		pokemonName.textContent = pokemon.name.toUpperCase();

		pokemonCard.append(pokemonIMG, pokemonID, pokemonName);
		this.parent.appendChild(pokemonCard);
		return pokemonCard;
	}
}

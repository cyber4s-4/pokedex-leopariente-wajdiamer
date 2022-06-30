export interface Pokemon {
  name: string;
  height: string;
  weight: string;
  img: string;
}

export class PokemonComponent {
  data: Pokemon;
  parent: HTMLElement;

  constructor(data: Pokemon, parent: HTMLElement) {
    this.data = data;
    this.parent = parent;
    this.clearParent();
    this.render(data);
  }

  clearParent() {
    while (this.parent.firstChild) {
      this.parent.removeChild(this.parent.firstChild);
    }
  }

  render(pokemon: Pokemon) {
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("card");

    const pokemonIMG = document.createElement("img");
    pokemonIMG.src = pokemon.img;

    const pokemonName = document.createElement("h3");
    pokemonName.textContent = "Name: " + pokemon.name;

    const pokemonHeight = document.createElement("h3");
    pokemonHeight.textContent = "Height: " + pokemon.height;

    const pokemonWeight = document.createElement("h3");
    pokemonWeight.textContent = "Weight: " + pokemon.weight;

    pokemonCard.append(pokemonIMG, pokemonName, pokemonHeight, pokemonWeight);
    this.parent.appendChild(pokemonCard);
  }
}

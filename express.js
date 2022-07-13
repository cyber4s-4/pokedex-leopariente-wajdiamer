const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require("cross-fetch")

const portHttp = 4000;
let index = 0;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const root = path.join(process.cwd(), 'dist');
app.use(express.static(root));

async function fetchAllPokemon() {
	let listOfPokemon = [];
	const response = await fetch('https://pokeapi.co/api/v2/pokedex/1');
	const data = await response.json();
	for (const entry of data.pokemon_entries) {
		try {
			const response = await fetch(
				'https://pokeapi.co/api/v2/pokemon/' + entry.pokemon_species.name
			);
			const pokemonData = await response.json();
			const pokemon = {
				id: pokemonData.id,
				name: pokemonData.name,
				height: pokemonData.height,
				weight: pokemonData.weight,
				img: pokemonData.sprites.front_default,
			};
			listOfPokemon.push(pokemon);
		} catch (err) {
			console.log('api missing this pokemon');
		}
	}
	fs.writeFileSync(filePath, JSON.stringify(listOfPokemon));
}

const filePath = path.join(__dirname, "./data/data.json");
let listOfPokemon = JSON.parse(fs.readFileSync(filePath, "utf8"));
if (listOfPokemon.length === 0) {
	listOfPokemon = fetchAllPokemon();
}

app.get('/pokedex', (req, res) => {
	let listToSend = [];
	for (let i=0; i < 20; i++) {
		listToSend.push(listOfPokemon[index]);
		index +=1;
	}
	res.send(listToSend)
});

app.get('/pokedex/:name', (req, res) => {
	let pokemonToFind = '';
	if (req.params.name !== 'random') {
		pokemonToFind = listOfPokemon.find(pokemon => pokemon.name === req.params.name);
	} else {
		pokemonToFind = listOfPokemon[Math.floor(Math.random() * listOfPokemon.length)];
	}

	res.send(pokemonToFind);
});

app.get('/', (req, res) => {
	index = 0;
})

app.listen(portHttp, () => {
	console.log('Hosted: http://localhost:' + portHttp);
});

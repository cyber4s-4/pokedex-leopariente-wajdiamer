import { MongoClient, Db, Collection/*, WithId*/ } from 'mongodb';
import { Pokemon } from 'src/client/tsc/data';

export function create() {
  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri);
  return client;
}

export async function connect(client: MongoClient) {
  await client.connect();
  const db: Db = client.db('pokedex');
  const collection: Collection = db.collection('pokemon');
  return collection;
}

export async function getPokemon(index: number, collection: Collection) {
 return await collection.find({ id: { $gte: index+1, $lt: index+21}}).toArray();
}

// @ts-ignore
export async function findPokemon(name: String, collection: Collection) {
    return await collection.findOne({ name: name})
}

export async function getRandom(collection: Collection) {
  const listOfPokemon = await collection.find({}).toArray();
 const randomNumber = Math.floor(Math.random() * listOfPokemon.length)
 return listOfPokemon[randomNumber];
}

async function generateFusedPokemons(arr: any, collection: Collection) {
  for (let i = 0 ; i < arr.length ; i++) {
    for (let j = 0 ; j < arr.length ; j++ ){
      if (i !== j) {
       const fusedPokemon = await fusePokemons(arr[i], arr[j], collection);
       await collection.insertOne(fusedPokemon);
       console.log(fusedPokemon);
      }
    }
  }
}

async function fusePokemons(pokemon1: Pokemon, pokemon2: Pokemon, collection: Collection) {
  let newPokemon: Pokemon = {
    id: (await collection.count({})) + 1,
    name: pokemon1.name.slice(0, 4) + pokemon2.name.slice(3, 7),
    height: Math.floor((parseInt(pokemon1.height) + parseInt(pokemon2.height)) / 2 ).toString(),
    weight: Math.floor((parseInt(pokemon1.weight) + parseInt(pokemon2.weight)) / 2 ).toString(),
    img: `https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/${pokemon1.id}/${pokemon1.id}.${pokemon2.id}.png`
  };
  return newPokemon;
}
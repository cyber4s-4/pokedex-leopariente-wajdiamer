import { MongoClient, Db, Collection/*, WithId*/ } from 'mongodb';
// import { Pokemon } from 'src/client/tsc/data';

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

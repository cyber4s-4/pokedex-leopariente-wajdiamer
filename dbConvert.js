const MongoClient = require("mongodb").MongoClient;
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "./data/data.json");
let listOfPokemon = JSON.parse(fs.readFileSync(filePath, "utf8"));
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    await client.db("pokedex").command({ ping: 1 });
    console.log("Connected successfully to server");
    const curser = await client.db("pokedex").collection("pokemon").find({}).toArray();
    if (curser.length == 0) {
      await client.db("pokedex").collection("pokemon").insertMany(listOfPokemon);
      console.log("Added pokemon!")
      // await client.db("pokedex").collection("pokemon").deleteMany({});
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);

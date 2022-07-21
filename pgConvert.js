const { Client } = require("pg");
const fs = require("fs");
const path = require("path");


const filePath = path.join(__dirname, "./data/data.json");
let listOfPokemon = JSON.parse(fs.readFileSync(filePath, "utf8"));

const client = new Client({
  connectionString:
    "postgres://bkskietbvmzdou:b2bb03cb58a1294282ba4fa8c6bc1eea0970a828daeafffbaf70b0c64786ec1a@ec2-54-87-179-4.compute-1.amazonaws.com:5432/dfsdrbnlcded28",
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect();

client.query(`
CREATE TABLE pokemon (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  height INT NOT NULL,
  weight INT NOT NULL,
  img VARCHAR(255)
);`, (err, res) => {
    console.log("works");
  });

const list = listOfPokemon.map(pokemon => Object.values(pokemon));

for (let pokemon of list) {
client.query(`INSERT INTO 
pokemon (name, height, weight, img)
VALUES
('${pokemon[1]}', '${pokemon[2]}', '${pokemon[3]}', '${pokemon[4]}')`, (err, res) => {
    console.log(`added ${pokemon[1]}`);
  });
}

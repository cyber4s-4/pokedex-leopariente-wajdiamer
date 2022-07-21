import path from "path";
import cors from "cors";
import express, { Request, Response } from "express";
//@ts-ignore
import { Collection } from "mongodb";
// import { create, connect, getPokemon, findPokemon, getRandom } from "./mongo";
import { create, connect, getPokemon, findPokemon, getRandom } from "./postgres";
import { json } from "body-parser";
// import { Pokemon } from 'src/client/tsc/data';

const portHttp = 4000;
let index = 0;

const app = express();
app.use(cors());
app.use(json());

const root = path.join(process.cwd(), "./dist");
app.use(express.static(root));
let collection: any;
connect(create()).then((res) => (collection = res));


// @ts-ignore
app.get("/reset", (req: Request, res: Response) => {
	index = 0;
  getPokemon(index, collection).then((listOfPokemon) => {
    index += 20;
    res.send(listOfPokemon);
  });
  });
  
// @ts-ignore
app.get("/pokedex", (req: Request, res: Response) => {
  getPokemon(index, collection).then((listOfPokemon) => {
    index += 20;
    res.send(listOfPokemon);
  });
});

app.get("/pokedex/:name", (req, res) => {
  findPokemon(req.params.name, collection).then((data) => {
	res.send(data);
  })
});

// @ts-ignore
app.get("/random", (req, res) => {
  getRandom(collection).then(data => res.send(data))
})

app.listen(portHttp, () => {
  console.log("Hosted: http://localhost:" + portHttp);
});

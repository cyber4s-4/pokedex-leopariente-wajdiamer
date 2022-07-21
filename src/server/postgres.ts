import { Client } from "pg";

export function create() {
    const client = new Client({
        connectionString: 'postgres://bkskietbvmzdou:b2bb03cb58a1294282ba4fa8c6bc1eea0970a828daeafffbaf70b0c64786ec1a@ec2-54-87-179-4.compute-1.amazonaws.com:5432/dfsdrbnlcded28',
        ssl: {
          rejectUnauthorized: false
        }
      });
      return client;
}

export async function connect(client: Client) {
    client.connect()
    return client;
  }
  
    // @ts-ignore
  export async function getPokemon(index: number, client: Client) {
    return await client.query(`SELECT * FROM pokemon WHERE id>${index} AND id<${index+21};`).then(res => res.rows);
  }
  
  // @ts-ignore
  export async function findPokemon(name: String, client: Client) {
    return await client.query(`SELECT * FROM pokemon WHERE name='${name}';`).then(res => res.rows[0]);
  }
  
    // @ts-ignore
  export async function getRandom(client: Client) {
    const listOfPokemon = await client.query(`SELECT * FROM pokemon`).then(res => res.rows);
    const randomNumber = Math.floor(Math.random() * listOfPokemon.length);
    return listOfPokemon[randomNumber];
  }

const { Client } = require('pg');

export function create() {
    const client = new Client({
        connectionString: 'postgres://bkskietbvmzdou:b2bb03cb58a1294282ba4fa8c6bc1eea0970a828daeafffbaf70b0c64786ec1a@ec2-54-87-179-4.compute-1.amazonaws.com:5432/dfsdrbnlcded28',
        ssl: {
          rejectUnauthorized: false
        }
      });
      return client;
}

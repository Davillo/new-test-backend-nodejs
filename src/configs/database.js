import { MongoClient } from 'mongodb';
import 'dotenv/config';

export class Database {
	static #db;

	static async connect() {
		const MONGODB_URL = process.env.MONGODB_URL;
		
		if (!MONGODB_URL) {
			throw new Error('Configure a URL do MongoDB no .env');
		}

		const client = new MongoClient(MONGODB_URL);

		const connection = await client.connect();
		this.#db = connection.db('database');
	}

	static getConnection() {
		return this.#db;
	}
}
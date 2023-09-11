import { ObjectId } from "mongodb";
import { findByCollectionAndId } from "./BaseRepository";
import { ErrorHandler } from "../errors/ErrorHandler";

export class ProductRepository {

	#db

	constructor(db) {
		this.#db = db;
	}

	async create(data) {
		const categoriesCollection = this.#db.collection('categories');
		const productsCollection = this.#db.collection('products');

		const categoryExists = await categoriesCollection.findOne({
			_id: new ObjectId(data.category_id),
			owner_id: data.owner_id
		});

		if (!categoryExists) {
			throw new ErrorHandler('A categoria informada não existe.', 404);
		}

		await productsCollection.insertOne(data);
		return data;
	}

	async get(id, ownerId) {
		const productsCollection = this.#db.collection('products');

		const product = await productsCollection.findOne({
			_id: new ObjectId(id),
			owner_id: ownerId
		});

		if(!product) {
			throw new ErrorHandler('O produto informado não existe.', 404);
		}

		return product;
	}

	async update(data, id) {
		const productsCollection = this.#db.collection('products');
		const categoriesCollection = this.#db.collection('categories');

		const categoryExists = await categoriesCollection.findOne({
			title: data.category_id,
		});

		if (!categoryExists) {
			throw new ErrorHandler(
				'A categoria informada não existe',
				404
			);
		}
		
		const productExists = await productsCollection.findOne({
			title: data.title,
			owner_id: data.owner_id
		});

		if (productExists) {
			throw new ErrorHandler('O produto informado já existe para este owner', 422);
		}		
		
		await productsCollection.updateOne(
			{
				_id: new ObjectId(id),
			},
			{
				$set: { ...data },
			}
		);

		const updatedProduct = await productsCollection.findOne({
			_id: new ObjectId(id),
		});

		return updatedProduct;
	}

	async destroy(id, ownerId) {
		const productsCollection = this.#db.collection('products');
		const productExists = await findByCollectionAndId(productsCollection, id);
	
		if (!productExists) {
			throw new ErrorHandler('O produto informado não existe.', 404);
		}
	
		await productsCollection.deleteOne({ _id: new ObjectId(id), owner_id: ownerId });
	}
}
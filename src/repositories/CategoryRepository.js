import { ObjectId } from "mongodb";
import { findByCollectionAndId } from "./BaseRepository";

export class CategoryRepository {

	#db

	constructor(db) {
		this.#db = db;
	}

	async create(category) {
		const categoriesCollection = this.#db.collection('categories');

		const categoryAlreadyExists = await categoriesCollection.findOne({
			title: category.title,
			owner_id: category.owner_id,
		});

		if (categoryAlreadyExists) {
			throw new Error('Categoria já existente para este owner_id.', 422);
		}

		await categoriesCollection.insertOne(category);
		return category;
	}

	async destroy(id) {
		const categoriesCollection = this.#db.collection('categories');
		const categoryExists = await findByCollectionAndId(categoriesCollection, id);

		if (!categoryExists) {
			throw new Error('A categoria informada não existe.', 404);
		}

		await categoriesCollection.deleteOne({ _id: new ObjectId(id) });
	}
}
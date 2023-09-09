import { ObjectId } from "mongodb";
import { findByCollectionAndId } from "./BaseRepository";
import { ErrorHandler } from "../errors/ErrorHandler";

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
			throw new ErrorHandler('Categoria já existente para este owner_id.', 422);
		}

		await categoriesCollection.insertOne(category);
		return category;
	}

	async update(category, id) {
		const categoriesCollection = this.#db.collection('categories');
		const categoryExists = await findByCollectionAndId(categoriesCollection, id);

		if (!categoryExists) {
			throw new ErrorHandler('A categoria informada não existe.', 404);
		}

		await categoriesCollection.updateOne(
			{
				_id: new ObjectId(id),
			},
			{
				$set: {... category},
			}
		);

		const updatedCategory = await categoriesCollection.findOne({
			_id: new ObjectId(id)
		});

		return updatedCategory;
	}

	async get(id, ownerId) {
		const categoriesCollection = this.#db.collection('categories');

		const category = await categoriesCollection.findOne({
			_id: new ObjectId(id),
			owner_id: ownerId
		});

		if(!category) {
			throw new ErrorHandler('A categoria informada não existe.', 404);
		}

		return category;
	}

	async destroy(id) {
		const categoriesCollection = this.#db.collection('categories');
		const categoryExists = await findByCollectionAndId(categoriesCollection, id);

		if (!categoryExists) {
			throw new ErrorHandler('A categoria informada não existe.', 404);
		}

		await categoriesCollection.deleteOne({ _id: new ObjectId(id) });
	}
}
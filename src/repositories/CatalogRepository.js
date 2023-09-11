import { AwsS3 } from '../helpers/AwsS3';

export class CatalogRepository {
	#db

	constructor(db) {
		this.#db = db
	}

	async generateCatalogJSON(ownerId) {
		const categoriesCollection = this.#db.collection('categories')
		const productsCollection = this.#db.collection('products')

		let catalog = {
			owner: ownerId,
			catalog: [],
		};

		const categories = await categoriesCollection.find({ owner_id: ownerId }).toArray();

        for (let categoryItem of categories) {

			const productsByCategoryAndOwner = await productsCollection.find({
                    owner_id: ownerId,
					category_id: categoryItem._id,
			}).toArray();

			if (productsByCategoryAndOwner.length > 0) {
				catalog.catalog.push({
					category_title: categoryItem.title,
					category_description: categoryItem.description,
					items: productsByCategoryAndOwner.map((product) => ({
						title: product.title,
						description: product.description,
						price: product.price,
					})),
				})
			}
		}

		return catalog;
	}

	async uploadCatalogToS3(data) {
		const s3 = new AwsS3();
		await s3.uploadS3JSONFile(`catalog-${data.owner}.json`, data);
	}

	async getCatalogFromS3(ownerId) {
		const s3 = new AwsS3();
		const data = s3.getContentS3JSONFile(`catalog-${ownerId}.json`);
		return data;
	}

	async generateCatalogAndUploadToS3(ownerId) {
		const catalogData = await this.generateCatalogJSON(ownerId);
		await this.uploadCatalogToS3(catalogData);
	}
}
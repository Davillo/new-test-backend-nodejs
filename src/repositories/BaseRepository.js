import { ObjectId } from 'mongodb';

export async function findByCollectionAndId(collection, id) {
	const data = await collection.findOne({
		_id: new ObjectId(id),
	});

	return !!data ? true : false;
}
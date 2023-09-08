import { ObjectId } from 'mongodb';
import { Database } from '../configs/Database';
import { CategoryRepository } from '../repositories/CategoryRepository';

export class CategoryController {
  
    async create(req, res) {
        const categoryRepository = new CategoryRepository(Database.getConnection());
        const createdCategory = categoryRepository.create(req.body);
        return res.status(201).json(createdCategory);
    }

    async destroy(req, res) {
        const id = req.params.id;
		const categoryRepository = new CategoryRepository(Database.getConnection());

        if(!id || ObjectId.isValid(id)) {
            return res.status(400).json({"message": "O parâmetro ID deve ser informado corretamente na URL."});
        }
        
		await categoryRepository.destroy(req.params.id);
		return res.status(204).send();
	}
}
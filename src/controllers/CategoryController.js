import { ObjectId } from 'mongodb';
import { Database } from '../configs/Database';
import { CategoryRepository } from '../repositories/CategoryRepository';

export class CategoryController {
  
    async create(req, res) {
        const categoryRepository = new CategoryRepository(Database.getConnection());
        const createdCategory = await categoryRepository.create(req.body);
        return res.status(201).json(createdCategory);
    }

    async update(req, res) {
        const id = req.params.id;

        if(!id || !ObjectId.isValid(id)) {
            return res.status(400).json({"message": "O parâmetro ID deve ser informado corretamente na URL."});
        }

        const categoryRepository = new CategoryRepository(Database.getConnection());
        const updatedCategory = await categoryRepository.update(req.body, id);
        return res.status(200).json(updatedCategory);
    }

    async show(req, res) {
        const id = req.params.id;
		const categoryRepository = new CategoryRepository(Database.getConnection());
        const category = await categoryRepository.get(id, req.body.owner_id);

        if(!id || !ObjectId.isValid(id)) {
            return res.status(400).json({"message": "O parâmetro ID deve ser informado corretamente na URL."});
        }
        
        return res.status(200).json(category);
    }

    async destroy(req, res) {
        const id = req.params.id;
		const categoryRepository = new CategoryRepository(Database.getConnection());

        if(!id || !ObjectId.isValid(id)) {
            return res.status(400).json({"message": "O parâmetro ID deve ser informado corretamente na URL."});
        }
        
		await categoryRepository.destroy(req.params.id);
		return res.status(204).send();
	}
}
import { Database } from '../configs/Database';
import { CategoryRepository } from '../repositories/CategoryRepository';

export class CategoryController {
  
    async create(req, res) {
        const categoryRepository = new CategoryRepository(Database.getConnection());
        const createdCategory = categoryRepository.create(req.body);
        return res.status(201).json(createdCategory);
    }

    async delete(req, res) {
		const categoryService = new CategoryRepository(DatabaseConfig.getDatabase());

        if(!req.params.id) {
            throw new Error('O parâmetro ID deve ser informado na URL');
        }
        
		await categoryService.delete(req.params.id);
		return res.status(204).send();
	}
}
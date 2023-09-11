import { ObjectId } from 'mongodb';
import { Database } from '../configs/Database';
import { CatalogRepository } from '../repositories/CatalogRepository';

export class CatalogController {
  
    async show(req, res) {
        try {
            const ownerId = req.params.ownerId;

            if(!ownerId) {
                return res.status(400).json({"message": "O parâmetro ID deve ser informado corretamente na URL."});
            }

            const catalogRepository = new CatalogRepository(Database.getConnection());
            return res.json(await catalogRepository.getCatalogFromS3(ownerId));
        } catch (error) {
            console.log(error);
            return res.status(error.statusCode).json({message: error.message});
        }
    }
}
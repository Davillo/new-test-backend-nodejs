import { ObjectId } from 'mongodb';
import { Database } from '../configs/Database';
import { ProductRepository } from '../repositories/ProductRepository';

export class ProductController {
  
    async create(req, res) {
        try {
            const productRepository = new ProductRepository(Database.getConnection());
            const createdProduct = await productRepository.create(req.body);
            return res.status(201).json(createdProduct);
        } catch (error) {
            console.log(error);
            return res.status(error.statusCode).json({message: error.message});
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;

            if(!id || !ObjectId.isValid(id)) {
                return res.status(400).json({"message": "O parâmetro ID deve ser informado corretamente na URL."});
            }

            const productRepository = new ProductRepository(Database.getConnection());
            const updatedProduct = await productRepository.update(req.body, id);
            return res.status(200).json(updatedProduct);
        } catch (error) {
            console.log(error);
            return res.status(error.statusCode).json({message: error.message});
        }
    }

    async show(req, res) {
        try {
            const id = req.params.id;
            const productRepository = new ProductRepository(Database.getConnection());

            if(!id || !ObjectId.isValid(id)) {
                return res.status(400).json({message: "O parâmetro ID deve ser informado corretamente na URL."});
            }

            const product = await productRepository.get(id, req.body.owner_id);
            return res.status(200).json(product);
        } catch (error) {
            console.log(error);
            return res.status(error.statusCode).json({message: error.message});
        }
    }

    async destroy(req, res) {
        try {
            const id = req.params.id;
		    const productRepository = new ProductRepository(Database.getConnection());

            if(!id || !ObjectId.isValid(id)) {
                return res.status(400).json({message: "O parâmetro ID deve ser informado corretamente na URL."});
            }
        
            await productRepository.destroy(id, req.body.owner_id);
            return res.status(204).send();
        } catch (error) {
            console.log(error);
            return res.status(error.statusCode).json({message: error.message});
        }
	}
}
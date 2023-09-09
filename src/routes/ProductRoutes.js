import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { validateSchema } from '../middlewares/ValidateSchemaMiddleware';
import {createProductSchema, updateProductSchema} from '../models/ProductSchema';

const productRoutes = Router();
const productController = new ProductController();

productRoutes.post('/', validateSchema(createProductSchema), (req, res) =>
	productController.create(req, res)
);

productRoutes.put('/:id', validateSchema(updateProductSchema), (req, res) =>
	productController.update(req, res)
);

productRoutes.get('/:id', (req, res) => productController.show(req, res));

productRoutes.delete('/:id', (req, res) => productController.destroy(req, res));

export default productRoutes;
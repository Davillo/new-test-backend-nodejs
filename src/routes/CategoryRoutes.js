import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';
import { validateSchema } from '../middlewares/ValidateSchemaMiddleware';
import {createCategorySchema, updateCategorySchema} from '../models/CategorySchema';

const categoryRoutes = Router();
const categoryController = new CategoryController();

categoryRoutes.post('/', validateSchema(createCategorySchema), (req, res) =>
	categoryController.create(req, res)
);

categoryRoutes.put('/:id', validateSchema(updateCategorySchema), (req, res) =>
	categoryController.update(req, res)
);

categoryRoutes.delete('/:id', (req, res) => categoryController.destroy(req, res));

export default categoryRoutes;
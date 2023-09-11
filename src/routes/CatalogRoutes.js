import { Router } from 'express';
import { CatalogController } from '../controllers/CatalogController';

const catalogRoutes = Router();
const catalogController = new CatalogController();

catalogRoutes.get('/:ownerId', (req, res) => catalogController.show(req, res));

export default catalogRoutes;
import express from 'express';
import categoryRoutes from './routes/CategoryRoutes';
import productRoutes from './routes/ProductRoutes';
import catalogRoutes from './routes/CatalogRoutes';

const app = express();
app.use(express.json());

app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/catalogs', catalogRoutes);

app.get('/' , (req, res) => {
    res.send('ok');
});

export default app;
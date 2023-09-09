import express from 'express';
import categoryRoutes from './routes/CategoryRoutes';
import productRoutes from './routes/ProductRoutes';

const app = express();
app.use(express.json());

app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

app.get('/' , (req, res) => {
    res.send('ok');
});

export default app;
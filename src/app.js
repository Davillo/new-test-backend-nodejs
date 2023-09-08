import express from 'express';
import categoryRoutes from './routes/CategoryRoutes';

const app = express();
app.use(express.json());

app.use('/categories', categoryRoutes);

app.get('/' , (req, res) => {
    res.send('ok');
});

export default app;
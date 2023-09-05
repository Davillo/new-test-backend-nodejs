import app from './app';
import 'dotenv/config';
import { Database } from './configs/database';
const port = process.env.PORT;

Database.connect().then(() => {
    app.listen(port, () => {
        console.log(`Listening on ${port}`);
    });
}).catch(error => {
    console.log('erro ao conectar no mongoDB:', error);
});


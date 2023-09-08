import app from './app';
import 'dotenv/config';
import { Database } from './configs/Database';
const port = process.env.PORT;

if(!port){
    throw new Error('Configure o PORT .env');
}

Database.connect().then(() => {
    app.listen(port, () => {
        console.log(`Listening on ${port}`);
    });
}).catch(error => {
    console.log('erro ao conectar no mongoDB:', error);
});


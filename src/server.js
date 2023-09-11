import app from './app';
import 'dotenv/config';
import { Database } from './configs/Database';
import { Consumer } from 'sqs-consumer';
import { CatalogRepository } from './repositories/CatalogRepository';
const port = process.env.PORT;

if(!port){
    throw new Error('Configure o PORT .env');
}

Database.connect().then(() => {
    app.listen(port, () => {
        console.log(`Listening on ${port}`);
        const consumer = Consumer.create({
			queueUrl: process.env.AWS_SQS_URL,
			handleMessage: async (message) => {
				const catalogRepository = new CatalogRepository(Database.getConnection())
				await catalogRepository.generateCatalogAndUploadToS3(
					JSON.parse(message.Body).owner
				)
			},
		})
		consumer.on('error', (err) => {
			console.log(err);
		})
		consumer.on('processing_error', (err) => {
			console.error(err.message);
		})

		consumer.start();
    });
}).catch(error => {
    console.log('erro ao conectar no mongoDB:', error);
});
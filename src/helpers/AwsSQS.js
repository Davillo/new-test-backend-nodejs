import { SQS } from 'aws-sdk';
import 'dotenv/config';

export class AWSSQS {
	#sqs

	constructor() {
		this.#sqs = new SQS({
			apiVersion: '2012-11-05',
			region: process.env.AWS_REGION,
		});
	}

	async sendJSONMessage(data) {
		await this.#sqs
			.sendMessage({
				MessageBody: JSON.stringify(data),
				QueueUrl: process.env.AWS_SQS_URL,
			}).promise();
	}
}
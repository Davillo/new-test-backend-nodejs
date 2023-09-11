import { S3, SQS } from 'aws-sdk';
import 'dotenv/config';

export class AwsS3 {
	#s3

	constructor() {
		this.#s3 = new S3({
			apiVersion: '2006-03-01',
			region: process.env.AWS_REGION,
		});
	}

	async uploadS3JSONFile(fileName, fileContent) {
		await this.#s3
			.upload({
				Bucket: process.env.AWS_S3_BUCKET,
				Key: fileName,
				Body: Buffer.from(JSON.stringify(fileContent)),
			}).promise();
	}

	async getContentS3JSONFile(fileName) {
		const data = await this.#s3
			.getObject({
				Bucket: process.env.AWS_S3_BUCKET,
				Key: fileName,
			}).promise();

		return JSON.parse(data.Body);
	}
}
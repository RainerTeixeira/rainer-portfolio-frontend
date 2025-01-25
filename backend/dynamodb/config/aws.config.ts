import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import dotenv from 'dotenv';

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

// Verifique se as variáveis de ambiente estão definidas corretamente
const accessKeyId = process.env.DYNAMODB_ACCESS_KEY_ID;
const secretAccessKey = process.env.DYNAMODB_SECRET_ACCESS_KEY;

if (!accessKeyId || !secretAccessKey) {
    throw new Error("Credenciais do DynamoDB não estão definidas no arquivo .env");
}

const client = new DynamoDBClient({
    region: process.env.DYNAMODB_REGION || 'us-east-1', // Região a partir do .env
    credentials: {
        accessKeyId: accessKeyId,   // Certifique-se de que as credenciais estão sendo passadas corretamente
        secretAccessKey: secretAccessKey,
    },
});

export { client as dynamo };

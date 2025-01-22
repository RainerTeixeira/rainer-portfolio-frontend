"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamo = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const dotenv_1 = __importDefault(require("dotenv"));
// Carregar as variáveis de ambiente do arquivo .env
dotenv_1.default.config();
// Verifique se as variáveis de ambiente estão definidas corretamente
const accessKeyId = process.env.DYNAMODB_ACCESS_KEY_ID;
const secretAccessKey = process.env.DYNAMODB_SECRET_ACCESS_KEY;
if (!accessKeyId || !secretAccessKey) {
    throw new Error("Credenciais do DynamoDB não estão definidas no arquivo .env");
}
const client = new client_dynamodb_1.DynamoDBClient({
    region: process.env.DYNAMODB_REGION || 'us-east-1',
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },
});
exports.dynamo = client;
//# sourceMappingURL=aws.config.js.map
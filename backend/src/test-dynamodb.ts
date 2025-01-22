import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';  // Importa o cliente e o comando para listar tabelas
import { dynamo } from './config/aws.config';  // Importa a configuração do cliente

// Função para listar as tabelas no DynamoDB
async function listTables() {
    try {
        const command = new ListTablesCommand({});  // Cria o comando para listar tabelas
        const data = await dynamo.send(command);  // Envia o comando usando o cliente DynamoDB v3
        console.log("Tables in DynamoDB:", data.TableNames);  // Exibe o nome das tabelas
    } catch (error) {
        console.error("Error listing tables:", error);
    }
}

// Chama a função para listar as tabelas
listTables();

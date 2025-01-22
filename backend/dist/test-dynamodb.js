"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb"); // Importa o cliente e o comando para listar tabelas
const aws_config_1 = require("./config/aws.config"); // Importa a configuração do cliente
// Função para listar as tabelas no DynamoDB
function listTables() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const command = new client_dynamodb_1.ListTablesCommand({}); // Cria o comando para listar tabelas
            const data = yield aws_config_1.dynamo.send(command); // Envia o comando usando o cliente DynamoDB v3
            console.log("Tables in DynamoDB:", data.TableNames); // Exibe o nome das tabelas
        }
        catch (error) {
            console.error("Error listing tables:", error);
        }
    });
}
// Chama a função para listar as tabelas
listTables();
//# sourceMappingURL=test-dynamodb.js.map
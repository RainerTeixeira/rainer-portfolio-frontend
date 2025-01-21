import { Controller, Get } from '@nestjs/common';
import { dynamo } from '../config/aws.config';
import { ScanCommand } from '@aws-sdk/client-dynamodb';  // Importando ScanCommand

@Controller('posts')
export class PostsController {

    @Get()
    async getPosts() {
        const params = {
            TableName: 'Posts', // Nome da sua tabela no DynamoDB
        };

        try {
            // Usando ScanCommand com o método send
            const result = await dynamo.send(new ScanCommand(params));
            return result.Items; // Retorna os itens encontradoss
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw new Error('Unable to fetch posts from DynamoDB');
        }
    }
}

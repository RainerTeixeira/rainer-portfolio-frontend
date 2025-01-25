import { Controller, Get } from "@nestjs/common";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { dynamo } from "../config/aws.config"; // Importar a configuração do DynamoDB

@Controller("posts")
export class PostsController {
    @Get()
    async getAllPosts() {
        const params = {
            TableName: "Posts", // Substitua pelo nome da sua tabela
        };

        try {
            const command = new ScanCommand(params);
            const data = await dynamo.send(command);

            // Formatar os dados para um formato simples
            const posts = data.Items?.map((item: any) => ({
                postId: item.postId.S, // Pega o valor da chave 'postId'
                postTitle: item.postTitle.S, // Pega o valor da chave 'postTitle'
                postSummary: item.postSummary.S, // Pega o valor da chave 'postSummary'
                postImageUrl: item.postImageUrl.S, // Pega o valor da chave 'postImageUrl'
                postDate: item.postDate.S, // Pega a data de publicação
                postContent: item.postContent.S, // Pega o conteúdo do post
                postStatus: item.postStatus.S, // Pega o status do post
                postReadingTime: item.postReadingTime.S, // Pega o tempo de leitura
                postLastUpdated: item.postLastUpdated.S, // Pega a data de última atualização
                postVideoEmbedUrl: item.postVideoEmbedUrl.S, // Pega a URL do vídeo embutido
                postTags: item.postTags.L?.map((tag: any) => tag.S), // Extrai as tags
                references: item.references.L?.map((ref: any) => ({
                    title: ref.M.title.S,
                    url: ref.M.url.S,
                })), // Extrai as referências com título e URL
            }));

            return posts;
        } catch (error) {
            console.error("Erro ao buscar dados do DynamoDB:", error);
            throw new Error("Erro ao buscar posts");
        }
    }
}

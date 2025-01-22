"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const aws_config_1 = require("../config/aws.config");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb"); // Importando ScanCommand
let PostsController = class PostsController {
    getPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: 'Posts', // Nome da sua tabela no DynamoDB
            };
            try {
                // Usando ScanCommand com o método send
                const result = yield aws_config_1.dynamo.send(new client_dynamodb_1.ScanCommand(params));
                return result.Items; // Retorna os itens encontradoss
            }
            catch (error) {
                console.error('Error fetching posts:', error);
                throw new Error('Unable to fetch posts from DynamoDB');
            }
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPosts", null);
PostsController = __decorate([
    (0, common_1.Controller)('posts')
], PostsController);
exports.PostsController = PostsController;
//# sourceMappingURL=posts.controller.js.map
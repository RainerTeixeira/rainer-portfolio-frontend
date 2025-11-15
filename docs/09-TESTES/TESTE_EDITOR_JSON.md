# 🧪 Teste Manual do Editor - Persistência Visual ↔ JSON

## JSON de Teste Completo

Cole este JSON no modo JSON do editor:

```json
{
  "type": "doc",
  "content": [
    {
      "type": "heading",
      "attrs": { "level": 1 },
      "content": [
        {
          "type": "text",
          "text": "A Revolução Tecnológica e o Futuro da Inteligência Artificial em 2025"
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "A tecnologia avança em um ritmo sem precedentes. Em 2025, a Inteligência Artificial (IA) está em todos os lugares — nas empresas, nas escolas, nos lares e até mesmo nas artes."
        }
      ]
    },
    {
      "type": "image",
      "attrs": {
        "src": "https://fernandogiannini.com.br/wp-content/uploads/2025/09/historia.jpg",
        "alt": "A história da tecnologia e a revolução digital",
        "title": "História da tecnologia"
      }
    },
    {
      "type": "blockquote",
      "content": [
        {
          "type": "text",
          "text": "\"A tecnologia é melhor quando conecta as pessoas.\" – Matt Mullenweg"
        }
      ]
    },
    {
      "type": "heading",
      "attrs": { "level": 2 },
      "content": [
        { "type": "text", "text": "📈 Tendências de IA e Tecnologia em 2025" }
      ]
    },
    {
      "type": "bulletList",
      "content": [
        {
          "type": "listItem",
          "content": [
            { "type": "text", "text": "IA generativa em larga escala" }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "type": "text",
              "text": "Computação quântica aplicada a modelos de aprendizado"
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "type": "text",
              "text": "Interfaces cérebro-máquina integradas ao cotidiano"
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "type": "text",
              "text": "Automação total de tarefas cognitivas e criativas"
            }
          ]
        }
      ]
    },
    {
      "type": "heading",
      "attrs": { "level": 2 },
      "content": [{ "type": "text", "text": "💡 Áreas em Transformação" }]
    },
    {
      "type": "table",
      "content": [
        {
          "type": "tableRow",
          "content": [
            {
              "type": "tableHeader",
              "content": [{ "type": "text", "text": "Setor" }]
            },
            {
              "type": "tableHeader",
              "content": [{ "type": "text", "text": "Avanço Tecnológico" }]
            },
            {
              "type": "tableHeader",
              "content": [{ "type": "text", "text": "Impacto Real" }]
            }
          ]
        },
        {
          "type": "tableRow",
          "content": [
            {
              "type": "tableCell",
              "content": [{ "type": "text", "text": "Saúde" }]
            },
            {
              "type": "tableCell",
              "content": [
                {
                  "type": "text",
                  "text": "IA diagnóstica com precisão superior a 99%"
                }
              ]
            },
            {
              "type": "tableCell",
              "content": [
                {
                  "type": "text",
                  "text": "Diagnósticos mais rápidos e personalizados"
                }
              ]
            }
          ]
        },
        {
          "type": "tableRow",
          "content": [
            {
              "type": "tableCell",
              "content": [{ "type": "text", "text": "Educação" }]
            },
            {
              "type": "tableCell",
              "content": [
                {
                  "type": "text",
                  "text": "Plataformas de ensino com tutores de IA"
                }
              ]
            },
            {
              "type": "tableCell",
              "content": [
                { "type": "text", "text": "Aprendizado adaptativo e inclusivo" }
              ]
            }
          ]
        },
        {
          "type": "tableRow",
          "content": [
            {
              "type": "tableCell",
              "content": [{ "type": "text", "text": "Indústria" }]
            },
            {
              "type": "tableCell",
              "content": [
                { "type": "text", "text": "Robôs autônomos e IA preditiva" }
              ]
            },
            {
              "type": "tableCell",
              "content": [
                {
                  "type": "text",
                  "text": "Produtividade e segurança ampliadas"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "heading",
      "attrs": { "level": 2 },
      "content": [
        {
          "type": "text",
          "text": "💻 Exemplo de Código: IA Simples com Python"
        }
      ]
    },
    {
      "type": "codeBlock",
      "attrs": { "language": "python" },
      "content": [
        {
          "type": "text",
          "text": "import numpy as np\nfrom sklearn.neural_network import MLPClassifier\n\n# Dados fictícios\ndata = np.array([[0,0],[0,1],[1,0],[1,1]])\nlabels = np.array([0,1,1,0])  # operação XOR\n\n# Cria e treina o modelo\nmodelo = MLPClassifier(hidden_layer_sizes=(4,), max_iter=500)\nmodelo.fit(data, labels)\n\nprint('Predição para [1,1]:', modelo.predict([[1,1]]))"
        }
      ]
    },
    {
      "type": "heading",
      "attrs": { "level": 2 },
      "content": [{ "type": "text", "text": "⚖️ Desafios Éticos e Sociais" }]
    },
    {
      "type": "orderedList",
      "content": [
        {
          "type": "listItem",
          "content": [
            { "type": "text", "text": "Privacidade e segurança de dados" }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "type": "text",
              "text": "Transparência e explicabilidade dos algoritmos"
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "type": "text",
              "text": "Redução de desigualdades no acesso à tecnologia"
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "type": "text",
              "text": "Impacto no mercado de trabalho e automação"
            }
          ]
        }
      ]
    },
    {
      "type": "heading",
      "attrs": { "level": 2 },
      "content": [{ "type": "text", "text": "📚 Conclusão" }]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "A tecnologia e a inteligência artificial estão redefinindo o conceito de humanidade digital. Mais do que nunca, precisamos equilibrar inovação com responsabilidade."
        }
      ]
    },
    {
      "type": "horizontal_rule"
    },
    {
      "type": "paragraph",
      "content": [
        { "type": "text", "text": "Publicado por " },
        { "type": "text", "marks": [{ "type": "bold" }], "text": "Seu Nome" },
        { "type": "text", "text": " em 2025 — Blog de Tecnologia & Inovação." }
      ]
    }
  ]
}
```

## ✅ Checklist de Teste

- [ ] 1. Abra http://localhost:3000/dashboard?mode=new
- [ ] 2. Faça login (se necessário)
- [ ] 3. Clique no botão **"JSON"** no editor Tiptap
- [ ] 4. Cole o JSON acima no textarea
- [ ] 5. Clique no botão **"Visual"**
- [ ] 6. **VERIFIQUE**: O conteúdo deve aparecer (títulos, parágrafo, imagem, citação, lista, tabela, código)
- [ ] 7. Clique no botão **"JSON"** novamente
- [ ] 8. **VERIFIQUE**: O JSON completo original deve estar no textarea
- [ ] 9. Edite algo no JSON (ex: mude o texto de um título)
- [ ] 10. Clique no botão **"Visual"** novamente
- [ ] 11. **VERIFIQUE**: A edição deve aparecer no editor
- [ ] 12. Clique em **"JSON"** mais uma vez
- [ ] 13. **VERIFIQUE**: O JSON editado deve estar preservado

## ⚠️ Observações

- Nós não suportados (`callout`, `video`, `accordion`) serão **ignorados** na visualização
- Mas o **JSON original completo** será **preservado** para edição futura
- O conteúdo é salvo automaticamente no **localStorage** a cada mudança

## 🐛 Se algo der errado

1. Abra o Console do navegador (F12)
2. Verifique se há erros em vermelho
3. Verifique se há warnings sobre nós removidos
4. Recarregue a página e tente novamente

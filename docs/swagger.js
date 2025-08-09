// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Defina a porta da sua aplicação. Isso é importante para a URL do servidor no Swagger.
// Você pode passar a porta como um argumento ou importá-la de um arquivo de configuração.
const PORT = process.env.PORT || 3000; // Use a porta do ambiente ou 3000 como padrão

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // Versão da especificação OpenAPI
    info: {
      title: 'API do Departamento de Polícia',
      version: '1.0.0',
      description: 'Documentação da API para o sistema do Departamento de Polícia, incluindo rotas para agentes e casos.',
      contact: {
        name: 'Sua Equipe de Desenvolvimento',
        email: 'dev@departamentodepolicia.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor Local de Desenvolvimento',
      },
      // Você pode adicionar outros servidores aqui (produção, staging, etc.)
      // {
      //   url: 'https://api.seusite.com',
      //   description: 'Servidor de Produção',
      // },
    ],
    // Componentes de segurança (se sua API tiver autenticação)
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Autenticação JWT (adicione "Bearer " antes do token)',
        },
      },
      // Schemas reutilizáveis (modelos de dados)
      schemas: {
        Agente: {
          type: 'object',
          required: ['nome', 'matricula'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único do agente',
              example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
            },
            nome: {
              type: 'string',
              description: 'Nome completo do agente',
              example: 'Detetive John Doe',
            },
            matricula: {
              type: 'string',
              description: 'Número de matrícula do agente',
              example: 'DPD-007',
            },
            status: {
              type: 'string',
              description: 'Status atual do agente (ativo, licença, aposentado)',
              enum: ['ativo', 'licença', 'aposentado'],
              example: 'ativo',
            },
          },
        },
        Caso: {
          type: 'object',
          required: ['titulo', 'descricao', 'status'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único do caso',
              example: 'f1e2d3c4-b5a6-9876-5432-10fedcba9876',
            },
            titulo: {
              type: 'string',
              description: 'Título do caso',
              example: 'Roubo à Joalheria Central',
            },
            descricao: {
              type: 'string',
              description: 'Descrição detalhada do caso',
              example: 'Roubo ocorrido na joalheria "Brilho Eterno" em 15/07/2025. Vários itens de alto valor foram subtraídos.',
            },
            status: {
              type: 'string',
              description: 'Status atual do caso',
              enum: ['aberto', 'em_investigacao', 'arquivado', 'resolvido'],
              example: 'em_investigacao',
            },
            agenteResponsavelId: {
              type: 'string',
              format: 'uuid',
              description: 'ID do agente responsável pelo caso',
              example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
            },
            dataAbertura: {
              type: 'string',
              format: 'date',
              description: 'Data de abertura do caso',
              example: '2025-07-15',
            },
          },
        },
      },
    },
  },
  
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
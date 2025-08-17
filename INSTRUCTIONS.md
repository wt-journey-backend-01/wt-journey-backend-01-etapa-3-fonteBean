### 1. Estrutura de Diretórios

Certifique-se de que a estrutura do seu projeto está organizada da seguinte forma:

📦 SEU-REPOSITÓRIO
│
├── package.json
├── server.js
├── .env
├── knexfile.js
├── INSTRUCTIONS.md
│
├── db/
│ ├── migrations/
│ ├── seeds/
│ └── db.js
│
├── routes/
│ ├── agentesRoutes.js
│ └── casosRoutes.js
│
├── controllers/
│ ├── agentesController.js
│ └── casosController.js
│
├── repositories/
│ ├── agentesRepository.js
│ └── casosRepository.js
│
├── utils/
│ └── errorHandler.js 2. Configuração do Banco de Dados com Docker
Para rodar o banco de dados, você deve utilizar o Docker.

Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=policia_db
NODE_ENV=development

### 2. Crie um arquivo docker-compose.yml para configurar o container do PostgreSQL, utilizando as variáveis de ambiente e um volume persistente.

Para subir o container, execute o comando na raiz do projeto:

```Bash

docker-compose up -d
```

### 3. Execução das Migrations e Seeds

As migrations são essenciais para versionar o esquema do banco de dados, e os seeds para popular as tabelas com dados iniciais.

Criação das Migrations:
Para criar o arquivo de migration que definirá as tabelas agentes e casos, execute:

```Bash

npx knex migrate:make solution_migrations
```

A tabela agentes deve ter as colunas: id, nome (string), dataDeIncorporacao (date), cargo (string).

A tabela casos deve ter as colunas: id, titulo (string), descricao (string), status (aberto/solucionado) e agente_id com uma foreign key para agentes.id.

Aplicação das Migrations:
Execute o seguinte comando para aplicar as migrations e criar as tabelas no banco de dados:

```Bash

npx knex migrate:latest
```

Criação dos Seeds:
Para criar o arquivo que populará as tabelas com dados iniciais (pelo menos 2 agentes e 2 casos):

```Bash

npx knex seed:make solution_migrations`

```

Execução dos Seeds:
Execute o comando para inserir os dados nas tabelas:

```

### 4. Refatoração dos Repositórios
Substitua a lógica de armazenamento em memória nos arquivos localizados na pasta repositories/ por queries Knex.js. Implemente as operações de CRUD (select, insert, update, delete) para interagir com o banco de dados.
```

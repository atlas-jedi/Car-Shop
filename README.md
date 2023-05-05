# Car-Shop

Este é um projeto de aplicação back-end de loja de veículos construída com Typescript, node.js, Express e Mongoose. A API possui duas rotas, `/cars` e `/motorcycles`, para lidar com as operações de criação, leitura, atualização e exclusão de carros e motocicletas. 

## Instalação

Para instalar o projeto (caso opte por não usar o docker), execute o seguinte comando:

```bash
npm install
```

É recomendado o uso do Node 1.16 pra cima.

## Configuração

Antes de executar a aplicação, é necessário configurar as variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto e defina as seguintes variáveis:

```
PORT=<porta>
MONGODB_URI=<URI do MongoDB>
```

## Execução

Você pode executar o projeto através do Docker executando:

```bash
docker-compose up -d --build
```

Irá subir dois containers, um sendo ```app-car-shop``` para rodar o server node na porta ```3001``` e o outro sendo ```mongodb``` para rodar o banco de dados na porta ```27017```.

## Testes

O projeto possui testes usando Mocha.js, Chai e Sinon. Para executar os testes basta executar o comando:

```bash
npm run test:coverage
```

## Estrutura do Projeto

O projeto está organizado em diferentes diretórios:

### Controllers

Os controladores são responsáveis por lidar com as solicitações do cliente e chamar os serviços adequados. 

### Domains

Os domínios são responsáveis por modelar as entidades que a aplicação manipula. Os domínios incluem definições de classe e validações.

### Models

Os modelos são usados pelo Mongoose para definir as coleções do MongoDB. Eles definem a estrutura de dados e os tipos de dados aceitos.

### Services

Os serviços são responsáveis por realizar as operações de CRUD nos modelos e fornecer resultados aos controladores.

## Rotas

### /cars

A rota `/cars` permite que o usuário realize as seguintes operações:

- `GET /cars`: Retorna uma lista de todos os carros.
- `GET /cars/:id`: Retorna os detalhes de um carro específico com o ID fornecido.
- `POST /cars`: Cria um novo carro com os dados fornecidos no corpo da solicitação.
- `PUT /cars/:id`: Atualiza os dados de um carro específico com o ID fornecido.

### /motorcycles

A rota `/motorcycles` permite que o usuário realize as seguintes operações:

- `GET /motorcycles`: Retorna uma lista de todas as motocicletas.
- `GET /motorcycles/:id`: Retorna os detalhes de uma motocicleta específica com o ID fornecido.
- `POST /motorcycles`: Cria uma nova motocicleta com os dados fornecidos no corpo da solicitação.
- `PUT /motorcycles/:id`: Atualiza os dados de uma motocicleta específica com o ID fornecido.

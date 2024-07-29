## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
# Clone this project

# Access project root folder
$ cd aurea-challenge-main

# Install dependencies
$ npm install

# Run docker
$ docker compose up

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test
```
### Set up Database and Port infos (.env)
Crie um arquivo **.env** na pasta raiz do projeto e preencha as variáveis de ambiente abaixo. (Dentro do projeto existe um .env.example para referência)
```
#Database config
DATABASE_URL="postgresql://postgres:postgres@localhost:5434/databasename?schema=public"
POSTGRESDB_USER=""
POSTGRESDB_ROOT_PASSWORD=""


#AWS config
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_REGION=''
AWS_SQS_QUEUE_URL=""
AWS_SQS_QUEUE_NAME=""  
```

📌 Endpoints
============
### AIT Endpoints
|       Route                       |    Method    |                   Description                       |                                                             
|   ---------------                 | :----------: |  -------------------------------------------------- |                                                             
|  `/ait`                |     GET     |  Lista todos os AITs existentes                                  | 
|  `/ait`                |     POST     |  Cria um novo AIT                                  | 
```
$ Body
{
  "nome": "",
  "data": "",
  "nomeAgente": "",
  "nomeCondutor": ""
}
```
### Solicitacao Cancelamento Endpoints
|       Route                       |    Method    |                   Description                       |                                                             
|   ---------------                 | :----------: |  -------------------------------------------------- |                                                             
|  `/solicitacaoCancelamento`                |     GET     |  Lista todos as Solicitacoes Cancelamento Pendentes  | 
|  `/solicitacaoCancelamento`                |     POST     |  Cria uma Solicitacao Cancelamento                  |
```
$ Body
{
  "aitId": "",
  "justificativa": ""
}
```
### Resposta Solicitacao Cancelamento Endpoint
|       Route                       |    Method    |                   Description                       |                                                             
|   ---------------                 | :----------: |  -------------------------------------------------- |                                                             
|  `/respostaSolicitacao`                |     POST     |  Responde uma Solicitacao Cancelamento Pendente                  |
```
$ Body
{
  "solicitacaoCancelamentoId": ,
  "aceitar": ,
  "justificativa": ""
}

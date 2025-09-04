# Projeto API de Restaurantes

Uma API RESTful simples para gerenciar um cadastro de restaurantes, construída com Node.js, Express e PostgreSQL. Inclui uma interface de frontend básica para interagir com a API.

## Funcionalidades

- **Criar** um novo restaurante
- **Listar** todos os restaurantes cadastrados
- **Buscar** um restaurante específico por ID
- **Atualizar** os dados de um restaurante
- **Deletar** um restaurante

## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
- [Node.js](https://nodejs.org/en/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)
- [PostgreSQL](https://www.postgresql.org/)

## Configuração do Ambiente

1.  **Clone o repositório:**
    ```bash
    # Clone este repositório (substitua pela URL correta se necessário)
    git clone <URL_DO_SEU_REPOSITORIO>
    
    # Entre na pasta do projeto
    cd projeto02
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure o Banco de Dados:**
    - Certifique-se de que seu servidor PostgreSQL está rodando.
    - Crie um banco de dados para a aplicação (ex: `restaurantes_db`).
    - Execute o seguinte script SQL para criar a tabela `restaurantes`:

    ```sql
    CREATE TABLE restaurantes (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        endereco VARCHAR(255) NOT NULL,
        telefone VARCHAR(20) NOT NULL,
        email VARCHAR(255) NOT NULL,
        descricao TEXT NOT NULL,
        site VARCHAR(255)
    );
    ```

4.  **Configure as Variáveis de Ambiente:**
    - Crie um arquivo chamado `.env` na raiz do projeto.
    - Adicione a sua string de conexão do PostgreSQL a este arquivo.

    **Exemplo de arquivo `.env`:**
    ```env
    # Substitua com suas credenciais do PostgreSQL
    DATABASE_URL=postgresql://SEU_USUARIO:SUA_SENHA@SEU_HOST:SUA_PORTA/NOME_DO_BANCO
    ```
    *Exemplo prático:* `DATABASE_URL=postgresql://postgres:docker@localhost:5432/restaurantes_db`

## 🚀 Executando a Aplicação

1.  **Inicie o servidor:**
    ```bash
    node server.js
    ```
    O servidor estará rodando em `http://localhost:3000`.

2.  **Acesse a interface:**
    - Abra seu navegador e acesse: `http://localhost:3000`

## Endpoints da API

| Método | Rota                  | Descrição                               |
| :----- | :-------------------- | :---------------------------------------- |
| `GET`    | `/api/restaurantes`     | Lista todos os restaurantes.            |
| `GET`    | `/api/restaurantes/:id` | Busca um restaurante pelo ID.           |
| `POST`   | `/api/restaurantes`     | Cria um novo restaurante.               |
| `PUT`    | `/api/restaurantes/:id` | Atualiza um restaurante existente.      |
| `DELETE` | `/api/restaurantes/:id` | Deleta um restaurante.                  |

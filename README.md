# 📋 Task Manager API

Uma API REST para gerenciamento de tarefas desenvolvida com Node.js, Express e Prisma, focada em boas práticas de autenticação, validação de dados e segurança.

## 🚀 Tecnologias Utilizadas

* Node.js
* Express.js
* Prisma ORM
* SQLite
* JWT (JSON Web Token)
* Zod
* Bcrypt
* Express Rate Limit

---

## 📚 Funcionalidades

### 👤 Autenticação

* Cadastro de usuários
* Login com JWT
* Senhas criptografadas com Bcrypt
* Rotas protegidas por autenticação

### ✅ Gerenciamento de Tarefas

* Criar tarefas
* Listar tarefas
* Atualizar tarefas
* Remover tarefas
* Listagem apenas das tarefas do usuário autenticado

### 🔍 Paginação

A listagem de tarefas possui suporte a paginação através dos parâmetros:

```http
GET /tasks?page=1&limit=10
```

Retornando:

```json
{
  "data": [],
  "page": 1,
  "limit": 10,
  "total": 25,
  "totalPages": 3
}
```

### 🛡️ Validação de Dados

Utilização do Zod para validações

### ⚠️ Tratamento Global de Erros

A aplicação possui um middleware global para captura e tratamento centralizado de erros.

Exemplo:

```json
{
  "error": "Task não encontrada"
}
```

### 🚦 Rate Limiting

Proteção contra abuso de requisições utilizando Express Rate Limit.

Exemplo:

```json
{
  "error": "Muitas requisições. Tente novamente mais tarde."
}
```


---

## 🔑 Endpoints

### Autenticação

| Método | Endpoint       | Descrição           |
| ------ | -------------- | ------------------- |
| POST   | /auth/register | Cadastro de usuário |
| POST   | /auth/login    | Login               |

### Tarefas

| Método | Endpoint   | Descrição        |
| ------ | ---------- | ---------------- |
| GET    | /tasks     | Listar tarefas   |
| POST   | /tasks     | Criar tarefa     |
| PUT    | /tasks/:id | Atualizar tarefa |
| DELETE | /tasks/:id | Remover tarefa   |

---

## ⚙️ Instalação

### 1. Clonar o projeto

```bash
git clone https://github.com/seu-usuario/task-manager.git
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env`:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua-chave-secreta"
```

### 4. Executar as migrations

```bash
npx prisma migrate dev
```

### 5. Iniciar o servidor

```bash
npm run dev
```

Servidor disponível em:

```text
http://localhost:3000
```

---

## 📖 Exemplo de Login

### Requisição

```http
POST /auth/login
```

```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

### Resposta

```json
{
  "token": "jwt-token"
}
```

---

## 🎯 Conceitos Aplicados

* REST API
* CRUD
* Middleware
* Autenticação JWT
* Hash de senha
* ORM com Prisma
* Validação com Zod
* Paginação
* Rate Limiting
* Tratamento Global de Erros
* Organização em camadas
* Boas práticas de segurança

---

## 📄 Licença

Este projeto foi desenvolvido para fins de estudo e demonstração de conhecimentos em desenvolvimento backend com Node.js.

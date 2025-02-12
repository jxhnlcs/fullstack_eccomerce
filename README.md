# 🛒 TechStore - Sistema de Gerenciamento de Produtos

🚀 **TechStore** é um sistema completo para gerenciamento de produtos em uma loja virtual. Desenvolvido como parte de um trabalho acadêmico, o projeto utiliza **Spring Boot**, **Angular** e **Firebase** para criar uma aplicação web funcional, segura e escalável.

---

## 📌 **Descrição do Projeto**
O sistema permite que administradores da loja virtual realizem operações **CRUD** (Create, Read, Update, Delete) nos produtos disponíveis para venda. Com isso, é possível **cadastrar novos produtos, editar informações, visualizar listagens e excluir produtos** do catálogo.

Além disso, a aplicação utiliza **Firebase** para armazenamento de dados e autenticação, garantindo maior segurança e facilidade na gestão de usuários e produtos.

---

# 🔑 Configuração do Firebase no Render

- Para garantir que a API funcione corretamente com o Firebase, foi configurada a variável de ambiente FIREBASE_CREDENTIALS no Render. Agora, a aplicação pode ler as credenciais tanto da variável de ambiente (em produção) quanto do arquivo local (serviceAccountKey.json) durante o desenvolvimento.

## 🎯 **Objetivos do Projeto**
- ✅ Desenvolver uma **API REST** em **Spring Boot** para gerenciar os produtos da loja.
- ✅ Criar um **front-end moderno e responsivo** em **Angular**.
- ✅ Utilizar **Firebase Firestore** para armazenamento dos produtos.
- ✅ Implementar **Firebase Authentication** para gerenciar usuários.

## 📖 Como Rodar o Projeto Localmente

Clone o repositório:
```
git clone https://github.com/jxhnlcs/fullstack_eccomerce.git
```

- Coloque o arquivo serviceAccountKey.json que você irá gerar no seu projeto do firebase no diretorio **backend/src/main/resources/** (para desenvolvimento):

Execute o backend:

```
cd backend
mvn clean install
mvn spring-boot:run
```

Execute o frontend:

```
cd frontend
npm install
ng serve
```

- Agora, a aplicação estará rodando em http://localhost:4200 e a API em http://localhost:8080!

## 🛠 **Tecnologias Utilizadas**
### **🚀 Back-end (API)**
- **Java + Spring Boot** (Framework para API REST)
- **Spring Data JPA** (Gerenciamento de banco de dados)
- **Firebase Firestore** (Banco de dados NoSQL)
- **Firebase Authentication** (Autenticação de usuários)

### **💻 Front-end**
- **Angular** (Framework para SPAs)
- **Tailwind CSS** (Estilização moderna e responsiva)
---

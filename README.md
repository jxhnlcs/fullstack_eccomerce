# 🛒 TechStore - Sistema de Gerenciamento de Produtos

🚀 **TechStore** é um sistema completo para gerenciamento de produtos em uma loja virtual. Desenvolvido como parte de um trabalho acadêmico, o projeto utiliza **Spring Boot**, **React** e **Firebase** para criar uma aplicação web funcional, segura e escalável.

---

## 📌 **Descrição do Projeto**
O sistema permite que administradores da loja virtual realizem operações **CRUD** (Create, Read, Update, Delete) nos produtos disponíveis para venda. Com isso, é possível **cadastrar novos produtos, editar informações, visualizar listagens e excluir produtos** do catálogo.

Além disso, a aplicação utiliza **Firebase** para armazenamento de dados e autenticação, garantindo maior segurança e facilidade na gestão de usuários e produtos.

---

# 🔑 Configuração do Firebase no Render

- Para garantir que a API funcione corretamente com o Firebase, foi configurada a variável de ambiente FIREBASE_CREDENTIALS no Render. Agora, a aplicação pode ler as credenciais tanto da variável de ambiente (em produção) quanto do arquivo local (serviceAccountKey.json) durante o desenvolvimento.

## 🎯 **Objetivos do Projeto**
- ✅ Desenvolver uma **API REST** em **Spring Boot** para gerenciar os produtos da loja.
- ✅ Criar um **front-end moderno e responsivo** em **React**.
- ✅ Utilizar **Firebase Firestore** para armazenamento dos produtos.
- ✅ Implementar **Firebase Authentication** para gerenciar usuários.

---

# ⚙️ Pré-requisitos para Rodar o Projeto Localmente

Antes de rodar o projeto, certifique-se de ter os seguintes pré-requisitos instalados:

## 🔹 Backend (Spring Boot)
1. Java JDK 17 - Necessário para compilar e executar a aplicação Spring Boot.

[Download do JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)

Verifique a instalação com:
```
java -version
```
2. Maven - Para gerenciar dependências e compilar o projeto.

[Instalar Maven](https://maven.apache.org/install.html)

Verifique a instalação com:

```
mvn -version
```

3. Docker (Opcional, caso queira rodar via container)

[Baixar Docker](https://github.com/jxhnlcs/DockerLesson)

Verifique a instalação com:

```
docker --version
```

## 🔹 Frontend (React)

Node.js e NPM - Necessário para rodar o React.

[Baixar Node.js](https://nodejs.org/)

Verifique a instalação com:

```
node -v
npm -v
```

## 🔹 Firebase

1. Criar um Projeto no Firebase

2. Acesse Firebase Console

3. Crie um novo projeto.

4. Vá para Configurações do Projeto > Contas de Serviço e gere uma chave JSON.

5. Salve este arquivo como backend/src/main/resources/serviceAccountKey.json para rodar localmente.

---

# 📖 Como Rodar o Projeto Localmente

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

Caso queira rodar o backend com Docker:

```
docker build -t techstore-api .
docker run -p 8080:8080 techstore-api
```

Execute o frontend:

```
cd frontend
npm install
npm run dev
```

- Agora, a aplicação estará rodando em http://localhost:4200 e a API em http://localhost:8080!

## 🛠 **Tecnologias Utilizadas**
### **🚀 Back-end (API)**
- **Java + Spring Boot** (Framework para API REST)
- **Spring Data JPA** (Gerenciamento de banco de dados)
- **Firebase Firestore** (Banco de dados NoSQL)
- **Firebase Authentication** (Autenticação de usuários)

### **💻 Front-end**
- **React** (Framework para Frontend)
- **Tailwind CSS** (Estilização moderna e responsiva)
---

# 🌍 Implantação em Produção

Atualmente, o projeto está sendo implantado utilizando:

1. Render para hospedar o backend com Docker.

2. Firebase para autenticação e banco de dados.

3. Vercel será utilizado para hospedar o frontend em breve.

A API foi configurada no Render utilizando o Dockerfile mencionado acima, garantindo um ambiente estável e escalável. O frontend será implantado na Vercel, tornando o sistema completamente acessível online: https://eccomerce-blush.vercel.app

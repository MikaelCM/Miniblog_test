# Mini Blog

O Mini Blog é uma aplicação web desenvolvida com **React + TypeScript + Firebase**, onde usuários podem se cadastrar, autenticar e criar posts com imagens e tags.  
O projeto foi criado com foco em aprendizado e boas práticas no desenvolvimento front-end moderno.

---

## Funcionalidades

- Cadastro de usuários
- Login e logout
- Autenticação com Firebase
- Criação de posts
- Edição de posts
- Exclusão de posts
- Busca por tags
- Dashboard com posts do usuário
- Atualização em tempo real (Firestore)
- Proteção de rotas
- Upload de imagem via URL

---

## Tecnologias

- React
- TypeScript
- Vite
- React Router DOM
- Firebase Authentication
- Firebase Firestore
- CSS Modules

---

## Estrutura do Projeto

```txt
src/
├── components/
├── context/
├── firebase/
├── hooks/
├── pages/
├── types/
├── App.tsx
└── main.tsx
```
## Autenticação
A autenticação é feita utilizando o Firebase Authentication, permitindo:

- Criação de conta com e-mail e senha

- Login

- Logout

- Persistência de sessão

O estado do usuário é controlado com Context API.

## Posts
Cada post contém:

- title

- image (URL)

- body

- tagsArray

- uid

- createdBy

- createdAt

Os dados são armazenados no Firestore e sincronizados em tempo real.

## Busca
A busca por posts é feita através de tags, utilizando consultas do Firestore com:

where("tagsArray", "array-contains", search)

## Aprendizados
- Hooks personalizados

- Integração completa com Firebase

- Context API para estado global

- Boas práticas com useEffect

- Tipagem segura com TypeScript

- Firestore em tempo real

👨‍💻 Autor
Mikael Carvalho Mendes

📄 Licença
Este projeto está sob a licença MIT.

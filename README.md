## PredialX
 React and Node.js Web Application - Dev Test FindMe

## How to run:
_Backend_
```zsh
git clone https://github.com/DevLobato/PredialX.git
cd PredialX
cd backend
npm install
docker-compose up -d
npx prisma migrate dev Client
npx prisma migrate Collaborator
npx prisma migrate ServiceOrder
npm run dev
```

_Frontend_
```zsh
cd ..
cd frontend
npm install
npm start
```

# After all, we have:
* Docker container with [PostgreSQL](https://www.postgresql.org/) running at port 5432;
* Frontend with [React](https://pt-br.reactjs.org/) running at port 3000;
* Backend with [Nodejs](https://www.postgresql.org/) running at port 3030;

# Objectives:
* Complete CRUD - Client
* Complete CRUD - Collaborator
* Complete CRUD - ServiceOrder
* Login Page

# Technologies used:
* Nodejs & Express
* Docker & Docker-compose
* Insomnia 
* WSL2 - Ubuntu
* Reactjs
* Styled-Components

# Contact:
> [LinkedIn - Vinicius Lobato](https://www.linkedin.com/in/vinicius-sim%C3%B5es-lobato-045648171/)

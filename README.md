# curiouser-paradox

## Getting Started

On a machine with Docker installed, the idea is you can run `>docker compose up -d` in the root directory and moments later the app is running as a set of three containers.

Through routine development, the most helpful command I've found is `>docker compose down -v frontend backend && docker compose up -d frontend backend --build` which restarts everything except the database, which usually doesn't need to be touched.

|          | Local                            | Containerized               |
| -------- | -------------------------------- | --------------------------- |
| Frontend | <http://localhost:4200>          | <http://localhost:8080>     |
| Backend  | <http://localhost:3000/api>      | <http://localhost:3333/api> |
| Database | ~~<mongodb://127.0.0.1:27017/>~~ | <mongodb://mongo:27017/>    |

## Backend

(NestJS)

### Local

Use `>npm install` if necessary, then `>npm run start:dev` and access the Swagger interface at <http://localhost:3000/api>.

### Docker

Individually manage the `backend` container as follows: `>docker compose down -v backend` and `>docker compose up -d backend`. Access the containerized app at <http://localhost:8080>

## Database

MongoDB Database. Running locally on my Windows machine as a monolith for now.

## Frontend

(Angular)

### Local

Use `>npm install` if necessary, then `>npm run start` and access at <http://localhost:4200>.

### Docker

Individually manage the `frontend` container as follows: `>docker compose down -v frontend` and `>docker compose up -d frontend`. Access the containerized app at <http://localhost:8080>

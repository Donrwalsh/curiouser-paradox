# curiouser-paradox

This project contains all the different parts of the Curiouser Paradox website. There's the big 3:

|          | Description                             | Tech                                |
| -------- | --------------------------------------- | ----------------------------------- |
| Frontend | User-Facing Single-Page Web App         | [Angular](https://angular.io/)      |
| Backend  | Application Programming Interface (API) | [NestJS](https://nestjs.com/)       |
| Database | Persistent Data Store                   | [MongoDB](https://www.mongodb.com/) |

Which are supported by:

|                  | Description                          | Tech                                                                   |
| ---------------- | ------------------------------------ | ---------------------------------------------------------------------- |
| CI/CD            | Automatic Build/Test/Deploy pipeline | [GitHub Workflows](https://docs.github.com/en/actions/using-workflows) |
| Containerization | Application Portability              | [Docker](https://www.docker.com/)                                      |
| Hosting          | Application Delivery                 | [Raspberry Pi](https://www.raspberrypi.org/)                           |
|                  |

## Getting Started

If you're interested in running this project on your local device, then this section is for you.

This section will talk through the necessary considerations for standing up and running a local or containerized copy of each of the big 3 primary parts of this project. These three parts (Frontend, Backend and Database) combine together to create the entire website itself. If only a subset of them are running or any of them are misconfigured then the website will not work properly.

### Frontend

**Decision Point**: Are you planning on running the Frontend locally or in a container?

#### Local Setup

In order to run the Frontend locally, you'll need [NodeJS](https://nodejs.org/en/) installed on your system. I'm using `v18.15.0`. In addition, you're going to want the Node Package Manager or [npm](https://www.npmjs.com/) as well, and I'm using `v9.5.0`

With npm available you can now run two important commands:

- \>`npm install` _(This populates the `node_modules` folder based on the project's `package.json` file)_
- \>`npm run start` _(This runs the frontend application using `ng serve` which rebuilds on file changes)_

At this point you can visit the frontend application at <http://localhost:4200> but you'll be greeted with a minimal website and many console errors unless the Backend and Database are running as well.

The Frontend code needs to know where to find the Backend API, and it manages this by way of environment files. [environment.ts](frontend/src/environments/environment.ts) manages both this value as well as the location of the frontend app itself for the purpose of building hyperlinks. If you intend to run the Frontend on a port other than `4200` or the Backend API on a port other than `3000` then you'll want to make changes to this file.

#### Containerized Setup

In order to run the Frontend in a container, you'll need [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/). I'm using versions `24.0.6` and `2.23.0` respectively, but that shouldn't matter a whole lot.

- \>`docker compose up -d frontend --no-deps` _(Run the frontend application as a docker container)_
  - Note that `--no-deps` is only used here to illustrate how to work with the Frontend contianer alone. It depends on both of the other big 3 and doesn't make much sense outside of initial setup.

What happens in response to this command is dictated by the [docker compose file](compose.yaml) and the Frontend-specific [Dockerfile](frontend/Dockerfile). Now you can visit the frontend application at <http://localhost:8080> but you'll be greeted with a minimal website and many console errors unless the Backend and Database are running as well.

# Progress Marker, continue from here

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

## Server

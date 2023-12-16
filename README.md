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
| Hosting          | Application Delivery                 |  Debian (Ubuntu)                          |
|                  |

## Getting Started

If you're interested in running this project on your local device, then this section is for you.

This section will talk through the necessary considerations for standing up and running a local or containerized copy of each of the big 3 primary parts of this project. These three parts (Frontend, Backend and Database) combine together to create the entire website itself. If only a subset of them are running or any of them are misconfigured then the website will not work properly.

### Prerequisites

Each of the big 3 can be run locally or as a container. For development, I prefer running the Frontend and Backend locally with the database running as a container. (I actually use the dev-server's database, more on that later.)

If you intend to use a **Local Setup** for either the Frontend or the Backend, then you'll need [NodeJS](https://nodejs.org/en/) installed on your system. we're using `v18.15.0`. In addition, you're going to want the Node Package Manager or [npm](https://www.npmjs.com/) as well, and we're using `v9.5.0`

If you intend to use a **Containerized Setup** for any of the big 3, then you'll need [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/). We're using versions `24.0.6` and `2.23.0` respectively, but that shouldn't matter a whole lot.

### Frontend

#### Local Setup

With npm available on your system, you can run two important commands:

- \>`npm install` _(This populates the `node_modules` folder based on the project's `package.json` file)_
- \>`npm run start` _(This runs the frontend application using `ng serve` which rebuilds on file changes)_

At this point you can visit the frontend application at <http://localhost:4200> but you'll be greeted with a minimal website and many console errors unless the Backend and Database are running as well.

The Frontend code needs to know where to find the Backend API, and it manages this by way of environment files. [environment.ts](frontend/src/environments/environment.ts) manages both this value as well as the location of the frontend app itself for the purpose of building hyperlinks. If you intend to run the Frontend on a port other than `4200` or the Backend API on a port other than `3000` then you'll want to make changes to this file.

#### Containerized Setup

With Docker and Docker Compose available on your system, you can fire up the containerized Frontend via:

- \>`docker compose up -d frontend --no-deps`
  - Note that `--no-deps` is only used here to illustrate how to work with the Frontend container alone. It depends on both of the other big 3 and doesn't make much sense outside of initial setup.

What happens in response to this command is dictated by the [docker compose file](compose.yaml) and the Frontend-specific [Dockerfile](frontend/Dockerfile). Now you can visit the frontend application at <http://localhost:8080> but you'll be greeted with a minimal website and many console errors unless the Backend and Database are running as well.

### Backend

The Backend application uses a `.env` file to manage environment variables. Some of those variables (specifically the `CONNECTION_STRING` variable) are critical to the operation of the backend. The `.env` file itself is .gitignore'd so you'll want to make a copy of it following the template described by the `.env.sample` file that is held in SCM.

This step is required for both Local and Containerized Setups.

#### Local Setup

After you've setup the `.env` file and on a system that has npm available you can now run the Backend project via:

- \>`npm install` _(This populates the `node_modules` folder based on the project's `package.json` file)_
- \>`npm run start:dev` _(This runs the backend application using `nest start --watch` which rebuilds on file changes)_

At this point you can visit the backend's Swagger interface at <http://localhost:3000/api>, being sure to replace `3000` with whatever `PORT` you specified in the `.env` file you created. Furthermore, if the database connection is failing, the Swagger interface won't load. Look to the console output for details as to what might have gone wrong.

#### Containerized Setup

After you've setup the `.env` file and on a system that has Docker and Docker Compose available you can now run the Backend project via:

- \>`docker compose up -d backend --no-deps`
  - Note that `--no-deps` is only used here once again to illustrate how to work with the Backend contianer alone. Omitting this flag will result in the Database container being ran as well.

What happens in response to this command is dictated by the [docker compose file](compose.yaml) and the Backend-specific [Dockerfile](backend/Dockerfile). Now you can visit the backend's Swagger interface at <http://localhost:3000/api>, being sure to replace `3000` with whatever `PORT` you specified in the `.env` file you created. Furthermore, if the database connection is failing, the Swagger interface won't load. Look to the console output for details as to what might have gone wrong.

### Database

#### Local Setup

I no longer personally run the database locally, so I don't have a lot of guidance to give here. Overall, the details won't differ a whole lot from the containerized setup, as long as you can establish the Backend to Database connection appropriately.

#### Containerized Setup

Running the database in a container is quite similar to running both the Frontend and Backend in containers:

- \>`docker compose up -d database`

The first time you run the database image, it will not contain any data. The contents of the [database/data](database/data) folder are a representation of decent starter data that you'll want to populate your database with.

The [docker compose file](compose.yaml) is configured to maintain a copy of the database's contents within the device that is running the container within the [database/docker-data](database/docker-data) folder. This data is used to rehydrate the database every time it is run, and so you can safely bring down and stand up the database image without data being discarded.

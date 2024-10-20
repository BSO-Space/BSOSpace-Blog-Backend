# BSOSpace Blog Backend

This project provides the backend for the BSOSpace blog using [Elysia.js](https://github.com/elysiajs) as the web framework, PostgreSQL for the database, Redis for caching, and Prisma as the ORM. Docker Compose is used to orchestrate the services in both development and production environments.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Setup Instructions

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/BSO-Space/BSOSpace-Blog-Backend.git
cd BSOSpace-Blog-Backend
```

### 2. Create Environment Files

You need to create `.env` files for both development and production environments.

- For development:
  ```bash
  cp .env.example .env.dev
  ```
- For production:
  ```bash
  cp .env.example .env.prod
  ```

### 3. Configure Environment Variables

Update the `.env.dev` and `.env.prod` files with the appropriate values:

- PostgreSQL settings (`PG_USER`, `PG_PASSWORD`, `PG_DATABASE`, `PG_PORT`)
- Redis settings (`REDIS_PORT`)
- PgAdmin settings (`PGADMIN_EMAIL`, `PGADMIN_PASSWORD`, `PGADMIN_PORT`)
- Backend ports (`DEV_BACKEND_PORT`, `PROD_BACKEND_PORT`)

Here's an example of a `.env.dev` file:

```env
# PostgreSQL Configuration
PG_USER=dev_pg_user
PG_PASSWORD=dev_pg_password
PG_DATABASE=dev_database
PG_PORT=5432

# Redis Configuration
REDIS_PORT=6379

# PgAdmin Configuration
PGADMIN_EMAIL=admin@dev.com
PGADMIN_PASSWORD=admin123
PGADMIN_PORT=5050

# Backend Development Port
DEV_BACKEND_PORT=3000

# Prisma Database URL
DATABASE_URL=postgresql://dev_pg_user:dev_pg_password@postgres:${PG_PORT}/dev_database
```

### 4. Running the Application

#### Development Mode

To start the application in development mode:

```bash
docker-compose --env-file .env.dev up
```

This will:

- Start the development version of the Elysia.js backend
- Launch PostgreSQL, Redis, and PgAdmin services
- Expose the backend on the port specified in `DEV_BACKEND_PORT`

#### Production Mode

To run the application in production mode:

```bash
docker-compose --env-file .env.prod up
```

This will:

- Start the production version of the Elysia.js backend
- Launch PostgreSQL, Redis, and PgAdmin services
- Expose the backend on the port specified in `PROD_BACKEND_PORT`

### 5. Accessing the Services

- **Backend**:
  - Development: `http://localhost:<DEV_BACKEND_PORT>`
  - Production: `http://localhost:<PROD_BACKEND_PORT>`
- **PgAdmin**:
  - Access it at `http://localhost:<PGADMIN_PORT>` using the credentials set in the `.env` file

### 6. Database Management with Prisma

Prisma is used to manage the PostgreSQL database. Use the following commands to run migrations and open Prisma Studio.

#### Run Migrations

To apply database migrations:

- For development:
  ```bash
  docker-compose run backend-dev npx prisma migrate dev
  ```
- For production:
  ```bash
  docker-compose run backend-prod npx prisma migrate deploy
  ```

#### Prisma Studio

Prisma Studio is a graphical interface for managing your database:

```bash
docker-compose run backend-dev npx prisma studio
```

### 7. Stopping the Services

To stop the running services, use the following command:

```bash
docker-compose down
```

### 8. Data Persistence

This setup uses Docker volumes for persistent storage of both PostgreSQL and Redis data, meaning that data will be retained even after stopping or restarting the containers.

## Troubleshooting

- Make sure you have correctly set up the `.env` files and filled in the necessary variables.
- Ensure Docker and Docker Compose are properly installed and running.
- If there are port conflicts, update the relevant port numbers in the `.env` files.

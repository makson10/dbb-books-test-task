[newline]

# DBB Books — Library Management (NestJS + React)

A compact, developer-focused README for the DBB Books test task repository. This project contains a NestJS backend and a React + Vite frontend for managing books, authors, publishers, genres and borrow operations.

## Key points

- Backend: NestJS + TypeORM + PostgreSQL
- Frontend: React + TypeScript + Vite (RTK Query for API)
- Docker-first setup for easy local development

## Quick start (recommended — Docker)

1. From repo root, start everything with Docker Compose:

```bash
git clone https://github.com/makson10/dbb-books-test-task.git
docker-compose up --build
```

2. Open:

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- API docs (Swagger): http://localhost:4000/api

Tip: to bring services down and remove volumes (reset DB):

```bash
cd backend
docker-compose down -v
cd ..
docker-compose up -d
```

## Local development (without Docker)

Backend

```bash
cd backend
npm install
# ensure a PostgreSQL instance is available and .env is configured
npm run start:dev
```

Frontend

```bash
cd frontend
npm install
npm run dev

```

## Useful scripts

From `backend/`:

- npm run start:dev — start NestJS with hot reload
- npm run test — run backend unit tests

From `frontend/`:

- npm run dev — start Vite dev server
- npm run rtk-codegen — regenerate API types from backend OpenAPI

## API surface (high level)

Main endpoints (example):

- GET /books — list books (pagination + sorting)
- GET /books/:id — book details
- GET /books/:id/history — borrow history
- POST /borrow — create borrow record
- POST /return — return a book
- GET /authors, POST /authors
- GET /publishers, POST /publishers
- GET /genres, POST /genres

For full API reference use the Swagger UI at `/api` on the running backend.

## Generate frontend types from OpenAPI

If you change the backend API schema, regenerate types used by RTK Query:

```bash
cd frontend
npm run rtk-codegen
```

This updates generated API typings under `frontend/src/stores/api`.

## Tests

- Backend unit tests: `cd backend && npm run test`
- Frontend tests: uses Vitest testing config (refer to `frontend/vitest.config.ts`)

## Project layout

- backend/ — NestJS API (src/, Dockerfile, docker-compose.yaml)
- frontend/ — React + Vite app (src/, Dockerfile, docker-compose.yaml)
- docker-compose.yaml — root compose to run everything together

## Database schema

### Schema

- Book: id, title, isbn (unique), publishDate — relations: authors, genres, publisher, borrow records
- Author: id, firstName, lastName — relations: books
- Publisher: id, name (unique) — relations: books
- Genre: id, name (unique) — relations: books
- User: id, email (unique), passwordHash, role — relations: borrow records
- BorrowRecord: id, userId, bookId, borrowDate, dueDate, returnDate, status
  Relations (brief)

### Relations

- Book ↔ Author — many-to-many (join table, e.g. book_authors). Books can have many authors; authors can have many books.
- Book ↔ Genre — many-to-many (join table, e.g. book_genres). Books can belong to many genres; genres contain many books.
- Book → Publisher — many-to-one. Each book has one publisher; a publisher has many books.
- Book → BorrowRecord — one-to-many. A book can have many borrow records (history).
- User → BorrowRecord — one-to-many. A user can have many borrow records.
- BorrowRecord → Book and BorrowRecord → User — many-to-one FKs to books and users. Fields include borrowDate, dueDate, returnDate, status.

## Deliverables Checklist

1.Backend REST endpoints (above) &#10004; <br />
2.DTO validations (ISBN, dates, uniqueness, limits) &#10004; <br />
3.DB schema with relations (diagram or README description) &#10004; <br />
4.Tests (unit / e2e) &#10004; <br />
5.Swagger or Postman collection &#10004; <br />
6.Front-end SPA (React or Vue) with pages listed &#10004; <br />
7.README: run steps for API & UI, decisions made &#10004; <br />
8.(Bonus) Auth & RBAC &#10004; <br />
9.(Bonus) GraphQL layer <br />
10.(Bonus) Docker & CI &#10004; <br />

## Decisions

### DB

PostgreSQL is the best choice for this project because it ensures reliable relational integrity, supports powerful indexing and complex queries, and integrates seamlessly with TypeORM/NestJS and Docker. I didn't choose NoSQL due to using relationships in the project's database schema, and PostgreSQL is the most popular and well-supported solution for this needs.

### Expose ENV

Environment variables exposed in order to provide to simplify testing and let reviewers run the project quickly. Override defaults with `backend/.env`, `frontend/.env`, or CI/shell envs. These values are for local testing only; use `.env.sample` and keep `*.env` in `.gitignore` for production.

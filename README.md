# DBB Books Library Management System

A modern full-stack library management system built with NestJS and React that allows users to browse books, view detailed information, and manage book borrowing operations.

## 📚 Features

- **Book Management**: Browse books with pagination and sorting
- **Book Details**: View comprehensive book information including authors, publishers, and genres
- **Borrow System**: Request and track book borrowing
- **History Tracking**: View borrowing history for each book
- **Responsive Design**: Modern UI built with Tailwind CSS
- **API Documentation**: Interactive Swagger/OpenAPI documentation

## 🛠 Technology Stack

### Backend

- **NestJS** - Progressive Node.js framework
- **TypeORM** - Object-Relational Mapping
- **PostgreSQL** - Primary database
- **Swagger/OpenAPI** - API documentation
- **Class Validator** - Data validation
- **Faker.js** - Test data generation

### Frontend

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Redux Toolkit Query** - State management and API calls
- **React Router** - Client-side routing
- **React Hook Form + Yup** - Form handling and validation
- **Tailwind CSS** - Utility-first CSS framework

### DevOps

- **Docker & Docker Compose** - Containerization
- **PostgreSQL** - Database container

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Docker** and **Docker Compose**
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/makson10/dbb-books-test-task.git
cd dbb-books-test-task
```

### 2. Environment Setup

The project includes example environment files for easier testing:

**Backend Environment** (`.env` in `/backend`):

```bash
SERVER_PORT=4000
POSTGRES_PORT=5432
POSTGRES_HOST="db"
POSTGRES_DB="postgres"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="dbb_test_task"
```

**Frontend Environment** (`.env` in `/frontend`):

```bash
PORT=3000
VITE_SERVER_BASE_URL="http://127.0.0.1:4000"
```

### 3. Using Docker (Recommended)

#### Start the complete application:

```bash
# From the root directory
docker-compose up
```

This will start:

- PostgreSQL database on port 5432
- Backend API on port 4000
- Frontend on port 3000

#### Or start services individually:

```bash
# Start backend with database
cd backend
docker-compose up

# Start frontend (in a new terminal)
cd frontend
docker-compose up
```

### 4. Manual Setup (Alternative)

#### Backend Setup:

```bash
cd backend
npm install
# Make sure PostgreSQL is running locally or update .env
npm run start:dev
```

#### Frontend Setup:

```bash
cd frontend
npm install
npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **API Documentation**: http://localhost:4000/api

## 📖 API Documentation

The API documentation is automatically generated using Swagger/OpenAPI and is available at:

```
http://localhost:4000/api
```

### Key API Endpoints

#### Books

- `GET /books` - Get all books with pagination and sorting
- `GET /books/count` - Get total book count
- `GET /books/:id` - Get book details
- `GET /books/:id/history` - Get book borrowing history
- `POST /books` - Create a new book (generates fake data)

#### Authors

- `GET /authors` - Get all authors
- `GET /authors/:id/books` - Get books by author
- `POST /authors` - Create a new author

#### Publishers

- `GET /publishers` - Get all publishers
- `POST /publishers` - Create a new publisher

#### Genres

- `GET /genres` - Get all genres
- `POST /genres` - Create a new genre

#### Borrow Operations

- `POST /borrow` - Borrow a book
- `GET /borrow` - Get borrow records
- `POST /return` - Return a borrowed book

## 🏗 Project Structure

```
dbb-books-test-task/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── common/         # Shared entities and utilities
│   │   │   └── entities/   # TypeORM entities
│   │   ├── modules/        # Feature modules
│   │   │   ├── books/
│   │   │   ├── authors/
│   │   │   ├── publishers/
│   │   │   ├── genres/
│   │   │   ├── borrow/
│   │   │   └── users/
│   │   ├── app.module.ts   # Main application module
│   │   └── main.ts        # Application entry point
│   ├── docker-compose.yaml
│   └── package.json
├── frontend/               # React application
│   ├── src/
│   │   ├── assets/        # Routes and validation schemas
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   │   ├── booksList/     # Books listing page
│   │   │   ├── bookDetail/    # Book details page
│   │   │   └── borrowPage/    # Book borrowing form
│   │   ├── stores/        # Redux store and API
│   │   │   └── api/       # RTK Query API definitions
│   │   ├── styles/        # CSS styles
│   │   ├── types/         # TypeScript type definitions
│   │   └── main.tsx       # Application entry point
│   ├── docker-compose.yaml
│   └── package.json
└── docker-compose.yaml     # Root compose file
```

## Generate API types from OpenAPI

The frontend uses RTK Query with auto-generated types from the backend OpenAPI schema:

```bash
cd frontend
npm run rtk-codegen
```

This will update `/src/stores/api/baseApi.ts` with the latest API definitions.

## 🎯 Usage

### Browsing Books

1. Visit the homepage to see the books list
2. Use pagination controls to navigate through pages
3. Sort books by different criteria
4. Click on a book title to view detailed information

### Borrowing Books

1. From the books list, click "Borrow" on available books
2. Fill out the borrowing form with your name and book title
3. Submit the form to complete the borrowing process

### Viewing Book Details

1. Click on any book title to view detailed information
2. See book metadata (ISBN, publish date, authors, etc.)
3. View the borrowing history for that book

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm run test              # Unit tests
```

### Frontend Tests

The frontend uses Vite's testing capabilities. Tests can be added using your preferred testing framework.

## 🔒 Environment Variables

### Backend (.env)

- `SERVER_PORT`: Backend server port (default: 4000)
- `POSTGRES_HOST`: PostgreSQL host (default: "db" for Docker)
- `POSTGRES_PORT`: PostgreSQL port (default: 5432)
- `POSTGRES_DB`: Database name
- `POSTGRES_USER`: Database username
- `POSTGRES_PASSWORD`: Database password

### Frontend (.env)

- `PORT`: Frontend development server port (default: 3000)
- `VITE_SERVER_BASE_URL`: Backend API base URL

## 🐳 Docker Information

### Individual Services

Each service has its own Dockerfile and docker-compose.yaml:

- **Backend**: Includes PostgreSQL database
- **Frontend**: Standalone React application

### Development with Docker

Use Docker Compose watch mode for development:

```bash
# Backend with hot reload
cd backend
docker-compose up --watch

# Frontend (if applicable)
cd frontend
docker-compose up
```

### Database Reset

To reset the database:

```bash
cd backend
docker-compose down -v  # Remove volumes
docker-compose up       # Restart with fresh database
```

### Logs

View application logs:

```bash
# Backend logs
cd backend
docker-compose logs -f

# Frontend logs
cd frontend
docker-compose logs -f
```

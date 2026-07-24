# TeamFlow

A full-stack project management application inspired by Jira and Trello.

## Features

### Authentication
- User registration
- User login with JWT
- Protected routes

### Workspaces
- Create workspaces
- View workspace details
- Workspace members
- Workspace invitations

### Projects
- Create projects
- View projects

### Boards
- Create boards
- View boards

### Tasks
- Create tasks
- Update tasks
- Delete tasks
- View tasks

### Comments
- Create comments
- View comments

### Labels
- Create labels
- View labels

## Tech Stack

### Backend
- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Swagger
- Class Validator

### Frontend
- Angular
- TypeScript
- SCSS

## API Documentation

After starting the backend, Swagger documentation is available at:

```
http://localhost:3000/api
```

## Installation

### Clone repository

```bash
git clone https://github.com/nigina-kh/teamflow.git
```

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/teamflow"

JWT_SECRET="your_jwt_secret"

JWT_REFRESH_SECRET="your_refresh_secret"

PORT=3000
```

Run database migrations:

```bash
npx prisma migrate dev
```

Start backend:

```bash
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## License

MIT
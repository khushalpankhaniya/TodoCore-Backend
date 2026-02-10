## ATask – Todo Backend

## Tech stack

- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose
- **Auth**: JWT (jsonwebtoken)
- **Security**: bcrypt, cors, morgan, express-rate-limit

## Setup instructions

### 1. Run the project locally

```bash
cd backend
npm install
npm run dev
```

### 2. Environment variables

Create a `.env` file inside the `backend` folder with:

```env
MONGODB_URI=
JWT_SECRET=
```

## Authentication flow (high level)

1. **Register**
   - Client sends `name`, `email`, `password` to `POST /api/users/register`.
   - Password is **hashed with bcrypt** and saved in MongoDB.
2. **Login**
   - Client sends `email`, `password` to `POST /api/users/login`.
   - Password is checked against the stored hash.
   - On success, server returns a **JWT token**.
3. **Using protected routes**
   - Client sends the token in the header:  
     `Authorization: Bearer <token>`.
   - Middleware verifies the token with `JWT_SECRET` and attaches `userId` to `req`.
   - Todo routes use `req.userId` to ensure only the owner can manage their todos.

## API endpoints (brief)

### Auth routes (`/api/users`)

- **POST `/api/users/register`**
  - Description: Register a new user.
  - Body: `{ "name": string, "email": string, "password": string }`

- **POST `/api/users/login`**
  - Description: Log in and receive a JWT token.
  - Body: `{ "email": string, "password": string }`
  - Response: user data + `token`.

### Todo routes (`/api/todos`) – require JWT in `Authorization: Bearer <token>`

- **GET `/api/todos/get`**
  - Description: Get all todos for the authenticated user (or all, depending on implementation).

- **GET `/api/todos/get/:id`**
  - Description: Get a single todo by its id (must belong to the authenticated user).

- **POST `/api/todos/create`**
  - Description: Create a new todo.
  - Body: `{ "title": string, "description": string, "completed": boolean }`

- **PUT `/api/todos/update/:id`**
  - Description: Update an existing todo.
  - Body: `{ "title": string, "description": string, "completed": boolean }`

- **DELETE `/api/todos/delete/:id`**
  - Description: Delete a todo owned by the authenticated user.

## Assumptions & design decisions

- **Single backend only**: This repo currently focuses on the backend; any frontend is separate.
- **Per-user todos**: Todos are conceptually tied to a logged-in user via `userId`.
- **Stateless auth**: Server does not store sessions; JWTs carry identity.
- **Simple error handling**: API returns JSON with a `message` field for common error cases.
- **Local development first**: Defaults (MongoDB URL, port `3000`) are optimized for running on a local machine.
- **Basic security**: Rate limiting and CORS are enabled, but this is not a hardened production setup.


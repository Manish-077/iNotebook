# iNotebook Backend API

This is the backend API for the iNotebook application built with Node.js, Express.js, and MongoDB.

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## 🔐 Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret_key
PORT=5000
```

## 📋 API Endpoints

### Authentication Routes (`/api/auth`)

#### POST `/api/auth/createuser`
Create a new user account
- **Body**: `{ name, email, password }`
- **Response**: `{ success: true, authtoken }`

#### POST `/api/auth/login`
Login user
- **Body**: `{ email, password }`
- **Response**: `{ success: true, authtoken }`

#### GET `/api/auth/getuser`
Get user details (Protected)
- **Headers**: `auth-token: your_jwt_token`
- **Response**: `{ success: true, user }`

### Notes Routes (`/api/notes`)

#### GET `/api/notes/fetchallnotes`
Get all notes for authenticated user
- **Headers**: `auth-token: your_jwt_token`
- **Response**: Array of notes

#### POST `/api/notes/addnote`
Create a new note
- **Headers**: `auth-token: your_jwt_token`
- **Body**: `{ title, description, tag }`
- **Response**: Created note object

#### PUT `/api/notes/updatenote/:id`
Update an existing note
- **Headers**: `auth-token: your_jwt_token`
- **Params**: `id` - Note ID
- **Body**: `{ title?, description?, tag? }`
- **Response**: Updated note object

#### DELETE `/api/notes/deletenote/:id`
Delete a note
- **Headers**: `auth-token: your_jwt_token`
- **Params**: `id` - Note ID
- **Response**: `{ Success: "Note has been Deleted", note }`

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env` file

3. Start the server:
   ```bash
   npm start
   ```

The server will start on `http://localhost:5000`

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for secure cross-origin requests
- **Environment Variables**: Sensitive data stored securely

## 📁 Project Structure

```
backend/
├── middleware/
│   └── fetchuser.js          # JWT authentication middleware
├── models/
│   ├── User.js              # User schema
│   └── Notes.js             # Notes schema
├── routes/
│   ├── auth.js              # Authentication routes
│   └── notes.js             # Notes CRUD routes
├── config.js                # Configuration file
├── db.js                    # Database connection
├── index.js                 # Main server file
└── package.json
```

## 🛡️ Security Best Practices Implemented

- Environment variables for sensitive data
- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- CORS configuration
- Error handling without exposing sensitive information

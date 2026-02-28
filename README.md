<img width="3819" height="1902" alt="image" src="https://github.com/user-attachments/assets/63028fb0-ff74-44db-b43e-f2316bc202bb" /># BookQuote

A full-stack quote management application built with ASP.NET Core 9 and Angular. Users can log in, manage books and quotes, and favorite items locally — all backed by a SQLite database and secured with JWT authentication.

---

## Tech Stack

<img width="3819" height="1902" alt="image" src="https://github.com/user-attachments/assets/13a41466-82ab-496a-a9d8-e8bd1af6bc7c" />

| Layer | Technology |
|---|---|
| Backend | ASP.NET Core 9, EF Core 9, SQLite |
| Authentication | JWT Bearer, BCrypt |
| API Docs | Swagger / OpenAPI |
| Frontend | Angular (standalone components) |
| Styling | Bootstrap 5, FontAwesome |
| Language | C# / TypeScript |

---

## Project Structure

```
/
├── BookQuoteApi/       # ASP.NET Core REST API
└── BookQuoteUI/        # Angular SPA
```

---

## Getting Started

### Prerequisites

- [.NET SDK 9](https://dotnet.microsoft.com/download)
- [Node.js & npm](https://nodejs.org/)
- Angular CLI (`npm install -g @angular/cli`)

### Running the API

```bash
cd BookQuoteApi
dotnet run
```

The API will start and automatically apply database migrations, creating `bookquote.db` if it doesn't exist. Swagger UI is available at `/swagger`.

### Running the Frontend

```bash
cd BookQuoteUI
npm install
npm run build   # or: ng serve for development
```

---

## Features

### Authentication
- Register and log in with a username and password
- Passwords are hashed with BCrypt
- JWT token is stored in `localStorage` and attached to all API requests

### Books
- Create, read, update, and delete books
- Archive a book instead of permanently deleting it
- Archived books are hidden from lists and cannot be selected for quotes

### Quotes
- Quotes belong to a book (`bookId: 0` means no book assigned)
- Full CRUD support with archive logging on deletion
- The first five seeded quotes are protected — they cannot be deleted from either the UI or the API
- Favorite up to five quotes per user (stored in `localStorage`)

### Archive Log
- Every archived book or quote creates an `ArchiveLog` entry
- Reviewable via `GET /api/archive` with optional filters

---

## Configuration

API settings (JWT secret, connection string, logging) are managed via `appsettings.json` and `appsettings.{Environment}.json`. The API reads a `PORT` environment variable for deployment platforms like Railway.

For frontend deployments, `netlify.toml` is included for static hosting.

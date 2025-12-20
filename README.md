# Express.js Scalable Template

> A production-ready, scalable Express.js template designed for high-performance Node.js applications. Features a layered architecture, PostgreSQL with Sequelize, JWT authentication, and a robust utility suite for searching, sorting, and pagination.

**Author:** [Jahan Zaib](https://github.com/personal-jahanzaib) | [LinkedIn](https://www.linkedin.com/in/jahanzaib-developer/)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/express-5.x-green)](https://expressjs.com/)

---

## 📑 Table of Contents

1. [Introduction](#-introduction)
2. [Tech Stack](#-tech-stack)
3. [Architecture & Design](#-architecture--design)
4. [Utility Suite](#-utility-suite)
5. [Reference Implementation (Product API)](#-reference-implementation-product-api)
6. [Authentication Example](#-authentication-example)
7. [Getting Started](#-getting-started)
8. [Import Aliases](#-import-aliases)
9. [Development Workflow](#-development-workflow)
10. [NPM Scripts](#-npm-scripts)
11. [License](#-license)

---

## 🚀 Introduction

This repository is more than just a boilerplate; it's a **Scalable Architectural Foundation**. It is designed to solve the common "messy codebase" problem in Express.js by enforcing a strict layered architecture and providing out-of-the-box utilities for complex database operations.

### **Core Philosophy**
- **Clean Architecture**: Separation of Controllers (HTTP), Services (Logic), and Models (Data).
- **Convention Over Configuration**: Pre-configured linting, security, and logging.
- **Developer Speed**: Native support for dot-notation sorting, multi-field filtering, and meta-data pagination.

---

## 🛠 Tech Stack

| Type | Technology |
| :--- | :--- |
| **Runtime** | Node.js (v18+) |
| **Framework** | Express.js 5.x |
| **Database** | PostgreSQL + Sequelize ORM |
| **Security** | JWT, Helmet, CORS, Rate-Limit |
| **Logging** | Winston + Morgan |
| **Quality** | ESLint (Airbnb) + Nodemon |

---

## 🏗 Architecture & Design

### **Layered Workflow**
1. **Routes**: Define endpoints and apply `authMiddleware` where needed.
2. **Controllers**: Handle Request/Response and use `AsyncUtil` for global error catching.
3. **Services**: Contain business logic and interact with the database.
4. **Models**: Define data structure and relationships (using a shared `BaseModel`).

### **Centralized Exports**
The project uses a sub-path import system to avoid "relative path hell". Instead of `../../../`, use clean aliases:
```javascript
import { ProductService } from '#services';
import { ResponseUtil } from '#utils';
```

---

## 🛠 Utility Suite

### **1. SequelizeUtil (The Powerhouse)**
Standardizes the most complex parts of any API:
- **`getSortOptions`**: Supports top-level and nested sorting (e.g., `?sortBy=category.name`).
- **`getFilterOptions`**: Dynamic `where` clause builder with support for:
    - `iLike` search across multiple fields (e.g., Name OR SKU).
    - Range filters (e.g., `minPrice` / `maxPrice`).
    - Exact matches and boolean casting.
- **`getPaginationOptions`**: Automatically calculates `limit` and `offset`.
- **`formatPaginatedResponse`**: Returns structured metadata (`totalPages`, `hasNextPage`, etc.).

### **2. AsyncUtil**
Provides a global `asyncHandler` that eliminates the need for repetitive `try-catch` blocks in controllers.

### **3. ResponseUtil**
Ensures all API responses follow a consistent JSON structure:
```json
{
  "success": true,
  "data": { ... },
  "message": "Success message"
}
```

---

## 📦 Reference Implementation (Product API)

The `Product API` serves as a blueprint for adding new features. It demonstrates:
- **Nested Includes**: Pulling `category.name` into the top-level response.
- **Dynamic Queries**: Passing `req.query` directly into `SequelizeUtil` for instant searching and sorting.
- **Aliasing**: Using SQL aliasing to flatten JSON responses for the frontend.

**Example Usage:**
`GET /api/v1/products/all?search=Modern&sortBy=price&sortOrder=ASC&page=1&limit=10`

---

## 🔐 Authentication Example

Authentication is pre-integrated using `AuthService` and `JWTUtil`.

### **How to Use Auth & Utils Together:**
In the `AuthController`, we combine multiple utilities for a professional flow:
1. **`PasswordUtil`**: To securely hash and verify passwords.
2. **`JWTUtil`**: To generate Access and Refresh tokens.
3. **`ResponseUtil`**: To send a standardized login result.

```javascript
// Example: Creating a token in AuthService
const token = JWTUtil.createAccessToken({ id: user.id, email: user.email });
return ResponseUtil.success(res, { token });
```

---

## 🏁 Getting Started

### **1. Setup**
```bash
git clone https://github.com/personal-jahanzaib/express-scalable-template
npm install
cp .env.example .env
```

### **2. Environment Aliases**
The template automatically detects your environment (Local, Dev, Production) based on the `NODE_ENV` and maps your variables via `env.js`.

### **3. Run**
```bash
npm run dev
```
*Note: The dev script automatically runs ESLint auto-fixes before every restart!*

---

## 🔗 Import Aliases

| Alias | Target Folder |
| :--- | :--- |
| `#env` | `env.js` |
| `#models` | `src/models/` |
| `#services` | `src/services/` |
| `#controllers` | `src/controllers/` |
| `#utils` | `src/utils/` |
| `#configs` | `src/configurations/` |

---

## 💻 Development Workflow

1. **Add Model**: Create in `src/models`, extend `BaseModel`.
2. **Add Service**: Create in `src/services`, use `SequelizeUtil` for queries.
3. **Add Controller**: Create in `src/controllers`, wrap methods in `AsyncUtil.asyncHandler`.
4. **Register Route**: Add to `src/routes` and export via `src/exports/routes.js`.

---

## 📜 NPM Scripts

### **Development Scripts**

| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `nodemon` | Start dev server with auto-restart and auto-lint-fix |
| `start` | `node app.js` | Start production server |
| `lint` | `eslint .` | Check for linting errors |
| `lint:fix` | `eslint . --fix` | Auto-fix linting errors |

### **Database Scripts**

| Script | Command | Description |
| :--- | :--- | :--- |
| `db:migrate` | `npx sequelize-cli db:migrate` | Run all pending migrations |
| `db:migrate:undo` | `npx sequelize-cli db:migrate:undo` | Rollback last migration |
| `db:seed` | `npx sequelize-cli db:seed:all` | Run all seeders |
| `db:seed:undo` | `npx sequelize-cli db:seed:undo:all` | Undo all seeders |

---

## 📄 License

This project is licensed under the MIT License.

---
<div align="center">
  <strong>Built for developers who care about scalability.</strong>
</div>

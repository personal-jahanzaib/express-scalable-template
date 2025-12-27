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
5. [Environment Configuration](#-environment-configuration)
6. [Import Aliases](#-import-aliases)
7. [Development Workflow](#-development-workflow)
8. [NPM Scripts](#-npm-scripts)
9. [Cross-OS Compatibility](#-cross-os-compatibility)
10. [Reference Implementation (Product API)](#-reference-implementation-product-api)
11. [License](#-license)

---

## 🚀 Introduction

This repository is more than just a boilerplate; it's a **Scalable Architectural Foundation**. It is designed to solve the common "messy codebase" problem in Express.js by enforcing a strict layered architecture and providing out-of-the-box utilities for complex database operations.

### **Core Philosophy**
- **Clean Architecture**: Separation of Controllers (HTTP), Services (Logic), and Models (Data).
- **Convention Over Configuration**: Pre-configured linting, security, and logging.
- **Developer Speed**: Native support for dot-notation sorting, multi-field filtering, and meta-data pagination.
- **Strict Typing**: Custom type validation script to prevent common JS pitfalls.

---

## 🛠 Tech Stack

| Type | Technology |
| :--- | :--- |
| **Runtime** | Node.js (v18+) |
| **Framework** | Express.js 5.x |
| **Database** | PostgreSQL + Sequelize ORM |
| **Security** | JWT, Helmet, CORS, Rate-Limit |
| **Logging** | Winston + Morgan |
| **Quality** | ESLint (Airbnb) + Custom Type Validator |
| **Tooling** | Nodemon, VS Code Tasks |

---

## 🏗 Architecture & Design

### **Layered Workflow**
1. **Routes**: Define endpoints in `src/routes` and export via `src/exports/routes.js`.
2. **Controllers**: Handle Request/Response and use `AsyncUtil` for global error catching.
3. **Services**: Contain business logic and interact with the database.
4. **Models**: Define data structure in `src/models`, using a shared `BaseModel` and `associations.js` for relationships.

### **Centralized Exports (Aggregator Pattern)**
The project uses centralized export files in `src/exports/` to provide a clean, unified API for internal components. This avoids "relative path hell" and makes imports much cleaner.

Example:
```javascript
import { ProductService, AuthService } from '#services';
import { ResponseUtil, JWTUtil } from '#utils';
```

---

## 🛠 Utility Suite

### **1. SequelizeUtil**
Standardizes the most complex parts of any API:
- **`getSortOptions`**: Supports top-level and nested sorting (e.g., `?sortBy=category.name`).
- **`getFilterOptions`**: Dynamic `where` clause builder (iLike search, ranges, exact matches).
- **`getPaginationOptions`**: Automatically calculates `limit` and `offset`.
- **`formatPaginatedResponse`**: Returns structured metadata (`totalPages`, `hasNextPage`, etc.).

### **2. AsyncUtil**
Provides a global `asyncHandler` that eliminates the need for repetitive `try-catch` blocks in controllers.

### **3. ResponseUtil & ErrorUtil**
Ensures all API responses and errors follow a consistent JSON structure.

---

## 🌍 Environment Configuration

The template uses a sophisticated environment-based configuration in `env.js`. Variables are automatically mapped based on your `NODE_ENV`.

### **Smart Variable Mapping**
Depending on your `NODE_ENV` (local, development, staging, production), `env.js` will look for specific suffixes in your `.env` file:

- `DB_LOCAL_HOST`, `DB_DEV_HOST`, `DB_PROD_HOST`
- `CLIENT_URL_LOCAL`, `CLIENT_URL_DEV`, etc.

This allows you to maintain one `.env` file for all environments without name collisions.

---

## 🔗 Import Aliases

| Alias | Target | Description |
| :--- | :--- | :--- |
| `#env` | `env.js` | Environment configuration |
| `#utils` | `src/exports/utils.js` | Utility functions & Loggers |
| `#server` | `src/server/server.js` | Express server instance |
| `#routes` | `src/exports/routes.js` | API Route definitions |
| `#models` | `src/exports/models.js` | Sequelize models |
| `#services` | `src/exports/services.js`| Business logic layers |
| `#controllers`| `src/exports/controller.js`| HTTP request handlers |
| `#middlewares`| `src/exports/middlewares.js`| Express middlewares |
| `#configs` | `src/exports/configurations.js`| System configurations |
| `#constants` | `src/exports/constants.js` | Global constants |
| `#schemas` | `src/exports/schemas.js` | Joi/Zod schemas |
| `#syncRoutes` | `src/routes/syncRoutes.js`| Route registration logic |

---

## 💻 Development Workflow

1. **Add Model**: Create in `src/models`, extend `BaseModel`, register in `associations.js`.
2. **Add Service**: Create in `src/services`, export via `src/exports/services.js`.
3. **Add Controller**: Create in `src/controllers`, export via `src/exports/controller.js`.
4. **Register Route**: Add to `src/routes`, export via `src/exports/routes.js`.

---

## 📜 NPM Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| **`dev`** | `nodemon` | Start dev server with auto-lint-fix & type validation |
| **`start`** | `node app.js` | Start production server |
| **`lint`** | `eslint .` | Check for linting errors |
| **`lint:fix`** | `eslint . --fix` | Auto-fix linting errors |
| **`validate:types`**| `node scripts/validate-types.js` | Run custom static type validation |
| `db:migrate` | `npx sequelize-cli db:migrate` | Run migrations |
| `db:seed` | `npx sequelize-cli db:seed:all` | Run seeders |

---

## 💻 Cross-OS Compatibility

The project is designed to be fully compatible with **Windows, macOS, and Linux**.

- **Startup Script**: Uses a portable Node.js script (`scripts/start-dev.js`) to handle dependency checks and platform-specific commands.
- **VS Code Integration**: The `Express Startup` task is pre-configured to work across all operating systems. 
- **Auto-Start**: In **VS Code**, the project is configured to **automatically start** the development server as soon as you open the folder (via `runOn: folderOpen`).

---

## 📦 Reference Implementation (Product API)

The `Product API` serves as a blueprint for adding new features. It demonstrates:
- **Nested Includes**: Pulling `category.name` into the top-level response.
- **Dynamic Queries**: Passing `req.query` directly into `SequelizeUtil` for instant searching and sorting.

**Example Usage:**
`GET /api/v1/products/all?search=Modern&sortBy=price&sortOrder=ASC&page=1&limit=10`

---

## 📄 License

This project is licensed under the MIT License.

---
<div align="center">
  <strong>Built for developers who care about scalability.</strong>
</div>

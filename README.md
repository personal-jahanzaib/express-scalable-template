# Express.js Scalable Template

> A production-ready, scalable Express.js template with PostgreSQL, JWT authentication, and ESLint. Features environment-based configuration, centralized exports, real-time linting, and modern ES6+ best practices.

**Author:** [Jahan Zaib](https://github.com/personal-jahanzaib) | [LinkedIn](https://www.linkedin.com/in/jahanzaib-developer/)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/express-5.2.1-green)](https://expressjs.com/)

---

## 📑 Table of Contents

1. [Features](#-features)
2. [Tech Stack](#-tech-stack)
3. [Project Structure](#-project-structure)
4. [Getting Started](#-getting-started)
5. [Environment Configuration](#-environment-configuration)
6. [Import Aliases](#-import-aliases)
7. [Code Quality](#-code-quality)
8. [Development Workflow](#-development-workflow)
9. [NPM Scripts](#-npm-scripts)
10. [ESLint Rules](#-eslint-rules)
11. [VS Code Settings](#-vs-code-settings-optional)
12. [Contributing](#-contributing)
13. [License](#-license)

---

## ✨ Features

### **Core Features**

- ✅ **Express.js 5.x** - Modern web framework
- ✅ **PostgreSQL + Sequelize** - Robust ORM for database operations
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Environment-Based Config** - Automatic environment variable selection
- ✅ **Import Aliases** - Clean `#` prefix imports (e.g., `#routes`, `#controllers`)

### **Code Quality**

- ✅ **ESLint** - Strict linting with Airbnb base config
- ✅ **Real-Time Linting** - Instant feedback on file save via nodemon
- ✅ **Import Restrictions** - Enforced `#` alias usage, no direct file imports

### **Developer Experience**

- ✅ **Nodemon** - Auto-restart server on file changes
- ✅ **Fast Feedback** - ESLint runs before each restart
- ✅ **Clean Terminal** - No annoying popups or separate windows
- ✅ **Type Safety** - Prevents string + number coercion
- ✅ **Modern ES6+** - Template literals, const/let, arrow functions

---

## 🛠 Tech Stack

### **Production Dependencies**

| Package            | Version | Purpose               |
| ------------------ | ------- | --------------------- |
| `express`          | 5.2.1   | Web framework         |
| `sequelize`        | 6.37.7  | PostgreSQL ORM        |
| `pg` + `pg-hstore` | 8.16.3  | PostgreSQL client     |
| `jsonwebtoken`     | 9.0.3   | JWT authentication    |
| `dotenv`           | 17.2.3  | Environment variables |

### **Development Dependencies**

| Package   | Version | Purpose      |
| --------- | ------- | ------------ |
| `eslint`  | 8.57.1  | Code linting |
| `nodemon` | 3.1.11  | Auto-restart |

---

## 📁 Project Structure

```
express-scalable-template/
├── src/
│   ├── app/                    # Application logic
│   ├── exports/                # Centralized exports
│   │   ├── routes.js          # All routes exported here
│   │   ├── controller.js      # All controllers exported here
│   │   └── services.js        # All services exported here
│   └── server/
│       └── server.js          # Express server instance
├── app.js                     # Entry point
├── env.js                     # Environment configuration
├── .env                       # Environment variables (gitignored)
├── .env.example               # Template for team
├── .eslintrc.json             # ESLint configuration

├── nodemon.json               # Nodemon configuration
├── package.json               # Dependencies and scripts
├── LICENSE                    # MIT License
└── README.md                  # This file
```

---

## 🚀 Getting Started

### **Prerequisites**

- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL >= 14.0

### **Installation**

1. **Clone the repository**

    ```bash
    git clone https://github.com/personal-jahanzaib/express-scalable-template.git
    cd express-scalable-template
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**

    ```bash
    cp .env.example .env
    # Edit .env with your configuration
    ```

4. **Start development server**

    ```bash
    npm run dev
    ```

    The server will start on `http://localhost:8080` (or your configured PORT).

---

## 🌍 Environment Configuration

### **Environment Variables**

The template uses a smart environment-based configuration system in `env.js` that automatically selects the right variables based on `NODE_ENV`.

#### **Available Environments**

- `local` - Local development
- `development` - Development server
- `staging` - Staging server
- `production` - Production server

#### **Configuration Structure**

```javascript
import config from "#env";

// Server configuration
config.server.port; // Auto-selected based on NODE_ENV
config.server.environment; // Current environment

// Database configuration (auto-selected)
config.database.host; // DB_LOCAL_HOST, DB_DEV_HOST, etc.
config.database.port;
config.database.name;
config.database.user;
config.database.password;

// JWT configuration
config.jwt.secret;
config.jwt.expiresIn;
config.jwt.refreshExpiresIn;

// Client URL (auto-selected)
config.client.url; // CLIENT_URL_LOCAL, CLIENT_URL_DEV, etc.

// CORS (auto-selected)
config.cors.origin; // Array of allowed origins

// API configuration
config.api.version;
config.api.prefix;
config.api.rateLimit.maxRequests;
config.api.rateLimit.windowMinutes;

// Email configuration
config.email.host;
config.email.port;
config.email.user;
config.email.password;
```

#### **Example `.env` File**

```env
# Environment
NODE_ENV=local

# Server
PORT=8080

# Database - Local
DB_LOCAL_HOST=localhost
DB_LOCAL_PORT=5432
DB_LOCAL_NAME=myapp_local
DB_LOCAL_USER=postgres
DB_LOCAL_PASSWORD=your_password

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d

# Client URL
CLIENT_URL_LOCAL=http://localhost:3001

# CORS
CORS_ORIGIN_LOCAL=http://localhost:3001,http://localhost:3000

# API
API_VERSION=v1
API_PREFIX=api
```

---

## 🔗 Import Aliases

The template uses Node.js subpath imports for clean, maintainable code.

### **Available Aliases**

| Alias          | Path                          | Purpose                   |
| -------------- | ----------------------------- | ------------------------- |
| `#env`         | `./env.js`                    | Environment configuration |
| `#server`      | `./src/server/server.js`      | Express server instance   |
| `#routes`      | `./src/exports/routes.js`     | All routes                |
| `#controllers` | `./src/exports/controller.js` | All controllers           |
| `#services`    | `./src/exports/services.js`   | All services              |

### **Usage Example**

```javascript
// ✅ CORRECT - Using # aliases
import config from "#env";
import server from "#server";
import { userRoutes } from "#routes";
import { userController } from "#controllers";

// ❌ WRONG - Direct file imports (ESLint will error)
import config from "./env.js";
import server from "./src/server/server.js";
```

### **Why Use Aliases?**

1. **Cleaner imports** - No more `../../../` hell
2. **Enforced architecture** - All imports go through exports folder
3. **Easier refactoring** - Move files without breaking imports
4. **Better maintainability** - Clear dependency structure

---

## 🎯 Code Quality

### **Real-Time Linting**

When you run `npm run dev`, nodemon automatically:

1. Watches for file changes
2. Runs ESLint on all files
3. Shows errors in the terminal
4. Only starts server if no errors

**Example Output:**

```bash
🔍 Checking code quality...

/path/to/file.js
  5:5  error  Unexpected var, use let or const instead  no-var
  8:12 error  Use template literals instead of string concatenation  prefer-template

✖ 2 problems (2 errors, 0 warnings)
```

### **Strict Rules Enforced**

- ❌ No `var` - Only `const`/`let`
- ❌ No string concatenation - Template literals only
- ❌ No `==` - Use `===` instead
- ❌ No implicit type coercion - Prevents `"5" + 3`
- ❌ No direct file imports - Use `#` aliases only
- ✅ Prefer `const` over `let`
- ✅ CamelCase naming convention
- ✅ No unused variables

---

## 💻 Development Workflow

### **1. Start Development Server**

```bash
npm run dev
```

- Starts nodemon
- Watches for file changes
- Runs ESLint before each restart
- Auto-restarts server on save

### **2. Make Code Changes**

- Edit your files
- Save
- ESLint runs automatically
- See errors instantly in terminal
- Server restarts if no errors

### **3. Fix Linting Errors**

```bash
npm run lint:fix
```

Auto-fixes ESLint errors where possible.

### **4. Commit Changes**

```bash
git add .
git commit -m "Your message"
```

---

## 📜 NPM Scripts

| Script    | Command          | Description                                            |
| --------- | ---------------- | ------------------------------------------------------ |
| `dev`     | `nodemon app.js` | Start development server with auto-restart and linting |
| `start`   | `node app.js`    | Start production server                                |
| `lint`    | `eslint .`       | Check for linting errors                               |
| `lint:fix`| `eslint . --fix` | Auto-fix linting errors                                |

---

## 🔧 ESLint Rules

### **Strict Rules (Errors)**

#### **No `var` keyword**

```javascript
// ❌ Error
var x = 1;

// ✅ Correct
const x = 1;
let y = 2;
```

#### **Template literals only**

```javascript
// ❌ Error
const message = "Hello " + name;

// ✅ Correct
const message = `Hello ${name}`;
```

#### **No implicit type coercion**

```javascript
// ❌ Error
const result = "5" + 3; // "53"

// ✅ Correct
const result = Number("5") + 3; // 8
```

#### **Strict equality**

```javascript
// ❌ Error
if (x == 5) {
}

// ✅ Correct
if (x === 5) {
}
```

#### **Enforce # alias imports**

```javascript
// ❌ Error
import { something } from "./src/routes/user.js";
import { another } from "../controllers/auth.js";

// ✅ Correct
import { something } from "#routes";
import { another } from "#controllers";
```

### **Best Practices**

- Prefer `const` over `let`
- No unused variables (prefix with `_` to allow)
- Require `await` in async functions
- No nested ternaries
- CamelCase naming
- No magic numbers (use named constants)
- Consistent return statements
- No empty functions

---



## 🆚 VS Code Settings (Optional)

To prevent VS Code from auto-updating import paths when you move files, add these settings to your workspace `.vscode/settings.json`:

```json
{
    "javascript.updateImportsOnFileMove.enabled": "never",
    "typescript.updateImportsOnFileMove.enabled": "never",
    "javascript.preferences.importModuleSpecifier": "non-relative",
    "typescript.preferences.importModuleSpecifier": "non-relative"
}
```

**Note:** The `.vscode` folder is gitignored, so each developer needs to add these settings manually.

---

## ⭐ Support This Project

If you find this template helpful, please consider giving it a star on GitHub!

Your support helps others discover this project and motivates continued development.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Express.js](https://expressjs.com/) - Fast, unopinionated web framework
- [Sequelize](https://sequelize.org/) - Promise-based ORM
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) - ESLint config


---

<div align="center">
  <strong>Built with ❤️ for scalable Node.js applications</strong>
</div>

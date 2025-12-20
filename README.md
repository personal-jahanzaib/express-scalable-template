# Express.js Scalable Template

> A production-ready, scalable Express.js template with PostgreSQL, JWT authentication, Winston logging, and comprehensive utility classes. Features environment-based configuration, centralized exports, auto-linting, and modern ES6+ best practices.

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
7. [Logging System](#-logging-system)
8. [Utility Classes](#-utility-classes)
9. [Middleware](#-middleware)
10. [Code Quality](#-code-quality)
11. [Development Workflow](#-development-workflow)
12. [NPM Scripts](#-npm-scripts)
13. [ESLint Rules](#-eslint-rules)
14. [VS Code Settings](#-vs-code-settings-optional)
15. [License](#-license)

---

## ✨ Features

### **Core Features**

- ✅ **Express.js 5.x** - Modern web framework
- ✅ **PostgreSQL + Sequelize** - Robust ORM for database operations
- ✅ **JWT Authentication** - Secure token-based authentication with utility class
- ✅ **Product & Category Models** - Full commerce-ready model structure with associations
- ✅ **Environment-Based Config** - Automatic environment variable selection
- ✅ **Import Aliases** - Clean `#` prefix imports (e.g., `#routes`, `#utils`)
- ✅ **Auto .env Validation** - Automatic check for .env file on startup

### **Logging System**

- ✅ **Winston Logger** - Category-based logging (controller, database, service, etc.)
- ✅ **Morgan Request Logger** - HTTP request logging (local environment only)
- ✅ **Dual File Transports** - Main log + category-specific log files
- ✅ **Custom Log Levels** - Error, warn, success, info, debug
- ✅ **Readable Timestamps** - DD-MM-YYYY hh:mm:ss format

### **Utility Classes**

- ✅ **AsyncUtil** - Async error handling wrapper
- ✅ **DateTimeUtil** - Date/time formatting utilities
- ✅ **ErrorUtil** - Standardized error throwing
- ✅ **JWTUtil** - JWT token generation and verification
- ✅ **PasswordUtil** - Password hashing and verification
- ✅ **ResponseUtil** - Standardized API responses
- ✅ **Seeder Tracking** - Automatic tracking of executed seeders via `SequelizeData`

### **Code Quality**

- ✅ **ESLint** - Strict linting with Airbnb base config
- ✅ **Auto-Fix on Restart** - ESLint auto-fixes issues on every nodemon restart
- ✅ **Import Restrictions** - Enforced `#` alias usage, no direct file imports

### **Developer Experience**

- ✅ **Nodemon** - Auto-restart server on file changes
- ✅ **Fast Feedback** - ESLint runs and auto-fixes before each restart
- ✅ **Clean Terminal** - Streamlined output
- ✅ **Type Safety** - Prevents string + number coercion
- ✅ **Modern ES6+** - Template literals, const/let, arrow functions

---

## 🛠 Tech Stack

### **Production Dependencies**

| Package            | Version | Purpose                      |
| ------------------ | ------- | ---------------------------- |
| `express`          | 5.2.1   | Web framework                |
| `sequelize`        | 6.37.7  | PostgreSQL ORM               |
| `pg` + `pg-hstore` | 8.16.3  | PostgreSQL client            |
| `jsonwebtoken`     | 9.0.3   | JWT authentication           |
| `dotenv`           | 17.2.3  | Environment variables        |
| `winston`          | 3.19.0  | Application logging          |
| `morgan`           | 1.10.1  | HTTP request logging         |
| `helmet`           | 8.1.0   | Security headers             |
| `cors`             | 2.8.5   | Cross-Origin Resource Sharing |
| `express-rate-limit` | 8.2.1 | Rate limiting/DoS protection |
| `compression`      | 1.8.1   | Response body compression     |

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
│   ├── constants/              # Application constants
│   │   └── httpResponse.js    # HTTP status codes and messages
│   ├── exports/                # Centralized exports
│   │   ├── configurations.js  # Configuration exports
│   │   ├── constants.js       # Constants exports
│   │   ├── controller.js      # Controllers exports
│   │   ├── middlewares.js     # Middlewares exports
│   │   ├── models.js          # Models exports
│   │   ├── routes.js          # Routes exports
│   │   ├── schemas.js         # Schemas exports
│   │   ├── services.js        # Services exports
│   │   └── utils.js           # Utilities exports
│   ├── middlewares/            # Express middlewares
│   │   └── requestLogger.js   # HTTP request logger (Morgan)
│   ├── server/
│   │   └── server.js          # Express server instance
│   └── utils/                  # Utility classes
│       ├── AsyncUtil.js       # Async error handling
│       ├── DateTimeUtil.js    # Date/time formatting
│       ├── ErrorUtil.js       # Error throwing utility
│       ├── JWTUtil.js         # JWT operations
│       ├── PasswordUtil.js    # Password hashing
│       ├── ResponseUtil.js    # API response formatting
│       └── logger.js          # Winston logger
├── logs/                       # Log files (auto-generated)
│   ├── main.log               # All logs
│   ├── controller.log         # Controller logs
│   ├── database.log           # Database logs
│   └── ...                    # Other category logs
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

    **Note:** The application will automatically check for `.env` file on startup and exit with an error if not found.

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

- `local` - Local development (default)
- `development` - Development server
- `staging` - Staging server
- `production` - Production server

#### **Auto .env Validation**

The application automatically validates the existence of `.env` file on startup:

```
❌ ERROR: .env file not found!
Expected location: D:\your-project\.env
Please create a .env file with the required environment variables.
```

#### **Configuration Structure**

```javascript
import config from "#env";

// Server configuration
config.server.port;
config.server.environment;

// Database configuration (auto-selected)
config.database.host;
config.database.port;
config.database.name;
config.database.user;
config.database.password;

// JWT configuration
config.jwt.secret;
config.jwt.expiresIn;
config.jwt.refreshExpiresIn;

// Client URL (auto-selected)
config.client.url;

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

---

## 🔗 Import Aliases

The template uses Node.js subpath imports for clean, maintainable code.

### **Available Aliases**

| Alias           | Path                          | Purpose                   |
| --------------- | ----------------------------- | ------------------------- |
| `#env`          | `./env.js`                    | Environment configuration |
| `#server`       | `./src/server/server.js`      | Express server instance   |
| `#routes`       | `./src/exports/routes.js`     | All routes                |
| `#controllers`  | `./src/exports/controller.js` | All controllers           |
| `#services`     | `./src/exports/services.js`   | All services              |
| `#models`       | `./src/exports/models.js`     | All models                |
| `#utils`        | `./src/exports/utils.js`      | All utilities             |
| `#middlewares`  | `./src/exports/middlewares.js`| All middlewares           |
| `#schemas`      | `./src/exports/schemas.js`    | All schemas               |
| `#constants`    | `./src/exports/constants.js`  | All constants             |
| `#configs`      | `./src/exports/configurations.js` | All configurations    |

### **Usage Example**

```javascript
// ✅ CORRECT - Using # aliases
import config from "#env";
import server from "#server";
import { userRoutes } from "#routes";
import { userController } from "#controllers";
import { controllerLogger, databaseLogger } from "#utils";
import { requestLogger } from "#middlewares";

// ❌ WRONG - Direct file imports (ESLint will error)
import config from "./env.js";
import server from "./src/server/server.js";
```

---

## 📝 Logging System

### **Winston Logger**

Category-based logging system with dual file transports.

#### **Available Loggers**

```javascript
import {
  controllerLogger,
  databaseLogger,
  serviceLogger,
  middlewareLogger,
  routeLogger,
  utilLogger,
} from "#utils";
```

#### **Log Levels**

- `error` - Error messages
- `warn` - Warning messages
- `success` - Success messages (custom level)
- `info` - Informational messages
- `debug` - Debug messages

#### **Usage Example**

```javascript
import { controllerLogger, databaseLogger } from "#utils";

// Success logs
controllerLogger.success("User created successfully");

// Error logs
databaseLogger.error("Connection failed");

// Info logs
serviceLogger.info("Service started");

// Warning logs
middlewareLogger.warn("Rate limit approaching");

// Debug logs
utilLogger.debug("Utility function called");
```

#### **Log Files**

All logs are written to the `logs/` directory:

- `main.log` - All logs from all categories
- `controller.log` - Controller-specific logs
- `database.log` - Database-specific logs
- `service.log` - Service-specific logs
- `middleware.log` - Middleware-specific logs
- `route.log` - Route-specific logs
- `util.log` - Utility-specific logs

#### **Log Format**

```
[20-12-2025 05:17:27] [CONTROLLER] SUCCESS: User created successfully
[20-12-2025 05:17:27] [DATABASE] ERROR: Connection timeout
```

---

## 🛠 Utility Classes

### **AsyncUtil**

Wraps async functions to catch errors automatically.

```javascript
import { AsyncUtil } from "#utils";

const asyncHandler = AsyncUtil.asyncHandler(async (req, res, next) => {
  const users = await User.findAll();
  res.json(users);
});
```

### **DateTimeUtil**

Date and time formatting utilities.

```javascript
import { DateTimeUtil } from "#utils";

DateTimeUtil.getCurrentDate(); // "2025-12-20"
DateTimeUtil.getCurrentTime(); // "17:30:45"
DateTimeUtil.getCurrentDateTime(); // "2025-12-20 17:30:45"
```

### **ErrorUtil**

Standardized error throwing.

```javascript
import { ErrorUtil } from "#utils";

ErrorUtil.throwError("User not found", 404);
```

### **JWTUtil**

JWT token operations.

```javascript
import { JWTUtil } from "#utils";

// Generate token
const token = JWTUtil.generateToken({ userId: 123 });

// Verify token
const decoded = JWTUtil.verifyToken(token);
```

### **PasswordUtil**

Password hashing and verification.

```javascript
import { PasswordUtil } from "#utils";

// Hash password
const hashedPassword = await PasswordUtil.hashPassword("myPassword123");

// Verify password
const isValid = await PasswordUtil.verifyPassword("myPassword123", hashedPassword);
```

### **ResponseUtil**

Standardized API responses.

```javascript
import { ResponseUtil } from "#utils";

// Success response
ResponseUtil.success(res, data, "User created successfully", 201);

// Error response
ResponseUtil.error(res, "User not found", 404);

// Validation error
ResponseUtil.validationError(res, errors);
```

---

## 🔒 Middleware

### **Request Logger**

HTTP request logging using Morgan (only in local environment).

```javascript
server.use(requestLogger);
```

### **Security & Performance Middlewares**

The template includes a pre-configured stack of security and performance middlewares in `server.js`:

1.  **Helmet** - Sets various security headers
2.  **CORS** - Custom middleware with environment-based origin filtering
3.  **Rate Limiting** - Protects against brute-force and DoS attacks (100 req/15 min)
4.  **Compression** - Gzip compression for response bodies
```

**Output:**
```
GET / 200 15.234 ms - 1234
POST /api/users 201 45.123 ms - 567
```

**Note:** Request logger only logs in `local` environment to avoid cluttering production logs.

---

## 🎯 Code Quality

### **Auto-Fix on Restart**

When you run `npm run dev`, nodemon automatically:

1. Watches for file changes
2. Runs `eslint . --fix` to auto-fix issues
3. Shows remaining errors in the terminal
4. Only starts server if no errors

**Example Output:**

```bash
🔍 Checking code quality...

/path/to/file.js
  5:5  error  Unexpected var, use let or const instead  no-var

✖ 1 problem (1 error, 0 warnings)
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
- Runs ESLint --fix before each restart
- Auto-restarts server on save

### **2. Make Code Changes**

- Edit your files
- Save
- ESLint auto-fixes issues
- See remaining errors in terminal
- Server restarts if no errors

### **3. Manual Lint Fix**

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

### **Development Scripts**

| Script     | Command          | Description                                     |
| ---------- | ---------------- | ----------------------------------------------- |
| `dev`      | `nodemon`        | Start dev server with auto-restart and auto-fix |
| `start`    | `node app.js`    | Start production server                         |
| `lint`     | `eslint .`       | Check for linting errors                        |
| `lint:fix` | `eslint . --fix` | Auto-fix linting errors                         |

### **Database Scripts**

| Script            | Command                          | Description                    |
| ----------------- | -------------------------------- | ------------------------------ |
| `db:migrate`      | `npx sequelize-cli db:migrate`   | Run all pending migrations     |
| `db:migrate:undo` | `npx sequelize-cli db:migrate:undo` | Rollback last migration     |
| `db:seed`         | `npx sequelize-cli db:seed:all`  | Run all seeders                |
| `db:seed:undo`    | `npx sequelize-cli db:seed:undo:all` | Undo all seeders          |

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
- [Winston](https://github.com/winstonjs/winston) - Versatile logging library
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) - ESLint config

---

<div align="center">
  <strong>Built with ❤️ for scalable Node.js applications</strong>
</div>

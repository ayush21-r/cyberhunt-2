# TechAlfa Cyber Hunt - Secure Mainframe API

This is the secure, production-grade backend API architecture foundation for the **TechAlfa Cyber Hunt** event. It is built using Node.js, Express.js, TypeScript, and features centralized configuration, security middlewares (Helmet & CORS), request loggers, API versioning (`/api/v1`), and custom error capture boundaries.

---

## Technical Specifications

- **Runtime**: Node.js v20+
- **Framework**: Express.js
- **Compiler**: TypeScript 5+ (Strict Local Bindings)
- **Security Middlewares**: Helmet (Header hardening) and CORS (Cross-Origin Resource Sharing)
- **Logging Engine**: Morgan-based console telemetry
- **Router Prefix**: `/api/v1`

---

## Repository Directories

```
backend/
├── dist/             # Compiled production bundles
├── src/
│   ├── config/       # Environment loading managers (config/index.ts)
│   ├── controllers/  # Controllers placeholders
│   ├── middleware/   # Request logger and custom error boundaries
│   ├── models/       # Database schemas placeholders
│   ├── routes/       # API endpoints (auth, user, team, announcement)
│   ├── services/     # Business logic layers placeholders
│   ├── types/        # TypeScript interfaces
│   ├── utils/        # Generic helper functions
│   ├── app.ts        # Express app initializer
│   └── server.ts     # Main server runtime entrypoint
├── .env.example      # Sample configurations template
├── tsconfig.json     # Strict TS compilation config
└── package.json      # Node execution scripts & dependencies
```

---

## Configuration Variables

Copy the sample configurations before launching the dev server:
```bash
cp .env.example .env
```

Defined Keys:
- `PORT`: Server port listener (defaults to `5000`).
- `NODE_ENV`: Runtime environments (`development`, `production`).
- `JWT_SECRET`: Secret token signature for JWT validations.
- `SUPABASE_URL`: Supabase server schema target URL.
- `SUPABASE_ANON_KEY`: Supabase public anon key.
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role secret key.

---

## Operational Commands

### 1. Installation
Install core node libraries and compiler types:
```bash
npm install
```

### 2. Development Execution
Launch the local server with active hot-reloads and diagnostics logging:
```bash
npm run dev
```

### 3. Production Compilation
Compile strict TypeScript files into the `dist/` production folder:
```bash
npm run build
```

### 4. Production Execution
Boot the compiled build:
```bash
npm start
```

---

## Core Routing Endpoints

### Health Diagnostics
- **`GET /api/v1/health`**: Returns system uptime metadata.
  ```json
  {
    "status": "OK",
    "project": "TechAlfa Cyber Hunt API",
    "version": "1.0.0",
    "timestamp": "2026-06-25T19:17:42.123Z"
  }
  ```

### Placeholder Route Gateways
Each endpoint returns `{ "success": true, "message": "Coming Soon" }` representing empty operational routes.

- **`POST /api/v1/auth/login`**: Authenticate agent credentials.
- **`POST /api/v1/auth/logout`**: Terminate active security links.
- **`GET /api/v1/users/profile`**: Retrieve authorized user metrics.
- **`GET /api/v1/users/leaderboard`**: Query global scoreboard rankings.
- **`GET /api/v1/teams/:id`**: Query details for specific team codes.
- **`POST /api/v1/teams/create`**: Register new team designators.
- **`GET /api/v1/announcements`**: Fetch global secure warning alerts.

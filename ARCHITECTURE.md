# QuickCart Architecture & Design Document

## 1. Architecture Overview
QuickCart is built using a modern **MERN stack (MongoDB, Express, React, Node.js)** with a separated frontend and backend architecture. It is designed to be highly modular, testable, and cloud-ready.

- **Frontend:** Built with React 19 and Vite. State management relies on React Context API (`AuthContext`), while routing is handled by `react-router-dom`. The UI is styled using Tailwind CSS and Radix UI primitives for accessible components.
- **Backend:** A RESTful API built with Express.js and Node.js. It connects to a MongoDB database (via Mongoose) and uses a Model-Route-Controller (MVC-like) pattern.
- **Database:** MongoDB (Atlas for production, local/Docker for dev/testing).
- **Authentication:** JWT-based stateless authentication using secure `httpOnly` cookies.

## 2. Design Decisions

### Monorepo Structure
The project uses a monorepo structure with distinct `/frontend`, `/backend`, and `/tests` directories.
- **Why?** It keeps the codebase unified for version control and CI/CD while physically separating concerns and package boundaries. The dedicated `/tests` directory holds integration and E2E tests to prevent polluting the application build artifacts.

### Idempotent Deployment & Scripts
All shell scripts (`run.sh`, `safe-ec2-control.sh`) are written to be idempotent (safe to run multiple times).
- **Why?** Shell scripts check the state before acting (e.g., comparing `package.json` timestamps before running `npm install`, or checking AWS instance state before issuing `start`). This prevents unnecessary network calls, reduces execution time, and allows deployment workflows to recover safely if interrupted.

### Three-Tier Testing Strategy
1. **Unit Tests (Fast):** Run locally within `/frontend` and `/backend`. Fully mock external dependencies (DB, APIs) for speed.
2. **Integration Tests (Medium):** Run in `/tests`. Use a real MongoDB connection (`supertest` for backend, Context providers for frontend) to verify the "glue" between components.
3. **E2E Tests (Slow):** Built with Playwright. Test real user flows in an automated browser against a fully running stack.

### Stateless JWT Authentication
We chose stateless JWT cookies over server-side sessions.
- **Why?** It reduces database load (no session lookups required per request), makes horizontal scaling easier (any server can verify the token), and using `httpOnly` cookies protects against XSS attacks.

## 3. Workflow & CI/CD Pipeline
Our GitHub Actions pipeline focuses on automation and resilience:
1. **Continuous Integration (`ci.yml`):** On every push, parallel jobs build constraints and run all tests for both frontend and backend.
2. **Linting Checks (`lint.yml`):** A dedicated PR gate enforcing code quality via ESLint before code can be merged into `main`.
3. **Automated Deployment (`deploy.yml`):** Triggers on push to main. It connects securely to an AWS EC2 instance, pulls the latest code, and runs the idempotent initialization scripts.
4. **Automated Maintenance (`dependabot.yml`):** Monitors 4 ecosystems (frontend, backend, github-actions, tests) and automatically raises PRs to keep dependencies secure and up-to-date.

## 4. Challenges Faced & Solutions

**Challenge: testing environment stability across operating systems.**
- *Issue:* Running tests locally on macOS caused `EPERM` permissions errors related to temporary folder creation by `vitest` and `jsdom`.
- *Solution:* Implemented a `TMPDIR=/tmp` override directly in the test scripts for cross-platform stability.

**Challenge: E2E test isolation and flakiness.**
- *Issue:* E2E tests often failed due to bad shared state between runs or database connection timeouts.
- *Solution:* Re-architected `e2e.yml` to spin up a dedicated, ephemeral MongoDB service container specifically for the workflow run, ensuring a guaranteed clean state and eliminating external network latency. Playwright configuration was updated to automatically start the backend and frontend servers before tests begin.

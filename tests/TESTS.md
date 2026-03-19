# Tests Documentation

## Overview

QuickCart has 9 test files organized in three tiers: unit, integration, and end-to-end (E2E). All tests are run from the `tests/` directory.

```
tests/
├── unit/
│   ├── backend/
│   │   ├── authController.test.js      (7 tests)
│   │   └── productController.test.js   (8 tests)
│   └── frontend/
│       └── App.test.jsx                (2 tests)
├── integration/
│   ├── backend/
│   │   ├── auth.test.js                (3 tests)
│   │   ├── health.test.js              (2 tests)
│   │   └── product.test.js             (3 tests)
│   └── frontend/
│       └── AccountPage.integration.test.jsx (2 tests)
└── e2e/
    ├── auth.spec.js                    (2 tests)
    └── products.spec.js                (1 test)
```

## Running Tests

```bash
cd tests
npm run test:unit:backend      # Backend unit tests
npm run test:unit:frontend     # Frontend unit tests
npm run test:integration       # All integration tests
npm run test:e2e               # Playwright E2E tests
npm run test:all               # Everything sequentially
```

> **Note:** All scripts include `TMPDIR=/tmp` to work around macOS temp directory permissions.

---

## Unit Tests

Unit tests run fast with no external dependencies. All database and API calls are mocked.

### authController.test.js

Tests the auth controller (register, login, logout) with mocked User model and token generation.

| Test | What it verifies |
|------|-----------------|
| Register success | User.findOne → null, User.create → 201 with user data |
| Register duplicate | User.findOne → existing user → 400, User.create not called |
| Register error | User.findOne throws → 500 with error message |
| Login success | User found + password matches → returns user data with token |
| Login wrong password | User found + password fails → 401 |
| Login user not found | User.findOne → null → 401 |
| Logout | Clears JWT cookie with expired date → 200 |

**Mocking approach:** `vi.mock()` replaces the real Mongoose models before import. A `mockRes()` helper creates Express-compatible response objects that support method chaining (`res.status(201).json({...})`).

### productController.test.js

Tests product CRUD (getProducts, getProductById, createProduct, deleteProduct) with mocked Product model.

| Test | What it verifies |
|------|-----------------|
| Get products (default) | Returns paginated products list with total count |
| Get products (filtered) | Category filter is passed to `Product.find()` with `isActive: true` |
| Get products (error) | DB throws → 500 |
| Get by ID (found) | findById returns product → 200 |
| Get by ID (not found) | findById returns null → 404 |
| Create product | Product.create → 201 |
| Delete (found) | findById → deleteOne → success message |
| Delete (not found) | findById returns null → 404 |

**Mocking approach:** Mongoose chain queries (`find().limit().skip().sort()`) are mocked by returning nested mock objects. Each method in the chain returns the next mock.

### App.test.jsx

Sanity check for the frontend testing infrastructure. If this fails, the problem is configuration, not app code.

| Test | What it verifies |
|------|-----------------|
| Sanity check | `1 + 1 = 2` — Vitest runs correctly |
| Render element | JSX renders into jsdom, Testing Library queries work |

---

## Integration Tests

Integration tests use real services (database, full component tree) but still run in a test environment.

### auth.test.js (Backend)

Tests auth API endpoints against a real MongoDB database using `supertest`.

| Test | What it verifies |
|------|-----------------|
| POST /api/auth/register | Creates user in DB, returns 201, no password in response |
| POST /api/auth/login | Returns 200 + JWT cookie for valid credentials |
| POST /api/auth/login (wrong) | Returns 401 for wrong password |

**Data cleanup:** Uses `beforeAll`/`afterAll` to clean test users matching `/test.*@example\.com/`. Uses `Date.now()` in emails to avoid collisions.

**Requires:** Running MongoDB (provided by CI service container or local instance).

### health.test.js (Backend)

Tests health check endpoints used by CI pipelines and monitoring.

| Test | What it verifies |
|------|-----------------|
| GET /api/health | Returns `{ status: 'ok' }` — used by Playwright and CI `wait-on` |
| GET / | Returns message containing "QuickCart API is running" |

### product.test.js (Backend)

Tests product API endpoints with real MongoDB. Creates a test product in `beforeAll`.

| Test | What it verifies |
|------|-----------------|
| GET /api/products | Returns products array with total count |
| GET /api/products/:id | Returns correct product by ID |
| GET /api/products/:id (fake) | Returns 404 for non-existent ObjectId |

### AccountPage.integration.test.jsx (Frontend)

Tests the full sign-in flow with real React context providers but mocked API.

| Test | What it verifies |
|------|-----------------|
| Sign in success | Form submit → api.post called → success toast shown |
| Sign in failure | Form submit → api.post rejects → error message in UI + error toast |

**Mocking approach:** Uses `vi.hoisted()` to create mock toast functions before `vi.mock()` factories run. The `api` module is mocked to prevent real HTTP calls. `MemoryRouter` avoids URL side effects. `AuthProvider` is real (not mocked) — this is the integration.

---

## E2E Tests

E2E tests run in a real Chromium browser via Playwright. The `playwright.config.js` automatically starts both backend (port 5001) and frontend (port 5173).

### auth.spec.js

Tests the full authentication user journey.

| Test | What it verifies |
|------|-----------------|
| Registration | Navigate to /signin → fill form → submit → redirected to / → avatar visible |
| Login | Register → logout → login again → redirected to / → avatar visible |

**Timeouts:** Tests use `120s` timeout and `60s` URL assertion timeout because cloud MongoDB (Atlas) can be slow on first connection.

### products.spec.js

Tests the product browsing journey.

| Test | What it verifies |
|------|-----------------|
| Browse & view | Home page loads → "Featured Products" visible → click product → /product/:id → "Add to Cart" visible |

**Requires:** Seeded database with at least one product.

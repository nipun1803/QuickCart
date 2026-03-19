# GitHub Workflows Documentation

## Overview

QuickCart uses 7 GitHub Actions workflows for CI/CD, testing, deployment, and dependency management.

---

## ci.yml — CI/CD Pipeline

**Triggers:** Push/PR to `main`

**What it does:** Runs frontend and backend builds in parallel. Each job installs dependencies (`npm ci`), runs tests, checks formatting, and builds the project. Uses a concurrency group to cancel stale runs when new pushes arrive.

**Why parallel jobs:** Frontend and backend are independent — running them in parallel reduces total pipeline time and lets them fail independently.

---

## dependabot.yml — Automated Dependency Updates

**Not a workflow** — this is a Dependabot configuration file.

**What it does:** Scans 4 package ecosystems weekly for outdated dependencies and opens PRs automatically:
- `/frontend` — React, Vite, UI libraries
- `/backend` — Express, Mongoose, JWT
- `/tests` — Vitest, Playwright, Testing Library
- `/` — GitHub Actions versions (e.g., `actions/checkout@v4`)

**Why:** Keeps dependencies up-to-date for security patches and compatibility.

---

## deploy.yml — Automated EC2 Deployment

**Triggers:** Push to `main`, manual dispatch

**What it does:**
1. Configures AWS credentials from GitHub Secrets
2. Runs `safe-ec2-control.sh start` to ensure the EC2 instance is running
3. SSHs into the instance, pulls latest code, runs `run.sh prod` for setup

**Required Secrets:** `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `EC2_HOST`, `EC2_SSH_KEY`

---

## e2e.yml — End-to-End Testing

**Triggers:** Push/PR to `main`, manual dispatch

**What it does:** Runs Playwright browser tests against the full stack. Spins up a MongoDB service container, installs all dependencies, runs unit tests as a fast-fail gate, then runs Playwright E2E tests. Uploads Playwright HTML report as an artifact on every run (including failures).

**Why MongoDB service container:** Provides a clean, isolated database for each CI run without needing an external Atlas connection.

---

## integration.yml — Integration Tests & Build

**Triggers:** Push/PR to `main`, manual dispatch

**What it does:** Installs all three directories' dependencies using `--prefix`, runs backend + frontend unit tests, then runs integration tests from `tests/`. Builds the frontend and uploads the `dist/` directory as a downloadable artifact.

**Why single job:** All tests share the same MongoDB service, so running them sequentially in one job is simpler and avoids connection conflicts.

---

## unit-integration.yaml — Multi-Branch Unit & Integration Tests

**Triggers:** Push/PR to `main`, `new-feature`, `bugfix`

**What it does:** Runs each project's OWN `npm test` from within `backend/` and `frontend/`. Starts the backend as a background process and waits for the health endpoint before running tests.

**Key difference from integration.yml:** This workflow runs tests from each project's directory (not from `tests/`), validating that `npm test` works standalone. Also supports feature branches beyond `main`.

**MongoDB health check:** Uses `mongosh --eval 'db.runCommand({ ping: 1 })'` to ensure the database is ready before tests start, preventing race conditions.

---

## vars-secrets-artifacts.yml — Variables, Secrets & Artifacts Demo

**Triggers:** Push to `main`, manual dispatch

**What it does:** Demonstrates GitHub Actions' three-tier variable hierarchy:
1. **Global-level** (`env:` at workflow level) — accessible by all jobs/steps
2. **Job-level** (`env:` at job level) — accessible by all steps in that job
3. **Step-level** (`env:` at step level) — accessible only within that step

Also demonstrates:
- Repository variables (`${{ vars.REPO_VAR }}`)
- Encrypted secrets (`${{ secrets.MY_SECRET }}` — masked in logs)
- Artifact upload/download between jobs
- Passing build-time env vars to Vite (`VITE_APP_API_URL`)

# Shell Scripts Documentation

## Overview

The `scripts/` directory contains 5 shell scripts for development setup and AWS EC2 management. All EC2 scripts read configuration from `secrets.env` (gitignored) instead of hardcoding values.

---

## secrets.env

Template for required environment variables. **This file is gitignored.**

| Variable | Description | Example |
|----------|-------------|---------|
| `INSTANCE_ID` | AWS EC2 instance ID | `i-0abf4270d19112e19` |
| `KEY_NAME` | SSH key pair name | `vockey` |
| `SG_NAME` | Security group name | `launch-wizard-1` |
| `INSTANCE_NAME` | EC2 instance tag name | `Terminal-EC2` |
| `INSTANCE_TYPE` | EC2 instance type | `t3.micro` |

---

## run.sh — Idempotent Dev Setup

**Usage:** `./scripts/run.sh <env> [port]`

**What it does:**
1. Checks that Node.js and npm are installed
2. Installs backend dependencies (only if `node_modules` is missing or `package.json` changed)
3. Installs frontend dependencies (same conditional logic)

**Why idempotent:** Uses `[ package.json -nt node_modules ]` to compare timestamps. If `package.json` hasn't changed since the last install, it skips `npm install` entirely, making repeated runs fast.

**Called by:** `deploy.yml` during EC2 deployment, and developers for local setup.

---

## safe-ec2-control.sh — State-Aware EC2 Start/Stop

**Usage:** `./scripts/safe-ec2-control.sh {start|stop}`

**What it does:** Checks the EC2 instance's current state before acting. If asked to start an already-running instance, it skips. If asked to stop an already-stopped instance, it skips.

**Why idempotent:** Prevents unnecessary API calls and avoids AWS warnings from duplicate start/stop requests. This is the version used in CI (`deploy.yml`).

---

## ec2-control.sh — Basic EC2 Start/Stop

**Usage:** `./scripts/ec2-control.sh {start|stop}`

**What it does:** Directly sends start or stop API calls without checking current state first.

**Difference from safe version:** Does NOT check state before acting. If the instance is already running and you call `start`, AWS returns a warning. Use `safe-ec2-control.sh` instead for CI/automation.

---

## launch_EC2.sh — Full EC2 Provisioning

**Usage:** `./scripts/launch_EC2.sh`

**What it does:** Provisions a complete EC2 instance from scratch:
1. Creates SSH key pair and saves `.pem` file (with `chmod 400`)
2. Gets the default VPC ID
3. Creates a security group with SSH (port 22) access
4. Finds the latest Amazon Linux 2023 AMI
5. Launches a t3.micro instance with public IP
6. Waits for it to start and prints SSH connection instructions

**Caution:** Creates real AWS resources that incur costs. The security group allows SSH from `0.0.0.0/0` (all IPs) — restrict this in production.

---

## ec2-health-check.sh — EC2 Health Monitoring

**Usage:** `./scripts/ec2-health-check.sh`

**What it does:** Queries two types of health status:
- **System Status** — AWS infrastructure health (host, power, network)
- **Instance Status** — OS reachability and configuration

Both must be `ok` for overall health `[OK]`. If either fails, reports `[ALERT]`.

**Why two checks:** An instance can be "running" but unhealthy (e.g., failed system checks). This script catches both infrastructure-level and OS-level issues.

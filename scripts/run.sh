#!/bin/bash

# Configuration
ENV=$1 #normal assignment
PORT=${2:-8080} #default value assignment

echo "Running on $ENV environment on port $PORT"

# Exit on error
set -e

# Function to log messages
log() {
    echo "[INFO] $1"
}

# Function to handle errors
error() {
    echo "[ERROR] $1" >&2
    exit 1
}

# 1. Check Prerequisites
log "Checking prerequisites..."
command -v node >/dev/null 2>&1 || error "Node.js is not installed. Please install Node.js to continue."
command -v npm >/dev/null 2>&1 || error "npm is not installed. Please install npm to continue."
log "Prerequisites met: Node $(node -v), npm $(npm -v)"

# 2. Setup Backend
log "Setting up Backend (Server)..."
if [ ! -d "backend" ]; then
    error "Backend directory not found!"
fi

cd backend
if [ ! -d "node_modules" ] || [ package.json -nt node_modules ]; then
    log "Installing/Updating backend dependencies..."
    npm install
else
    log "Backend dependencies are up to date."
fi
cd ..

# 3. Setup Frontend
log "Setting up Frontend (Client)..."
if [ ! -d "frontend" ]; then
    error "Frontend directory not found!"
fi

cd frontend
if [ ! -d "node_modules" ] || [ package.json -nt node_modules ]; then
    log "Installing/Updating frontend dependencies..."
    npm install
else
    log "Frontend dependencies are up to date."
fi
cd ..

# 4. Final Verification
log "Complete dev setup finished successfully!"
exit 0

# =============================================================================
# QuickCart Backend — Multi-Stage Production Dockerfile
# =============================================================================

# ---------------------
# Stage 1: Build
# ---------------------
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install ALL dependencies (including devDependencies)
COPY package*.json ./
RUN npm ci

# Copy application source code
COPY . .

# ---------------------
# Stage 2: Production
# ---------------------
FROM node:20-alpine AS production

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy application code from build stage
COPY --from=build /app/server.js ./server.js
COPY --from=build /app/config ./config
COPY --from=build /app/controllers ./controllers
COPY --from=build /app/middleware ./middleware
COPY --from=build /app/models ./models
COPY --from=build /app/routes ./routes
COPY --from=build /app/utils ./utils

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Change ownership of the app directory
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose the port the server listens on
EXPOSE 5001

# Set the node environment
ENV NODE_ENV=production

# Healthcheck — verifies the API is responsive
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5001/api/health || exit 1

# Start the backend server
CMD ["node", "server.js"]
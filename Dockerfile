# Build stage
FROM oven/bun:latest AS builder
WORKDIR /app

# Copy root package files
COPY package.json bun.lock ./
RUN bun install

# Copy and build client
COPY client/package.json client/bun.lock ./client/
RUN cd client && bun install
COPY client ./client
RUN cd client && bun run build

# Copy server files
COPY server ./server

# Development stage
FROM oven/bun:latest
WORKDIR /app

# Install curl for healthcheck
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy all files for development
COPY --from=builder /app/server ./server
COPY --from=builder /app/client ./client
COPY package.json bun.lock ./
RUN bun install 

EXPOSE 3000

# Healthcheck configuration
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Use watch mode for development
CMD ["bun", "run", "--watch", "server/index.ts"]
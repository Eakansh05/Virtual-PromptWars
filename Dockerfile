FROM node:20-slim

WORKDIR /app

# Copy all project files (frontend + server)
COPY . .

# Install server dependencies (use npm install as fallback if lock file is stale)
WORKDIR /app/server
RUN npm install --production

# Cloud Run provides PORT env var (defaults to 8080)
ENV PORT=8080

EXPOSE 8080

CMD ["node", "server.js"]

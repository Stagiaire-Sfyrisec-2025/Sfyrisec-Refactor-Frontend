# Stage 1: Install dependencies
FROM node:18-alpine AS deps
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Stage 2: Build the application
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependencies from the 'deps' stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 3: Production image
FROM node:18-alpine AS runner
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production

# Copy the standalone output
COPY --from=builder /app/.next/standalone ./
# Copy the static assets
COPY --from=builder /app/.next/static ./.next/static
# Copy the public assets
COPY --from=builder /app/public ./public

# Expose the port the app runs on
EXPOSE 3000

# The command to run the application
CMD ["node", "server.js"]


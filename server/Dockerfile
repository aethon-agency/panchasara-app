# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy dependency files
COPY package.json ./

# Install all dependencies including devDependencies for build
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the TypeScript project
RUN npm run build

# Runtime stage
FROM node:18-alpine AS runtime

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy package.json to install production dependencies
COPY package.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy compiled files from build stage
COPY --from=build /app/dist ./dist

# Railway will provide the PORT env var automatically
EXPOSE 5000

# Start the application
CMD ["npm", "start"]

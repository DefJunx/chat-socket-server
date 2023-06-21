# Base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code to the container
COPY . .

# Build TypeScript source code
RUN pnpm run build

# Expose the desired port (replace 3000 with the appropriate port for your app)
EXPOSE 3000

# Set the command to run the app
CMD [ "pnpm", "start" ]

FROM node:20.11.1-alpine

# Set environment variables
ENV NODE_ENV=production

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Install a lightweight web server
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 5173

# Command to run the app
CMD ["serve", "-s", "dist", "-l", "5173"]
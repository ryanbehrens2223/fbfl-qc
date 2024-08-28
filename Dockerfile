# Use an official Node.js image as the base
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY my-app/package*.json ./my-app/

# Change the working directory to my-app
WORKDIR /app/my-app

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY my-app .

# Build the React app
RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Set the command to start the app
CMD ["npm", "start"]
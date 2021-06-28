# This Docker image is based on Node.js v14.
FROM node:14-alpine

# Sets the working directory in the image.
WORKDIR /usr/src/app

# Copies the package file to the image.
COPY package*.json ./

# Installs (production) dependencies.
RUN npm install --only=production

# Copies source code to the image.
COPY ./src ./src

# Sets the command to start the microservice.
CMD npm start
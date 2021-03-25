FROM node:14

# Create and change to the app directory.
WORKDIR /usr/src/app

COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy local code to the container image.
COPY . ./

# Run the web service on container startup.
CMD npm start

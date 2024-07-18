# Dockerfile for Node.js Authentication Server

FROM node:16
WORKDIR /app/auth/
COPY package*.json ./
COPY . .
COPY .env ./
RUN npm install
EXPOSE 4000
CMD ["npm", "start"]


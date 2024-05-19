FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install bcrypt

COPY . .

EXPOSE 8000

CMD ["node", "server.js"]


FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install react-icons

COPY . .

EXPOSE 5173  

CMD ["npm", "run", "dev"]

FROM node:22.18.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4001

CMD [ "npm", "run", "start:dev" ]

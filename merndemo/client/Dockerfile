
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN ls -la dist

EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
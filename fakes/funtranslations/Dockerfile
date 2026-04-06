FROM node:20-alpine

RUN apk --no-cache add curl

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]

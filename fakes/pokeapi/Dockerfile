FROM node:20-alpine

RUN apk --no-cache add curl

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 4000

CMD ["node", "--experimental-json-modules", "index.js"]

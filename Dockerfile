FROM node:20-alpine

ENV APP_ENV=development

WORKDIR /app

#COPY package*.json ./

#RUN npm ci --omit=dev
#RUN npm ci

COPY . .

EXPOSE 3000

CMD ["/app/entrypoint.sh"]

FROM node:20-alpine

ENV APP_ENV=development

WORKDIR /app

COPY . .

RUN npm ci

EXPOSE 3000

CMD ["/app/entrypoint.sh"]

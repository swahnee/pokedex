FROM node:20-alpine

ENV APP_ENV=development

WORKDIR /app

# @TODO: improve performance by doing something like this,
# which currently breaks tests in GHA
#COPY package*.json ./
#RUN npm ci --omit=dev
#COPY . .

COPY . .

RUN npm ci

EXPOSE 3000

CMD ["/app/entrypoint.sh"]

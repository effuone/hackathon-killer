FROM node:20-alpine

WORKDIR /app

COPY . .

RUN yarn

RUN yarn run build

EXPOSE 3000

CMD [ "yarn", "run", "preview" ]
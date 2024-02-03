FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN yarn

COPY . .

RUN yarn run build

EXPOSE 3000

CMD [ "yarn", "run", "preview" ]
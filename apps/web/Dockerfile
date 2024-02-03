FROM node:20-alpine AS base

FROM base AS general
RUN apk update
WORKDIR /app
COPY . .

FROM base as installer
RUN apk update && apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=general /app/out/yarn.lock ./yarn.lock
COPY --from=general /app/out/full/apps/web/package.json ./package.json
RUN yarn install --frozen-lockfile

COPY --from=general /app/out/full/apps/web .
RUN yarn build

FROM nginx:alpine as runner
WORKDIR /var/www
COPY apps/web/nginx/nginx.conf /etc/nginx/nginx.conf
COPY apps/web/nginx/mime.types /etc/nginx/mime.types
COPY apps/web/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=installer /app/dist .
EXPOSE 80
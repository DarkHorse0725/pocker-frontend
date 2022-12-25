FROM node:16.13.0-alpine3.14 as base

################################################################################

FROM base as build

ARG CI=true

# Receive APP_ENV from --build-arg
# Default to production mode
ARG APP_ENV=production
ENV APP_ENV=$APP_ENV
LABEL website="Decentral Games Mobile Website - $APP_ENV"

# Receive NODE_ENV from --build-arg - NOTE: Can only be "test", "development" or "production" per NextJS config rules
# Default to production mode
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

ENV NODE_OPTIONS="--max-old-space-size=8192"

RUN echo "build APP_ENV: $APP_ENV"
RUN echo "build NODE_ENV: $NODE_ENV"

RUN apk add --no-cache ca-certificates git build-base python2 &&\
    rm -rf /var/cache/apk/*

WORKDIR /app

COPY package*.json ./

RUN npm audit --level critical || true

RUN npm install

RUN npm outdated || true

COPY . .

RUN npx next telemetry disable &&\
    env

RUN npm run build

# CMD ["sleep", "3d"]

################################################################################

FROM base as runtime
LABEL website="Decentral Games Mobile Website - $APP_ENV"

# This just clears the Cache for the proceeding RUN commands. It can be anything, but is `TEST`
ARG TEST

# Receive from previous build stage
ARG APP_ENV
ARG NODE_ENV

ENV NODE_ENV=$NODE_ENV \
    PATH="/app/node_modules/.bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin" \
    APP_ENV=$APP_ENV

RUN echo "runtime APP_ENV: $APP_ENV"
RUN env

WORKDIR /app

COPY --from=build --chown=node:node /app .

USER node

EXPOSE 3000

CMD ["npm", "run", "start"]

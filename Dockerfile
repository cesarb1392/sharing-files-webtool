FROM arm32v6/node:14-alpine3.10 as BUILD_IMAGE
# set working space
RUN mkdir /app/backend
WORKDIR /app

# copy dependencies
ENV PATH /app/node_modules/.bin:$PATH

# frontend && backend
COPY package.json /app/package.json && \
    yarn.lock /app/yarn.lock && \
    tsconfig.json /app/tsconfig.json && \
    src/ /app/src && \
    backend/package.json /app/backend/package.json && \
    backend/tsconfig.json /app/backend/tsconfig.json && \
    backend/src/ /app/src/backend

# install dependencies
RUN yarn install --production --frozen-lockfile --non-interactive && \
    yarn build:fe && \
    yarn build:be

# Add previous files to a new image
FROM arm32v6/node:14-alpine3.10

RUN apk update && apk add nano openssl && \
    mkdir /app && \
    mkdir /app/uploads

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY --from=BUILD_IMAGE /app/package.json /app/package.json && \
    --from=BUILD_IMAGE /app/yarn.lock /app/yarn.lock && \
    --from=BUILD_IMAGE /app/backend /app/backend && \
    --from=BUILD_IMAGE /app/node_modules /app/node_modules && \
    --from=BUILD_IMAGE /app/public /app/public

EXPOSE 3000
CMD [ "yarn", "start:prod" ]

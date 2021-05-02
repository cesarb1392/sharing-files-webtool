FROM arm32v6/node:14-alpine3.10 as BUILD_IMAGE
# set working space
RUN mkdir /app/backend
WORKDIR /app

# copy dependencies
ENV PATH /app/node_modules/.bin:$PATH
# frontend
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
COPY tsconfig.json /app/tsconfig.json
COPY src/ /app/src
# backend
COPY backend/package.json /app/backend/package.json
COPY backend/tsconfig.json /app/backend/tsconfig.json
COPY backend/src/ /app/src/backend


# install dependencies
RUN yarn install --production --frozen-lockfile --non-interactive
RUN yarn build:fe
RUN yarn build:be

# Add previous files to a new image
FROM arm32v6/node:14-alpine3.10

RUN apk update && apk add nano openssl

RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY --from=BUILD_IMAGE /app/package.json /app/package.json
COPY --from=BUILD_IMAGE /app/yarn.lock /app/yarn.lock
COPY --from=BUILD_IMAGE /app/backend /app/backend
COPY --from=BUILD_IMAGE /app/node_modules /app/node_modules

# copy frontend
COPY public /app/public

# uploads folders
RUN mkdir /app/uploads

# start nodejs process
EXPOSE 3000
CMD [ "yarn", "start:prod" ]

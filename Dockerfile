FROM arm64v8/node:14-alpine3.10 as BUILD
WORKDIR /app
COPY . /app
RUN yarn install --frozen-lockfile --non-interactive && yarn build:fe && yarn build:be

FROM arm64v8/node:14-alpine3.10
WORKDIR /app
ENV NODE_ENV=production
# RUN apk update && apk add nano openssl && \
#     mkdir /app && \
#     mkdir /app/uploads
ENV PATH /app/node_modules/.bin:$PATH
COPY --from=BUILD /app/backend /app/backend
COPY --from=BUILD /app/.next /app/.next
COPY --from=BUILD /app/build /app/build
COPY --from=BUILD /app/node_modules /app/node_modules

# COPY package.json yarn.lock ./backend/package.json /app
# RUN yarn install --frozen-lockfile --production

EXPOSE 3000
CMD ["/app/node_modules/.bin/next", "start" ]
# https://greg.jeanmart.me/2020/04/13/install-raspbian-operating-system-and-prepar/

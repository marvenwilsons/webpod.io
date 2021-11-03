FROM node:lts-alpine as base
RUN mkdir -p /usr/src/nuxt
WORKDIR /usr/src/nuxt
COPY . /usr/src/nuxt
RUN npm install

# Development
FROM base as dev
CMD ["npm","run","dev"]

# Production
FROM base as production
RUN npm run build
CMD ["npm","run","start"]
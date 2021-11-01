FROM node:lts-alpine as base
RUN mkdir -p /usr/src/public
WORKDIR /usr/src/public
COPY . /usr/src/public
RUN npm install

# Development
FROM base as dev
CMD ["npm","run","dev"]

# Production
FROM base as production
RUN npm run build
CMD ["npm","run","start"]
FROM node:latest

WORKDIR /usr/src/backend
COPY . /usr/src/backend

# Run BackEnd Server
RUN npm install
RUN echo "****** BackEnd is on dev mode *******"
CMD ["./node_modules/nodemon/bin/nodemon.js","server/index"]




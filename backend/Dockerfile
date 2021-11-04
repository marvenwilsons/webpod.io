FROM node:latest

WORKDIR /usr/src/backend
COPY . /usr/src/backend

# Run BackEnd Server
RUN npm install

CMD ["node","server/index"]

EXPOSE 8000



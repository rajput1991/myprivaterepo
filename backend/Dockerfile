MAINTAINER Rahul Rajput
FROM node:alpine
WORKDIR /usr/backend
COPY ./package.json ./
RUN npm install
COPY ./ ./
CMD [ "npm","start" ]

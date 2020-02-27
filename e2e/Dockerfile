FROM node:alpine
COPY package.json .
ENV http_proxy=http://hpe.ind.com//

RUN npm start server
COPY ./package.json .
CMD ["npm","start","start]

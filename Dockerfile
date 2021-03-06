FROM node:alpine

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn 

COPY . .

EXPOSE 3003

CMD ["yarn", "start"]
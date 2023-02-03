FROM node:18.12.1 AS production

WORKDIR /ligia

COPY package.json ./

RUN yarn

COPY . .

RUN yarn build

CMD ["yarn", "start"]

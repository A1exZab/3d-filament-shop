FROM node:alpine

WORKDIR /app

COPY . .

RUN cd ./client && npm ci  && npm run build && cd ..

RUN cd ./server && npm ci  && cd ..

RUN cp -r ./client/dist/* ./server/src/public/

WORKDIR /app/server

RUN npm run build

EXPOSE 7000

CMD [ "npm", "run", "start:prod" ]
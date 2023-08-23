# FROM node:18 as client

# WORKDIR /app/client

# COPY client/package.json /app/client

# RUN npm install

# COPY client /app/client/

# RUN npm run build

# FROM node:18

# WORKDIR /app/server

# COPY server/package*.json /app/server

# RUN npm install

# COPY server /app/server

# COPY --from=client /app/client/dist /app/server/public

# RUN npm run build

# EXPOSE 8080

# CMD [ "node", "dist/main.js"]


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
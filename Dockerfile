FROM node:10.18.0-jessie AS node

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run ng build --prod

RUN ls

RUN ls ./dist

FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY --from=node /usr/src/app/dist/mt1-obj-market .

EXPOSE 80
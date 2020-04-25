FROM node:10.18.0-jessie AS node

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build 

RUN cp /usr/src/app/dist/mt1-obj-market /usr/src/build/en-US/mt1-obj-market -rf

RUN npm run build-zh-Hans

RUN cp /usr/src/app/dist/zh-Hans/mt1-obj-market /usr/src/build/zh-Hans/mt1-obj-market -rf

FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY --from=node /usr/src/build/en-US/mt1-obj-market .

COPY --from=node /usr/src/build/zh-Hans/mt1-obj-market ./zh-Hans

COPY nginx.config /etc/nginx/conf.d/default.conf

EXPOSE 80
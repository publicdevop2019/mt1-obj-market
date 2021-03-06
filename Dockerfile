FROM node:14.15.1-alpine3.12 AS node

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build 

RUN mkdir -p build/en-US

RUN cp dist/mt1-obj-market/browser build/en-US/mt1-obj-market -rf

RUN mkdir -p build/zh-Hans

RUN npm run build-zh-Hans

RUN cp dist/mt1-obj-market/browser/zh-Hans build/zh-Hans/mt1-obj-market -rf

FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY --from=node /usr/src/app/build/en-US/mt1-obj-market .

COPY --from=node /usr/src/app/build/zh-Hans/mt1-obj-market ./zh-Hans

COPY nginx.config /etc/nginx/conf.d/default.conf

EXPOSE 80
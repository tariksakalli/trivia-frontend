# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY nginx_config/conf.d/ /etc/nginx/conf.d/
COPY nginx_config/nginx.conf /etc/nginx/nginx.conf
COPY certs/tezbahcesehir.com.crt /etc/nginx/cert/tezbahcesehir.com.crt
COPY certs/tezbahcesehir.com.key /etc/nginx/cert/tezbahcesehir.com.key
RUN rm -rf /etc/nginx/conf.d/default.conf

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]

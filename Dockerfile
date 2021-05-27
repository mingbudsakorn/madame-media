FROM node:12 as build-stage

WORKDIR /app
COPY package.json package.json
RUN yarn
COPY . .
RUN yarn build

FROM nginx:alpine as production

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]

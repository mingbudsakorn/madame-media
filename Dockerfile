FROM node:12

WORKDIR /app

COPY package.json package.json
RUN yarn
COPY . .

EXPOSE 80

CMD ["yarn", "build_serve"]

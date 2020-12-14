FROM node:12

RUN mkdir /app
WORKDIR /app


COPY ./package.json ./package-lock.json ./.babelrc ./
COPY ./src ./src
RUN npm ci

EXPOSE 8000
RUN npm run build
CMD ["npm", "start"]

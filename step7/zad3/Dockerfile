FROM node:latest

WORKDIR /express

COPY express/* .

RUN npm install

EXPOSE 3000

CMD ["node", "app.js"]
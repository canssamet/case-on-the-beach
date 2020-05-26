FROM node:lts
COPY . /app/src
WORKDIR /app/src
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
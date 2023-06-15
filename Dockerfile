FROM node:16
WORKDIR /home/node/app
ENV NODE_ENV=production
ADD ./articleServer/ .
EXPOSE 3000
RUN npm install
CMD [ "/bin/sh", "-c" , "npm run migration && npm start" ]
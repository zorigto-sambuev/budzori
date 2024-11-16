FROM node

#RUN addgroup -S jenkins && adduser -S jenkins -G jenkins

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .

#RUN npm run build
#USER jenkins
EXPOSE 3000
CMD ["npm", "start"]
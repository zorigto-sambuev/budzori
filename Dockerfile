FROM node:14-alpine

RUN addgroup -S jenkins && adduser -S jenkins -G jenkins

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build
RUN chown -R jenkins:jenkins /app
USER jenkins
EXPOSE 3000
CMD ["npm", "start"]
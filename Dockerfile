FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# instala exatamente o que está no package-lock.json
RUN npm ci

COPY . .

# porta que rodaremos o container
EXPOSE 3001

CMD ["npm", "start"]
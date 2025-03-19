FROM node:lts-alpine3.17

WORKDIR /app

# Copy package files and install dependencies
COPY package.json ./
RUN npm install

# Copy Prisma schema and generate client
COPY ./prisma prisma
COPY ./src src
RUN npx prisma generate

# Copy the rest of the application
COPY . .

# Build TypeScript
RUN npm run build

ENV PORT=3000
ENV DATABASE_URL="postgresql://postgres:1234@host.docker.internal:5432/loom"
EXPOSE 3000

# Run migrations and start the application
RUN npx prisma migrate dev

CMD ["npm", "run", "dev"]


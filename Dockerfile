FROM node:10.16.3-alpine AS builder
WORKDIR /app
COPY . /app
RUN npm install --unsafe-perm
RUN npm run build

FROM node:10.16.3-alpine
WORKDIR /app
COPY --from=builder /app /app
RUN npm install --only=prod --unsafe-perm

CMD ["npm", "run", "start:production"]

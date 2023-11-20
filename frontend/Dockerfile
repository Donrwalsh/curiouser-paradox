# ----------------------------
# build from source
# ----------------------------
FROM node:18 AS build

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .
ENTRYPOINT ["bash", "/docker-entrypoint.sh"]
RUN npm run build:dev

# ----------------------------
# run with nginx
# ----------------------------
FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
COPY --from=build /app/dist/frontend /usr/share/nginx/html

EXPOSE 80

# FROM node:18.15.0-alpine AS build

# WORKDIR /app

# COPY package.json .

# RUN npm install

# COPY . .

# RUN npm run build

# EXPOSE 4200

# CMD ["npm", "start"]

# ENTRYPOINT ["/bin/bash","/my-script.sh"]
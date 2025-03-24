FROM node:23.9

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .
# RUN npm run build

# RUN npm install -g serve
# EXPOSE 3000
# CMD ["serve", "-s", "build", "-l", "3000"]


# Create app directory
WORKDIR /app

# Install dependencies & build
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

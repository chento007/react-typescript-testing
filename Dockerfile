# # Fetching the minified node image on apline linux
# FROM node:16.18.1

# # Declaring env
# ENV NODE_ENV development

# # Setting up the work directory
# WORKDIR /express-docker

# # Copying all the files in our project
# COPY . .

# # Installing dependencies
# RUN npm install

# # Starting our application
# CMD ["npm", "start"]

# # Exposing server port
# EXPOSE 3000

# Stage 1: Build the React app
FROM node:16.18.1 as builder
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build
# Stage 2: Create the production image
FROM nginx:latest
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
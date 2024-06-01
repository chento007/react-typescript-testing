# Fetching the minified node image on Alpine Linux
FROM node:16.18.1 as REACT_BUILD

# Setting up the work directory
WORKDIR /app

COPY package*.json ./

# Installing dependencies
RUN npm install

# Copying all the files in our project
COPY . .

# Building the React app
RUN npm run build

FROM nginx:alpine

# Create the SSL directory
RUN mkdir -p /etc/nginx/ssl

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy our default nginx config
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy SSL certificates
COPY ./my-local-domain.test.pem /etc/nginx/ssl/my-local-domain.test.pem
COPY ./my-local-domain.test-key.pem /etc/nginx/ssl/my-local-domain.test-key.pem

# Copy built React app to nginx html directory
COPY --from=REACT_BUILD /app/build /usr/share/nginx/html

# Expose ports
EXPOSE 80
EXPOSE 443

# Run nginx
CMD ["nginx", "-g", "daemon off;"]

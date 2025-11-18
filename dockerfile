# Use the official nginx image
FROM nginx:alpine

# Copy static files to nginx's default directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# No need to override CMD, nginx already runs

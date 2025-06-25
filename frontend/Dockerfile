# Use official Nginx image as base
FROM nginx:latest

# Set the working directory
WORKDIR /usr/share/nginx/html

# Copy all project files to the container
COPY . /usr/share/nginx/html

# Expose port 80 to allow HTTP traffic
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

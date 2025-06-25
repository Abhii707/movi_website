# Step 1: Use Node base image
FROM node:18

# Step 2: Set working directory inside container
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy rest of the backend code
COPY . .

# Step 5: Expose backend port
EXPOSE 5000

# Step 6: Run the app
CMD ["node", "index.js"]

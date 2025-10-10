FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

ENV CHOKIDAR_USEPOLLING=true

CMD npm run dev -- --host 0.0.0.0

# CMD ["npm", "run", "dev", "--", "--port", "3000", "--host"]

# FROM node:20-alpine

# WORKDIR /app

# # Copy package files first for better caching
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy source code
# COPY . .

# # Build the application
# RUN npm run build

# # Install a lightweight server to serve the built files
# RUN npm install -g serve

# # Expose port
# EXPOSE 3000

# # Serve the built application
# CMD ["serve", "-s", "dist", "-l", "3000"]

# # ---------------------------------------- #
# # BELOW DOESNT'T WORK I NEED NPM RUN DEV TO ENABLE HMR (HOPEFULLY) #
# # FROM node:20-alpine

# # WORKDIR /app

# # # Install deps
# # COPY package*.json ./
# # RUN npm install

# # # Copy source
# # COPY . .

# # # Expose Vite’s default dev port
# # EXPOSE 3000

# # # Run dev server (with HMR)
# # CMD ["npm", "run", "dev"]

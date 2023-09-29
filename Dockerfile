# Gunakan node:16 sebagai base image
FROM node:16

# Set working directory di dalam container
WORKDIR /usr/src/app

# Copy package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependensi proyek
RUN npm install --production

# Copy seluruh proyek ke dalam container
COPY . .

# Build aplikasi Next.js
RUN npm run build

# Expose port yang digunakan oleh Next.js (default: 3000)
EXPOSE 3000

# Command untuk menjalankan aplikasi Next.js
CMD ["npm", "start"]

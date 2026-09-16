
# Câu 51: Khai báo Base Image
FROM node:18-alpine

# Câu 52: Thiết lập thư mục làm việc
WORKDIR /app

# Câu 53: Sao chép package.json và package-lock.json
COPY package*.json ./

# Câu 54: Cài đặt các package
RUN npm install

# Câu 55: Sao chép source code React
COPY . .

# Câu 56: Build React Application
RUN npm run build

# Câu 57: Kiểm tra thư mục dist
RUN ls -la dist

# Cổng chạy Vite Preview
EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
# 使用 Node 官方镜像作为基础镜像
FROM node:20-alpine

# 设置工作目录
WORKDIR /app

# 复制项目文件
COPY . .

# 安装依赖
RUN npm install

# 构建静态文件
RUN npm run build

# 使用 nginx 作为生产服务器
FROM nginx:stable-alpine

# 删除默认的 nginx 配置
RUN rm -rf /usr/share/nginx/html/*

# 从构建阶段复制 Docusaurus 的构建产物
COPY --from=0 /app/build /usr/share/nginx/html

# 复制 nginx 自定义配置（可选）
# COPY nginx.conf /etc/nginx/nginx.conf

# 公开端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]

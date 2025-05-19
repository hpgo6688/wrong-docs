好的，下面是一个**完整的操作流程**，从零开始使用 **Drone CI/CD** 自动部署一个 **Node.js Express 应用** 到生产环境，使用 Docker 构建镜像并部署到服务器。

---

## ✅ 项目目标

- 使用 Drone 自动化构建、测试、打包 Express 应用。
- 使用 Docker 构建镜像并推送到 Docker Hub。
- 在远程服务器上自动部署最新镜像。

---

## 🧱 一、准备工作

### 1. 安装 Drone Server 和 Runner

> 以下以 Docker 方式安装为例。

#### 1.1 启动 Drone Server

```bash
docker run \
  --volume=/var/lib/drone:/data \
  --env=DRONE_GITEA_SERVER=https://gitea.example.com \
  --env=DRONE_RPC_SECRET=supersecret \
  --env=DRONE_SERVER_HOST=drone.example.com \
  --env=DRONE_SERVER_PROTO=https \
  --env=DRONE_GITEA_CLIENT_ID=your-client-id \
  --env=DRONE_GITEA_CLIENT_SECRET=your-client-secret \
  --publish=80:80 \
  --publish=443:443 \
  --restart=always \
  --name=drone \
  drone/drone:2
```

> 你也可以连接 GitHub、GitLab、Gitea 等，配置略有不同。

#### 1.2 启动 Drone Runner（Docker Runner）

```bash
docker run -d \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -e DRONE_RPC_PROTO=http \
  -e DRONE_RPC_HOST=drone.example.com \
  -e DRONE_RPC_SECRET=supersecret \
  -e DRONE_RUNNER_CAPACITY=2 \
  -e DRONE_RUNNER_NAME=drone-docker-runner \
  --restart always \
  --name runner \
  drone/drone-runner-docker:1
```

---

## 🛠️ 二、准备你的 Node.js Express 项目

假设你的项目结构如下：

```
my-express-app/
├── Dockerfile
├── .drone.yml
├── package.json
├── index.js
└── ...
```

### 2.1 示例 `Dockerfile`

创建一个简单的 Dockerfile：

```Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
```

### 2.2 示例 `index.js`

```js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from Drone CI/CD!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

---

## ⚙️ 三、配置 `.drone.yml`

在项目根目录创建 `.drone.yml`：

```yaml
kind: pipeline
type: docker
name: default

steps:
  - name: install
    image: node:18
    commands:
      - npm install

  - name: test
    image: node:18
    commands:
      - echo "No tests yet"

  - name: docker build & push
    image: plugins/docker
    settings:
      repo: your-dockerhub-username/your-image-name
      tags:
        - latest
      username:
        from_secret: docker_username
      password:
        from_secret: docker_password
```

---

## 🔐 四、添加 Secrets（Docker Hub 凭证）

在 Drone Web UI 中：

- 进入你的项目设置（Settings）
- 添加 secrets：
  - `docker_username`: 你的 Docker Hub 用户名
  - `docker_password`: 你的 Docker Hub 密码或 token

---

## 🚀 五、部署到服务器

在你的服务器上，使用以下命令部署：

```bash
docker pull your-dockerhub-username/your-image-name:latest

docker stop express-app || true
docker rm express-app || true

docker run -d --name express-app \
  -p 80:3000 \
  your-dockerhub-username/your-image-name:latest
```

> 你也可以写一个部署脚本，或使用 Drone 的 SSH 插件自动远程部署。

---

## 🧩 六（可选）使用 Drone SSH 插件自动部署到服务器

在 `.drone.yml` 中添加一个部署步骤：

```yaml
  - name: deploy to server
    image: appleboy/drone-ssh
    settings:
      host: your-server-ip
      username: root
      port: 22
      password:
        from_secret: server_password
      script:
        - docker pull your-dockerhub-username/your-image-name:latest
        - docker stop express-app || true
        - docker rm express-app || true
        - docker run -d --name express-app -p 80:3000 your-dockerhub-username/your-image-name:latest
```

然后添加 secret：

- `server_password`: 你的服务器密码（建议用 SSH key 更安全）

---

## ✅ 最终效果

每次你往 Git 仓库 push 代码时：

1. Drone 会自动触发构建流程。
2. 安装依赖、测试、构建 Docker 镜像。
3. 推送镜像到 Docker Hub。
4. 自动登录服务器，拉取新镜像并重启容器。

---

## 📌 小贴士

- 用 `.env` 管理环境变量。
- 使用 `pm2` 管理 Node.js 应用也可以，但 Docker 更推荐。
- 可以使用 Nginx 做反向代理。

---

如果你需要我帮你生成一个完整的项目模板或者 Docker 镜像名、配置部署脚本等，也可以继续问我！
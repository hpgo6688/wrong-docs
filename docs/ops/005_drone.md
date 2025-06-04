要在本地运行 Drone 进行开发测试，可以按照以下步骤进行：

### 环境准备

1. **安装 Docker**：确保你的机器上已经安装了 Docker，因为 Drone 依赖于 Docker 来运行。

### 下载并运行 Drone

1. **克隆 Drone 仓库**（可选）：
   如果你想查看源码，可以克隆 Drone 的 GitHub 仓库。

2. **创建 Docker 网络**：
   ```bash
   docker network create drone
   ```

3. **运行 Drone 服务**：
   你需要运行 Drone 服务和代理。以下是一个简单的 Docker Compose 示例：

```yaml
version: '3'

services:
  drone-server:
    image: drone/drone:latest
    container_name: drone-server
    ports:
      - 8080:80
    volumes:
      - /var/lib/drone:/data
    restart: always
    environment:
      - DRONE_GITHUB_CLIENT_ID=<your_github_client_id> # GitHub OAuth 应用的客户端 ID
      - DRONE_GITHUB_CLIENT_SECRET=<your_github_client_secret> # GitHub OAuth 应用的客户端密钥
      - DRONE_RPC_SECRET=<your_rpc_secret> # 用于服务器和代理之间的安全通信的随机字符串
      - DRONE_SERVER_HOST=<your_server_host> # Drone 服务器的主机名（如 localhost）
      - DRONE_SERVER_PROTO=http # 服务器协议（http 或 https）
    networks:
      - drone

  drone-agent:
    image: drone/drone-runner-docker:latest
    container_name: drone-agent
    restart: always
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - DRONE_RPC_PROTO=http # 代理与服务器通信的协议
      - DRONE_RPC_HOST=drone-server # 服务器的主机名
      - DRONE_RPC_SECRET=<your_rpc_secret> # 与服务器共享的随机字符串，确保与上面一致
      - DRONE_RUNNER_CAPACITY=2 # 代理的并发任务处理能力
    networks:
      - drone

networks:
  drone:
    external: true
```

### 配置

1. **GitHub OAuth 应用**：
   - 在 GitHub 上创建一个 OAuth 应用，以获取 `CLIENT_ID` 和 `CLIENT_SECRET`。
   - 将这些值添加到 Docker Compose 文件中。

2. **设置 DRONE_RPC_SECRET**：
   - 这是一个用于安全通信的随机字符串，你可以使用任意字符串。

3. **启动服务**：
   - 运行 `docker-compose up -d` 启动 Drone。

### 使用 Drone

1. **访问 Web 界面**：
   - 打开浏览器，访问 `http://localhost:8080`。
   - 使用 GitHub 账号登录。

2. **配置 .drone.yml**：
   - 在你的项目根目录下创建一个 `.drone.yml` 文件，定义流水线步骤。

通过这些步骤，你就可以在本地体验 Drone 的功能了。如果你有任何问题或需要进一步帮助，欢迎随时询问！

## 为什么要github


使用 GitHub 是因为 Drone 可以与 GitHub 集成，方便从 GitHub 仓库中获取代码并自动触发 CI/CD 流水线。通过配置 GitHub OAuth 应用，Drone 能够访问你的 GitHub 仓库，监听代码变更，并在代码提交时自动执行构建和测试流程。

如果你不使用 GitHub，也可以集成其他代码托管平台，比如 GitLab、Bitbucket 等，具体配置会有所不同。
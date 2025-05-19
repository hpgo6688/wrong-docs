在 **Drone CI/CD** 中，如果你希望在“发布之前”增加一个 **人工审批流程**（如：某个构建步骤或整个构建流程在执行前必须经过人工确认），可以使用 **Drone 的 `approval` 阶段机制** 来实现。

---

## ✅ 目标：在发布之前增加人工审批流程

例如：

```
构建步骤 ➝ 测试步骤 ➝ ✅审批步骤 ➝ 🚀发布步骤
```

---

## 🧱 一、Drone 的 `approval` 步骤简介

Drone 支持在 pipeline 中定义 **手动审批步骤**，该步骤会 **暂停构建流程**，直到有用户在 UI 或 API 中点击“批准（Approve）”或“拒绝（Decline）”。

---

## 🧠 二、示例 `.drone.yml` 配置（含审批步骤）

```yaml
kind: pipeline
type: docker
name: default

steps:
  - name: build
    image: node:18
    commands:
      - npm install
      - npm run build

  - name: test
    image: node:18
    commands:
      - npm test

  - name: approval
    type: approval
    depends_on:
      - test

  - name: deploy
    image: alpine
    commands:
      - echo "🚀 Deploying to production..."
    depends_on:
      - approval
```

### 🔍 说明：

| 步骤名称   | 类型             | 说明                         |
| ---------- | ---------------- | ---------------------------- |
| `build`    | 正常步骤         | 编译构建                     |
| `test`     | 正常步骤         | 执行测试                     |
| `approval` | `type: approval` | **人工审批步骤**，会暂停流程 |
| `deploy`   | 正常步骤         | 只有审批通过后才会执行       |

---

## ✅ 三、审批操作方式

### 1. 👨‍💻 Drone UI 中审批

在 Drone Web UI 中，构建流程会暂停在 `approval` 步骤，你会看到按钮：

- ✅ Approve
- ❌ Decline

只有点击 Approve 后，后续步骤（如 deploy）才会继续执行。

---

### 2. 🧩 使用 API 审批（用于 OPS 页面控制）

你可以通过 Drone API 实现“批准 / 拒绝”审批步骤，集成到你自己的前端页面中。

#### ✅ Approve 审批步骤

```http
POST /api/repos/{owner}/{repo}/builds/{build_number}/approve
```

#### ❌ 拒绝审批步骤

```http
POST /api/repos/{owner}/{repo}/builds/{build_number}/decline
```

#### 示例代码（Node.js 后端）：

```js
app.post('/api/drone/:owner/:repo/builds/:build/approve', async (req, res) => {
  const { owner, repo, build } = req.params;
  const url = `${DRONE_SERVER}/api/repos/${owner}/${repo}/builds/${build}/approve`;
  try {
    await axios.post(url, {}, { headers: { Authorization: `Bearer ${DRONE_TOKEN}` } });
    res.json({ message: 'Build approved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

---

## 🔐 四、权限控制（谁可以审批）

Drone 默认只允许 **有权限访问仓库的用户** 执行审批操作。

> ✅ 如果你使用 GitHub/GitLab 登录 Drone，审批者必须是该项目的 Collaborator 或 Member。

你也可以在 `.drone.yml` 中通过 `when` 条件限制审批步骤的触发条件：

```yaml
- name: approval
  type: approval
  when:
    branch:
      - main
```

---

## 🌐 五、前端页面集成（OPS 页面控制）

你可以在你的页面中集成如下按钮：

```html
<button @click="approveBuild">✅ 批准发布</button>
<button @click="declineBuild">❌ 拒绝发布</button>
```

```js
async function approveBuild() {
  await fetch(`/api/drone/org/repo/builds/123/approve`, { method: 'POST' });
}

async function declineBuild() {
  await fetch(`/api/drone/org/repo/builds/123/decline`, { method: 'POST' });
}
```

---

## 🧩 六、进阶用法：多阶段审批

你可以在不同阶段插入多个 `approval` 步骤，例如：

```yaml
- name: qa-approval
  type: approval
  depends_on:
    - test

- name: ops-approval
  type: approval
  depends_on:
    - qa-approval
```

---

## ✅ 总结

| 功能              | 实现方式                                     |
| ----------------- | -------------------------------------------- |
| 增加审批          | 在 `.drone.yml` 中添加 `type: approval` 步骤 |
| 审批方式          | Drone UI 或 Drone API                        |
| API 接口          | `/approve`, `/decline`                       |
| 权限控制          | 由 Drone 自动控制，或通过 `when` 限制        |
| 可集成到 OPS 页面 | ✅ 支持按钮控制审批流程                       |

---

如果你希望我为你生成一个完整的 `.drone.yml` 示例（包括构建、测试、审批、部署），或者帮你写好审批按钮的前端组件，请告诉我你使用的前端框架（Vue/React）和部署方式（Kubernetes/SSH 等），我可以一键生成示例代码。是否需要？
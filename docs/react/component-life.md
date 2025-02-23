---
sidebar_position: 2
title: vue2 vs react 组件生命周期
---

Vue 2 和 React 在组件的生命周期管理上有较大区别。Vue 2 使用 **选项式 API** 提供生命周期钩子，而 React 使用 **`useEffect`** 处理副作用。

---

# **1. Vue 2 生命周期完整示例**

Vue 2 提供了一系列 **生命周期钩子**，常见的有：

- `beforeCreate`（组件实例创建前）
- `created`（组件实例已创建）
- `beforeMount`（组件挂载前）
- `mounted`（组件已挂载）
- `beforeUpdate`（数据更新前）
- `updated`（数据更新后）
- `beforeDestroy`（组件销毁前）
- `destroyed`（组件已销毁）

### **Vue 2 示例**

```vue
<template>
  <div>
    <h2>Vue 2 Lifecycle Demo</h2>
    <p>Message: {{ message }}</p>
    <button @click="updateMessage">Update Message</button>
    <button @click="destroyComponent">Destroy Component</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Vue!',
    };
  },
  methods: {
    updateMessage() {
      this.message = 'Updated Message!';
    },
    destroyComponent() {
      this.$destroy(); // 手动销毁组件
    },
  },
  beforeCreate() {
    console.log('beforeCreate: 组件实例尚未创建');
  },
  created() {
    console.log('created: 组件实例已创建');
  },
  beforeMount() {
    console.log('beforeMount: 组件即将挂载');
  },
  mounted() {
    console.log('mounted: 组件已挂载');
  },
  beforeUpdate() {
    console.log('beforeUpdate: 数据即将更新');
  },
  updated() {
    console.log('updated: 数据已更新');
  },
  beforeDestroy() {
    console.log('beforeDestroy: 组件即将销毁');
  },
  destroyed() {
    console.log('destroyed: 组件已销毁');
  },
};
</script>
```

**运行效果：**

- 组件加载时会依次触发 `beforeCreate` → `created` → `beforeMount` → `mounted`
- 点击 **Update Message** 按钮后，触发 `beforeUpdate` → `updated`
- 点击 **Destroy Component** 按钮后，触发 `beforeDestroy` → `destroyed`

---

# **2. React 生命周期完整示例**

在 React 中，**函数组件** 使用 `useEffect` 处理生命周期：

- **`useEffect(() => {...}, [])`** 相当于 `mounted`
- **`useEffect(() => {...}, [state])`** 相当于 `updated`
- **`useEffect(() => { return () => {...} }, [])`** 相当于 `beforeDestroy`

### **React 示例**

```jsx
import React, { useState, useEffect } from 'react';

function LifecycleDemo() {
  const [message, setMessage] = useState('Hello React!');
  const [isDestroyed, setIsDestroyed] = useState(false);

  // 组件挂载时执行（相当于 Vue 的 mounted）
  useEffect(() => {
    console.log('Component mounted');

    return () => {
      console.log('Component will unmount (beforeDestroy)');
    };
  }, []);

  // 监听 message 变化（相当于 Vue 的 beforeUpdate & updated）
  useEffect(() => {
    console.log('Message updated:', message);
  }, [message]);

  if (isDestroyed) {
    return <p>Component Destroyed</p>;
  }

  return (
    <div>
      <h2>React Lifecycle Demo</h2>
      <p>Message: {message}</p>
      <button onClick={() => setMessage('Updated Message!')}>Update Message</button>
      <button onClick={() => setIsDestroyed(true)}>Destroy Component</button>
    </div>
  );
}

export default LifecycleDemo;
```

**运行效果：**

- 组件加载时会触发 `"Component mounted"`
- 点击 **Update Message** 按钮后，触发 `"Message updated: Updated Message!"`
- 点击 **Destroy Component** 按钮后，触发 `"Component will unmount (beforeDestroy)"`，然后组件卸载

---

# **3. Vue 2 vs React 生命周期对比**

| 生命周期   | Vue 2           | React（`useEffect`）                          |
| ---------- | --------------- | --------------------------------------------- |
| **创建前** | `beforeCreate`  | -                                             |
| **创建后** | `created`       | -                                             |
| **挂载前** | `beforeMount`   | -                                             |
| **挂载后** | `mounted`       | `useEffect(() => {...}, [])`                  |
| **更新前** | `beforeUpdate`  | -                                             |
| **更新后** | `updated`       | `useEffect(() => {...}, [state])`             |
| **销毁前** | `beforeDestroy` | `useEffect(() => { return () => {...} }, [])` |
| **销毁后** | `destroyed`     | -                                             |

---

# **总结**

- **Vue 2** 通过生命周期钩子（`mounted`、`updated`、`destroyed`）来管理组件生命周期
- **React** 使用 `useEffect` 处理副作用，**返回一个清理函数** 代替 `beforeDestroy`
- Vue 2 的生命周期钩子更直观，而 React 的 `useEffect` 更灵活，可以监听特定的 `state`

如果你熟悉 Vue 2 的生命周期，理解 React 的 `useEffect` 可能需要一些适应，但本质上两者的功能是相似的。

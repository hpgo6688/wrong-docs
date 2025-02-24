---
sidebar_position: 1
title: vue -> react
---

Vue 2 和 React 在语法上有较大的区别，以下是常见的语法对比：

---

## **1. 组件定义**

### **Vue 2**

Vue 2 使用 **单文件组件（SFC）**，模板、脚本和样式分开：

```vue
<!-- MyComponent.vue -->
<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Vue!',
    };
  },
};
</script>

<style scoped>
p {
  color: blue;
}
</style>
```

### **React**

React 使用 **JSX** 语法，HTML 写在 JavaScript 代码中：

```jsx
// MyComponent.jsx
import React, { useState } from 'react';

function MyComponent() {
  const [message, setMessage] = useState('Hello React!');

  return (
    <div>
      <p>{message}</p>
    </div>
  );
}

export default MyComponent;
```

---

## **2. 数据绑定**

### **Vue 2**

Vue 2 支持 **双向数据绑定**：

```vue
<input v-model="message" />
```

### **React**

React 采用 **单向数据流**，需要手动更新 `state`：

```jsx
<input value={message} onChange={(e) => setMessage(e.target.value)} />
```

---

## **3. 事件处理**

### **Vue 2**

Vue 使用 `v-on`（简写 `@`）绑定事件：

```vue
<button @click="handleClick">Click Me</button>

<script>
export default {
  methods: {
    handleClick() {
      console.log('Button clicked!');
    },
  },
};
</script>
```

### **React**

React 事件处理使用 `onClick`，并且事件是 **驼峰命名**：

```jsx
<button onClick={handleClick}>Click Me</button>;

function handleClick() {
  console.log('Button clicked!');
}
```

---

## **4. 条件渲染**

### **Vue 2**

Vue 使用 `v-if` 和 `v-show`：

```vue
<p v-if="isVisible">Visible</p>
<p v-show="isVisible">Visible</p>
```

### **React**

React 使用 **三元运算符** 或 `&&` 进行条件渲染：

```jsx
{
  isVisible ? <p>Visible</p> : null;
}
{
  isVisible && <p>Visible</p>;
}
```

---

## **5. 列表渲染**

### **Vue 2**

Vue 使用 `v-for` 渲染列表：

```vue
<ul>
  <li v-for="(item, index) in items" :key="index">{{ item }}</li>
</ul>
```

### **React**

React 使用 `map()` 方法：

```jsx
<ul>
  {items.map((item, index) => (
    <li key={index}>{item}</li>
  ))}
</ul>
```

---

## **6. 组件通信**

### **Vue 2**

Vue 使用 `props` 和 `$emit` 进行父子组件通信：

**父组件**

```vue
<ChildComponent :message="parentMessage" @updateMessage="handleUpdate" />
```

**子组件**

```vue
<template>
  <button @click="$emit('updateMessage', 'New Message')">Update</button>
</template>

<script>
export default {
  props: ['message'],
};
</script>
```

### **React**

React 通过 `props` 传递数据，子组件通过回调函数向父组件传递数据：

**父组件**

```jsx
<ChildComponent message={parentMessage} updateMessage={setParentMessage} />
```

**子组件**

```jsx
function ChildComponent({ message, updateMessage }) {
  return <button onClick={() => updateMessage('New Message')}>Update</button>;
}
```

---

## **7. 生命周期**

### **Vue 2**

Vue 提供一系列生命周期钩子：

```vue
<script>
export default {
  created() {
    console.log('Component created');
  },
  mounted() {
    console.log('Component mounted');
  },
};
</script>
```

### **React**

React 通过 `useEffect` 处理生命周期：

```jsx
import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    console.log('Component mounted');
  }, []);

  return <div>Component</div>;
}
```

---

## **8. 计算属性 vs. useMemo**

### **Vue 2**

Vue 使用 `computed`：

```vue
computed: { reversedMessage() { return this.message.split("").reverse().join(""); } }
```

### **React**

React 使用 `useMemo`：

```jsx
import { useMemo } from 'react';

const reversedMessage = useMemo(() => message.split('').reverse().join(''), [message]);
```

---

## **9. 插槽 vs. children**

### **Vue 2**

Vue 使用 `slot` 插入内容：

```vue
<template>
  <div>
    <slot></slot>
  </div>
</template>
```

### **React**

React 使用 `children`：

```jsx
function Wrapper({ children }) {
  return <div>{children}</div>;
}
```

---

## **总结**

| 特性            | Vue 2                                       | React                          |
| --------------- | ------------------------------------------- | ------------------------------ |
| 组件定义        | SFC (`<template>` + `<script>` + `<style>`) | JSX (`return (<div></div>)`)   |
| 数据绑定        | 双向 (`v-model`)                            | 单向 (`useState`)              |
| 事件处理        | `@click="method"`                           | `onClick={function}`           |
| 条件渲染        | `v-if` / `v-show`                           | `{condition && <Component />}` |
| 列表渲染        | `v-for`                                     | `.map()`                       |
| 组件通信        | `props` + `$emit`                           | `props` + 回调函数             |
| 生命周期        | `created` / `mounted` 等                    | `useEffect`                    |
| 计算属性        | `computed`                                  | `useMemo`                      |
| 插槽/子组件内容 | `<slot>`                                    | `children`                     |

Vue 2 更接近传统 HTML+CSS+JS 的开发方式，易于上手，而 React 更偏向 JavaScript 逻辑驱动，灵活性更高。你可以根据自己的需求选择合适的框架。

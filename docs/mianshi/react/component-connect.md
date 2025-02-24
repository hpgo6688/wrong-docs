---
sidebar_position: 2
title: vue vs react 父子组件通信
---

Vue 2 和 React 在组件通信方面的方式不同，下面是 **父子组件通信（Props）** 和 **子传父（事件/回调）** 的完整示例对比。

---

# **1. 父传子（Props）**

**Vue 2** 使用 `props` 传递数据：

### **Vue 2 示例**

**父组件（Parent.vue）**

```vue
<template>
  <div>
    <h2>Parent Component</h2>
    <ChildComponent :message="parentMessage" />
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: { ChildComponent },
  data() {
    return {
      parentMessage: 'Hello from Parent!',
    };
  },
};
</script>
```

**子组件（ChildComponent.vue）**

```vue
<template>
  <div>
    <h3>Child Component</h3>
    <p>Received Message: {{ message }}</p>
  </div>
</template>

<script>
export default {
  props: ['message'],
};
</script>
```

---

**React** 通过 `props` 传递数据：

### **React 示例**

**父组件（Parent.jsx）**

```jsx
import React from 'react';
import ChildComponent from './ChildComponent';

function Parent() {
  const parentMessage = 'Hello from Parent!';

  return (
    <div>
      <h2>Parent Component</h2>
      <ChildComponent message={parentMessage} />
    </div>
  );
}

export default Parent;
```

**子组件（ChildComponent.jsx）**

```jsx
import React from 'react';

function ChildComponent({ message }) {
  return (
    <div>
      <h3>Child Component</h3>
      <p>Received Message: {message}</p>
    </div>
  );
}

export default ChildComponent;
```

---

# **2. 子传父（事件/回调）**

**Vue 2** 使用 `$emit` 让子组件向父组件传递数据：

### **Vue 2 示例**

**父组件（Parent.vue）**

```vue
<template>
  <div>
    <h2>Parent Component</h2>
    <p>Message from Child: {{ childMessage }}</p>
    <ChildComponent @updateMessage="handleUpdateMessage" />
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: { ChildComponent },
  data() {
    return {
      childMessage: 'No message yet',
    };
  },
  methods: {
    handleUpdateMessage(newMessage) {
      this.childMessage = newMessage;
    },
  },
};
</script>
```

**子组件（ChildComponent.vue）**

```vue
<template>
  <div>
    <h3>Child Component</h3>
    <button @click="$emit('updateMessage', 'Hello from Child!')">Send Message to Parent</button>
  </div>
</template>
```

---

**React** 通过 **回调函数** 让子组件向父组件传递数据：

### **React 示例**

**父组件（Parent.jsx）**

```jsx
import React, { useState } from 'react';
import ChildComponent from './ChildComponent';

function Parent() {
  const [childMessage, setChildMessage] = useState('No message yet');

  return (
    <div>
      <h2>Parent Component</h2>
      <p>Message from Child: {childMessage}</p>
      <ChildComponent updateMessage={setChildMessage} />
    </div>
  );
}

export default Parent;
```

**子组件（ChildComponent.jsx）**

```jsx
import React from 'react';

function ChildComponent({ updateMessage }) {
  return (
    <div>
      <h3>Child Component</h3>
      <button onClick={() => updateMessage('Hello from Child!')}>Send Message to Parent</button>
    </div>
  );
}

export default ChildComponent;
```

---

# **总结**

| 方式       | Vue 2                  | React                |
| ---------- | ---------------------- | -------------------- |
| **父传子** | `props`                | `props`              |
| **子传父** | `$emit('event', data)` | `props 传递回调函数` |

Vue 2 使用 `$emit`，React 通过 **回调函数** 传递数据。React 的方式更符合 JavaScript 逻辑，而 Vue 2 的 `$emit` 更直观。

---
sidebar_position: 21
title: 前端基础-js eventloop ⚡️
---

## 思维导图

<img src="http://t-blog-images.aijs.top/img/事件循环.png" style={{ maxWidth: "100%", width: "500px" }}/>

## 背景

JavaScript 在设计之初便是单线程，即指程序运行时，只有一个线程存在，同一时间只能做一件事

为什么要这么设计，跟 JavaScript 的应用场景有关

JavaScript 初期作为一门浏览器脚本语言，通常用于操作 DOM ，如果是多线程，一个线程进行了删除 DOM ，另一个添加 DOM，此时浏览器该如何处理？

为了解决单线程运行阻塞问题，JavaScript 用到了计算机系统的一种运行机制，这种机制就叫做事件循环（Event Loop）

## 运行环境

js 运行的环境,被称为`宿主环境`，目前有三种运行环境，

- 一种运行在`浏览器(javaScript)`
- 一种运行在`服务端(nodejs)`
- 另一种是运行在我们的`客户端(比如 Vscode 客户端就是使用 js 写的)`

其他的比如：IOS 中`jscore`，Android `JavascriptInterace`, C++ `JSI`

**因此只要给 js 配备的相应的执行引擎，js 可以运行在任何环境**

## 浏览器宿主环境

<img src="http://t-blog-images.aijs.top/img/20220729223730.png" style={{height: 60}}/>

### JS 线程

负责执行执行栈的最顶层 JS 代码
和 GUI 渲染线程互斥，JS 运行耗时过长就会导致页面阻塞。

### GUI 线程

负责渲染页面,解析 HTML、CSS 构成 渲染树等，当页面重绘或者由于某种操作引起回流都会调起该线程。
和 JS 引擎线程是互斥的，当 JS 引擎线程在工作的时候，GUI 渲染线程会被挂起，GUI 更新被放入在 JS 任务队列中，等待 JS 引擎线程空闲的时候继续执行。

### 事件监听线程

`(DOM 事件，window 窗口事件等等)`

当事件符合触发条件被触发时，该线程会把对应的事件回调函数添加到事件队列的队尾，等待 JS 引擎处理。

### 计时线程

`（SetTimeout、setInterval 计时器）`

开启定时器触发线程来计时并触发计时，计时完毕后，将计时器结束的回调函数添加到事件队列中，等待 JS 引擎空闲后执行，等待 JS 引擎处理。
浏览器定时计数器并不是由 JS 引擎计数的，阻塞会导致计时不准确。

### 网络线程

`（ajax 网络请求）`

http 请求的时候会开启一条请求线程。
请求完成有结果了之后，将请求的 http 回调函数添加到任务队列中，等待 JS 引擎处理。

## 两个概念

- 栈是先进后出

- 队列先进先出

## 事件队列

事件队列在不同的宿主环境中有所差异，大部分宿主环境会将事件队列进行细分。在浏览器中，事件队列分为两种：

`宏任务（队列）macroTack`：计时器结束的回调、事件回调、http 回调等等绝大部分异步函数进入宏队列
`微任务（队列）microTack`：`MutationObserver`,`Promise 产生的回调`进入微队列

当执行栈清空时、JS 引擎首`先会将微任务中的所有任务依次执行结束`，如果没有微任务，执行宏任务

## 事件循环(Event Loop)

事件循环分为三个部分，分别由 `浏览器宿主`，`web api` 与 `事件队列（也称任务队列）`组成

## 执行栈

由于 JavaScript 引擎是单线程，同一时间只能执行一个任务，其他任务都得按照顺序排队等待被执行，只有当前的任务执行完成之后才会往下执行下一个任务，因此这些任务被排队在一个单独的地方。这个地方被称为执行栈

`执行栈是一个后进先出数据结构`，用于存放各种函数的执行环境，
每一个函数执行之前，它的相关信息会加入到执行栈，
函数调用之前，创建执行环境，然后 push 到执行栈；
函数调用之后，销毁执行环境，并从执行栈顶部推（pop）出去

## Event Loop 在浏览器与 node 环境中的区别： ⚡️

浏览器环境每次执行一个宏任务，再去检查微任务
node 会清空当前所处阶段的队列，即执行所有 task，再去检查微任务

## 浏览器环境 事例

### 事例 1

```js
<script>
    function a() {
        console.log("a")
        b();
    }

    function b() {
        console.log("b");
        c();
    }

    function c() {
        console.log("c")
    }

    console.log("global");
    a();
</script>

```

### 事例 2

```js
console.log(1);

setTimeout(() => {
  console.log(2);
  setTimeout(() => {
    console.log(3);
    setTimeout(() => {
      console.log(4);
    }, 0);
  }, 0);
}, 0);

setTimeout(() => {
  console.log(5);
  setTimeout(() => {
    console.log(6);
  }, 0);
}, 0);

console.log('ok');
```

### 事例 3

```js
console.log(1);

setTimeout(() => {
  console.log('setTimeout');
}, 0);

let promise = new Promise((resolve) => {
  console.log(3);
  resolve();
})
  .then((data) => {
    console.log(100);
  })
  .then((data) => {
    console.log(200);
  });

console.log(2);
```

## 参考链接

<a href="https://zhuanlan.zhihu.com/p/41543963" target="_blank" >Event Loop 这个循环你晓得么？(附 GIF 详解)</a>

<a href="https://juejin.cn/post/6844904008134426638" target="_blank" >[回顾]事件循环机制 (Event-loop)</a>

---
sidebar_position: 3
title: 面试题汇总 ⚡️
---

1. <img src="https://img0.baidu.com/it/u=4204937089,859074527&fm=253&fmt=auto&app=138&f=JPEG?w=255&h=255" />

2. <a href="https://www.nowcoder.com/discuss/763567" target="_blank" >小红书前端面经</a>

3. <a href="https://juejin.cn/post/7013953652578582558?share_token=ad9faad3-d177-4d34-9228-086d1d192112" target="_blank" >前端两年经验，历时一个月的面经和总结</a>

4. <a href="https://cloud.tencent.com/developer/article/1663670" target="_blank" >【面试题】CSS 知识点整理(附答案)</a>

## HTTP 与 TCP

1. <a href="https://blog.csdn.net/SuNew_bee/article/details/117303320" target="_blank" >HTTP/1.1、HTTP/2、HTTP/3 对 HTTP 的改进</a>
2. <a href="https://blog.csdn.net/SuNew_bee/article/details/117248731?spm=1001.2014.3001.5502" target="_blank" >TCP 三次握手</a>
3. <a href="https://blog.csdn.net/SuNew_bee/article/details/117251247?spm=1001.2014.3001.5502" target="_blank" >TCP 四次挥手</a>
4. <a href="https://blog.csdn.net/SuNew_bee/article/details/117257895?spm=1001.2014.3001.5502" target="_blank" >TCP 重传机制</a>
5. <a href="https://blog.csdn.net/SuNew_bee/article/details/117263730?spm=1001.2014.3001.5502" target="_blank" >流量控制</a>
6. <a href="https://www.likecs.com/show-204397172.html" target="_blank" >HTTP 请求和 TCP 链接的对应关系</a>
7. <a href="https://blog.csdn.net/sinat_41696687/article/details/123458338" target="_blank" >彻底搞懂进程与线程之间的联系</a>
8. <a href="https://zhuanlan.zhihu.com/p/420055986" target="_blank" >TLS/SSL</a>
9. <a href="https://juejin.cn/post/6871060072936505352" target="_blank" >TLS/SSL</a>
10. <a href="https://baijiahao.baidu.com/s?id=1633945802472340217&wfr=spider&for=pc" target="_blank" >CDN</a>
11. <a href="https://www.jianshu.com/p/60cc4ea02971/" target="_blank" >websocket 面试题</a>
12. <a href="https://blog.csdn.net/weixin_42674490/article/details/120647995" target="_blank" >websocket 使用</a>

## 状态码的含义

1. 101 SwitchingProtocols，表示切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议
2. <a href="https://www.bbsmax.com/A/gGdX3AWm54/" target="_blank" >204 状态码的含义</a>
3. 206 partial Content, 进行范围请求，打开 B 站的视频可以看到 206 请求

## 身份信息

<!-- <a href="https://zhuanlan.zhihu.com/p/482474619" target="_blank" >JWT 史上最全面试题(大厂常问)</a> -->

1. <a href="https://www.php.cn/website-design-ask-484695.html" target="_blank" >JWT</a>
2. <a href="https://zhuanlan.zhihu.com/p/66037342" target="_blank" >单站点登录</a>

## ES6

1. <a href="https://blog.csdn.net/Dax1_/article/details/123185260" target="_blank" >总结 ES6 中 Map 和 Set 的特点与比较</a>
2. <a href="https://www.itheima.com/news/20201110/183621.html" target="_blank" >从 async/await 面试题看宏观任务和微观任务</a>
3. <a href="https://www.jianshu.com/p/844e293d90a7" target="_blank" >箭头函数和普通函数的区别</a>

## js

1. <a href="https://zhuanlan.zhihu.com/p/142681436?from_voters_page=true" target="_blank" >js 堆和栈的区别</a>
2. <a href="https://segmentfault.com/a/1190000039042550" target="_blank" >什么是闭包</a>
3. <a href="https://blog.csdn.net/z591102/article/details/110634593#:~:text=%E6%9C%BA%E7%A7%91%E5%AD%A6%E9%87%8C%EF%BC%8C-,%E5%B0%BE%E8%B0%83%E7%94%A8,-%E6%98%AF%E6%8C%87%E4%B8%80%E4%B8%AA" target="_blank" >tail 调用:尾调用优化（Tail Call Optimization，TCO）</a>
4. <a href="https://segmentfault.com/a/1190000013396601" target="_blank" >Promise 实现原理</a>
5. <a href="" target="_blank" >数据劫持 ……^\_^</a>

<hr />

**new 和 Object.create 都是创造一个对象的意思，二者有啥区别呢？**

<a href="https://www.jianshu.com/p/5f718f4a9441#:~:text=jack%27))-,Object.create(),-Object.create%E6%98%AF" target="_blank" >new / Object.create()的实现原理</a>

1. 用 Object.create()方法创建新对象,并使用现有对象提供新对象的 proto。
2. Object.create() 是 es5 组合继承的 es6 api
3. Object.create 克隆的对象也只能实现一级对象的深拷贝
4. <a href="https://blog.csdn.net/qq_48648782/article/details/118498146" target="_blank" >使用：创建子对象，让子对象继承父对象的同时，为子对象添加自有属性</a>

```ts
function myNew() {
  let obj = {};

  let func = [].shift.call(arguments); //出列，获取第一个参数

  obj.__proto__ = func.prototype; //proto指向原型

  var result = func.apply(obj, arguments); //让obj执行func函数

  return  result intanceof Object ? result :  obj;
}



function myCreate(obj) {
  let F = function () {};
  F.prototype = obj;
  return new F();
}
```

  <hr />
  
**对着图看**
<!-- ![](http://t-blog-images.aijs.top/img/20220617151244.webp) -->

<img src="http://t-blog-images.aijs.top/img/202207271745383.webp" />

## 浏览器

<a href="http://t.zoukankan.com/Zzbj-p-13923489.html" target="_blank" > 强缓存、协商缓存发生在 8 中的哪些阶段</a>

### 泄漏

<a href="https://mp.weixin.qq.com/s/0w6aWwpR3MAJnmyLwDnAzA" target="_blank" >JavaScript 内存泄漏防范之道</a>

1. `意外的全局变量`：全局变量一直处于可访问状态，不会被 GC 回收
2. `闭包`：函数作用域变量在函数执行完后会被清理，前提是在函数外部没有引用它
3. `定时器`： 在 setTimeout 或 setInterval 的回调函数中引用某些对象
4. `事件监听器`：活动的事件监听器会阻止作用域内的变量被 GC 回收
5. `缓存`： 持续不断地往缓存里增加数据，没有定时清除无用的对象，也没有限制缓存大小，那么缓存就会像滚雪球一样越来越大
6. `分离的 DOM 元素`：如果 DOM 节点被 JavaScript 代码直接引用，即使从 DOM 树分离，也不会被 GC 回收

## html

<a href="https://blog.csdn.net/oscar999/article/details/121044091" target="_blank" >HTML 如何禁用缓存</a>

```html
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
```

<a href="https://www.jianshu.com/p/50c37351f873" target="_blank" >onload、DOMContentLoaded 区别</a>

1. `onload` 事件触发时，页面上`所有的 DOM，样式表，脚本，图片`都已经加载完成了.
2. `DOMContentLoaded` 事件触发时，`仅当 DOM 加载完成`，不包括样式表，图片(譬如如果有 async 加载的脚本就不一定完成)

```js
// onload
window.onload = function () {
  var span = document.querySelector('span');
  console.log(span, 'onload');
};
// DOMConetentLoaded
document.addEventListener('DOMConetentLoaded', function () {
  var span = document.querySelector('span');
  console.log(span, 'DOMConetentLoaded');
});
```

## CSS3

### BFC

<a href="https://www.jianshu.com/p/274a9b3200b4" target="_blank" >BFC 与清除浮动</a>
根节点、浮动、定位[]、display[相关]、表格、网格、多列，总之是把一些子元素圈起来形成封闭的盒子，践行 BFC 的原则[独立、对外不影响（不重叠）]

<a href="https://blog.csdn.net/NCZB007/article/details/108440570" target="_blank" >.clearfix::after(清除浮动)中各个属性及值详细解说</a>

### 单行多行文字截断

<a href="https://blog.csdn.net/weixin_43613849/article/details/116561796" target="_blank" >css 中实现单行多行文字截断</a>

```css
/* 单行 */
div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

div {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 最多2行，2行装不下就用...省略 */
}
```

### css-modules

<a href="https://blog.csdn.net/xun__xing/article/details/108253723" target="_blank" >css module</a>

原理: 开启了 css module 后，css-loader 会将样式中的类名进行转换，转换为一个唯一的 hash 值。

### flex

<a href="/#/post/2022-05-23width0" target="_blank" >flex 布局</a>

### 0.5px

<a href="https://juejin.cn/post/6844903582370643975" target="_blank" >怎么画一条 0.5px 的边（更新）</a>

### 总结伪类与伪元素

<a href="http://www.alloyteam.com/2016/05/summary-of-pseudo-classes-and-pseudo-elements/" target="_blank" >总结伪类与伪元素</a>

<div>

  <img src="http://t-blog-images.aijs.top/img/20220625174736.png" />

  <img src="http://t-blog-images.aijs.top/img/20220625174712.png" />
</div>

`:first-child` `:first-of-type` `:nth-child` `:nth-of-type` 区别

1. <a href="http://www.alloyteam.com/2016/05/summary-of-pseudo-classes-and-pseudo-elements/#prettyPhoto:~:text=2-,%3Afirst%2Dchild,-%E5%8C%B9%E9%85%8D%E5%85%83%E7%B4%A0%E7%9A%84" target="_blank" >:first-child</a> 匹配元素的第一个子元素。
2. <a href="http://www.alloyteam.com/2016/05/summary-of-pseudo-classes-and-pseudo-elements/#prettyPhoto:~:text=%7D-,4%20first%2Dof%2Dtype,-%E5%8C%B9%E9%85%8D%E5%B1%9E%E4%BA%8E%E5%85%B6" target="_blank" >:first-of-type</a> 匹配属于其父元素的首个特定类型的子元素的每个元素。
3. <a href="http://www.alloyteam.com/2016/05/summary-of-pseudo-classes-and-pseudo-elements/#prettyPhoto:~:text=%7D-,6%20%3Anth%2Dchild,-%3Anth%2Dchild%20%E6%A0%B9%E6%8D%AE" target="_blank" >:nth-child </a> 根据元素的位置匹配一个或者多个元素，它接受一个 an+b 形式的参数，an+b 匹配到的元素示例如下：
   1n+0，或 n，匹配每一个子元素。
   2n+0，或 2n，匹配位置为 2、4、6、8… 的子元素，该表达式与关键字 even 等价。
   2n+1 匹配位置为 1、3、5、7… 的子元素、该表达式与关键字 odd 等价。
   3n+4 匹配位置为 4、7、10、13… 的子元素。
   :nth-of-type

4. <a href="http://www.alloyteam.com/2016/05/summary-of-pseudo-classes-and-pseudo-elements/#prettyPhoto:~:text=%E5%BC%80%E5%A7%8B%E8%AE%A1%E6%95%B0%E7%9A%84%E3%80%82-,8%20%3Anth%2Dof%2Dtype,-%3Anth%2Dof%2Dtype" target="_blank" >:nth-of-type</a> 与 nth-child 相似，不同之处在于它是只匹配特定类型的元素。

## position

<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/position" target="_blank" >position 的几个属性和含义</a>

### static

该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。此时 `top, right, bottom, left 和 z-index` 属性无效。

### relative

1. 该关键字下，元素先放置在未添加定位时的位置，再在不改变页面布局的前提下调整元素位置（因此会在此元素未添加定位时所在位置留下空白）。
2. position:relative 对 `table-*-group, table-row, table-column, table-cell, table-caption` 元素无效。

### absolute

1. 元素会被移出正常文档流，并不为元素预留空间，
2. 通过指定元素相对于最近的非 static 定位祖先元素的偏移，来确定元素位置。
3. 绝对定位的元素可以设置外边距（margins），且不会与其他边距合并。

### fixed

1. 元素会被移出正常文档流，并不为元素预留空间，
2. 而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变。
3. 打印时，元素会出现在的每页的固定位置。
4. `fixed 属性会创建新的层叠上下文`。
5. `并非永远以视口进行定位` 当元素祖先的 `transform、perspective、filter 或 backdrop-filter 属性非 none 时`，容器由视口改为该祖先。

### sticky

1. 元素根据正常文档流进行定位，然后相对它的`最近滚动祖先`（nearest scrolling ancestor）和 containing block（`最近块级祖先` nearest block-level ancestor），包括 `table-related` 元素，基于 top、right、bottom 和 left 的值进行偏移。
2. 偏移值不会影响任何其他元素的位置。
3. `该值总是创建一个新的层叠上下文（stacking context）`。
4. 注意，`一个 sticky 元素会“固定”在离它最近的一个拥有“滚动机制”的祖先上`（当该祖先的 overflow 是 hidden、scroll、auto 或 overlay 时），`即便这个祖先不是最近的真实可滚动祖先`。这有效地抑制了任何“sticky”行为（详情见 Github issue on W3C CSSWG）

说一下盒模型

<a href="https://www.jianshu.com/p/ce7e4a997a2c" target="_blank" >vertical-align 到底怎么用</a>

<a href="https://blog.csdn.net/qq_52340302/article/details/119238781" target="_blank" >六种常用的 css 三栏布局方法</a>

## 响应式

1. <a href="https://juejin.cn/post/6844903814332432397" target="_blank" >前端响应式布局原理与方案（详细版）</a>
2. <a href="https://juejin.cn/post/6844903814332432397#:~:text=%E5%AF%B9%E4%BA%8E%E9%9C%80%E8%A6%81%E4%BF%9D%E6%8C%81%E5%AE%BD%E9%AB%98%E6%AF%94%E7%9A%84%E5%9B%BE%EF%BC%8C%E5%BA%94%E8%AF%A5%E7%94%A8padding%2Dtop%E5%AE%9E%E7%8E%B0" target="_blank" >对于需要保持宽高比的图，应该用 padding-top 实现(一种为了解决，图片未加载出来，高度为 0 加载完后，有了内容发生跳变的现象)</a>
3. <a href="https://juejin.cn/post/6844903814332432397#:~:text=1%E7%89%A9%E7%90%86%E5%83%8F%E7%B4%A0%E7%BA%BF%EF%BC%88%E4%B9%9F%E5%B0%B1%E6%98%AF%E6%99%AE%E9%80%9A%E5%B1%8F%E5%B9%95%E4%B8%8B1px%2C%E9%AB%98%E6%B8%85%E5%B1%8F%E5%B9%95%E4%B8%8B0.5px%E7%9A%84%E6%83%85%E5%86%B5%EF%BC%89%E9%87%87%E7%94%A8transform%E5%B1%9E%E6%80%A7scale%E5%AE%9E%E7%8E%B0" target="_blank" >1 物理像素线</a>

## 算法

1. <a href="https://www.nowcoder.com/exam/oj?tab=%E7%AE%97%E6%B3%95%E7%AF%87&topicId=295" target="_blank" >刷算法</a>
2. <a href="https://juejin.cn/post/6844903846779551751" target="_blank" >前端面试之手写代码</a>

## 安全

### 防盗刷

1. <a href="http://bigdata.ctocio.com.cn/bigdata/2022/0506/157700.html" target="_blank" >怎么实现接口防刷</a>
2. <a href="https://blog.csdn.net/liujiango/article/details/107372364" target="_blank" >怎么实现接口防刷</a>

**两种情况**

1. 恶意访问：使用工具进行不停的循环访问，占用系统资源，影响系统正常的对外服务
2. 支付接口、发短信接口等： 这种接口直接会导致企业的损失，更要注意。

**应对措施：**

1. 限制访问的频率：每访问一次就给这个 IP+1，比如限制 1w 次，加到 1W 次就拒绝访问，直到过期，这种方式简单粗暴，对于恶意攻击、爬虫抓取很有效果，但难免会有误伤，影响正常的访问请求。
2. 人机校验，验证码
3. 限制发送频率：验证码发送频率 1 次/分钟
4. 后端逻辑验证：避免重放攻击。如：已处理的订单不重复处理，增加时间戳，对于过期的请求不再进行处理
5. 接口访问监控：ip 访问频率异常，如果达到一定数量，进行系统报警，通知管理员，以降低损失

## vue

<a href="https://blog.csdn.net/weixin_45743636/article/details/118100951" target="_blank" >computed 与 watch 的区别</a>

1. **功能上**：computed 是计算属性，watch 是监听一个值的变化，然后执行对应的回调。
2. **是否调用 缓存**：computed 中的函数所依赖的属性没有发生变化，那么调用当前的函数的时候会从缓存中读取，而 watch 在每次监听的值发生变化的时候都会执行回调。
3. **是否调用 return**：computed 中的函数必须要用 return 返回，watch 中的函数不是必须要用 return。
4. **初次计算** computed 默认第一次加载的时候就开始监听；watch 默认第一次加载不做监听，如果需要第一次加载做监听，添加 immediate 属性，设置为 true（immediate:true）
5. **使用场景**：
   1. computed----当一个属性受多个属性影响的时候，使用 computed-----购物车商品结算。
   2. watch–当一条数据影响多条数据的时候，使用 watch-----搜索框.

## react

### React Router 原理

<a href="https://blog.csdn.net/weixin_39907713/article/details/111237885" target="_blank" >React Router 原理</a>
<a href="https://blog.csdn.net/qingfeng2020/article/details/121136648" target="_blank" >浅谈前端路由原理，VueRouter 原理和 ReactRouter 原理</a>
<a href="https://blog.csdn.net/Android_boom/article/details/125200222" target="_blank" >React Router 源码解析</a>

### 合成事件机制

<a href="https://wenku.baidu.com/view/dbc762dc740bf78a6529647d27284b73f342365b.html" target="_blank" >React 合成事件机制</a>
<a href="https://baijiahao.baidu.com/s?id=1727882238371627418&wfr=spider&for=pc" target="_blank" >web 前端培训 React 合成事件原理解析</a>

<a href="https://www.jianshu.com/p/a68219093f88" target="_blank" >React 事件机制 – 合成事件</a>

- **原生事件**
  当某个元素触发某个事件（如 onclick ），顶层对象 Document 就会发出一个事件流，随着 DOM 树的节点向目标元素节点流去，直到到达事件真正发生的目标元素。
- **事件目标**
  当到达目标元素之后，执行目标元素该事件相应的处理函数。如果没有绑定监听函数，那就不执行。
- **事件冒泡**
  从目标元素开始，往顶层元素传播。途中如果有节点绑定了相应的事件处理函数，这些函数都会被触发一次。
- **事件委托/事件代理**
  - 简单理解就是将一个响应事件委托到另一个元素。
  - 当子节点被点击时，click 事件向上冒泡，父节点捕获到事件后，我们判断是否为所需的节点，然后进行处理。
- **合成事件与原生事件区别**
  1. 事件名称命名方式不同
  2. 事件处理函数写法不同
  3. 阻止默认行为方式不同
- **React 合成事件与原生事件执行顺序**
  <!-- - 类似洋葱，
    捕获：`document => react 父级 => react 子级 => 父级原生 => 子级原生`
    冒泡：`document <= react 父级 <= react 子级 <= 父级原生 <= 子级原生` -->
- **阻止冒泡**
- **原生:** 使用 `e.stopPropagation()` 或者 `e.cancelBubble=true`（IE）来阻止
- **react 中，**阻止冒泡的方式有三种：
  1. 阻止合成事件与非合成事件（除了 document）之间的冒泡，以上两种方式都不适用，需要用到 e.target 判断。
  2. 阻止合成事件与最外层 document 上的事件间的冒泡，用 `e.nativeEvent.stopImmediatePropagation()`;
  3. 阻止合成事件间的冒泡，用 `e.stopPropagation()`;

### 阻止事件冒泡

:::tip

react 阻止事件冒泡

1. `e.stopPropagation`用来阻止 React 模拟的事件冒泡
2. `e.stopImmediatePropagation` 没这个函数
3. `e.nativeEvent.stopPropagation` 原生事件对象的用于阻止 DOM 事件的进一步捕获或者冒泡
4. `e.nativeEvent.stopImmediatePropagation` 原生事件对象用于阻止 dom 事件的进一步捕获或者冒泡，且该元素的后续绑定相同事件类型的事件，都会被阻止

:::

### setState

<a href="https://zhuanlan.zhihu.com/p/150993869#:~:text=memo%E5%87%BD%E6%95%B0-,2.4.4.%20%E4%B8%8D%E5%8F%AF%E5%8F%98%E6%95%B0%E6%8D%AE%E7%9A%84%E5%8A%9B%E9%87%8F,-%E6%88%91%E4%BB%AC%E9%80%9A%E8%BF%87%E4%B8%80%E4%B8%AA" target="_blank" >setState 返回一样的引用，render 会执行吗</a>

### useEffect

<a href="https://zh-hans.reactjs.org/docs/hooks-effect.html#:~:text=%E6%89%A7%E8%A1%8C%E5%BD%93%E5%89%8D%20effect%20%E4%B9%8B%E5%89%8D%E5%AF%B9%E4%B8%8A%E4%B8%80%E4%B8%AA%20effect%20%E8%BF%9B%E8%A1%8C%E6%B8%85%E9%99%A4" target="_blank" >useEffect 的使用方法？useEffect 的 return 会在什么时候执行？useEffect 原理是什么？</a>

### PureComponent 和 Component 的区别

<a href="https://blog.csdn.net/leelxp/article/details/108218088#:~:text=%E6%88%91%E4%BB%AC%E6%9D%A5%E7%9C%8B%E7%9C%8BPureComponent%E5%92%8CComponent%E7%9A%84%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F%C2%A0" target="_blank" >PureComponent 和 Component 的区别是什么？ </a>

**区别**

1、和 Component 的一个最大的区别在于 PureComponent 会自动执行 shouldComponentUpdate 函数，通过 shallowEqual 的浅对比，实现 react 的性能优化。而 Component 必须要通过自己去调用生命周期函数 shouldComponentUpdate 来实现 react 组件的优化。

2、PureComponent `不仅会影响本身，而且会影响子组件，所以 PureComponent 最佳情况是展示组件`

（1）父子组件都是继承 Component 那么就是只要有更新，那么都会去重新渲染

（2）父组件是继承 Component，而子组件是继承 PureComponent 那么就是看各自的 props 和 state

（3）父子组件均继承 PureComponent，父子组件的更新就会依赖各自的 props 和 state

（4）父组件继承 PureComponent,子组件是继承 Component，那么如果当父组件的 props 或者是 state 没有变化, 而子组件的 props 或者 state 有变化，那么此时子组件也不会有更新，因为子组件受到父组件的影响，父组件没有更新。

3、`如果是数组和对象等引用类型，则要引用不同，才会渲染`

4、`如果 prop 和 state 每次都会变，那么 PureComponent 的效率还不如 Component`，因为进行浅比较也是需要时间

5、`如果有 shouldComponentUpdate，则执行它，若没有这个方法会判断是不是 PureComponent，若是，进行浅比较`

### diff

**单节点 Diff**
<a href="https://react.iamkasong.com/diff/one.html" target="_blank" >单节点 diff</a>

**多节点 Diff**
<a href="https://react.iamkasong.com/diff/multi.html#diff%E7%9A%84%E6%80%9D%E8%B7%AF:~:text=%23-,%E7%AC%AC%E4%B8%80%E8%BD%AE%E9%81%8D%E5%8E%86,-%E7%AC%AC%E4%B8%80%E8%BD%AE%E9%81%8D" target="_blank" >第一轮遍历</a>

<a href="https://react.iamkasong.com/diff/multi.html#%E7%AC%AC%E4%B8%80%E8%BD%AE%E9%81%8D%E5%8E%86:~:text=%23-,%E7%AC%AC%E4%BA%8C%E8%BD%AE%E9%81%8D%E5%8E%86,-%E5%AF%B9%E4%BA%8E%E7%AC%AC%E4%B8%80%E8%BD%AE" target="_blank" >第二轮遍历</a>

### 手动实现 useEffect

<a href="http://events.jianshu.io/p/21007102ee21" target="_blank" >React Hook：手动实现 useEffect</a>

```jsx
// 用来存储每次调用useEffect时传入的依赖数组
let prevDepsAry = [];
// 用索引记录每个回调函数对应的依赖数组
let effectIndex = 0;

function useEffect(callback, depsAry) {
  // 先判断参数类型是否正确
  // 如果callback不是函数类型，直接报错
  if (Object.prototype.toString.call(callback) !== '[object Function]') throw new Error(`${callback} 必须是一个函数类型`);
  // 判断依赖数组有没有传入
  if (depsAry === undefined) {
    // 没传入则每次函数重新调用都要执行回调函数
    callback();
  } else {
    // 判断depsAry是否是一个数组类型，如果不是，直接报错
    if (Object.prototype.toString.call(depsAry) !== '[object Array]') throw new Error(`${depsAry} 必须是一个数组类型`);
    // 是数组类型，则需要获取上一次的依赖数组，逐项对比是否发生改变
    let prevDeps = prevDepsAry[effectIndex];
    // 判断是否发生改变，判断prevDeps是否存在
    const hasChanged = prevDeps ? depsAry.every((dep, index) => dep === prevDeps[index]) === false : true;
    if (hasChanged) {
      // 有依赖发生改变，调用callback
      callback();
    }
    // 同步本次更改后的依赖数组
    prevDepsAry[effectIndex] = depsAry;
    effectIndex++;
  }
}
```

### 手动实现 useState

<a href="http://events.jianshu.io/p/8256f8046066" target="_blank" >React Hook: 手动实现 useState</a>

```jsx
// 存储状态的数组
let state = [];
// 存储更改状态方法的数组
let setters = [];
// 用来记录状态和更改状态方法对应关系的下标
let stateIndex = 0;

function createSetter(index) {
  return function (newState) {
    state[index] = newState;
    render();
  };
}

function useState(initialState) {
  state[stateIndex] = state[stateIndex] ? state[stateIndex] : initialState;
  // 采用闭包缓存每个state对应的setState
  setters.push(createSetter(stateIndex));
  const value = state[stateIndex];
  const setter = setters[stateIndex];
  // 每创建完一组都要+1，用来作为下一组状态的索引
  stateIndex++;
  return [value, setter];
}
```

### ⽣命周期

<a href="https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/" target="_blank" >react 生命周期图谱</a>

<!-- <div>

<iframe src="https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/" height=600 width='100%'></iframe>

</div> -->

### Context 原理

<a href="https://blog.csdn.net/weixin_45654582/article/details/122740125#:~:text=dependencies%20%E5%BB%BA%E7%AB%8B%E8%B5%B7%E5%85%B3%E8%81%94%E3%80%82-,Context%20%E5%8E%9F%E7%90%86,-Provider%20%E4%BC%A0%E9%80%92%E6%B5%81%E7%A8%8B" target="_blank" >Context 原理</a>

1. Provider 传递流程：Provider 的更新，会 深度遍历子代 fiber，消费 context 的 fiber 和父级链都会 提升更新优先级。 对于类组件的 fiber ，会 forceUpdate 处理。接下来所有消费的 fiber，都会 beginWork 。
2. Context 订阅流程： contextType ， useContext， Consumer 会内部调用 readContext ，readContext 会把 fiber 上的 dependencies 属性 和 context 对象 建立起关联。

### Hooks 的实现原理

<a href="https://blog.csdn.net/github_37759996/article/details/119187241" target="_blank" >Hooks 的实现原理</a>

### 类组件和纯函数组件的区别

<a href="https://blog.csdn.net/XH_jing/article/details/124188256" target="_blank" >类组件和纯函数组件的区别</a>

1. 函数式编程，面向对象编程角度来说
2. 回到组件上，react hook 产生的原因 角度来说
   1. 组件状态复用艰难，
   2. 让人无奈的 this 问题，
   3. 高阶组件和函数组件的嵌套层次太深，
   4. 复杂组件变得难以理解，
   5. 以及难以记忆的生命周期等问题很让人头大

### React dom 绑定事件和原生事件

<a href="https://www.php.cn/website-design-ask-491123.html" target="_blank" >React dom 绑定事件和原生事件有什么区别</a>

### useState 的源码解析

<a href="https://juejin.cn/post/7064444554727915556" target="_blank" >useState 的源码解析</a>

### 什么是 Virtual DOM？

Virtual DOM 是一种编程概念。在这个概念里， UI 以一种理想化的，或者说“虚拟的”表现形式被保存于内存中，并通过如 ReactDOM 等类库使之与“真实的” DOM 同步。这一过程叫做协调

### 什么是 “React Fiber”？

Fiber 是 React 16 中新的协调引擎。它的主要目的是使 Virtual DOM 可以进行增量式渲染

## 稳操胜券

1. <a href="http://dljz.nicethemes.cn/news/show-13202.html" target="_blank" >看完这篇文章保你面试稳操胜券 ——（必考题）javaScript 篇</a>
2. <a href="https://copyfuture.com/blogs-details/20211119150923474f" target="_blank" >看完这篇文章保你面试稳操胜券——基础篇（html/css)</a>
3. <a href="https://www.wangt.cc/2021/11/%E7%9C%8B%E5%AE%8C%E8%BF%99%E7%AF%87%E6%96%87%E7%AB%A0%E4%BF%9D%E4%BD%A0%E9%9D%A2%E8%AF%95%E7%A8%B3%E6%93%8D%E8%83%9C%E5%88%B8-vue%E7%AF%87/" target="_blank" >看完这篇文章保你面试稳操胜券-vue 篇</a>
4. <a href="https://copyfuture.com/blogs-details/20211118131747765L" target="_blank" >读完这篇保你面试稳操胜券——前端面试题“骨灰级”总结</a>

## webpack

1. <a href="https://zhuanlan.zhihu.com/p/472733451" target="_blank" >Webpack | TreeShaking 工作原理</a>
2. <a href="https://juejin.cn/post/7039547628379439135" target="_blank" >什么是 tree-shaking</a>
3. <a href="https://juejin.cn/post/6844903924806189070" target="_blank" >Webpack 优化——将你的构建效率提速翻倍</a>
4. <a href="https://juejin.cn/post/6844903685407916039" target="_blank" >Webpack 揭秘——走向高阶前端的必经之路</a>
5. <a href="https://www.cnblogs.com/zhilili/p/14721434.html" target="_blank" >webpack（四）——webpack 里面的 plugin 和 loader 的区别</a>
6. <a href="https://zhuanlan.zhihu.com/p/429072485" target="_blank" >跟着源码了解 Webpack 编译流程</a>
7. <a href="https://blog.csdn.net/qq_39207948/article/details/102768659" target="_blank" >说一下对 tree-shaking 的了解，对 CommonJS 和 ESM 都可以用 tree-shaking 吗</a>
8. <a href="https://www.webpackjs.com/contribute/writing-a-loader/" target="_blank" >编写一个 loader</a>
9. <a href="https://www.webpackjs.com/contribute/writing-a-plugin/" target="_blank" >编写一个插件</a>
10. <a href="https://juejin.cn/post/6918998088010956807" target="_blank" >Webpack5 的事件流和插件机制</a>

<!-- <a href="https://cloud.tencent.com/developer/article/1432511" target="_blank" >Webpack 4 教程 - 第四部分，使用 SplitChunksPlugin 分离代码</a>
<a href="https://cloud.tencent.com/developer/article/1432714" target="_blank" >Webpack 4 教程 - 第七部分 减少打包体积与 Tree Shaking</a>
<a href="https://cloud.tencent.com/developer/article/1017015" target="_blank" >优化 Webpack 构建性能的几点建议</a>

```js
{
  体积小： 合适的 source-map、减少代码体积、 webpack-bundle-analyzer进行分析
  范围小：目录检索范围、检索路径
  缓存：开启 loader、plugin 缓存
  不重复打包：DLLPlugin + DLLRefrencePlugin 、 externals
}
``` -->

<a href="https://javajgs.com/archives/36777" target="_blank" >常见 loader 使用 , 不好看，有乱七八糟图片，img 样式设置 display: none;</a>

- 文件相关：
- JSON 相关：
- JS/TS 转译:
- 模版：
- 样式：
- lint 校验：
- 测试：
- 框架：

## 性能

<a href="https://juejin.cn/post/6844903655330562062" target="_blank" >网站性能优化实战——从 12.67s 到 1.06s 的故事</a>

<a href="/#/post/2022-05-12performance" target="_blank" >浏览器首屏优化-首屏时间获取</a>

## 博客推荐

<a href="https://blog.csdn.net/JHXL_?type=blog" target="_blank" >几何心凉</a>

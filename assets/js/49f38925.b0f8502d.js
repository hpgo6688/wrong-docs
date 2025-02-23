"use strict";(self.webpackChunkdoc_site=self.webpackChunkdoc_site||[]).push([[5009],{538:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>i,contentTitle:()=>t,default:()=>a,frontMatter:()=>l,metadata:()=>r,toc:()=>o});const r=JSON.parse('{"id":"react/index","title":"vue -> react","description":"Vue 2 \u548c React \u5728\u8bed\u6cd5\u4e0a\u6709\u8f83\u5927\u7684\u533a\u522b\uff0c\u4ee5\u4e0b\u662f\u5e38\u89c1\u7684\u8bed\u6cd5\u5bf9\u6bd4\uff1a","source":"@site/docs/react/index.md","sourceDirName":"react","slug":"/react/","permalink":"/wrong-docs/docs/react/","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/react/index.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1,"title":"vue -> react"},"sidebar":"reactSidebar","next":{"title":"vue vs react \u7236\u5b50\u7ec4\u4ef6\u901a\u4fe1","permalink":"/wrong-docs/docs/react/component-connect"}}');var c=s(5105),d=s(3881);const l={sidebar_position:1,title:"vue -> react"},t=void 0,i={},o=[{value:"<strong>1. \u7ec4\u4ef6\u5b9a\u4e49</strong>",id:"1-\u7ec4\u4ef6\u5b9a\u4e49",level:2},{value:"<strong>Vue 2</strong>",id:"vue-2",level:3},{value:"<strong>React</strong>",id:"react",level:3},{value:"<strong>2. \u6570\u636e\u7ed1\u5b9a</strong>",id:"2-\u6570\u636e\u7ed1\u5b9a",level:2},{value:"<strong>Vue 2</strong>",id:"vue-2-1",level:3},{value:"<strong>React</strong>",id:"react-1",level:3},{value:"<strong>3. \u4e8b\u4ef6\u5904\u7406</strong>",id:"3-\u4e8b\u4ef6\u5904\u7406",level:2},{value:"<strong>Vue 2</strong>",id:"vue-2-2",level:3},{value:"<strong>React</strong>",id:"react-2",level:3},{value:"<strong>4. \u6761\u4ef6\u6e32\u67d3</strong>",id:"4-\u6761\u4ef6\u6e32\u67d3",level:2},{value:"<strong>Vue 2</strong>",id:"vue-2-3",level:3},{value:"<strong>React</strong>",id:"react-3",level:3},{value:"<strong>5. \u5217\u8868\u6e32\u67d3</strong>",id:"5-\u5217\u8868\u6e32\u67d3",level:2},{value:"<strong>Vue 2</strong>",id:"vue-2-4",level:3},{value:"<strong>React</strong>",id:"react-4",level:3},{value:"<strong>6. \u7ec4\u4ef6\u901a\u4fe1</strong>",id:"6-\u7ec4\u4ef6\u901a\u4fe1",level:2},{value:"<strong>Vue 2</strong>",id:"vue-2-5",level:3},{value:"<strong>React</strong>",id:"react-5",level:3},{value:"<strong>7. \u751f\u547d\u5468\u671f</strong>",id:"7-\u751f\u547d\u5468\u671f",level:2},{value:"<strong>Vue 2</strong>",id:"vue-2-6",level:3},{value:"<strong>React</strong>",id:"react-6",level:3},{value:"<strong>8. \u8ba1\u7b97\u5c5e\u6027 vs. useMemo</strong>",id:"8-\u8ba1\u7b97\u5c5e\u6027-vs-usememo",level:2},{value:"<strong>Vue 2</strong>",id:"vue-2-7",level:3},{value:"<strong>React</strong>",id:"react-7",level:3},{value:"<strong>9. \u63d2\u69fd vs. children</strong>",id:"9-\u63d2\u69fd-vs-children",level:2},{value:"<strong>Vue 2</strong>",id:"vue-2-8",level:3},{value:"<strong>React</strong>",id:"react-8",level:3},{value:"<strong>\u603b\u7ed3</strong>",id:"\u603b\u7ed3",level:2}];function h(e){const n={code:"code",h2:"h2",h3:"h3",hr:"hr",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,d.R)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n.p,{children:"Vue 2 \u548c React \u5728\u8bed\u6cd5\u4e0a\u6709\u8f83\u5927\u7684\u533a\u522b\uff0c\u4ee5\u4e0b\u662f\u5e38\u89c1\u7684\u8bed\u6cd5\u5bf9\u6bd4\uff1a"}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)(n.h2,{id:"1-\u7ec4\u4ef6\u5b9a\u4e49",children:(0,c.jsx)(n.strong,{children:"1. \u7ec4\u4ef6\u5b9a\u4e49"})}),"\n",(0,c.jsx)(n.h3,{id:"vue-2",children:(0,c.jsx)(n.strong,{children:"Vue 2"})}),"\n",(0,c.jsxs)(n.p,{children:["Vue 2 \u4f7f\u7528 ",(0,c.jsx)(n.strong,{children:"\u5355\u6587\u4ef6\u7ec4\u4ef6\uff08SFC\uff09"}),"\uff0c\u6a21\u677f\u3001\u811a\u672c\u548c\u6837\u5f0f\u5206\u5f00\uff1a"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-vue",children:"\x3c!-- MyComponent.vue --\x3e\n<template>\n  <div>\n    <p>{{ message }}</p>\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      message: 'Hello Vue!',\n    };\n  },\n};\n<\/script>\n\n<style scoped>\np {\n  color: blue;\n}\n</style>\n"})}),"\n",(0,c.jsx)(n.h3,{id:"react",children:(0,c.jsx)(n.strong,{children:"React"})}),"\n",(0,c.jsxs)(n.p,{children:["React \u4f7f\u7528 ",(0,c.jsx)(n.strong,{children:"JSX"})," \u8bed\u6cd5\uff0cHTML \u5199\u5728 JavaScript \u4ee3\u7801\u4e2d\uff1a"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-jsx",children:"// MyComponent.jsx\nimport React, { useState } from 'react';\n\nfunction MyComponent() {\n  const [message, setMessage] = useState('Hello React!');\n\n  return (\n    <div>\n      <p>{message}</p>\n    </div>\n  );\n}\n\nexport default MyComponent;\n"})}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)(n.h2,{id:"2-\u6570\u636e\u7ed1\u5b9a",children:(0,c.jsx)(n.strong,{children:"2. \u6570\u636e\u7ed1\u5b9a"})}),"\n",(0,c.jsx)(n.h3,{id:"vue-2-1",children:(0,c.jsx)(n.strong,{children:"Vue 2"})}),"\n",(0,c.jsxs)(n.p,{children:["Vue 2 \u652f\u6301 ",(0,c.jsx)(n.strong,{children:"\u53cc\u5411\u6570\u636e\u7ed1\u5b9a"}),"\uff1a"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-vue",children:'<input v-model="message" />\n'})}),"\n",(0,c.jsx)(n.h3,{id:"react-1",children:(0,c.jsx)(n.strong,{children:"React"})}),"\n",(0,c.jsxs)(n.p,{children:["React \u91c7\u7528 ",(0,c.jsx)(n.strong,{children:"\u5355\u5411\u6570\u636e\u6d41"}),"\uff0c\u9700\u8981\u624b\u52a8\u66f4\u65b0 ",(0,c.jsx)(n.code,{children:"state"}),"\uff1a"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-jsx",children:"<input value={message} onChange={(e) => setMessage(e.target.value)} />\n"})}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)(n.h2,{id:"3-\u4e8b\u4ef6\u5904\u7406",children:(0,c.jsx)(n.strong,{children:"3. \u4e8b\u4ef6\u5904\u7406"})}),"\n",(0,c.jsx)(n.h3,{id:"vue-2-2",children:(0,c.jsx)(n.strong,{children:"Vue 2"})}),"\n",(0,c.jsxs)(n.p,{children:["Vue \u4f7f\u7528 ",(0,c.jsx)(n.code,{children:"v-on"}),"\uff08\u7b80\u5199 ",(0,c.jsx)(n.code,{children:"@"}),"\uff09\u7ed1\u5b9a\u4e8b\u4ef6\uff1a"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-vue",children:"<button @click=\"handleClick\">Click Me</button>\n\n<script>\nexport default {\n  methods: {\n    handleClick() {\n      console.log('Button clicked!');\n    },\n  },\n};\n<\/script>\n"})}),"\n",(0,c.jsx)(n.h3,{id:"react-2",children:(0,c.jsx)(n.strong,{children:"React"})}),"\n",(0,c.jsxs)(n.p,{children:["React \u4e8b\u4ef6\u5904\u7406\u4f7f\u7528 ",(0,c.jsx)(n.code,{children:"onClick"}),"\uff0c\u5e76\u4e14\u4e8b\u4ef6\u662f ",(0,c.jsx)(n.strong,{children:"\u9a7c\u5cf0\u547d\u540d"}),"\uff1a"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-jsx",children:"<button onClick={handleClick}>Click Me</button>;\n\nfunction handleClick() {\n  console.log('Button clicked!');\n}\n"})}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)(n.h2,{id:"4-\u6761\u4ef6\u6e32\u67d3",children:(0,c.jsx)(n.strong,{children:"4. \u6761\u4ef6\u6e32\u67d3"})}),"\n",(0,c.jsx)(n.h3,{id:"vue-2-3",children:(0,c.jsx)(n.strong,{children:"Vue 2"})}),"\n",(0,c.jsxs)(n.p,{children:["Vue \u4f7f\u7528 ",(0,c.jsx)(n.code,{children:"v-if"})," \u548c ",(0,c.jsx)(n.code,{children:"v-show"}),"\uff1a"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-vue",children:'<p v-if="isVisible">Visible</p>\n<p v-show="isVisible">Visible</p>\n'})}),"\n",(0,c.jsx)(n.h3,{id:"react-3",children:(0,c.jsx)(n.strong,{children:"React"})}),"\n",(0,c.jsxs)(n.p,{children:["React \u4f7f\u7528 ",(0,c.jsx)(n.strong,{children:"\u4e09\u5143\u8fd0\u7b97\u7b26"})," \u6216 ",(0,c.jsx)(n.code,{children:"&&"})," \u8fdb\u884c\u6761\u4ef6\u6e32\u67d3\uff1a"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-jsx",children:"{\n  isVisible ? <p>Visible</p> : null;\n}\n{\n  isVisible && <p>Visible</p>;\n}\n"})}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)(n.h2,{id:"5-\u5217\u8868\u6e32\u67d3",children:(0,c.jsx)(n.strong,{children:"5. \u5217\u8868\u6e32\u67d3"})}),"\n",(0,c.jsx)(n.h3,{id:"vue-2-4",children:(0,c.jsx)(n.strong,{children:"Vue 2"})}),"\n",(0,c.jsxs)(n.p,{children:["Vue \u4f7f\u7528 ",(0,c.jsx)(n.code,{children:"v-for"})," \u6e32\u67d3\u5217\u8868\uff1a"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-vue",children:'<ul>\n  <li v-for="(item, index) in items" :key="index">{{ item }}</li>\n</ul>\n'})}),"\n",(0,c.jsx)(n.h3,{id:"react-4",children:(0,c.jsx)(n.strong,{children:"React"})}),"\n",(0,c.jsxs)(n.p,{children:["React \u4f7f\u7528 ",(0,c.jsx)(n.code,{children:"map()"})," \u65b9\u6cd5\uff1a"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-jsx",children:"<ul>\n  {items.map((item, index) => (\n    <li key={index}>{item}</li>\n  ))}\n</ul>\n"})}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)(n.h2,{id:"6-\u7ec4\u4ef6\u901a\u4fe1",children:(0,c.jsx)(n.strong,{children:"6. \u7ec4\u4ef6\u901a\u4fe1"})}),"\n",(0,c.jsx)(n.h3,{id:"vue-2-5",children:(0,c.jsx)(n.strong,{children:"Vue 2"})}),"\n",(0,c.jsxs)(n.p,{children:["Vue \u4f7f\u7528 ",(0,c.jsx)(n.code,{children:"props"})," \u548c ",(0,c.jsx)(n.code,{children:"$emit"})," \u8fdb\u884c\u7236\u5b50\u7ec4\u4ef6\u901a\u4fe1\uff1a"]}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"\u7236\u7ec4\u4ef6"})}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-vue",children:'<ChildComponent :message="parentMessage" @updateMessage="handleUpdate" />\n'})}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"\u5b50\u7ec4\u4ef6"})}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-vue",children:"<template>\n  <button @click=\"$emit('updateMessage', 'New Message')\">Update</button>\n</template>\n\n<script>\nexport default {\n  props: ['message'],\n};\n<\/script>\n"})}),"\n",(0,c.jsx)(n.h3,{id:"react-5",children:(0,c.jsx)(n.strong,{children:"React"})}),"\n",(0,c.jsxs)(n.p,{children:["React \u901a\u8fc7 ",(0,c.jsx)(n.code,{children:"props"})," \u4f20\u9012\u6570\u636e\uff0c\u5b50\u7ec4\u4ef6\u901a\u8fc7\u56de\u8c03\u51fd\u6570\u5411\u7236\u7ec4\u4ef6\u4f20\u9012\u6570\u636e\uff1a"]}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"\u7236\u7ec4\u4ef6"})}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-jsx",children:"<ChildComponent message={parentMessage} updateMessage={setParentMessage} />\n"})}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"\u5b50\u7ec4\u4ef6"})}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-jsx",children:"function ChildComponent({ message, updateMessage }) {\n  return <button onClick={() => updateMessage('New Message')}>Update</button>;\n}\n"})}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)(n.h2,{id:"7-\u751f\u547d\u5468\u671f",children:(0,c.jsx)(n.strong,{children:"7. \u751f\u547d\u5468\u671f"})}),"\n",(0,c.jsx)(n.h3,{id:"vue-2-6",children:(0,c.jsx)(n.strong,{children:"Vue 2"})}),"\n",(0,c.jsx)(n.p,{children:"Vue \u63d0\u4f9b\u4e00\u7cfb\u5217\u751f\u547d\u5468\u671f\u94a9\u5b50\uff1a"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-vue",children:"<script>\nexport default {\n  created() {\n    console.log('Component created');\n  },\n  mounted() {\n    console.log('Component mounted');\n  },\n};\n<\/script>\n"})}),"\n",(0,c.jsx)(n.h3,{id:"react-6",children:(0,c.jsx)(n.strong,{children:"React"})}),"\n",(0,c.jsxs)(n.p,{children:["React \u901a\u8fc7 ",(0,c.jsx)(n.code,{children:"useEffect"})," \u5904\u7406\u751f\u547d\u5468\u671f\uff1a"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-jsx",children:"import { useEffect } from 'react';\n\nfunction MyComponent() {\n  useEffect(() => {\n    console.log('Component mounted');\n  }, []);\n\n  return <div>Component</div>;\n}\n"})}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)(n.h2,{id:"8-\u8ba1\u7b97\u5c5e\u6027-vs-usememo",children:(0,c.jsx)(n.strong,{children:"8. \u8ba1\u7b97\u5c5e\u6027 vs. useMemo"})}),"\n",(0,c.jsx)(n.h3,{id:"vue-2-7",children:(0,c.jsx)(n.strong,{children:"Vue 2"})}),"\n",(0,c.jsxs)(n.p,{children:["Vue \u4f7f\u7528 ",(0,c.jsx)(n.code,{children:"computed"}),"\uff1a"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-vue",children:'computed: { reversedMessage() { return this.message.split("").reverse().join(""); } }\n'})}),"\n",(0,c.jsx)(n.h3,{id:"react-7",children:(0,c.jsx)(n.strong,{children:"React"})}),"\n",(0,c.jsxs)(n.p,{children:["React \u4f7f\u7528 ",(0,c.jsx)(n.code,{children:"useMemo"}),"\uff1a"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-jsx",children:"import { useMemo } from 'react';\n\nconst reversedMessage = useMemo(() => message.split('').reverse().join(''), [message]);\n"})}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)(n.h2,{id:"9-\u63d2\u69fd-vs-children",children:(0,c.jsx)(n.strong,{children:"9. \u63d2\u69fd vs. children"})}),"\n",(0,c.jsx)(n.h3,{id:"vue-2-8",children:(0,c.jsx)(n.strong,{children:"Vue 2"})}),"\n",(0,c.jsxs)(n.p,{children:["Vue \u4f7f\u7528 ",(0,c.jsx)(n.code,{children:"slot"})," \u63d2\u5165\u5185\u5bb9\uff1a"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-vue",children:"<template>\n  <div>\n    <slot></slot>\n  </div>\n</template>\n"})}),"\n",(0,c.jsx)(n.h3,{id:"react-8",children:(0,c.jsx)(n.strong,{children:"React"})}),"\n",(0,c.jsxs)(n.p,{children:["React \u4f7f\u7528 ",(0,c.jsx)(n.code,{children:"children"}),"\uff1a"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-jsx",children:"function Wrapper({ children }) {\n  return <div>{children}</div>;\n}\n"})}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)(n.h2,{id:"\u603b\u7ed3",children:(0,c.jsx)(n.strong,{children:"\u603b\u7ed3"})}),"\n",(0,c.jsxs)(n.table,{children:[(0,c.jsx)(n.thead,{children:(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.th,{children:"\u7279\u6027"}),(0,c.jsx)(n.th,{children:"Vue 2"}),(0,c.jsx)(n.th,{children:"React"})]})}),(0,c.jsxs)(n.tbody,{children:[(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:"\u7ec4\u4ef6\u5b9a\u4e49"}),(0,c.jsxs)(n.td,{children:["SFC (",(0,c.jsx)(n.code,{children:"<template>"})," + ",(0,c.jsx)(n.code,{children:"<script>"})," + ",(0,c.jsx)(n.code,{children:"<style>"}),")"]}),(0,c.jsxs)(n.td,{children:["JSX (",(0,c.jsx)(n.code,{children:"return (<div></div>)"}),")"]})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:"\u6570\u636e\u7ed1\u5b9a"}),(0,c.jsxs)(n.td,{children:["\u53cc\u5411 (",(0,c.jsx)(n.code,{children:"v-model"}),")"]}),(0,c.jsxs)(n.td,{children:["\u5355\u5411 (",(0,c.jsx)(n.code,{children:"useState"}),")"]})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:"\u4e8b\u4ef6\u5904\u7406"}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:'@click="method"'})}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:"onClick={function}"})})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:"\u6761\u4ef6\u6e32\u67d3"}),(0,c.jsxs)(n.td,{children:[(0,c.jsx)(n.code,{children:"v-if"})," / ",(0,c.jsx)(n.code,{children:"v-show"})]}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:"{condition && <Component />}"})})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:"\u5217\u8868\u6e32\u67d3"}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:"v-for"})}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:".map()"})})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:"\u7ec4\u4ef6\u901a\u4fe1"}),(0,c.jsxs)(n.td,{children:[(0,c.jsx)(n.code,{children:"props"})," + ",(0,c.jsx)(n.code,{children:"$emit"})]}),(0,c.jsxs)(n.td,{children:[(0,c.jsx)(n.code,{children:"props"})," + \u56de\u8c03\u51fd\u6570"]})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:"\u751f\u547d\u5468\u671f"}),(0,c.jsxs)(n.td,{children:[(0,c.jsx)(n.code,{children:"created"})," / ",(0,c.jsx)(n.code,{children:"mounted"})," \u7b49"]}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:"useEffect"})})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:"\u8ba1\u7b97\u5c5e\u6027"}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:"computed"})}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:"useMemo"})})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:"\u63d2\u69fd/\u5b50\u7ec4\u4ef6\u5185\u5bb9"}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:"<slot>"})}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:"children"})})]})]})]}),"\n",(0,c.jsx)(n.p,{children:"Vue 2 \u66f4\u63a5\u8fd1\u4f20\u7edf HTML+CSS+JS \u7684\u5f00\u53d1\u65b9\u5f0f\uff0c\u6613\u4e8e\u4e0a\u624b\uff0c\u800c React \u66f4\u504f\u5411 JavaScript \u903b\u8f91\u9a71\u52a8\uff0c\u7075\u6d3b\u6027\u66f4\u9ad8\u3002\u4f60\u53ef\u4ee5\u6839\u636e\u81ea\u5df1\u7684\u9700\u6c42\u9009\u62e9\u5408\u9002\u7684\u6846\u67b6\u3002"})]})}function a(e={}){const{wrapper:n}={...(0,d.R)(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(h,{...e})}):h(e)}},3881:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>t});var r=s(8101);const c={},d=r.createContext(c);function l(e){const n=r.useContext(d);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:l(e.components),r.createElement(d.Provider,{value:n},e.children)}}}]);
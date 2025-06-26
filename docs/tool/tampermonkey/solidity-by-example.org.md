```js
// ==UserScript==
// @name        Solidity-by-Example Precise Resize
// @namespace   http://tampermonkey.net/
// @version     1.6
// @description 精确跟随鼠标的侧边栏宽度调整
// @author      ChatGPT
// @match       https://solidity-by-example.org/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=solidity-by-example.org
// @grant       none
// ==/UserScript==

(function() {
    'use strict';

    const MIN_WIDTH = 0;
    const MAX_WIDTH = 700;
    const RESIZER_WIDTH = 8;

    // 获取保存的宽度
    const savedWidth = localStorage.getItem('sideNavWidth');

    // 提前设置样式
    const style = document.createElement('style');
    style.textContent = `
        ._sideNav_nqcni_6 {
            width: ${savedWidth || 'auto'};
            min-width: ${MIN_WIDTH}px;
            box-sizing: border-box;
            transition: none!important;
        }
        ._sideNav_nqcni_6::-webkit-scrollbar {
           display: none; /* Chrome, Safari, Opera */
        }
    `;
    document.head.appendChild(style);

    window.addEventListener('load', () => {
        const sideNav = document.querySelector('._sideNav_nqcni_6');
        if (!sideNav) return;

        // 创建新的中间层容器
        const wrapper = document.createElement('div');
        wrapper.style.position = "relative";

        // 将 sideNav 从原父节点中移除
        const parentNode = sideNav.parentNode;
       // 将wrapper插入到父节点的第一个位置
        parentNode.insertBefore(wrapper, parentNode.firstChild);

        // 将sideNav移动到wrapper中
        wrapper.appendChild(sideNav);

        Object.assign(sideNav.style, {
            position: 'relative',
            minWidth: `${MIN_WIDTH}px`,
            boxSizing: 'border-box',
            transition: 'none'
        });

        const resizer = document.createElement('div');
        Object.assign(resizer.style, {
            position: 'absolute',
            width: `${RESIZER_WIDTH}px`,
            height: '100%',
            top: '0',
            right: '0',
            cursor: 'col-resize',
            zIndex: '1000',
            userSelect: 'none',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.2s'
        });

        resizer.addEventListener('mouseenter', () => {
            resizer.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        });
        resizer.addEventListener('mouseleave', () => {
            if (!isResizing) {
                resizer.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            }
        });

        wrapper.appendChild(resizer);

        let isResizing = false;
        let startX, startWidth;

        resizer.addEventListener('mousedown', (e) => {
            isResizing = true;
            startX = e.screenX;
            startWidth = sideNav.offsetWidth;

            document.body.style.userSelect = 'none';
            document.body.style.cursor = 'col-resize';

            window.addEventListener('mousemove', handleMove);
            window.addEventListener('mouseup', handleUp);

            e.preventDefault();
        });

        function handleMove(e) {
            if (!isResizing) return;
            const dx = e.screenX - startX;
            const newWidth = Math.max(MIN_WIDTH, Math.min(startWidth + dx, MAX_WIDTH));
            sideNav.style.width = `${newWidth}px`;
        }

        function handleUp() {
            if (!isResizing) return;
            isResizing = false;

            document.body.style.userSelect = '';
            document.body.style.cursor = '';

            localStorage.setItem('sideNavWidth', sideNav.style.width);

            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleUp);
        }

        if (savedWidth) {
            sideNav.style.width = savedWidth;
        }


        document.querySelector('._listItemActive_1ltry_18').scrollIntoView({
            // behavior: 'smooth', // 平滑滚动
            block: 'center'// 将元素滚动到视图的中间
        });
    });
})();
```
```js
// ==UserScript==
// @name         Resizable Side Navigation
// @namespace    http://tampermonkey.net/
// @version      2025-04-29
// @description  Add a resizer to the side navigation
// @author       You
// @match        https://www.mongodb.com/zh-cn/docs/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mongodb.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', () => {
        setTimeout(() => {
            const nav = document.getElementById('side-nav-2');

            if (nav) {
                // 检查是否已经存在 resizer
                if (!nav.querySelector('.resizer')) {
                    const resizer = document.createElement('div');
                    resizer.style.width = '10px';
                    resizer.style.height = '100%';
                    resizer.style.backgroundColor = '#016bf826';
                    resizer.style.cursor = 'ew-resize';
                    resizer.style.position = 'absolute';
                    resizer.style.top = '0';
                    resizer.style.right = '3px';
                    resizer.className = 'resizer';
                    nav.appendChild(resizer);

                    const ul = nav.getElementsByTagName("ul");
                    if (ul[0]) {
                        ul[0].style.width = "100%";
                    }

                    resizer.addEventListener('mousedown', (e) => {
                        e.preventDefault();

                        const startX = e.clientX;
                        const startWidth = parseInt(document.defaultView.getComputedStyle(nav).width, 10);

                        const doDrag = (e) => {
                            const newWidth = startWidth + e.clientX - startX;
                            nav.style.width = newWidth + 'px';
                        };

                        const stopDrag = () => {
                            document.removeEventListener('mousemove', doDrag);
                            document.removeEventListener('mouseup', stopDrag);
                        };

                        document.addEventListener('mousemove', doDrag);
                        document.addEventListener('mouseup', stopDrag);
                    });
                }
            }
            console.log("script is running...")
        }, 1000); // 延迟0.1秒
    });

})();

```
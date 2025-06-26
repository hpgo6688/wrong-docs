```js
// ==UserScript==
// @name         doc.swiftgg.team
// @namespace    http://tampermonkey.net/
// @version      2025-06-25
// @description  try to take over the world!
// @author       You
// @match        https://doc.swiftgg.team/documentation/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=swiftgg.team
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Create a new style element
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        .OnThisPageStickyContainer[data-v-39ac6ed0] {
             width: 240px;
        }
        .parent-item .base-link[data-v-068842ec] {
            color: #1980ff;
        }
        .child-item {
            padding-left: 10px;
        }
    `;

    // Append the style element to the document head
    document.head.appendChild(style);
})();


// .hypothesis-highlight {
//     background-color: #ffd54f !important; /* Soft yellow */
//     color: #212121 !important; /* Dark text */
// }
// .hypothesis-highlight.user-highlights {
//     background-color: #81c784 !important; /* Soft green */
//     color: #ffffff !important; /* White text */
// }
```
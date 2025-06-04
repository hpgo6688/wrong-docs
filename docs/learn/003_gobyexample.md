## home nav

```js
// ==UserScript==
// @name         gobyexample home nav
// @namespace    http://tampermonkey.net/
// @version      2025-05-09
// @description  try to take over the world!
// @author       You
// @match        https://gobyexample-cn.github.io/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to create a new group
    function createGroup(title, items) {
        const group = document.createElement('div');
        group.style.border = '1px solid #ccc';
        // group.style.margin = '10px 0';
        group.style.padding = '10px';
        //  group.style.maxWidth = '200px';
        group.style.borderRadius = '5px';
        group.style.backgroundColor = '#f9f9f9';

        const header = document.createElement('h3');
        header.textContent = title;
        header.style.color = '#333';
        header.style.marginBottom = '5px';
        group.appendChild(header);

        const ul = document.createElement('ul');
        ul.style.listStyleType = 'none';
        ul.style.padding = '0';
        ul.style.margin = '8px 0px 0px 20px';

        items.forEach(item => {
            item.style.margin = '5px 0px 0px 0px';
            item.style.fontSize = '14px';
            ul.appendChild(item);
        });

        group.appendChild(ul);

        return group;
    }

    // Get all list items
    const listItems = document.querySelectorAll('ul > li');

    // Define groups
    const groups = {
        "1. 基础与控制结构": ["hello-world", "values", "variables", "constants", "for", "if-else", "switch"],
        "2. 数据结构": ["arrays", "slices", "maps"],
        "3. 函数": ["functions", "multiple-return-values", "variadic-functions", "closures", "recursion"],
        "4. 高级特性": ["pointers", "structs", "methods", "interfaces", "embedding", "generics"],
        "5. 并发": ["goroutines", "channels", "channel-buffering", "channel-synchronization", "channel-directions", "select", "timeouts", "non-blocking-channel-operations"],
        "6. 同步与控制": ["closing-channels", "range-over-channels", "timers", "tickers", "worker-pools", "waitgroups", "rate-limiting", "atomic-counters", "mutexes", "stateful-goroutines"],
        "7. 文件操作": ["reading-files", "writing-files", "line-filters", "file-paths", "directories", "temporary-files-and-directories"],
        "8. 网络与进程": ["http-clients", "http-servers", "context", "spawning-processes", "execing-processes", "signals", "exit"],
        "9. 格式化与解析": ["string-functions", "string-formatting", "text-templates", "regular-expressions", "json", "xml"],
        "10. 时间与加密": ["time", "epoch", "time-formatting-parsing", "number-parsing", "url-parsing", "sha256-hashes", "base64-encoding"],
        "11. 命令行操作": ["command-line-arguments", "command-line-flags", "command-line-subcommands", "environment-variables"],
        "12. panic": ["panic", "defer", "recover"],
        "13. 测试": ["testing-and-benchmarking"],
        "14. 其他": ["sorting", "sorting-by-functions"],
    };

    // style intro

    const intro = document.querySelector('#intro')
    intro.style.margin = '10px 20px 10px 60px';
    intro.removeAttribute('id');

    // Create a container for the groups
    const container = document.createElement('div');
    container.style.margin = '20px 0'
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(240px, 1fr))'; // 调整最小宽度
    container.style.gap = '6px'; // 调整间距

    // Iterate over groups and create each group
    for (const [groupName, groupItems] of Object.entries(groups)) {
        const items = Array.from(listItems).filter(li => groupItems.includes(li.querySelector('a').getAttribute('href')));
        if (items.length > 0) {
            const group = createGroup(groupName, items);
            container.appendChild(group);
        }
    }

    // Replace the original list with the grouped container
    const originalList = document.querySelector('ul');
    originalList.parentNode.replaceChild(container, originalList);

})();
```

## sidebar

```js
// ==UserScript==
// @name         gobyexample Sidebar Navigation
// @namespace    http://tampermonkey.net/
// @version      2025-05-09
// @description  Add a sidebar navigation for Go by Example
// @author       You
// @match        https://gobyexample-cn.github.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Define groups
    const groups = {
        "1. 基础与控制结构": ["hello-world", "values", "variables", "constants", "for", "if-else", "switch"],
        "2. 数据结构": ["arrays", "slices", "maps"],
        "3. 函数": ["functions", "multiple-return-values", "variadic-functions", "closures", "recursion"],
        "4. 高级特性": ["pointers", "structs", "methods", "interfaces", "embedding", "generics"],
        "5. 并发与同步": ["goroutines", "channels", "channel-buffering", "channel-synchronization", "channel-directions", "select", "timeouts", "non-blocking-channel-operations", "closing-channels", "range-over-channels", "timers", "tickers", "worker-pools", "waitgroups", "rate-limiting", "atomic-counters", "mutexes", "stateful-goroutines"],
        "6. 文件与网络": ["reading-files", "writing-files", "line-filters", "file-paths", "directories", "temporary-files-and-directories", "http-clients", "http-servers", "context", "spawning-processes", "execing-processes", "signals", "exit"],
        "7. 格式化、解析与加密": ["string-functions", "string-formatting", "text-templates", "regular-expressions", "json", "xml", "time", "epoch", "time-formatting-parsing", "number-parsing", "url-parsing", "sha256-hashes", "base64-encoding"],
        "8. 命令行与错误处理": ["command-line-arguments", "command-line-flags", "command-line-subcommands", "environment-variables", "panic", "defer", "recover"],
        "9. 测试与其他": ["testing-and-benchmarking", "sorting", "sorting-by-functions"]
    };

    // Create a sidebar
    const sidebar = document.createElement('div');
    sidebar.style.position = 'fixed';
    sidebar.style.left = '0';
    sidebar.style.top = '0';
    sidebar.style.width = '240px';
    sidebar.style.height = '100%';
    sidebar.style.overflowY = 'auto';
    sidebar.style.backgroundColor = '#f4f4f9';
    sidebar.style.padding = '0 10px';
    sidebar.style.borderRight = '1px solid #ccc';

    // Hide scrollbar
    sidebar.style.scrollbarWidth = 'none'; // For Firefox
    sidebar.style.msOverflowStyle = 'none'; // For Internet Explorer and Edge
    sidebar.style.overflow = 'hidden';
    sidebar.style.overflowY = 'auto';

    sidebar.addEventListener('scroll', function() {
        sidebar.style.overflow = 'hidden';
        sidebar.style.overflowY = 'auto';
    });

    // Get current path
    const currentPath = window.location.pathname.split('/').pop();

    // Iterate over groups and create navigation
    for (const [groupName, groupItems] of Object.entries(groups)) {
        const groupHeader = document.createElement('h3');
        groupHeader.textContent = groupName;
        groupHeader.style.color = '#333';
        groupHeader.style.marginBottom = '5px';
        sidebar.appendChild(groupHeader);

        const ul = document.createElement('ul');
        ul.style.listStyleType = 'none';
        ul.style.padding = '0';

        groupItems.forEach(item => {
            const li = document.createElement('li');
            li.style.marginLeft = '16px';
            li.style.marginBottom = '5px';

            const link = document.createElement('a');
            link.href = `/${item}`;
            link.textContent = item.replace(/-/g, ' ');
            link.style.textDecoration = 'none';
            link.style.color = item === currentPath ? '#007bff' : '#000'; // Highlight current page
            if (item === currentPath) {
                // Scroll to the active link
                setTimeout(() => {
                    link.scrollIntoView({
                        block: 'center'
                    });
                    // link.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 0);
            }
            li.appendChild(link);

            ul.appendChild(li);
        });

        sidebar.appendChild(ul);
    }

    // Add sidebar to the body
    document.body.appendChild(sidebar);

    // Adjust body margin
    document.body.style.marginLeft = '220px';

})();
```

e.clientX, Math.max(newWidth, MIN_WIDTH) 301 303
e.clientX, Math.max(newWidth, MIN_WIDTH) 302 304
e.clientX, Math.max(newWidth, MIN_WIDTH) 303 305
e.clientX, Math.max(newWidth, MIN_WIDTH) 237 241
e.clientX, Math.max(newWidth, MIN_WIDTH) 238 242

e.clientX, Math.max(newWidth, MIN_WIDTH) 239 243
e.clientX, Math.max(newWidth, MIN_WIDTH) 240 244
e.clientX, Math.max(newWidth, MIN_WIDTH) 241 245
e.clientX, Math.max(newWidth, MIN_WIDTH) 242 246

e.clientX, Math.max(newWidth, MIN_WIDTH) 243 247
e.clientX, Math.max(newWidth, MIN_WIDTH) 244 248
e.clientX, Math.max(newWidth, MIN_WIDTH) 245 249

e.clientX, Math.max(newWidth, MIN_WIDTH) 246 250
e.clientX, Math.max(newWidth, MIN_WIDTH) 247 251
e.clientX, Math.max(newWidth, MIN_WIDTH) 248 252
e.clientX, Math.max(newWidth, MIN_WIDTH) 249 253
e.clientX, Math.max(newWidth, MIN_WIDTH) 250 254
e.clientX, Math.max(newWidth, MIN_WIDTH) 251 255

e.clientX, Math.max(newWidth, MIN_WIDTH) 252 256

e.clientX, Math.max(newWidth, MIN_WIDTH) 253 257

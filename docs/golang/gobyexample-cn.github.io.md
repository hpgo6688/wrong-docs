## script

```js
var copyStr = ''
Array.from(document.getElementsByTagName("ul")[0].children).forEach((li, index) => {
    const a = li.children[0]
    copyStr += `${index}. [${a.innerText}](${a.href})\n`
})

copy(copyStr)
```

## link

### 
01.  [Hello World](https://gobyexample-cn.github.io/hello-world)
02.  [值](https://gobyexample-cn.github.io/values)
03.  [变量](https://gobyexample-cn.github.io/variables)
04.  [常量](https://gobyexample-cn.github.io/constants)
05.  [For 循环](https://gobyexample-cn.github.io/for)
06.  [If/Else 分支](https://gobyexample-cn.github.io/if-else)
07.  [Switch 分支结构](https://gobyexample-cn.github.io/switch)

## 复合类型

01.  [数组](https://gobyexample-cn.github.io/arrays)
02.  [切片](https://gobyexample-cn.github.io/slices)
03.  [Map](https://gobyexample-cn.github.io/maps)
04.  [Range 遍历](https://gobyexample-cn.github.io/range)

## 函数

01.  [函数](https://gobyexample-cn.github.io/functions)
02.  [多返回值](https://gobyexample-cn.github.io/multiple-return-values)
03.  [变参函数](https://gobyexample-cn.github.io/variadic-functions)
04.  [闭包](https://gobyexample-cn.github.io/closures)
05.  [递归](https://gobyexample-cn.github.io/recursion)
06.  [指针](https://gobyexample-cn.github.io/pointers)
07.  [字符串和rune类型](https://gobyexample-cn.github.io/strings-and-runes)
08.  [错误处理](https://gobyexample-cn.github.io/errors)

## 结构体

01.  [结构体](https://gobyexample-cn.github.io/structs)
02.  [方法](https://gobyexample-cn.github.io/methods)
03.  [接口](https://gobyexample-cn.github.io/interfaces)
04.  [Embedding](https://gobyexample-cn.github.io/embedding)
05.  [泛型](https://gobyexample-cn.github.io/generics)

## chan

01.  [协程](https://gobyexample-cn.github.io/goroutines)
02.  [通道](https://gobyexample-cn.github.io/channels)
03.  [通道缓冲](https://gobyexample-cn.github.io/channel-buffering)
04.  [通道同步](https://gobyexample-cn.github.io/channel-synchronization)
05.  [通道方向](https://gobyexample-cn.github.io/channel-directions)
06.  [通道选择器](https://gobyexample-cn.github.io/select)
07.  [超时处理](https://gobyexample-cn.github.io/timeouts)
08.  [非阻塞通道操作](https://gobyexample-cn.github.io/non-blocking-channel-operations)
09.  [通道的关闭](https://gobyexample-cn.github.io/closing-channels)
10. [通道遍历](https://gobyexample-cn.github.io/range-over-channels)
11. [Timer](https://gobyexample-cn.github.io/timers)
12. [Ticker](https://gobyexample-cn.github.io/tickers)
13. [工作池](https://gobyexample-cn.github.io/worker-pools)
14. [WaitGroup](https://gobyexample-cn.github.io/waitgroups)
15. [速率限制](https://gobyexample-cn.github.io/rate-limiting)

## 并发

01.  [原子计数器](https://gobyexample-cn.github.io/atomic-counters)
02.  [互斥锁](https://gobyexample-cn.github.io/mutexes)
03.  [状态协程](https://gobyexample-cn.github.io/stateful-goroutines)
04.  [排序](https://gobyexample-cn.github.io/sorting)
05.  [使用函数自定义排序](https://gobyexample-cn.github.io/sorting-by-functions)
06.  [Panic](https://gobyexample-cn.github.io/panic)
07.  [Defer](https://gobyexample-cn.github.io/defer)
08.  [Recover](https://gobyexample-cn.github.io/recover)

## 标准库

10.  [字符串函数](https://gobyexample-cn.github.io/string-functions)
11. [字符串格式化](https://gobyexample-cn.github.io/string-formatting)
12. [文本模板](https://gobyexample-cn.github.io/text-templates)
13. [正则表达式](https://gobyexample-cn.github.io/regular-expressions)
14. [JSON](https://gobyexample-cn.github.io/json)
15. [XML](https://gobyexample-cn.github.io/xml)
16. [时间](https://gobyexample-cn.github.io/time)
17. [时间戳](https://gobyexample-cn.github.io/epoch)
18. [时间的格式化和解析](https://gobyexample-cn.github.io/time-formatting-parsing)
19. [随机数](https://gobyexample-cn.github.io/random-numbers)
20. [数字解析](https://gobyexample-cn.github.io/number-parsing)
21. [URL 解析](https://gobyexample-cn.github.io/url-parsing)
22. [SHA256 散列](https://gobyexample-cn.github.io/sha256-hashes)
23. [Base64 编码](https://gobyexample-cn.github.io/base64-encoding)
24. [读文件](https://gobyexample-cn.github.io/reading-files)
25. [写文件](https://gobyexample-cn.github.io/writing-files)
26. [行过滤器](https://gobyexample-cn.github.io/line-filters)
27. [文件路径](https://gobyexample-cn.github.io/file-paths)
28. [目录](https://gobyexample-cn.github.io/directories)
29. [临时文件和目录](https://gobyexample-cn.github.io/temporary-files-and-directories)
30. [单元测试和基准测试](https://gobyexample-cn.github.io/testing-and-benchmarking)
31. [命令行参数](https://gobyexample-cn.github.io/command-line-arguments)
32. [命令行标志](https://gobyexample-cn.github.io/command-line-flags)
33. [命令行子命令](https://gobyexample-cn.github.io/command-line-subcommands)
34. [环境变量](https://gobyexample-cn.github.io/environment-variables)
35. [HTTP 客户端](https://gobyexample-cn.github.io/http-clients)
36. [HTTP 服务端](https://gobyexample-cn.github.io/http-servers)
37. [Context](https://gobyexample-cn.github.io/context)
38. [生成进程](https://gobyexample-cn.github.io/spawning-processes)
39. [执行进程](https://gobyexample-cn.github.io/execing-processes)
40. [信号](https://gobyexample-cn.github.io/signals)
41. [退出](https://gobyexample-cn.github.io/exit)

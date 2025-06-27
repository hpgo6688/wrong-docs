Swift 并发是 Swift 语言中引入的一组特性，旨在简化并发编程，提升代码的可读性和安全性。以下是 Swift 并发的一些关键概念和特性：

### 1. 异步函数和 `async`/`await`

- **异步函数**：使用 `async` 关键字定义。它允许函数执行耗时操作而不阻塞线程。
- **`await`**：用于暂停函数执行，直到异步操作完成。

```swift
func fetchData() async -> Data {
    // 模拟异步数据获取
    return Data()
}

Task {
    let data = await fetchData()
    print(data)
}
```

### 2. 任务和 `Task`

- **`Task`**：用于创建和管理异步任务。可以在任务中调用异步函数。

```swift
Task {
    await someAsyncFunction()
}
```

### 3. 并发任务组 (`TaskGroup`)

- **任务组**：用于并行执行多个异步任务，并在所有任务完成后收集结果。

```swift
await withTaskGroup(of: Int.self) { group in
    for i in 1...5 {
        group.addTask {
            return i * i
        }
    }
    
    for await result in group {
        print(result)
    }
}
```

### 4. Actor

- **Actor**：用于管理共享状态，确保状态在并发环境下的安全访问。

```swift
actor Counter {
    private var value = 0
    
    func increment() {
        value += 1
    }
    
    func getValue() -> Int {
        return value
    }
}
```

### 5. 结构化并发

- **结构化并发**：通过 `async let` 和任务组等特性，确保异步任务的生命周期和作用域更易于管理。

```swift
async let result1 = asyncFunction1()
async let result2 = asyncFunction2()

let results = await (result1, result2)
```

这些特性让 Swift 的并发编程更加直观，减少了传统并发编程中的复杂性和错误风险。
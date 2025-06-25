## 逃逸闭包

在 Swift 中，**逃逸闭包（Escaping Closure）** 是指：**闭包在函数返回之后仍然可能被调用**，即“逃出了函数作用域”。

这在异步操作中非常常见，比如网络请求、延迟执行、回调等。

---

### 🧠 为什么叫“逃逸”？

正常情况下，闭包在函数执行期间被调用，函数结束后闭包也就结束了。但如果闭包被**存储**起来，稍后再调用（比如异步回调），就“逃逸”出了函数的作用域。

为了让编译器知道这种行为，Swift 要求你在参数前加上 `@escaping` 关键字。

---

### ✅ 基本语法

```swift
func doSomething(completion: @escaping () -> Void) {
    // 异步调用，闭包逃逸
    DispatchQueue.global().async {
        // 模拟耗时操作
        sleep(1)
        completion()  // 闭包在函数返回后才调用
    }
}
```

---

### 🆚 非逃逸闭包（默认）

```swift
func perform(action: () -> Void) {
    // 立即调用闭包（未逃逸）
    action()
}
```

- 默认情况下，Swift 的闭包参数是 **非逃逸（non-escaping）**。
- 非逃逸闭包在函数内部立即执行，不会被存储或延迟调用。
- 编译器可以优化非逃逸闭包，比如不需要捕获 `self`。

---

### 🧪 示例：逃逸 vs 非逃逸

```swift
class MyClass {
    var value = 0

    // 非逃逸闭包
    func nonEscapingExample(action: () -> Void) {
        action()
    }

    // 逃逸闭包
    func escapingExample(action: @escaping () -> Void) {
        DispatchQueue.main.async {
            action()
        }
    }

    func test() {
        // 非逃逸闭包可以直接使用 self
        nonEscapingExample {
            value = 10
        }

        // 逃逸闭包中必须显式使用 self
        escapingExample {
            self.value = 20
        }
    }
}
```

---

### ⚠️ 注意：逃逸闭包中必须显式使用 `self`

这是 Swift 的内存管理机制（ARC）要求的，防止你**不小心捕获 self 导致循环引用**。

```swift
// 错误 ❌：逃逸闭包中不能隐式使用 self
escapingExample {
    value = 20  // ❌ 编译错误
}

// 正确 ✅：显式使用 self
escapingExample {
    self.value = 20
}
```

---

### 🧩 使用场景

| 使用场景               | 是否需要 `@escaping` |
| ---------------------- | -------------------- |
| 同步执行               | ❌ 不需要             |
| 异步执行（如网络请求） | ✅ 需要               |
| 闭包被存储后再调用     | ✅ 需要               |
| 闭包立即执行           | ❌ 不需要             |

---

### 🧠 总结

| 特性                     | 非逃逸闭包 | 逃逸闭包         |
| ------------------------ | ---------- | ---------------- |
| 默认类型                 | 是         | 否（需显式标记） |
| 是否可能在函数返回后执行 | 否         | 是 ✅             |
| 是否可以隐式使用 `self`  | 是 ✅       | 否 ❌（需显式）   |
| 编译器优化               | 多 ✅       | 少 ❌             |

---

如果你还想了解更多，比如：

- `[weak self]` 和逃逸闭包的关系？
- 如何避免循环引用？
- 逃逸闭包与异步函数（`async/await`）的关系？

我可以继续详细讲解！需要吗？

## 逃逸闭包与异步函数（async/await）的关系？


这是一个非常好的问题！Swift 中的 `async/await` 引入了更现代、更优雅的异步编程方式，它和传统的**逃逸闭包**有密切关系，甚至可以说：

> **`async` 函数是对逃逸闭包异步回调模式的语法糖和封装。**

---

### 🧠 先回顾：逃逸闭包的异步调用

在没有 `async/await` 的时代，我们通常使用逃逸闭包来处理异步任务，比如网络请求：

```swift
func fetchData(completion: @escaping (String) -> Void) {
    DispatchQueue.global().async {
        // 模拟耗时操作
        sleep(1)
        completion("Data loaded")
    }
}
```

调用方式：

```swift
fetchData { result in
    print(result)
}
```

- 闭包是 `@escaping`，因为它在函数返回后才会被调用。
- 这种写法可能会导致**回调地狱**，嵌套多层闭包，难以维护。

---

### ✅ 使用 async/await 重写

Swift 5.5 引入了 `async/await`，可以把上面的代码改写为：

```swift
func fetchData() async -> String {
    // 模拟异步操作
    try? await Task.sleep(nanoseconds: 1_000_000_000)
    return "Data loaded"
}
```

调用方式：

```swift
Task {
    let result = await fetchData()
    print(result)
}
```

#### ✅ 优点：

- **语法更清晰**，像同步代码一样书写异步逻辑。
- **避免回调嵌套**。
- **更好地支持错误处理**（`try/await`）。

---

### 🔍 async 函数背后仍然使用逃逸闭包

虽然 `async/await` 看起来像同步调用，但**底层仍然是基于逃逸闭包实现的异步机制**，只是 Swift 编译器帮你做了封装。

举个例子：

```swift
func fetchDataAsync(completion: @escaping (String) -> Void) {
    DispatchQueue.global().async {
        completion("Data from server")
    }
}
```

可以封装成 async 函数：

```swift
func fetchData() async -> String {
    await withCheckedContinuation { continuation in
        fetchDataAsync { result in
            continuation.resume(returning: result)
        }
    }
}
```

这里用到了 Swift 的 `withCheckedContinuation`，它的原理就是：

> **把逃逸闭包转成 async 函数的 await 形式。**

---

### ✅ 总结：逃逸闭包 vs async/await

| 特性               | 逃逸闭包        | async/await      |
| ------------------ | --------------- | ---------------- |
| 是否异步           | 是              | 是               |
| 是否需要 @escaping | 是              | 否（内部封装）   |
| 可读性             | 差（回调地狱）  | 好（像同步代码） |
| 错误处理           | 回调中处理      | 支持 `try/await` |
| 底层实现           | 闭包 + Dispatch | 基于闭包封装     |

---

### 🎯 开发建议

- **新项目**：推荐使用 `async/await`，更现代、更清晰。
- **老项目**：可以逐步把逃逸闭包的异步 API 封装成 `async` 版本。
- **与第三方库兼容**：很多库仍使用闭包，可以通过 `withCheckedContinuation` 进行桥接。

---

如果你想看更多 `withCheckedContinuation` 的实际用法，我可以给你写一个完整的例子。需要吗？

## withCheckedContinuation 将 逃逸闭包的异步 API 封装成现代的 async/await

当然可以！下面我会通过一个完整的例子，演示如何使用 `withCheckedContinuation` 将基于**逃逸闭包的异步 API** 封装成现代的 `async/await` 风格。

---

### 🧪 场景：模拟异步网络请求

我们有一个传统的异步函数，使用逃逸闭包返回数据：

```swift
func fetchDataFromServer(completion: @escaping (String) -> Void) {
    // 模拟网络延迟
    DispatchQueue.global().asyncAfter(deadline: .now() + 1) {
        completion("✅ 数据已从服务器加载")
    }
}
```

---

### ✅ 使用 `withCheckedContinuation` 封装成 async 函数

```swift
func fetchData() async -> String {
    return await withCheckedContinuation { continuation in
        fetchDataFromServer { result in
            continuation.resume(returning: result)
        }
    }
}
```

#### 🔍 解释：

- `withCheckedContinuation` 是 Swift 提供的 API，用于将逃逸闭包转换为 `async/await`。
- `continuation.resume(returning:)` 表示异步操作完成，返回结果。
- 编译器会确保 continuation 只 resume 一次（如果你误用，会报错）。

---

### 🧪 使用 async/await 调用

```swift
func testAsyncCall() {
    Task {
        let result = await fetchData()
        print("收到结果：\(result)")
    }
}
```

#### 输出：

```
收到结果：✅ 数据已从服务器加载
```

---

### ⚠️ `withCheckedContinuation` vs `withUnsafeContinuation`

| API                       | 安全性                              | 用途                 |
| ------------------------- | ----------------------------------- | -------------------- |
| `withCheckedContinuation` | ✅ 编译期/运行期检查是否 resume 一次 | 推荐使用             |
| `withUnsafeContinuation`  | ❌ 不检查 resume 多次或未 resume     | 仅在你非常确定时使用 |

---

### 🧠 延伸：带错误处理的封装（`throws`）

如果原始 API 可能失败（比如返回 `Result<T, Error>`），可以使用 `withCheckedThrowingContinuation`：

```swift
enum NetworkError: Error {
    case failed
}

func fetchDataWithError(completion: @escaping (Result<String, NetworkError>) -> Void) {
    DispatchQueue.global().asyncAfter(deadline: .now() + 1) {
        let success = Bool.random()
        if success {
            completion(.success("🎉 成功获取数据"))
        } else {
            completion(.failure(.failed))
        }
    }
}

func fetchDataAsync() async throws -> String {
    return try await withCheckedThrowingContinuation { continuation in
        fetchDataWithError { result in
            switch result {
            case .success(let data):
                continuation.resume(returning: data)
            case .failure(let error):
                continuation.resume(throwing: error)
            }
        }
    }
}
```

调用方式：

```swift
Task {
    do {
        let data = try await fetchDataAsync()
        print("✅ 成功：\(data)")
    } catch {
        print("❌ 失败：\(error)")
    }
}
```

---

### ✅ 总结

| 场景                 | 使用的 API                        |
| -------------------- | --------------------------------- |
| 无错误的异步回调     | `withCheckedContinuation`         |
| 有错误抛出的异步回调 | `withCheckedThrowingContinuation` |

通过这些工具，你可以轻松地把旧的逃逸闭包 API 封装成现代的 `async/await` 风格，让代码更清晰、易读、易维护。

---

如果你有一个具体的第三方库（比如 Alamofire、Firebase 等）使用闭包回调，我也可以帮你封装成 async/await。是否需要示例？
##  self 是结构体或枚举的实例，则始终可以隐式引用 self。但是转义闭包无法捕获其对 self 的可变引用。结构体和枚举不允许共享可变性

这是 Swift 中关于 **值类型（结构体、枚举）与逃逸闭包** 之间关系的一个重要概念，理解它有助于你写出更安全、符合 Swift 设计哲学的代码。

---

## 🧠 先理解几个关键点：

### 1. **结构体（`struct`）和枚举（`enum`）是值类型**

- 它们在赋值或传递时是 **复制**（copy）而不是引用（reference）。
- 所以它们**不允许多个地方同时持有对它们的“可变引用”**，这就是所谓的“不共享可变性”（no shared mutability）。

---

### 2. **逃逸闭包（@escaping closure）**

- 逃逸闭包是指：闭包的执行**晚于其定义所在的函数的生命周期**。
- Swift 编译器无法保证闭包何时执行，因此它必须**捕获并持有相关变量的引用**，以便稍后使用。

---

## ❗️问题出现：值类型 + 逃逸闭包 + 可变引用

### 假设我们有一个结构体：

```swift
struct Counter {
    var value = 0

    mutating func incrementLater() {
        DispatchQueue.global().asyncAfter(deadline: .now() + 1) {
            self.value += 1  // ❌ 编译错误
        }
    }
}
```

### ❌ 为什么会报错？

- 因为 `self` 是一个结构体实例，是 **值类型**。
- `mutating func` 表示这个方法会修改 `self`。
- 但是你尝试在一个 **逃逸闭包**（`asyncAfter`）中修改 `self`。
- Swift 不允许这么做，因为：
  - 闭包会捕获 `self` 的可变引用（inout）。
  - 但是值类型的 `self` 是不能被“多个地方”共享修改的（逃逸闭包和原函数之间可能会并发访问 `self`）。
  - 所以编译器会阻止你这么做。

---

## ✅ 如何解决？

### 方法 1：复制 `self` 到局部变量，修改副本

```swift
struct Counter {
    var value = 0

    func incrementLater() {
        var copy = self
        DispatchQueue.global().asyncAfter(deadline: .now() + 1) {
            copy.value += 1  // ✅ 修改副本，不影响原始 self
            print("副本的值：\(copy.value)")
        }
    }
}
```

### 方法 2：使用引用类型（`class`）

如果你确实需要在异步闭包中修改状态，可以考虑使用 `class`：

```swift
class Counter {
    var value = 0

    func incrementLater() {
        DispatchQueue.global().asyncAfter(deadline: .now() + 1) {
            self.value += 1  // ✅ class 是引用类型，可以这样做
        }
    }
}
```

---

## 📌 总结这句话的意思：

> **“如果 self 是结构体或枚举的实例，则始终可以隐式引用 self。但是转义闭包无法捕获其对 self 的可变引用。结构体和枚举不允许共享可变性，如 结构体和枚举是值类型 中所述。”**

拆解理解：

| 部分                                   | 含义                                    |
| -------------------------------------- | --------------------------------------- |
| `self 是结构体或枚举的实例`            | 说明是值类型                            |
| `可以隐式引用 self`                    | 在非闭包中可以直接用 `self`（甚至省略） |
| `转义闭包无法捕获其对 self 的可变引用` | 在逃逸闭包中不能修改 `self`             |
| `结构体和枚举不允许共享可变性`         | 多个地方同时修改同一个值类型是不允许的  |

---

## 🧠 类比解释（通俗理解）：

- **结构体 = 快照**：每次使用都是一个副本，不能在别处偷偷修改它。
- **逃逸闭包 = 延迟执行的任务**：你不知道它什么时候执行。
- **问题**：你不能让一个“快照”在以后某个时间点被修改，因为你无法保证它是否还有效或是否存在竞争条件。

---

如果你有具体代码或使用场景，我可以帮你分析是否可以用结构体，或者是否需要改为 class。是否需要？
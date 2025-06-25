# 参数标签
在 Swift 中，参数标签的目的是提高代码的可读性和清晰度。它们可以帮助调用者理解每个参数的作用，而不需要查看函数的实现。参数标签在函数调用时显示，而参数名称在函数实现中使用。

例如：

```swift
func greet(person name: String, from hometown: String) -> String {
    return "Hello \(name)! Glad you could visit from \(hometown)."
}

let greeting = greet(person: "Alice", from: "New York")
```

在这个例子中：

- `person` 和 `from` 是参数标签。
- `name` 和 `hometown` 是参数名称。

调用函数时使用参数标签，函数内部使用参数名称。这种方式使得函数调用更加自文档化，便于理解参数的意义。
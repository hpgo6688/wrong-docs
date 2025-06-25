在 Swift 中，可选值（Optionals）用于表示变量可能有值，也可能没有值（即 `nil`）。可选类型在类型后面加上一个问号（`?`）来表示。

### 定义可选值

```swift
var optionalString: String? = "Hello"
var optionalNumber: Int? = nil
```

### 解包可选值

1. **强制解包**：使用感叹号（`!`）强制解包，但如果可选值为 `nil`，会导致运行时错误。

   ```swift
   if optionalString != nil {
       print(optionalString!)  // "Hello"
   }
   ```

2. **可选绑定**：使用 `if let` 或 `guard let` 语句安全解包。

   ```swift
   if let unwrappedString = optionalString {
       print(unwrappedString)  // "Hello"
   }
   ```

3. **可选链**：用于安全访问可选值的属性、方法或下标。

   ```swift
   let length = optionalString?.count  // 如果 optionalString 为 nil，length 也是 nil
   ```

4. **nil 合并运算符**：提供一个默认值。

   ```swift
   let defaultString = optionalString ?? "Default Value"
   ```

可选值在 Swift 中非常重要，因为它们提供了一种安全处理可能缺失值的方式，避免了许多常见的错误。
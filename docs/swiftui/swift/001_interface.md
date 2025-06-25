在 Swift 中，协议（Protocol）是用于定义方法、属性和其他要求的蓝图，这些要求可以由类、结构体或枚举来实现。协议本身并不提供这些功能的实现，而是指定哪些功能必须被实现。

### 定义协议

```swift
protocol SomeProtocol {
    // 定义属性要求
    var someProperty: String { get set }
    
    // 定义方法要求
    func someMethod()
}
```

### 遵循协议

类、结构体或枚举可以通过实现协议来遵循协议。

```swift
struct SomeStruct: SomeProtocol {
    var someProperty: String
    
    func someMethod() {
        print("方法实现")
    }
}
```

### 属性要求

协议可以要求实现的属性是可读的或可读写的。

```swift
protocol AnotherProtocol {
    var mustBeSettable: Int { get set }
    var doesNotNeedToBeSettable: Int { get }
}
```

### 方法要求

协议可以要求实现特定的方法，包括实例方法和类方法。

```swift
protocol RandomNumberGenerator {
    func random() -> Double
}
```

### Mutating 方法

如果协议中的方法需要改变遵循类型的实例，可以在方法前加上 `mutating` 关键字。

```swift
protocol Togglable {
    mutating func toggle()
}
```

### 协议继承

协议可以继承一个或多个其他协议。

```swift
protocol InheritingProtocol: SomeProtocol, AnotherProtocol {
    // 其他要求
}
```

### 协议组合

可以使用 `&` 符号来组合多个协议要求。

```swift
func someFunction(object: SomeProtocol & AnotherProtocol) {
    // 使用 object
}
```

### 协议扩展

可以通过扩展协议来为协议的实现提供默认实现。

```swift
extension SomeProtocol {
    func defaultImplementation() {
        print("默认实现")
    }
}
```

协议在 Swift 中是一个非常强大的特性，广泛用于定义接口和实现多态性。
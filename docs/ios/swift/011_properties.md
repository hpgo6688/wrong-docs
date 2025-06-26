## properties


这张图片显示了 Swift 中关于属性的内容大纲。以下是各部分的简要说明：

### 存储属性

- **常量结构体实例的存储属性**：结构体实例是常量时，存储属性也为常量。
- **延时加载存储属性**：使用 `lazy` 关键字，属性在第一次使用时才初始化。
- **存储属性和实例变量**：存储属性属于实例，与 Objective-C 的实例变量类似。

### 计算属性

- **简化 Setter 声明**：可以简化 setter 的写法。
- **简化 Getter 声明**：可以省略 `get` 关键字。
- **只读计算属性**：只有 getter，没有 setter。

### 属性观察器

- 用于监控和响应存储属性值的变化。

### 属性包装器

- **设置被包装属性的初始值**：通过包装器设置初始值。
- **从属性包装器中呈现一个值**：包装器可以提供额外的功能。
- **全局变量和局部变量**：属性包装器也适用于全局和局部变量。

### 类型属性

- **类型属性语法**：使用 `static` 关键字定义。
- **获取和设置类型属性的值**：类型属性属于类型本身，而不是某个实例。

如果需要更详细的代码示例或具体说明，请告诉我！


## example 


在 Swift 中，属性是类、结构体和枚举的一部分，用于存储值。属性可以分为以下几种类型：

### 1. 存储属性

存储属性用于存储常量或变量作为实例的一部分。只能在类和结构体中使用。

```swift
struct Person {
    var name: String
    let age: Int
}

var person = Person(name: "Alice", age: 30)
person.name = "Bob"  // 可以修改变量属性
// person.age = 31   // 错误，常量属性不能修改
```

### 2. 计算属性

计算属性不直接存储值，而是提供一个 getter 和一个可选的 setter。

```swift
struct Rectangle {
    var width: Double
    var height: Double

    var area: Double {
        return width * height
    }
}

let rect = Rectangle(width: 10, height: 5)
print(rect.area)  // 输出 50
```

### 3. 属性观察器

属性观察器用于监控和响应属性值的变化。可以用于存储属性，但不能用于常量属性和计算属性。

```swift
class StepCounter {
    var totalSteps: Int = 0 {
        willSet(newTotalSteps) {
            print("将 totalSteps 设置为 \(newTotalSteps)")
        }
        didSet {
            if totalSteps > oldValue {
                print("增加了 \(totalSteps - oldValue) 步")
            }
        }
    }
}

let stepCounter = StepCounter()
stepCounter.totalSteps = 100
// 输出:
// 将 totalSteps 设置为 100
// 增加了 100 步
```

### 4. 类型属性

类型属性用于定义属于类型本身的属性，而不是类型的某个实例。可以用于类、结构体和枚举。

```swift
struct SomeStructure {
    static var storedTypeProperty = "Some value."
    static var computedTypeProperty: Int {
        return 42
    }
}

print(SomeStructure.storedTypeProperty)  // 输出 "Some value."
print(SomeStructure.computedTypeProperty)  // 输出 42
```

### 总结

- **存储属性**：用于存储实例的值。
- **计算属性**：用于计算值。
- **属性观察器**：用于监控值的变化。
- **类型属性**：用于整个类型共享的值。
## 类型判断与转化
在 Swift 中，类型转换允许你检查对象的类型和转换对象的类型。以下是一些关键概念：

### 定义类层次结构

首先，定义一个简单的类层次结构：

```swift
class Animal {
    var name: String
    init(name: String) {
        self.name = name
    }
}

class Dog: Animal {
    func bark() {
        print("Woof!")
    }
}

class Cat: Animal {
    func meow() {
        print("Meow!")
    }
}
```

### 检查类型

使用 `is` 运算符检查对象是否属于特定类型：

```swift
let pet: Animal = Dog(name: "Buddy")

if pet is Dog {
    print("This pet is a dog.")
}
```

### 向下转型

使用 `as?` 或 `as!` 进行向下转型：

- **`as?`**：安全转型，返回可选值。
- **`as!`**：强制转型，如果失败会导致运行时错误。

```swift
if let dog = pet as? Dog {
    dog.bark()
}

let cat = pet as! Cat  // 如果 pet 不是 Cat 类型，这行代码会导致运行时错误
```

### Any 和 AnyObject

- **`Any`**：可以表示任何类型，包括函数类型。
- **`AnyObject`**：可以表示任何类类型的实例。

```swift
var items: [Any] = []

items.append(42)
items.append("Hello")
items.append(Dog(name: "Rex"))

for item in items {
    switch item {
    case let someInt as Int:
        print("Integer value: \(someInt)")
    case let someString as String:
        print("String value: \(someString)")
    case let someDog as Dog:
        print("Dog's name: \(someDog.name)")
    default:
        print("Unknown type")
    }
}
```

这些特性使得 Swift 在处理多态性和动态类型时非常灵活。
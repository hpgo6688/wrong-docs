## `class func someTypeMethod() {` 这不是错误

在 Swift 中，`class` 关键字可以用来定义一个类，而在类内部定义的方法可以使用 `class func` 来标记为类型方法（也称为类方法）。这并不是嵌套类的意思。

这里的代码结构是：

```swift
class SomeClass {
    class func someTypeMethod() {
        // type method implementation goes here
    }
}

SomeClass.someTypeMethod()
```

### 解释：

- `class SomeClass`：定义了一个名为 `SomeClass` 的类。
- `class func someTypeMethod()`：定义了一个类型方法，这意味着这个方法是与类本身关联的，而不是与类的实例关联的。你可以使用 `SomeClass.someTypeMethod()` 来调用它，而不需要创建 `SomeClass` 的实例。

所以这里并不是定义了两个类，而是定义了一个类和一个属于该类的类型方法。
## 类型方法与static 区别


在 Swift 中，`class func` 和 `static func` 都用于定义类型方法，但它们有一些区别：

### `class func`

- 可以被子类重写。
- 用于需要支持多态的场景。

### `static func`

- 不能被子类重写。
- 用于不需要支持多态的场景，通常用于定义常量或简单的工具方法。

### 示例

```swift
class Parent {
    class func classMethod() {
        print("Parent class method")
    }
    
    static func staticMethod() {
        print("Parent static method")
    }
}

class Child: Parent {
    override class func classMethod() {
        print("Child class method")
    }
    
    // Cannot override static method
    // override static func staticMethod() { }
}

Parent.classMethod()  // 输出: "Parent class method"
Parent.staticMethod() // 输出: "Parent static method"
Child.classMethod()   // 输出: "Child class method"
Child.staticMethod()  // 输出: "Parent static method"
```

### 总结

- 使用 `class func` 当你需要允许子类重写方法。
- 使用 `static func` 当你不希望方法被重写。
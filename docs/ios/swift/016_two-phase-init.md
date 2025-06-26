## swift两段式构造过程


Swift 的两段式构造过程是为了确保对象在初始化之前，其所有属性都被安全地初始化。这个过程分为两个阶段：

### 第一阶段：设置初始值

1. **初始化所有存储属性**：每个属性都必须被赋予一个初始值。可以在声明时设置默认值，或者在构造器中设置。

2. **调用父类的构造器**：如果是子类，必须在完成自己的属性初始化后调用父类的构造器，以确保继承的属性也被正确初始化。

### 第二阶段：自定义设置

1. **可以在此阶段修改属性**：所有属性已经有了初始值，可以进行修改。

2. **可以调用实例方法**：在这个阶段，实例已经完全初始化，可以调用方法和访问属性。

### 示例

```swift
class Vehicle {
    var numberOfWheels: Int

    init(numberOfWheels: Int) {
        self.numberOfWheels = numberOfWheels
    }
}

class Car: Vehicle {
    var color: String

    init(numberOfWheels: Int, color: String) {
        self.color = color
        super.init(numberOfWheels: numberOfWheels)
    }
}
```

### 关键点

- **安全性**：确保所有属性在使用前都被初始化。
- **顺序**：子类属性初始化 -> 父类构造器调用 -> 子类自定义设置。
- **灵活性**：允许在第二阶段进行更多的自定义设置。

这种机制确保对象在使用前是完全初始化的，避免了未初始化状态下的错误。

## 拿着个示例，分析下过程



在这个示例中，`Car` 类的构造器中没有进行额外的自定义设置。这是因为示例代码只展示了基本的初始化过程。为了演示自定义设置，我们可以在第二阶段添加一些逻辑，比如打印信息或修改属性。

### 修改后的示例

```swift
class Vehicle {
    var numberOfWheels: Int

    init(numberOfWheels: Int) {
        self.numberOfWheels = numberOfWheels
    }
}

class Car: Vehicle {
    var color: String

    init(numberOfWheels: Int, color: String) {
        self.color = color
        super.init(numberOfWheels: numberOfWheels)
        
        // 自定义设置阶段
        print("Car initialized with \(numberOfWheels) wheels and color \(color).")
    }
}
```

### 分析自定义设置

- **自定义设置**：
  - 在调用 `super.init` 后，`Car` 的实例已经完全初始化。
  - 可以安全地执行自定义逻辑，比如打印信息。

在这个修改后的示例中，`print` 语句就是一个简单的自定义设置示例。你可以在这个阶段执行更多复杂的逻辑，比如根据属性值调整其他属性，或者调用实例方法。
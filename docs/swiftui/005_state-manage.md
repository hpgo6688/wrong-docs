# swiftui 中 state, binding, property的区别

在 SwiftUI 中，`@State`、`@Binding` 和 `@ObservedObject`（以及 `@StateObject` 和 `@EnvironmentObject`）是用于管理和共享状态的关键属性包装器。它们各自有不同的用途和使用场景：

### @State

- **用途**：用于管理视图内部的私有状态。
- **生命周期**：由 SwiftUI 管理，通常用于简单的、局部的状态。
- **使用场景**：适合在一个视图内管理状态，如按钮的选中状态、文本输入等。

```swift
struct MyView: View {
    @State private var isOn: Bool = false

    var body: some View {
        Toggle("Switch", isOn: $isOn)
    }
}
```

### @Binding

- **用途**：用于在父视图和子视图之间共享状态。
- **数据流**：允许子视图改变父视图的状态。
- **使用场景**：适合需要从父视图传递可变状态到子视图的情况。

```swift
struct ParentView: View {
    @State private var isOn: Bool = false

    var body: some View {
        ChildView(isOn: $isOn)
    }
}

struct ChildView: View {
    @Binding var isOn: Bool

    var body: some View {
        Toggle("Switch", isOn: $isOn)
    }
}
```

### @ObservedObject

- **用途**：用于观察和响应 `ObservableObject` 对象的变化。
- **数据流**：通常在子视图中使用，观察从父视图传递下来的对象。
- **使用场景**：适合需要在多个视图间共享复杂状态的情况。

```swift
class ViewModel: ObservableObject {
    @Published var counter: Int = 0
}

struct MyView: View {
    @ObservedObject var viewModel: ViewModel

    var body: some View {
        Text("\(viewModel.counter)")
    }
}
```

### @StateObject

- **用途**：用于在视图中创建并管理 `ObservableObject` 的实例。
- **生命周期**：由视图管理，适合用于视图首次初始化时。
- **使用场景**：适合视图自身拥有并管理的对象。

```swift
struct MyView: View {
    @StateObject private var viewModel = ViewModel()

    var body: some View {
        Text("\(viewModel.counter)")
    }
}
```

### @EnvironmentObject

- **用途**：用于在视图层次结构中全局共享 `ObservableObject`。
- **数据流**：通过环境传递，无需显式传递。
- **使用场景**：适合需要在应用的多个视图间共享的全局状态。

```swift
struct ContentView: View {
    var body: some View {
        MyView().environmentObject(ViewModel())
    }
}

struct MyView: View {
    @EnvironmentObject var viewModel: ViewModel

    var body: some View {
        Text("\(viewModel.counter)")
    }
}
```

这些工具共同构成了 SwiftUI 状态管理的基础，帮助开发者高效地构建响应式用户界面。

# 子视图需要    @Binding 声明，然后可以接受父视图数据？
是的，子视图需要用 `@Binding` 来声明一个属性，以便接收和修改来自父视图的数据。这样，子视图可以与父视图共享状态，并且对子视图中数据的更改会自动反映到父视图中。

### 示例

```swift
struct ParentView: View {
    @State private var isOn: Bool = false

    var body: some View {
        ChildView(isOn: $isOn) // 使用 $ 传递绑定
    }
}

struct ChildView: View {
    @Binding var isOn: Bool // 声明 @Binding 属性

    var body: some View {
        Toggle("Switch", isOn: $isOn) // 使用绑定
    }
}
```

### 说明

- **父视图**：使用 `@State` 来管理状态，并通过 `$` 符号将状态的绑定传递给子视图。
- **子视图**：使用 `@Binding` 来声明接收的绑定，从而可以读取和修改父视图的状态。

这种方式确保了父子视图之间的状态同步和数据共享。

#  @ObservedObject 传递数据，不用$?

```swift
struct BookView: View {
    @ObservedObject var book: Book
    
    var body: some View {
        BookEditView(book: book)
    }
}

struct BookEditView: View {
    @ObservedObject var book: Book

    // ...
}
```
在你的示例中，`BookView` 和 `BookEditView` 都使用 `@ObservedObject` 来接收一个 `Book` 对象。这种情况下不需要使用 `$`，因为 `@ObservedObject` 用于观察对象的状态变化，而不是绑定单个值。

### 解释

- **@ObservedObject**：用于观察一个遵循 `ObservableObject` 协议的对象。当对象的属性发生变化时，视图会自动刷新。

- **不需要 `$`**：`@ObservedObject` 直接传递整个对象，而不是一个绑定，所以不需要使用 `$` 符号。

### 示例

```swift
class Book: ObservableObject {
    @Published var title: String
    @Published var author: String

    init(title: String, author: String) {
        self.title = title
        self.author = author
    }
}

struct BookView: View {
    @ObservedObject var book: Book
    
    var body: some View {
        BookEditView(book: book) // 直接传递对象
    }
}

struct BookEditView: View {
    @ObservedObject var book: Book

    var body: some View {
        TextField("Title", text: $book.title) // 使用 $ 访问 @Published 的绑定
        TextField("Author", text: $book.author)
    }
}
```

### 关键点

- `@ObservedObject` 适用于整个对象。
- 使用 `$` 符号访问 `@Published` 属性的绑定，以便在界面中进行绑定操作（如 `TextField`）。
- `Book` 类需要遵循 `ObservableObject` 协议，并使用 `@Published` 标记需要观察的属性。
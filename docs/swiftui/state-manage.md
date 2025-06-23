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
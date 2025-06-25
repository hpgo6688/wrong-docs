# swift data
你似乎在询问 Swift 中的几个概念：`ModelData`、`EnvironmentValues` 和 `PersistentStorage`。我将逐一解释这些概念。

### ModelData

在 SwiftUI 中，`ModelData` 通常是一个用于管理应用程序状态的模型。它通常是一个 ObservableObject，可以在应用的不同视图之间共享数据。

```swift
import SwiftUI
import Combine

final class ModelData: ObservableObject {
    @Published var items: [Item] = []
}
```

### EnvironmentValues

`EnvironmentValues` 是 SwiftUI 中用于在视图层次结构中传递环境数据的机制。你可以使用它来访问系统提供的值（如颜色方案、字体大小等）或者自定义环境值。

```swift
struct MyView: View {
    @Environment(\.colorScheme) var colorScheme

    var body: some View {
        Text("Hello, World!")
            .foregroundColor(colorScheme == .dark ? .white : .black)
    }
}
```

### PersistentStorage

`PersistentStorage` 通常指的是在应用中持久化数据的技术和工具，比如 `UserDefaults`、`CoreData` 或 `FileManager`。

#### UserDefaults 示例

```swift
UserDefaults.standard.set("value", forKey: "key")
let value = UserDefaults.standard.string(forKey: "key")
```

#### CoreData 简单示例

```swift
import CoreData

class PersistenceController {
    static let shared = PersistenceController()

    let container: NSPersistentContainer

    init() {
        container = NSPersistentContainer(name: "ModelName")
        container.loadPersistentStores { _, error in
            if let error = error {
                fatalError("Unresolved error \(error)")
            }
        }
    }
}
```

这些概念在 Swift 和 SwiftUI 中非常重要，帮助你管理应用状态、配置视图环境以及持久化数据。
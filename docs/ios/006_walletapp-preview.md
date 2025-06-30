在 SwiftUI 中，`ContentView` 的预览（`PreviewProvider`）用于在 Xcode 的 Canvas 或 Live Preview 中实时查看 UI 效果。

---

## ✅ 给你的 `ContentView` 添加 Preview

你可以在 `ContentView.swift` 文件底部添加以下代码：

```swift
#Preview {
    ContentView()
}
```

或者使用旧的标准写法：

```swift
struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
```

---

## 🧠 注意事项

### 1. 如果 `ContentView` 使用了 `@StateObject` 的 ViewModel：

预览时会自动初始化，但如果你想传入一个 mock 的 `WalletViewModel`，可以改写 `ContentView` 以支持依赖注入：

#### 修改 `ContentView` 支持外部传入 ViewModel（可选）

```swift
struct ContentView: View {
    @StateObject private var vm: WalletViewModel

    init(vm: WalletViewModel = WalletViewModel()) {
        _vm = StateObject(wrappedValue: vm)
    }

    var body: some View {
        // 你的 UI 代码...
    }
}
```

#### 然后 Preview 中传入 mock 数据（可选）

```swift
#Preview {
    let mockVM = WalletViewModel()
    mockVM.mnemonic = "test test test test test test test test test test test junk"
    mockVM.address = "0x1234567890abcdef"
    mockVM.privateKey = "abcdef1234567890"
    return ContentView(vm: mockVM)
}
```

---

## ✅ 推荐写法（Xcode 15+）

如果你使用的是 Xcode 15 或更高版本，推荐使用新的 `#Preview` 宏：

```swift
#Preview {
    ContentView()
}
```

---

## 🧪 预览无法显示怎么办？

如果预览不工作，可以尝试以下操作：

- 点击 Canvas 右上角的 **Resume**
- 清除派生数据（Xcode → Preferences → Locations → Derived Data → Delete）
- 确保 `ContentView` 没有运行时错误或依赖未初始化的对象

---

需要我帮你写一个完整的带有 mock 数据的 Preview 吗？可以更直观地看到效果。
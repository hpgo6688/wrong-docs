# 为什么ace1输出的是ace ?
在 Swift 中，当你打印一个枚举实例时，默认会调用它的 `description` 方法。如果没有自定义 `description`，它会使用枚举的名称。

在你的代码中：

```swift
let ace1 = Rank.ace
let aceRawValue = ace1.rawValue

print(ace1, aceRawValue)
```

- `ace1` 是 `Rank.ace`，所以打印时输出 `ace`。
- `aceRawValue` 是 `1`，因为 `ace` 的原始值是 `1`。

如果你想自定义打印输出，可以实现 `CustomStringConvertible` 协议：

```swift
enum Rank: Int, CustomStringConvertible {
    case ace = 1
    case two, three, four, five, six, seven, eight, nine, ten
    case jack, queen, king

    func simpleDescription() -> String {
        switch self {
        case .ace:
            return "ace"
        case .jack:
            return "jack"
        case .queen:
            return "queen"
        case .king:
            return "king"
        default:
            return String(self.rawValue)
        }
    }

    var description: String {
        return self.simpleDescription()
    }
}
```

这样，打印 `ace1` 时会输出 `ace`，因为 `description` 使用了 `simpleDescription()`。
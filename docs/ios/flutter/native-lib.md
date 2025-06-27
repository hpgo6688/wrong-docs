要使用 `dart:ffi` 绑定到原生 iOS 代码，可以按照以下步骤操作：

### 1. 准备你的 iOS 原生代码

创建一个 iOS 项目或使用现有项目。在 Objective-C 或 Swift 中编写你的原生函数。例如，在 Objective-C 中：

```objective-c
// MyNativeLib.h
int add(int a, int b);
```

```objective-c
// MyNativeLib.m
#import "MyNativeLib.h"

int add(int a, int b) {
    return a + b;
}
```

### 2. 创建 Flutter 项目

如果还没有 Flutter 项目，可以创建一个：

```bash
flutter create my_flutter_app
cd my_flutter_app
```

### 3. 将原生代码添加到 iOS 项目

将你的原生代码放在 Flutter 项目的 iOS 部分，通常在 `ios/Runner` 目录下。

### 4. 暴露原生函数

确保你的函数在头文件中正确暴露。

### 5. 修改 `ios/Runner.xcodeproj`

- 用 Xcode 打开 Flutter 项目的 iOS 模块。
- 将你的 `.m` 文件添加到 "Compile Sources" 的构建阶段。

### 6. 在 Flutter 中使用 `dart:ffi`

在 Flutter 项目中使用 `dart:ffi` 调用原生代码。

#### a. 定义 FFI 绑定

创建一个 Dart 文件来定义 FFI 绑定：

```dart
import 'dart:ffi';
import 'package:ffi/ffi.dart';

// 定义动态库的路径
final DynamicLibrary nativeLib = DynamicLibrary.process();

// 定义函数签名
typedef AddFunc = Int32 Function(Int32 a, Int32 b);
typedef Add = int Function(int a, int b);

// 加载函数
final Add add = nativeLib
    .lookup<NativeFunction<AddFunc>>('add')
    .asFunction<Add>();
```

#### b. 使用函数

在 Dart 代码中调用原生函数：

```dart
void main() {
  final result = add(3, 4);
  print('Result: $result'); // 输出: Result: 7
}
```

### 7. 构建和运行

- 确保你的 iOS 模拟器或设备已设置好。
- 运行 Flutter 应用：

```bash
flutter run
```

### 8. 调试和测试

- 测试你的应用以确保原生调用正常工作。
- 如果需要，可以使用 Xcode 调试原生代码。

通过这些步骤，你可以使用 `dart:ffi` 在 Flutter 中调用原生 iOS 代码，从而利用平台特定的功能。

## 链接

https://docs.flutter.dev/platform-integration/ios/c-interop
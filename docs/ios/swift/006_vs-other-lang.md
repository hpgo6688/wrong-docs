---
title: swift 与 其他语言比较
---

## swift 类型大写，ts 类型小写

是的，Swift 和 TypeScript 在**基础数据类型的命名风格**上有明显区别：

- **Swift** 的类型名通常**大写开头**（遵循 PascalCase 命名规范）。
- **TypeScript** 的类型名通常**小写开头**（遵循 camelCase 命名规范，与 JavaScript 风格一致）。

---

### **常见基础数据类型对比**

| **类型**     | **Swift（大写）**        | **TypeScript（小写）** |
| ------------ | ------------------------ | ---------------------- |
| **数值**     | `Int`, `Double`, `Float` | `number`               |
| **布尔**     | `Bool`                   | `boolean`              |
| **字符串**   | `String`                 | `string`               |
| **数组**     | `Array<T>` 或 `[T]`      | `T[]` 或 `Array<T>`    |
| **元组**     | `(T1, T2)`               | `[T1, T2]`             |
| **任意类型** | `Any`                    | `any`                  |
| **空值**     | `Void`（函数无返回值）   | `void`                 |
| **Never**    | `Never`（不可达代码）    | `never`                |

---

### **示例对比**

#### Swift（类型名大写）

```swift
let age: Int = 25
let name: String = "Alice"
let isStudent: Bool = true
let scores: [Int] = [90, 85]
let person: (String, Int) = ("Bob", 30)
let anything: Any = "Can be any type"
```

#### TypeScript（类型名小写）

```typescript
const age: number = 25;
const name: string = "Alice";
const isStudent: boolean = true;
const scores: number[] = [90, 85];
const person: [string, number] = ["Bob", 30];
const anything: any = "Can be any type";
```

---

### **为什么有这样的区别？**

1. **Swift**

   - 受 **Objective-C** 和 **Cocoa** 传统影响，类型名采用 **PascalCase**（首字母大写）。
   - 强调类型安全，类型名清晰可辨（如 `Int` vs `String`）。

2. **TypeScript**
   - 为了与 **JavaScript** 保持兼容，沿用 JS 的命名习惯（如 `number` 而不是 `Number`）。
   - 避免与 JS 的 **包装对象**（如 `Number`, `String`）混淆。

---

### **特殊注意事项**

- **TypeScript 的 `Number`、`String`、`Boolean`**  
  这些是 JavaScript 的**包装对象类型**（如 `new Number(42)`），通常**不建议直接使用**，应该用 `number`、`string`、`boolean`。

  ```typescript
  // ❌ 不推荐（包装对象）
  const badNum: Number = new Number(42);
  // ✅ 推荐（原始类型）
  const goodNum: number = 42;
  ```

- **Swift 的 `Any` vs TypeScript 的 `any`**
  - Swift 的 `Any` 使用较少（优先使用泛型或协议）。
  - TypeScript 的 `any` 会**完全禁用类型检查**，应尽量用 `unknown` 替代。

---

### **总结**

| **语言**       | **风格**       | **示例**                      |
| -------------- | -------------- | ----------------------------- |
| **Swift**      | 类型名**大写** | `Int`, `String`, `Bool`       |
| **TypeScript** | 类型名**小写** | `number`, `string`, `boolean` |

这种差异反映了两种语言的设计哲学：

- **Swift**：更偏向**强类型、安全、显式**。
- **TypeScript**：更注重**灵活性、兼容 JS**。

## 基本数据类型对比

Swift 和 TypeScript 在基本数据类型上有许多相似之处，但也存在一些关键差异。以下是它们的详细对比：

---

### **1. 数值类型**

#### Swift

- **`Int`**: 平台相关整数（32/64 位），如 `Int32`, `Int64`
- **`UInt`**: 无符号整数
- **`Double`**: 64 位浮点数（默认）
- **`Float`**: 32 位浮点数

```swift
let age: Int = 25
let price: Double = 19.99
```

#### TypeScript

- **`number`**: 统一表示所有数字（整数、浮点数、二进制等）

```typescript
const age: number = 25;
const price: number = 19.99;
```

---

### **2. 布尔类型**

#### Swift

- **`Bool`**: 仅能是 `true` 或 `false`

```swift
let isActive: Bool = true
```

#### TypeScript

- **`boolean`**: 与 Swift 相同

```typescript
const isActive: boolean = true;
```

---

### **3. 字符串**

#### Swift

- **`String`**: 值类型（非引用类型），支持多行字符串和插值

```swift
let name: String = "Alice"
let message = """
  Hello, \(name)!
  """
```

#### TypeScript

- **`string`**: 引用类型，支持模板字符串

```typescript
const name: string = "Alice";
const message = `Hello, ${name}!`;
```

---

### **4. 空值（Void/Nullish）**

#### Swift

- **`Void`**: 表示无返回值（等价于空元组 `()`）
- **`nil`**: 仅用于可选类型（`Optional<T>` 或 `T?`）

```swift
func doNothing() -> Void {}
var optionalValue: String? = nil
```

#### TypeScript

- **`void`**: 表示函数无返回值
- **`null` 和 `undefined`**: 独立类型，需显式处理

```typescript
function doNothing(): void {}
let nullValue: null = null;
let undefinedValue: undefined = undefined;
```

---

### **5. 数组**

#### Swift

- **`Array<T>`** 或 `[T]`: 值类型，严格类型约束

```swift
let numbers: [Int] = [1, 2, 3]
var names: Array<String> = ["Alice", "Bob"]
```

#### TypeScript

- **`T[]`** 或 `Array<T>`: 引用类型，允许联合类型

```typescript
const numbers: number[] = [1, 2, 3];
const mixed: (string | number)[] = ["Alice", 42]; // 联合类型
```

---

### **6. 元组（Tuple）**

#### Swift

- 固定长度和类型，可带标签

```swift
let person: (name: String, age: Int) = ("Alice", 30)
print(person.name) // 访问标签
```

#### TypeScript

- 类型需显式定义，无内置标签（可通过接口模拟）

```typescript
const person: [string, number] = ["Alice", 30];
console.log(person[0]); // 通过索引访问
```

---

### **7. 任意类型（动态类型）**

#### Swift

- **`Any`**: 任意类型（极少使用，优先用泛型或协议）

```swift
let dynamicValue: Any = "This could be anything"
```

#### TypeScript

- **`any`**: 彻底绕过类型检查（不推荐）
- **`unknown`**: 更安全的替代方案（需类型断言后使用）

```typescript
let dynamicValue: any = "This could be anything";
let safeValue: unknown = 42;
```

---

### **8. 其他特殊类型**

#### Swift

- **`Character`**: 单个 Unicode 字符
- **`Never`**: 表示不可达的代码（如崩溃函数）

```swift
let letter: Character = "A"
func crash() -> Never { fatalError() }
```

#### TypeScript

- **`never`**: 表示永不返回的函数或不可能的类型
- **`symbol`**: 唯一标识符（ES6 特性）

```typescript
function crash(): never {
  throw new Error();
}
const sym: symbol = Symbol("unique");
```

---

### **关键差异总结**

| 类型         | Swift                      | TypeScript                     |
| ------------ | -------------------------- | ------------------------------ |
| **数值**     | `Int`, `Double`, `Float`   | 仅 `number`                    |
| **字符串**   | 值类型，多行字符串原生支持 | 引用类型，模板字符串           |
| **空值**     | `nil` 仅用于可选类型       | `null` 和 `undefined` 独立存在 |
| **数组**     | 值类型，严格类型           | 引用类型，支持联合类型         |
| **动态类型** | `Any`（不推荐）            | `any` 和 `unknown`             |

Swift 的类型系统更强调安全性和性能（如值类型、严格的 `Optional`），而 TypeScript 更注重灵活性（如联合类型、动态类型兼容 JavaScript）。

## Rust 与 Go、Swift、TypeScript 基本数据类型
以下是 **Rust** 与 **Go**、**Swift**、**TypeScript** 在基本数据类型上的详细对比，涵盖数值、布尔、字符串、复合类型等核心类别：



| 类型                                   | Rust | Go   | Swift | TypeScript | kt  | python | dart |
| -------------------------------------- | ---- | ---- | ----- | ---------- | --- | ------ | ---- |
| 基本数据类型(数值，布尔，字符串，空值) | 小写 | 小写 | 大写  | 小写       |     |        |      |
| 符合数据类型                           | 大写 | 小写 | 大写  | 小写       |     |        |      |



---

### **1. 数值类型**
| 类型       | Rust                                                                                      | Go                                                 | Swift                                              | TypeScript             |
| ---------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | ---------------------- |
| **整数**   | `i8`, `i16`, `i32`, `i64`, `i128`, `isize`<br/>`u8`, `u16`, `u32`, `u64`, `u128`, `usize` | `int`, `int8`-`int64`<br/>`uint`, `uint8`-`uint64` | `Int`, `Int8`-`Int64`<br/>`UInt`, `UInt8`-`UInt64` | `number`（统一）       |
| **浮点数** | `f32`, `f64`                                                                              | `float32`, `float64`                               | `Float`, `Double`                                  | `number`               |
| **示例**   | `let x: i32 = 42;`                                                                        | `var x int = 42`                                   | `let x: Int = 42`                                  | `const x: number = 42` |

- **Rust** 最精细（如 `i128`），**Go/Swift** 区分有/无符号，**TypeScript** 只有 `number`。

---

### **2. 布尔类型**
| 语言      | 语法      | 示例                           |
| --------- | --------- | ------------------------------ |
| **Rust**  | `bool`    | `let is_true: bool = true;`    |
| **Go**    | `bool`    | `var isTrue bool = true`       |
| **Swift** | `Bool`    | `let isTrue: Bool = true`      |
| **TS**    | `boolean` | `const isTrue: boolean = true` |

---

### **3. 字符串**
| 语言      | 类型                                  | 可变性                     | 示例                                                              |
| --------- | ------------------------------------- | -------------------------- | ----------------------------------------------------------------- |
| **Rust**  | `&str`（切片）<br/>`String`（堆分配） | `String` 可修改            | `let s: &str = "hello";`<br/>`let mut s = String::from("hello");` |
| **Go**    | `string`                              | 不可变                     | `var s string = "hello"`                                          |
| **Swift** | `String`                              | 可修改                     | `var s: String = "hello"`                                         |
| **TS**    | `string`                              | 不可变（但变量可重新赋值） | `const s: string = "hello";`                                      |

- **Rust** 区分栈/堆字符串，**Go/Swift/TS** 简化设计。

---

### **4. 空值处理**
| 语言      | 类型                                      | 示例                              |
| --------- | ----------------------------------------- | --------------------------------- |
| **Rust**  | `Option<T>`                               | `let x: Option<i32> = Some(5);`   |
| **Go**    | 无内置 Option<br/>（用 `nil` 或错误处理） | `var x *int = nil`                |
| **Swift** | `Optional<T>` 或 `T?`                     | `let x: Int? = nil`               |
| **TS**    | `T \| null \| undefined`                  | `const x: number \| null = null;` |

- **Rust/Swift** 通过枚举明确空值，**Go** 依赖指针和 `nil`，**TS** 联合类型。

---

### **5. 复合类型**
#### **(1) 数组（固定长度）**
| 语言      | 语法                                 | 示例                               |
| --------- | ------------------------------------ | ---------------------------------- |
| **Rust**  | `[T; N]`                             | `let arr: [i32; 3] = [1, 2, 3];`   |
| **Go**    | `[N]T`                               | `var arr [3]int = [3]int{1, 2, 3}` |
| **Swift** | `[T]`（动态）<br/>`[T; N]`（实验性） | `let arr: [Int] = [1, 2, 3]`       |
| **TS**    | `T[]` 或 `Array<T>`                  | `const arr: number[] = [1, 2, 3];` |

#### **(2) 动态数组（Slice/List）**
| 语言      | 类型       | 示例                                    |
| --------- | ---------- | --------------------------------------- |
| **Rust**  | `Vec<T>`   | `let vec: Vec<i32> = vec![1, 2, 3];`    |
| **Go**    | `[]T`      | `var slice []int = []int{1, 2, 3}`      |
| **Swift** | `Array<T>` | `var arr: [Int] = [1, 2, 3]`            |
| **TS**    | `Array<T>` | `const arr: Array<number> = [1, 2, 3];` |

#### **(3) 键值对（Map/Dictionary）**
| 语言      | 类型            | 示例                                                                 |
| --------- | --------------- | -------------------------------------------------------------------- |
| **Rust**  | `HashMap<K, V>` | `use std::collections::HashMap;`<br/>`let mut map = HashMap::new();` |
| **Go**    | `map[K]V`       | `var m map[string]int = make(map[string]int)`                        |
| **Swift** | `[K: V]`        | `var dict: [String: Int] = ["a": 1]`                                 |
| **TS**    | `Record<K, V>`  | `const m: Record<string, number> = { a: 1 };`                        |

---

### **6. 元组（Tuple）**
| 语言      | 语法                                      | 示例                                    |
| --------- | ----------------------------------------- | --------------------------------------- |
| **Rust**  | `(T1, T2, ...)`                           | `let t: (i32, &str) = (1, "a");`        |
| **Go**    | 不支持原生元组<br/>（用结构体或切片模拟） | `// 无直接等价`                         |
| **Swift** | `(T1, T2, ...)`                           | `let t: (Int, String) = (1, "a")`       |
| **TS**    | `[T1, T2, ...]`                           | `const t: [number, string] = [1, "a"];` |

---

### **7. 特殊类型**
| 语言      | 类型                                   | 用途                     |
| --------- | -------------------------------------- | ------------------------ |
| **Rust**  | `()`（单元类型）<br/>`!`（Never 类型） | 表示无返回值或不可达代码 |
| **Go**    | 无直接等价                             | 用 `nil` 或错误处理      |
| **Swift** | `Void`（即 `()`）<br/>`Never`          | 类似 Rust                |
| **TS**    | `void`<br/>`never`                     | 函数无返回值/不可达代码  |

---

### **总结**
- **Rust**：类型最精细（如区分 `i32`/`u32`），所有权模型影响数据类型设计。
- **Go**：类型简单直接，但缺乏泛型（1.18 前）和枚举。
- **Swift**：平衡安全与易用性，`Optional` 和 `Array/Dictionary` 语法优雅。
- **TypeScript**：类型系统为 JS 服务，灵活但运行时擦除。

**选择建议**：
- 系统编程/高性能场景 → **Rust**  
- 云服务/并发简单 → **Go**  
- Apple 生态开发 → **Swift**  
- 全栈 Web → **TypeScript**

## 符合数据类型 `[]`

```swift
let names = ["Alice", "Bob", "Charlie"]

// 遍历数组
for name in names {
    print(name)
}

// 遍历范围
for i in 1...5 {
    print(i) // 1, 2, 3, 4, 5
}

// 遍历字典
let ages = ["Alice": 25, "Bob": 30]
for (name, age) in ages {
    print("\(name) is \(age) years old")
}
```

在 Go 语言（Golang）中，**复合数据类型**（如 `struct`、`map`、`slice`、`array`）的初始化通常使用 **`{}` 大括号**，但具体语法与 Swift 和 TypeScript 有所不同。以下是详细对比：

---

## **1. 结构体（Struct）**

### **Go**

```go
type Person struct {
    Name string
    Age  int
}

// 初始化方式1：带字段名（推荐）
p1 := Person{
    Name: "Alice",
    Age:  25,
}

// 初始化方式2：按字段顺序（需全部字段）
p2 := Person{"Bob", 30}
```

- **`{}` 用于包裹字段值**，类似 Swift 的 struct 初始化。

### **Swift**

```swift
struct Person {
    var name: String
    var age: Int
}

let p1 = Person(name: "Alice", age: 25) // Swift 必须带参数标签
```

- Swift 的 `struct` 初始化使用 `()`，但需显式标注参数名。

### **TypeScript**

```typescript
interface Person {
  name: string;
  age: number;
}

const p1: Person = { name: "Alice", age: 25 }; // 类似 Go 的写法
```

- TypeScript 的 `interface` 初始化也用 `{}`，但类型定义是独立的。

---

## **2. 映射（Map）**

### **Go**

```go
// 初始化方式1：make + 赋值
m1 := make(map[string]int)
m1["Alice"] = 25

// 初始化方式2：字面量
m2 := map[string]int{
    "Alice": 25,
    "Bob":   30,
}
```

- **`{}` 用于包裹键值对**，类似 TypeScript 的 `object`。

### **Swift**

```swift
var m1: [String: Int] = [:]
m1["Alice"] = 25

let m2: [String: Int] = ["Alice": 25, "Bob": 30]
```

- Swift 的字典使用 `[:]` 或 `["key": value]` 初始化。

### **TypeScript**

```typescript
const m1: Record<string, number> = {};
m1["Alice"] = 25;

const m2: { [key: string]: number } = { Alice: 25, Bob: 30 };
```

- TypeScript 的 `map` 用 `{}` 初始化，但类型需额外声明。

---

## **3. 切片（Slice）**

### **Go**

```go
// 初始化方式1：make
s1 := make([]int, 0)
s1 = append(s1, 1, 2, 3)

// 初始化方式2：字面量
s2 := []int{1, 2, 3}
```

- **`{}` 用于包裹元素**，类似 Swift 的 `Array`。

### **Swift**

```swift
var s1: [Int] = []
s1.append(1)

let s2: [Int] = [1, 2, 3]
```

- Swift 的数组用 `[]` 初始化。

### **TypeScript**

```typescript
const s1: number[] = [];
s1.push(1);

const s2: number[] = [1, 2, 3];
```

- TypeScript 的数组也用 `[]`。

---

## **4. 数组（Array）**

### **Go**

```go
// 固定长度的数组
arr := [3]int{1, 2, 3}
```

- **`{}` 用于包裹元素**，长度是类型的一部分（如 `[3]int`）。

### **Swift**

```swift
let arr: [Int] = [1, 2, 3] // 动态数组
let fixedArr: [Int; 3] = [1, 2, 3] // 固定长度（Swift 5.7+）
```

- Swift 的数组默认是动态的，固定长度需特殊处理。

### **TypeScript**

```typescript
const arr: number[] = [1, 2, 3];
const tuple: [number, number, number] = [1, 2, 3]; // 固定长度（元组）
```

- TypeScript 用 `[]`，固定长度需用元组。

---

## **关键区别总结**

| 数据类型   | Go（用 `{}`）            | Swift（用 `[]` 或 `()`） | TypeScript（用 `{}` 或 `[]`） |
| ---------- | ------------------------ | ------------------------ | ----------------------------- |
| **结构体** | `Person{Name: "Alice"}`  | `Person(name: "Alice")`  | `{ name: "Alice" }`           |
| **Map**    | `map[string]int{"a": 1}` | `["a": 1]`               | `{ a: 1 }`                    |
| **Slice**  | `[]int{1, 2, 3}`         | `[1, 2, 3]`              | `[1, 2, 3]`                   |
| **Array**  | `[3]int{1, 2, 3}`        | `[1, 2, 3]`              | `[1, 2, 3]`                   |

---

## **结论**

- **Go 的复合数据类型（`struct`/`map`/`slice`/`array`）大多用 `{}` 初始化**，但语法与其他语言不同。
- **Swift 倾向于 `[]`（数组/字典）和 `()`（结构体）**。
- **TypeScript 的 `object` 用 `{}`，数组用 `[]`**。

如果你熟悉 TypeScript，Go 的 `map` 和 `struct` 初始化方式会更接近 TS 的 `object`，而 Swift 的风格更独特。

## Swift 和 TypeScript 语法对比

Swift（用于 iOS/macOS 开发）和 TypeScript（JavaScript 的超集）都是现代静态类型语言，但设计目标和应用场景不同。以下是它们的关键语法对比：

---

### **1. 基础类型**

#### Swift

```swift
let name: String = "Alice"
var age: Int = 30
let isStudent: Bool = true
let scores: [Int] = [90, 85]
let person: [String: Any] = ["name": "Bob", "age": 25]
```

#### TypeScript

```typescript
const name: string = "Alice";
let age: number = 30;
const isStudent: boolean = true;
const scores: number[] = [90, 85];
const person: Record<string, any> = { name: "Bob", age: 25 };
```

---

### **2. 函数**

#### Swift

```swift
func greet(name: String) -> String {
    return "Hello, \(name)!"
}
// 调用
greet(name: "Alice")
```

#### TypeScript

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}
// 调用
greet("Alice"); // 或 greet(name: "Alice") （TS 中参数名可省略）
```

---

### **3. 可选类型（Optional）**

#### Swift

```swift
var optionalName: String? = nil
if let name = optionalName {
    print(name)
}
```

#### TypeScript

```typescript
let optionalName: string | null = null;
if (optionalName !== null) {
  console.log(optionalName);
}
// 或使用可选链
console.log(optionalName?.toUpperCase());
```

---

### **4. 类与继承**

#### Swift

```swift
class Person {
    var name: String
    init(name: String) {
        self.name = name
    }
}
class Student: Person {
    var grade: Int
    init(name: String, grade: Int) {
        self.grade = grade
        super.init(name: name)
    }
}
```

#### TypeScript

```typescript
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
class Student extends Person {
  grade: number;
  constructor(name: string, grade: number) {
    super(name);
    this.grade = grade;
  }
}
```

---

### **5. 接口/协议**

#### Swift（协议）

```swift
protocol Animal {
    var name: String { get }
    func makeSound()
}
class Dog: Animal {
    let name: String
    init(name: String) { self.name = name }
    func makeSound() { print("Woof!") }
}
```

#### TypeScript（接口）

```typescript
interface Animal {
  name: string;
  makeSound(): void;
}
class Dog implements Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  makeSound() {
    console.log("Woof!");
  }
}
```

---

### **6. 枚举**

#### Swift

```swift
enum Direction {
    case north, south, east, west
}
let dir = Direction.north
```

#### TypeScript

```typescript
enum Direction {
  North = "NORTH",
  South = "SOUTH",
  East = "EAST",
  West = "WEST",
}
const dir = Direction.North;
```

---

### **7. 泛型**

#### Swift

```swift
func swap<T>(_ a: inout T, _ b: inout T) {
    let temp = a
    a = b
    b = temp
}
```

#### TypeScript

```typescript
function swap<T>(a: T, b: T): [T, T] {
  return [b, a];
}
```

---

### **8. 异步编程**

#### Swift（async/await）

```swift
func fetchData() async throws -> Data {
    let url = URL(string: "https://api.example.com")!
    let (data, _) = try await URLSession.shared.data(from: url)
    return data
}
```

#### TypeScript（async/await）

```typescript
async function fetchData(): Promise<any> {
  const response = await fetch("https://api.example.com");
  return response.json();
}
```

---

### **关键差异总结**

| 特性          | Swift                         | TypeScript                 |
| ------------- | ----------------------------- | -------------------------- | ---------- |
| **类型系统**  | 值类型强调（结构体、枚举）    | 引用类型为主（对象、数组） |
| **可选类型**  | `Optional<T>` 或 `T?`         | null`或`T                  | undefined` |
| **函数参数**  | 参数标签（如 `greet(name:)`） | 参数名可省略               |
| **协议/接口** | 支持关联类型（更强大）        | 更简单的对象形状约束       |
| **编译环境**  | Xcode 或 Swift CLI            | Node.js 或浏览器           |

Swift 更偏向安全性和性能（如内存管理、值类型），而 TypeScript 更注重与 JavaScript 的互操作性和灵活性（如联合类型、类型推断）。

## for 循环

Swift 的循环遍历方式并不只有 `for-in`，它提供了多种循环方式，适用于不同场景。以下是 Swift 中常见的循环遍历方法，以及与 TypeScript 的对比：

---

## **Swift 中的循环遍历方式**

### **1. `for-in` 循环（最常用）**

遍历 **序列（Sequence）**，如 `Array`、`Range`、`Dictionary`、`String` 等。

```swift
let names = ["Alice", "Bob", "Charlie"]

// 遍历数组
for name in names {
    print(name)
}

// 遍历范围
for i in 1...5 {
    print(i) // 1, 2, 3, 4, 5
}

// 遍历字典
let ages = ["Alice": 25, "Bob": 30]
for (name, age) in ages {
    print("\(name) is \(age) years old")
}
```

### **2. `while` 循环**

适用于 **条件循环**，先判断条件再执行。

```swift
var i = 0
while i < 5 {
    print(i)
    i += 1
}
```

### **3. `repeat-while` 循环（类似 `do-while`）**

先执行一次，再判断条件。

```swift
var j = 0
repeat {
    print(j)
    j += 1
} while j < 5
```

### **4. `stride(from:to:by:)`（类似 `for` 步进循环）**

适用于 **自定义步长** 的遍历：

```swift
// 1 到 10，步长 2
for i in stride(from: 1, to: 10, by: 2) {
    print(i) // 1, 3, 5, 7, 9
}

// 10 到 1，步长 -1
for i in stride(from: 10, to: 0, by: -1) {
    print(i) // 10, 9, ..., 1
}
```

### **5. `forEach`（高阶函数）**

适用于 **函数式编程**，但不能使用 `break` 或 `continue`：

```swift
names.forEach { name in
    print(name)
}
```

### **6. `enumerated()`（带索引遍历）**

如果需要 **索引 + 值**，可以用 `enumerated()`：

```swift
for (index, name) in names.enumerated() {
    print("\(index): \(name)")
}
```

---

## **TypeScript 的循环遍历方式对比**

| **循环方式**         | **Swift**                                  | **TypeScript**                                |
| -------------------- | ------------------------------------------ | --------------------------------------------- |
| **`for-in`**         | `for item in array { ... }`                | `for (const item of array) { ... }`（遍历值） |
| **`for`（C 风格）**  | ❌ 不支持                                   | `for (let i = 0; i < 5; i++) { ... }`         |
| **`while`**          | `while condition { ... }`                  | `while (condition) { ... }`                   |
| **`do-while`**       | `repeat { ... } while condition`           | `do { ... } while (condition)`                |
| **`forEach`**        | `array.forEach { ... }`                    | `array.forEach(item => { ... })`              |
| **`stride`（步进）** | `stride(from:to:by:)`                      | `for (let i = 0; i < 10; i += 2)`             |
| **带索引遍历**       | `for (index, value) in array.enumerated()` | `array.forEach((value, index) => ...)`        |

---

## **总结**

Swift 的循环方式：

1. **`for-in`**（最常用，遍历数组、字典、范围等）
2. **`while` / `repeat-while`**（条件循环）
3. **`stride`**（步进循环）
4. **`forEach`**（函数式遍历）
5. **`enumerated()`**（带索引遍历）

TypeScript 的循环方式：

- **`for-of`**（类似 `for-in`）
- **`for`（C 风格）**（Swift 不支持）
- **`while` / `do-while`**
- **`forEach`**（函数式遍历）

### **关键区别**

- Swift **没有 C 风格的 `for (i = 0; i < n; i++)`**，但可以用 `stride` 或 `Range` 替代。
- Swift 的 `for-in` 比 TypeScript 的 `for-of` 更强大（支持字典、范围等）。
- TypeScript 可以使用 **`break` / `continue`** 在 `forEach` 里模拟，但 Swift 的 `forEach` **不支持** `break` / `continue`。

如果你需要类似 TypeScript 的 `for (let i = 0; i < n; i++)`，可以用：

```swift
for i in 0..<5 {
    print(i) // 0, 1, 2, 3, 4
}
```

或者：

```swift
(0..<5).forEach { i in
    print(i)
}
```

## 强类型 vs 弱类型

“强类型语言”通常指在**编译时或运行时严格检查类型**，确保类型安全，但具体表现因语言而异。以下是关键点解析：

---

### **1. 强类型 vs 弱类型**

| **特性**             | **强类型语言**                    | **弱类型语言**                          |
| -------------------- | --------------------------------- | --------------------------------------- |
| **类型是否必须声明** | 不一定（可依赖类型推断）          | 不一定（如 JavaScript 可动态变类型）    |
| **类型是否必须一致** | 是（运算/赋值时类型必须匹配）     | 否（可隐式转换，如 `"1" + 1` → `"11"`） |
| **典型代表**         | Go, Swift, TypeScript（严格模式） | JavaScript, PHP, C（部分情况）          |

---

### **2. 强类型语言的核心特征**

#### （1）**类型必须存在**

- 所有变量/表达式都有明确的类型，但声明方式不同：
  - **显式声明**（如 Go、TypeScript）：
    ```go
    var age int = 30 // Go
    let age: number = 30; // TypeScript
    ```
  - **隐式推断**（如 Swift）：
    ```swift
    let age = 30 // 推断为 Int
    ```

#### （2）**类型必须一致**

- **禁止隐式类型转换**，需显式操作：
  - **Go**（强类型，无隐式转换）：
    ```go
    var a int = 10
    var b float64 = float64(a) // 必须显式转换
    ```
  - **Swift**（强类型，类型安全）：
    ```swift
    let a: Int = 10
    let b: Double = Double(a) // 必须显式转换
    ```
  - **TypeScript**（严格模式）：
    ```typescript
    let a: number = 10;
    let b: string = a.toString(); // 必须显式转换
    ```

#### （3）**编译/运行时类型检查**

- **编译时检查**（如 Go、Swift、TypeScript）：
  ```typescript
  let age: number = "30"; // ❌ 编译错误（TypeScript）
  ```
- **运行时检查**（如 Python 强类型但动态）：
  ```python
  age = 30
  age = "thirty" # ✅ 运行时允许（动态类型）
  ```

---

### **3. 常见误解澄清**

#### （1）**强类型 ≠ 静态类型**

- **静态类型**：类型在编译时确定（如 Go、Java）。
- **动态类型**：类型在运行时确定（如 Python、Ruby）。
- **强类型**：无论静态/动态，只要禁止隐式转换即为强类型（如 Python 是强类型+动态类型）。

#### （2）**强类型 ≠ 必须显式声明类型**

- 即使不写类型，只要语言强制类型一致，仍是强类型：
  ```swift
  let age = 30 // Swift 推断为 Int，后续不能赋值为 String
  ```

---

### **4. 各语言类型强度对比**

| **语言**       | **强类型**    | **静态类型** | **典型表现**                                      |
| -------------- | ------------- | ------------ | ------------------------------------------------- |
| **Go**         | ✅             | ✅            | 无隐式转换，需显式类型声明/转换                   |
| **Swift**      | ✅             | ✅            | 类型安全，可选类型严格处理                        |
| **TypeScript** | ✅（严格模式） | ✅            | 编译时类型检查，可配 `any` 逃逸                   |
| **Python**     | ✅             | ❌            | 运行时类型错误，但无隐式转换（如 `"1" + 1` 报错） |
| **JavaScript** | ❌             | ❌            | 隐式转换（如 `"1" + 1 = "11"`）                   |
| **C**          | ❌             | ✅            | 弱类型（允许指针强制转换）                        |

---

### **5. 为什么需要强类型？**

- **安全性**：避免隐式错误（如意外字符串转数字）。
- **可维护性**：代码意图更清晰。
- **性能优化**：编译器可基于类型优化（如 Go 的静态编译）。

---

### **总结**

- **强类型语言**的核心是 **“类型必须一致”**，而非必须显式声明。
- 代表语言：Go、Swift、TypeScript（严格模式）、Python。
- 弱类型语言（如 JavaScript）允许隐式转换，易引发运行时错误。

## Rust 与 Go、Swift、TypeScript 的详细对比

将 Rust 加入对比后，我们可以更全面地看到现代强类型语言在类型系统设计上的异同。以下是 Rust 与 Go、Swift、TypeScript 的详细对比：

---

### **1. Rust 的类型系统定位**

| **特性**     | Rust         | Go     | Swift  | TypeScript (严格模式) |
| ------------ | ------------ | ------ | ------ | --------------------- |
| **强类型**   | ✅ 极强       | ✅ 强   | ✅ 极强 | ✅ 强                  |
| **静态类型** | ✅ 编译时检查 | ✅      | ✅      | ✅                     |
| **类型推断** | ✅ 强大       | ✅ 有限 | ✅ 强大 | ✅ 强大                |
| **隐式转换** | ❌ 完全禁止   | ❌ 禁止 | ❌ 禁止 | ❌ 禁止                |
| **内存安全** | ✅ 所有权模型 | ❌ GC   | ✅ ARC  | ❌ GC                  |

---

### **2. 核心类型特性对比**

#### **(1) 类型声明与推断**

```rust
// Rust: 显式或隐式均可，但类型必须确定
let x: i32 = 5; // 显式
let y = 5;      // 推断为 i32

// Go: 必须显式或通过 := 推断
var x int = 5   // 显式
y := 5          // 推断为 int

// Swift: 类似 Rust
let x: Int = 5  // 显式
let y = 5       // 推断为 Int

// TypeScript: 显式或隐式
const x: number = 5; // 显式
const y = 5;         // 推断为 number
```

#### **(2) 类型一致性要求**

```rust
// Rust: 绝对禁止隐式转换
let x: i32 = 5;
let y: i64 = x as i64; // 必须显式转换

// Go: 同样严格
var x int = 5
var y int64 = int64(x) // 显式转换

// Swift: 必须显式处理
let x: Int = 5
let y: Double = Double(x)

// TypeScript: 严格模式下禁止
const x: number = 5;
const y: string = x.toString(); // 需显式转换
```

#### **(3) 空值处理**

```rust
// Rust: Option<T> 明确处理空值
let x: Option<i32> = Some(5);
let y: Option<i32> = None;

// Swift: Optional<T> 类似
let x: Int? = 5
let y: Int? = nil

// Go: 通过 nil 和错误处理
var x *int = new(int)
*x = 5
var y *int = nil

// TypeScript: null | undefined
const x: number | null = 5;
const y: number | null = null;
```

#### **(4) 泛型支持**

```rust
// Rust: 强大的泛型 + trait 约束
fn print<T: Display>(value: T) {
    println!("{}", value);
}

// Swift: 类似
func print<T>(_ value: T) where T: CustomStringConvertible {
    print(value.description)
}

// Go: 1.18+ 支持泛型
func Print[T any](value T) {
    fmt.Println(value)
}

// TypeScript: 灵活但运行时擦除
function print<T>(value: T): void {
    console.log(value);
}
```

---

### **3. Rust 的独特之处**

#### **(1) 所有权与借用**

```rust
// 移动语义（非 Copy 类型）
let s1 = String::from("hello");
let s2 = s1; // s1 不再可用

// 借用检查
let x = 5;
let r1 = &x;
let r2 = &x; // 允许多个不可变借用
// let r3 = &mut x; // ❌ 编译错误（冲突借用）
```

#### **(2) 模式匹配**

```rust
match some_value {
    Some(x) => println!("Got {}", x),
    None => println!("Nothing"),
}
```

#### **(3) 无畏并发**

```rust
// 编译时保证线程安全
let counter = Arc::new(Mutex::new(0));
let handles = vec![];

for _ in 0..10 {
    let counter = Arc::clone(&counter);
    handles.push(thread::spawn(move || {
        let mut num = counter.lock().unwrap();
        *num += 1;
    }));
}
```

---

### **4. 各语言适用场景**

| **语言**       | **类型强度** | **核心优势**          | 典型应用场景               |
| -------------- | ------------ | --------------------- | -------------------------- |
| **Rust**       | ⭐⭐⭐⭐⭐        | 内存安全 + 零成本抽象 | 系统编程/嵌入式/高性能组件 |
| **Go**         | ⭐⭐⭐⭐         | 简单并发 + 快速编译   | 云原生/微服务/CLI 工具     |
| **Swift**      | ⭐⭐⭐⭐⭐        | ARC + 优雅语法        | iOS/macOS 生态开发         |
| **TypeScript** | ⭐⭐⭐⭐         | 渐进式类型 + Web 生态 | 前端/全栈开发              |

---

### **5. 总结**

- **Rust 是强类型语言的终极形态**：

  - 通过所有权模型在编译期消除内存错误
  - 绝对禁止隐式转换（甚至比 Go/Swift 更严格）
  - 类型系统与生命周期检查深度绑定

- **选择建议**：
  - 需要极致性能/安全 → **Rust**
  - 追求开发效率 → **Go**
  - Apple 生态开发 → **Swift**
  - Web 全栈 → **TypeScript**

Rust 的类型系统设计体现了现代编程语言对 **"安全零妥协"** 的追求，但其学习曲线也显著高于其他语言。

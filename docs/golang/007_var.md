## 包级别不重复定义

在 Go 中，模块是通过包（package）来区分的，不是通过文件。一个包中的所有文件共享同一个命名空间，因此标识符必须唯一，不能重复定义。

## `...`

在 Go 语言中：

1. **函数声明**：`...` 在类型前，用于定义可变参数。

```go
   func sum(nums ...int) { /* nums 是一个切片 */ }
```

2. **函数调用**：`...` 在变量名后，用于解包切片。

```go
   nums := []int{1, 2, 3, 4}
   sum(nums...) // 解包切片
```

这种设计用于区分定义可变参数和解包切片的不同操作。

## For range

在 Go 语言中， `for` 循环可以用于遍历多种数据结构：

1. **数组（array）**和**切片（slice）**：
   

```go
   nums := []int{1, 2, 3}
   for i, num := range nums {
       fmt.Println(i, num)
   }
```

2. **字符串**：
   

```go
   str := "hello"
   for i, char := range str {
       fmt.Printf("%d: %c\n", i, char)
   }
```

3. **映射（map）**：
   

```go
   m := map[string]int{"a": 1, "b": 2}
   for key, value := range m {
       fmt.Println(key, value)
   }
```

4. **通道（channel）**：
   - 遍历通道中的值，直到通道关闭。
   

```go
   ch := make(chan int)
   go func() {
       ch <- 1
       ch <- 2
       close(ch)
   }()
   for val := range ch {
       fmt.Println(val)
   }
```

在 Go 中， `range` 用于遍历数组、切片、字符串、映射和通道。它返回不同的值，具体取决于遍历的数据结构：对于数组、切片和字符串，返回索引和值；对于映射，返回键和值；对于通道，返回值。

## 对于通道

```go
   ch := make(chan int)
   go func() {
       ch <- 1
       ch <- 2
       close(ch)
   }()
   for val := range ch {
       fmt.Println(val)
   }
```

在这个程序中，通道 `ch` 被关闭后， `for` 循环不会打印 `0` 。程序的执行流程如下：

1. 向通道 `ch` 写入 `1`。
2. `for` 循环从通道中读取 `1` 并打印。
3. 向通道 `ch` 写入 `2`。
4. `for` 循环从通道中读取 `2` 并打印。
5. 关闭通道 `ch`。
6. `for` 循环检测到通道已关闭，退出循环。

因此， `for` 循环只会打印 `1` 和 `2` ，不会打印 `0` 。关闭通道后， `range` 循环会自动结束。

## 结构体嵌入

### NOTE:

1. *如果嵌入接口是命名字段，则必须通过命名接口名称来调用接口方法*
2. *如果嵌入接口是未命名/匿名字段，则可以直接或通过接口名称引用接口方法*

在 Go 中，结构体嵌入用于实现“继承”或“组合”。以下是关键点：

1. **基本嵌入**：直接将一个结构体嵌入另一个结构体中，嵌入的字段和方法会被提升。

2. **方法继承**：嵌入结构体的方法可以直接调用，就像是外层结构体的方法。

3. **重写方法**：外层结构体可以定义与嵌入结构体相同的方法，从而覆盖嵌入的方法。

4. **多重嵌入**：可以嵌入多个结构体，所有嵌入的字段和方法都可用。

5. **同名方法**：通过显式调用嵌入类型的方法来区分，如 `creature.Animal.Speak()` 和 `creature.Bird.Speak()`。

结构体嵌入提供了一种灵活的方式来组织和重用代码。

## 结构体嵌入示例

在 Go 中，结构体嵌入是一种实现“继承”或“组合”的方式。以下是一些常见的写法和用法：

### 基本嵌入

```go
type Animal struct {
    Name string
}

type Dog struct {
    Animal // 嵌入 Animal 结构体
    Breed string
}
```

#### 使用

```go
dog := Dog{
    Animal: Animal{Name: "Buddy"},
    Breed:  "Golden Retriever",
}

fmt.Println(dog.Name)  // 直接访问嵌入结构体的字段
fmt.Println(dog.Breed) // 访问 Dog 自己的字段
```

### 方法继承

嵌入结构体的方法也会“继承”到外层结构体。

```go
func (a Animal) Speak() {
    fmt.Println("Animal speaks")
}

dog.Speak() // 可以直接调用 Animal 的方法
```

### 重写方法

如果外层结构体定义了与嵌入结构体相同的方法，则会覆盖嵌入结构体的方法。

```go
func (d Dog) Speak() {
    fmt.Println("Woof!")
}

dog.Speak() // 调用 Dog 的 Speak 方法
```

### 多重嵌入

可以嵌入多个结构体：

```go
type Mammal struct {
    WarmBlooded bool
}

type Cat struct {
    Animal
    Mammal
}

cat := Cat{
    Animal: Animal{Name: "Whiskers"},
    Mammal: Mammal{WarmBlooded: true},
}
```

#### 使用

```go
fmt.Println(cat.Name)        // 从 Animal 继承
fmt.Println(cat.WarmBlooded) // 从 Mammal 继承
```

### 注意事项

* 嵌入的结构体*字段和方法会被提升到外层结构体*。
* 如果存在*同名字段或方法，必须通过嵌入类型名称来区分*。

```go
type Bird struct {
    Animal
    Name string // 与 Animal 中的 Name 字段同名
}

bird := Bird{
    Animal: Animal{Name: "Tweety"},
    Name:   "Chirpy",
}

fmt.Println(bird.Name)        // 输出 "Chirpy"
fmt.Println(bird.Animal.Name) // 输出 "Tweety"
```

结构体嵌入提供了一种灵活的方式来组织和重用代码。

### 嵌入的两个结构体有相同的方法

如果嵌入的两个结构体有相同的方法，可以通过显式调用嵌入类型的方法来区分。

### 示例

```go
package main

import "fmt"

type Animal struct{}

func (a Animal) Speak() {
    fmt.Println("Animal speaks")
}

type Bird struct{}

func (b Bird) Speak() {
    fmt.Println("Bird chirps")
}

type Creature struct {
    Animal
    Bird
}

func main() {
    creature := Creature{}

    // 调用 Animal 的 Speak 方法
    creature.Animal.Speak()

    // 调用 Bird 的 Speak 方法
    creature.Bird.Speak()
}
```

## assert vs require

* `creature.Animal.Speak()` 调用 `Animal` 结构体的 `Speak` 方法。
* `creature.Bird.Speak()` 调用 `Bird` 结构体的 `Speak` 方法。

通过指定嵌入类型的名称，可以明确调用哪个结构体的方法。

##!/bin/bash

在 Go 的测试中， `assert` 和 `require` 是 `testify` 库提供的工具：

* **`assert`**: 断言失败时，测试继续执行。
* **`require`**: 断言失败时，立即中断测试。

### 参数说明

* **两个参数**: 
  + `t`: `testing.T` 对象。
  + 条件或值。

* **三个参数**: 
  + `t`: `testing.T` 对象。
  + 期望值。
  + 实际值。

### 示例

* `assert.EqualError(t, err, tc.err)`: 检查 `err` 的错误信息是否与 `tc.err` 相同。
* `require.NoError(t, err)`: 确保 `err` 为 `nil`，否则中断测试。

## assert vs require 示例

```go
package webauthn

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/go-webauthn/webauthn/protocol"
)

func TestMakeNewCredential(t *testing.T) {
	type args struct {
		c *protocol.ParsedCredentialCreationData
	}

	var testCases []struct {
		name     string
		args     args
		expected *Credential
		err      string
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			actual, err := NewCredential(nil, tc.args.c)
			if len(tc.err) > 0 {
				assert.EqualError(t, err, tc.err) // here
			} else {
				require.NoError(t, err) // here

				assert.EqualValues(t, tc.expected, actual) // here
			}
		})
	}
}

```

## go语言特点：不确定取到的零值是否存在，所以加了个判断做区分

*我理解了，go中会有默认零值，而非null, 所以在用的时候，不确定取到的零值是否存在，所以加了个判断做区分，这是go语言特点决定的*

> 是的，你理解得很对。在 Go 语言中，变量在声明后会自动赋予一个默认的“零值”，而不是 `null` 或 `nil` （对于指针、切片、映射、通道、接口等类型，零值是 `nil` ）。
> 因此，当你从映射中获取值或者进行类型断言时，需要通过一个布尔值（通常命名为 `ok` ）来判断操作是否成功，以区分零值是因为键不存在还是因为键存在但其值为零值。
> 这种设计使得代码更加简洁和安全，因为开发者不必担心未初始化变量的使用问题。

在 Go 语言中，类似的语法结构主要用于检查某个操作的结果，同时处理返回的布尔值。这种模式常见于以下情况：

1. **从映射中获取值**：
   

```go
   if value, ok := sample["key"]; ok {
       // 使用 value
   }
   ```

2. **类型断言**：
   

```go
   var i interface{} = "hello"
   if str, ok := i.(string); ok {
       // 使用 str
   }
   ```

3. **从通道接收值**：
   

```go
   ch := make(chan int)
   go func() {
       ch <- 42
       close(ch)
   }()
   
   if value, ok := <-ch; ok {
       // 使用 value
   }
   ```

这些结构通过使用 `ok` 变量来判断操作是否成功，并在成功时执行后续操作。

## Map 键无，视为添加，键有，视为修改

```go
package main

import "fmt"

func main() {
    //Declare
    employeeSalary := make(map[string]int)

    //Adding a key value
    fmt.Println("Before update")
    employeeSalary["Tom"] = 2000
    fmt.Println(employeeSalary)

    fmt.Println("After update")
    employeeSalary["Tom"] = 3000
    fmt.Println(employeeSalary)
}
```

是的，你的理解是正确的。在 Go 中，映射（map）操作非常直观：

* **添加键值对**：如果键不存在，赋值操作会在映射中添加一个新的键值对。
* **修改键值对**：如果键已经存在，赋值操作会更新该键对应的值。

在你的代码中：

1. `employeeSalary["Tom"] = 2000`：这是添加操作，因为最初映射中没有 "Tom"。
2. `employeeSalary["Tom"] = 3000`：这是修改操作，因为 "Tom" 已经存在于映射中。

这种机制使得处理映射中的数据变得简单而高效。

## 指针接收者，只收指针

1. **值接收者**：
   - 类型用值接收者实现接口时，类型的值和指针都可以赋值给接口。

2. **指针接收者**：
   - 类型用指针接收者实现接口时，只有类型的指针可以赋值给接口。

指针接收者需要明确使用指针来满足接口。

## 接口内部工作原理

https://golangbyexample.com/interface-in-golang/#Inner_Working_of_Interface

像任何其他变量一样，接口变量由类型和值表示。接口值在底层由两个元组组成

* 底层类型
* 潜在价值

## string vs byte[]

在 Go 中， `string` 和 `[]byte` 之间的转换：

* **`string` 是字节序列**，不可变。
* **`[]byte` 是可变的字节切片**。

**转换方式**：
* `string` 转 `[]byte`：使用 `[]byte(str)`。
* `[]byte` 转 `string`：使用 `string(byteSlice)`。

这种转换用于文本和二进制数据处理。

```go
package main

import (
	"fmt"
)

func main() {
	// String to []byte
	str := "Hello, Go!"
	byteSlice := []byte(str)
	fmt.Println("Byte slice:", byteSlice)

	// []byte to string
	newStr := string(byteSlice)
	fmt.Println("String:", newStr)
}
```

这个示例展示了如何在 Go 中进行 `string` 和 `[]byte` 之间的转换。

## 与buffer之间关系

在 Go 中， `bytes.Buffer` 是一个用于高效地读写字节的缓冲区。它与 `[]byte` 和 `string` 的关系如下：

1. **`bytes.Buffer` 的作用**：
   - 用于高效地构建和操作字节数据。
   - 提供了丰富的方法来读写数据。

2. **与 `[]byte` 的关系**：
   - 可以从 `[]byte` 创建 `Buffer` ： `buf := bytes.NewBuffer(byteSlice)`

   - 可以将 `Buffer` 内容转换为 `[]byte` ： `byteSlice := buf.Bytes()`

3. **与 `string` 的关系**：
   - 可以从 `string` 创建 `Buffer` ： `buf := bytes.NewBufferString(str)`

   - 可以将 `Buffer` 内容转换为 `string` ： `str := buf.String()`

`bytes.Buffer` 提供了更高效和方便的字节操作能力，适合需要频繁读写的场景。

## 不是越大越长，而是越大越准？

这里是精确的位数，不是打印的位数，尾部没有补0， `float64` 在表示时不会自动补零。它只显示必要的有效数字。

```go
package main

import (
    "fmt"
    "strconv"
)

func main() {
    e1 := "1.3434"
    if s, err := strconv.ParseFloat(e1, 32); err == nil {
        fmt.Printf("%T, %v\n", s, s)
    }
    if s, err := strconv.ParseFloat(e1, 64); err == nil {
        fmt.Printf("%T, %v\n", s, s)
    }
}

// float64, 1.343400001525879
// float64, 1.3434

```

是的，正确的理解是：浮点数的位数越大，精度越高。

* **float32**：大约有 6-7 位十进制精度。
* **float64**：大约有 15-16 位十进制精度。

因此， `float64` 能更精确地表示小数，而 `float32` 可能会由于精度不足而产生舍入误差。

## slice 扩容后，底层不是同一个数组

在 Go 中，切片（slice）是一种动态数组。当你向切片中添加元素并超过其容量时，Go 会自动扩容，创建一个新的底层数组，并将旧数组的数据复制到新数组中。

### 关键点：

1. **不扩容时**：如果添加元素后没有超过当前容量，切片仍然引用原来的底层数组。

2. **扩容时**：如果添加元素超过了当前容量，Go 会创建一个新的、更大的底层数组。此时，新的切片引用新的底层数组，旧的切片仍然引用旧的底层数组。

### 示例：

```go
package main

import "fmt"

func main() {
    // 创建一个初始切片
    original := []int{1, 2, 3}
    
    // 扩容前添加元素
    original = append(original, 4)
    fmt.Println(original) // 输出: [1 2 3 4]

    // 继续添加元素，导致扩容
    original = append(original, 5, 6, 7, 8, 9, 10)
    fmt.Println(original) // 输出: [1 2 3 4 5 6 7 8 9 10]
}
```

### 总结：

* **共享底层数组**：在不扩容的情况下，多个切片可能共享同一个底层数组。
* **新旧切片无关**：扩容后，新的切片与旧的切片不再共享底层数组，修改新切片不会影响旧切片。

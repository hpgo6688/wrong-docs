## script

```js
var copy_str = ''

function numberToChinese(num) {
    const units = ['', '十', '百', '千'];
    const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

    if (num < 10) {
        return digits[num];
    } else if (num < 20) {
        return '十' + (num % 10 === 0 ? '' : digits[num % 10]);
    } else {
        const tens = Math.floor(num / 10);
        const ones = num % 10;
        return digits[tens] + '十' + (ones === 0 ? '' : digits[ones]);
    }
}

var h2List = document.getElementsByTagName("h2")
Array.from(h2List).forEach((h2, h2_index) => {
    try {
        const module_name = h2.innerText || h2.children[0]?.innerText || h2.children[0].children[0].innerText
        const ul = h2.nextElementSibling
        const list = ul.children
        copy_str += `## ${numberToChinese(h2_index + 1)}、 ${module_name}\n`
        Array.from(list).forEach((li, index) => {
            const a = li.children[0]
            if (a) {
                const a_href = a.href
                const a_text = a.innerText
                copy_str += `${index + 1}. [${a_text}](${a_href})\n`
            }
        })
        copy_str += '\n'
    } catch (error) {
        console.log(h2)
    }

})

copy(copy_str)
```

## 一、 Note: Check out our golang advanced tutorial here

01. [here](https://techbyexample.com/system-design-questions/)

## 二、 Also, check out our system design tutorial series here

## 三、 About Golang

01. [Golang Advanced Tutorial Series](https://golangbyexample.com/golang-comprehensive-tutorial/)
02. [About GOLANG](https://golangbyexample.com/about-golang/)
03. [GO Installation](https://golangbyexample.com/golang-installation/)
04. [Set up GO Workspace and Hello World Program](https://golangbyexample.com/workspace-hello-world-golang/)

## 四、 Variables

01. [Variables in Go – Complete Guide](https://golangbyexample.com/variables-in-golang-complete-guide/)
02. [Understanding var keyword in golang](https://golangbyexample.com/understanding-var-keyword-go/)
03. [Scope of a variable in golang](https://golangbyexample.com/scope-of-variable-go)
04. [Naming conventions for variables and constant in golang](https://golangbyexample.com/naming-conventions-variable-constant-go/)
05. [Understanding := symbol or short variable declaration in golang](https://golangbyexample.com/short-variable-declaration-go/)
06. [Hello World in golang](https://golangbyexample.com/hello-world-golang/)

## 五、 Constant

01. [Constant in Golang](https://golangbyexample.com/constant-golang/)
02. [Can constant be reassigned after its declaration in Go](https://golangbyexample.com/constant-reassign-go/)
03. [Constant in inner/outer scope in Golang](https://golangbyexample.com/constant-scope-inner-outer-go/)
04. [Global and Local Constant in Golang](https://golangbyexample.com/global-local-constant-golang/)
05. [Typed and Untyped constant in Golang](https://golangbyexample.com/typed-untyped-constant-golang/)
06. [Declaring a constant in Golang](https://golangbyexample.com/declaring-constant-go/)
07. [String constant in Golang](https://golangbyexample.com/string-constant-golang/)
08. [Numeric/Integer/Float constant in Golang](https://golangbyexample.com/integer-constant-golang/)
09. [Boolean constant in Golang](https://golangbyexample.com/boolean-constant-go/)
10. [Character constant in Golang](https://golangbyexample.com/character-constant-golang/)
11. [Multiple constant declarations in Golang](https://golangbyexample.com/multiple-constant-declarations-go/)
12. <s>[Constant Map in Golang](https://golangbyexample.com/constant-map-go/)</s>
13. <s>[Constant struct in Go (Golang)](https://golangbyexample.com/const-struct-go/)</s>
14. <s>[Constant array or slice in Golang](https://golangbyexample.com/constant-array-golang/)</s>

> 在 Go 语言中，引用数据类型（如切片、映射、通道等）不能声明为常量，主要原因是这些类型的值是动态的，无法在编译时确定。
>  
> 以下是一些具体原因：
>  
> 01. **动态大小**：引用类型的大小和内容在运行时可以改变。常量需要在编译时确定，而引用类型的大小和内容是不固定的。
>  
> 02. **指针和引用**：引用类型通常涉及底层数据的指针操作。常量要求值是不可变的，但引用类型的底层数据可以通过指针修改。
>  
> 03. **内存分配**：引用类型通常需要动态内存分配。常量在编译时确定，不允许进行任何形式的内存分配。
>  
> 04. **一致性和简化**：Go 语言设计简洁，避免复杂的语法和语义。限制引用类型为常量可以简化语言规范和实现。
>  
> 这些设计选择帮助 Go 保持简单和高效，确保程序员能够更容易地理解和预测代码行为。

## 六、 Conditions and Loops

01. [Understand if else in golang](https://golangbyexample.com/understand-if-else-statement-golang)
02. [for loop in golang](https://golangbyexample.com/for-loop-in-golang)
03. [Switch Statement in Go](https://golangbyexample.com/switch-statement-golang)
04. [fallthrough keyword in go](https://golangbyexample.com/fallthrough-keyword-golang)
05. [for-range loop in Go](https://golangbyexample.com/understand-for-range-loop-golang/)
06. [Goto statement in Golang](https://golangbyexample.com/goto-statement-go/)

## 七、🍀Packages/Modules

01. [Packages and Modules in Go (Golang) – Part 1](https://golangbyexample.com/packages-modules-go-first/)
02. [Packages and Modules in Go (Golang) – Part 2](https://golangbyexample.com/packages-modules-go-second/)
03. [Modules in Golang](https://golangbyexample.com/modules-golang)
04. [Direct vs Indirect Dependencies in go.mod file in Go](https://golangbyexample.com/direct-indirect-dependency-module-go/)
05. [Manual download dependency from go.mod file in Golang](https://golangbyexample.com/download-dependency-golang/)
06. [Selection of the version of library or dependency in Golang](https://golangbyexample.com/versiono-module-selection-go)
07. [Importing package from different module locally in Golang](https://golangbyexample.com/import-local-module-golang/)
08. [Importing package within the same module in Golang](https://golangbyexample.com/importing-package-same-module-go/)
09. [What does go mod tidy do in Golang](https://golangbyexample.com/go-mod-tidy/)
10. [Add a dependency to your project or module in Golang](https://golangbyexample.com/add-dependency-module-golang)
11. [Executable and non-executable module in Golang](https://golangbyexample.com/type-module-golang/)
12. [//indirect for a dependency in go.mod file in Golang](https://golangbyexample.com/indirect-dependency-golang/)
13. [Understanding Module name or module import path in Golang](https://golangbyexample.com/module-import-path-golang/)
14. [Vendor dependencies of a module in Golang](https://golangbyexample.com/vendor-dependency-go)
15. [Understanding go.sum and go.mod file in Golang](https://golangbyexample.com/go-mod-sum-module/)
16. [Package vs Module in Golang](https://golangbyexample.com/package-vs-module-golang)
17. [Remove a dependency from a module in Golang](https://golangbyexample.com/remove-dependency-golang/)
18. [Init function in Golang](https://golangbyexample.com/init-function-golang)
19. [Order of execution of a Go program](https://golangbyexample.com/order-execution-program-golang)
20. [Nested Packages in Golang](https://golangbyexample.com/nested-packages-golang)
21. [Package Name and Directory/Folder Name in Golang- Does they need to be the same](https://golangbyexample.com/package-folder-name-golang/)
22. [Blank Identifier in import in Golang](https://golangbyexample.com/blank-identifier-import-golang/)
23. [Import same package name or Aliasing while importing packages in Golang](https://golangbyexample.com/import-same-package-name-golang)

## 八、 🍀Array/Slice

01. [Understanding Array in golang](https://golangbyexample.com/understanding-array-golang-complete-guid)
02. [Understanding slice in golang](https://golangbyexample.com/slice-in-golang/)
03. [Multi-Dimensinal Array and Slice in golang](https://golangbyexample.com/two-dimensional-array-slice-golang/)
04. [Copy an array or slice in golang](https://golangbyexample.com/copy-an-array-or-slice-golang)
05. [Different ways of iterating over array and slice.](https://golangbyexample.com/go-different-ways-iterating-array-slice/)
06. [Check if an item exists in a slice](https://golangbyexample.com/item-exists-slice-golang)
07. [Find and delete an item in a slice](https://golangbyexample.com/find-delete-slice-golang/)
08. [Find and delete an item in an array](https://golangbyexample.com/find-delete-array-golang)
09. [Print an array or slice elements in golang](https://golangbyexample.com/print-an-array-or-slice-elements-golang)
10. [Declare/Initialize/Create an array or slice in golang](https://golangbyexample.com/declare-initialize-create-array-slice-golang/)
11. [Convert an array/slice into a JSON string in golang](https://golangbyexample.com/array-slice-json-golang/)
12. [Append or Add to a Slice or Array in Golang](https://golangbyexample.com/append-slice-array-golang/)
13. [Slice of Struct in Golang](https://golangbyexample.com/slice-struct-golang/)
14. [Slice of Map in Golang](https://golangbyexample.com/slice-map-golang/)
15. [Slice or Array of Channels in Golang](https://golangbyexample.com/slice-array-channel-golang/)
16. [Slice or Array of Bool in Golang](https://golangbyexample.com/slice-array-bool-golang/)
17. [Create Slice or Array of Integers in Golang](https://golangbyexample.com/slice-array-integers-golang/)
18. [Create Slice or Array of Floats in Golang](https://golangbyexample.com/slice-array-floats-golang/)
19. [Create Slice or Array of Strings in Golang](https://golangbyexample.com/slice-array-string-golang/)
20. [Sort a part of the slice in Golang](https://golangbyexample.com/sort-part-slice-go/)
21. [Append one slice to another slice in Golang](https://golangbyexample.com/append-one-slice-another-golang/)
22. [Sort a slice of Int in Ascending and Descending order in Go (Golang)](https://golangbyexample.com/sort-slice-asc-desc-golang/)
23. [Convert an array of int or numbers to string in Go (Golang)](https://golangbyexample.com/array-int-string-golang/)
24. *Convert an array into slice*

```go
package main

import "fmt"

func main() {
    // 定义一个数组
    arr := [5]int{1, 2, 3, 4, 5}

    // 将数组转换为切片
    slice := arr[:]

    // 输出切片
    fmt.Println(slice)
}
```

在这个示例中， `arr[:]` 表示将整个数组 `arr` 转换为一个切片。你也可以通过指定范围来创建切片，例如 `arr[1:4]` 会创建一个包含数组第二到第四个元素的切片。

## 九、 Maps

01. [Different ways of iterating over map](https://golangbyexample.com/different-ways-iterating-over-map-go/)
02. [Length of a map in golang](https://golangbyexample.com/length-map-golang/)
03. [Maps in Golang – Complete Guide](https://golangbyexample.com/maps-in-golang)
04. [Check if a key exists in a map in golang](https://golangbyexample.com/check-key-exists-map-golang)
05. [Update a key in map in golang](https://golangbyexample.com/update-key-map-golang/)
06. 🚀[Allowed key and value types for a map in golang](https://golangbyexample.com/allowed-key-and-value-types-golang/) map key can be any type that is comparable
07. [Create/Initialize/Declare map in golang](https://golangbyexample.com/create-map-golang/)
08. [Conversion between map and JSON in Golang](https://golangbyexample.com/map-json-golang/)
09. [Convert a map to JSON in Golang](https://golangbyexample.com/map-to-json-golang/)
10. [Convert a JSON to map in Golang](https://golangbyexample.com/json-to-map-golang/)
11. [How to check if a map contains a key in Golang](https://golangbyexample.com/check-map-key-golang/)
12. [Delete or Remove a key from a map in Go (Golang)](https://golangbyexample.com/delete-key-map-golang)

## 十、 🍀Struct

01. [Struct in golang – Complete Guide](https://golangbyexample.com/struct-in-golang-complete-guide/)
02. [Creating and Intializaing struct variables in golang](https://golangbyexample.com/declare-initialize-struct-variable-golang)
03. [Pointer to a struct](https://golangbyexample.com/pointer-to-struct-golang/)
04. [Pretty Print Struct Variables in golang](https://golangbyexample.com/print-struct-variables-golang/)
05. [Exported and non-exported fields of a struct](https://golangbyexample.com/exported-unexported-fields-struct-go/)
06. [Anonymous Fields in a Struct in golang](https://golangbyexample.com/anonymous-fields-struct-golang/)
07. [Struct Equality in golang](https://golangbyexample.com/struct-equality-golang/)
08. [Accessing and Setting Struct fields in golang](https://golangbyexample.com/accessing-setting-struct-fields-golang/)
09. [Nested Struct in golang](https://golangbyexample.com/nested-struct-golang)
10. [Struct Field Meta or Tags in golang](https://golangbyexample.com/struct-field-meta-or-tags)
11. [Conversion between struct and JSON in Golang](https://golangbyexample.com/struct-json-golang)
12. [How to intialize a struct that has another nested struct in Golang](https://golangbyexample.com/struct-init-nested-struct-go/)
13. [How to initialize a struct having an array or slice field in Golang](https://golangbyexample.com/struct-slice-field-go/)
14. [How to access the struct from another package in Golang](https://golangbyexample.com/struct-another-package-golang/)

## 十一、 🍀Method

01. [Method in golang – Complete Guide](https://golangbyexample.com/method-in-golang/)
02. [Pointer Receiver for a method in Golang](https://golangbyexample.com/pointer-receiver-method-golang/)
03. [Method on a non-struct type in golang](https://golangbyexample.com/method-non-struct-type-golang)
04. [Method chaining in golang](https://golangbyexample.com/method-chaining-go/)

## 十二、 🍀Interface

01. [Interface in go](https://golangbyexample.com/interface-in-golang/)
02. [Pass an Interface as an argument to a function](https://golangbyexample.com/pass-interface-as-argument-function-go/)
03. [Interface to struct](https://golangbyexample.com/interface-to-struct/)
04. [Embedding interface in go](https://golangbyexample.com/embedding-interfaces-go/)
05. [Interface Comparison in golang](https://golangbyexample.com/interface-comparison-golang/)
06. [Benefits of Interface in golang](https://golangbyexample.com/benefits-of-interface-golang)
07. [Pointer vs Value Receiver for interface in Go](https://golangbyexample.com/pointer-vs-value-receiver-method-golang)
08. [Declaring and Implementing an interface in golang](https://golangbyexample.com/declaring-implementing-interface-golang/)
09. [Interface are implemented implicity in golang](https://golangbyexample.com/interface-implit-implementation-golanng/)
10. [Type implementing multiple interfaces in go](https://golangbyexample.com/type-implementing-multiple-interfaces-go/)
11. [Print underlying type and value of an interface in golang](https://golangbyexample.com/print-type-value-interface-golang)
12. [Inner working or internal of an interface in Golang](https://golangbyexample.com/inner-working-interface-golang/)
13. [Non-Struct type implementing multiple interfaces in Golang](https://golangbyexample.com/non-struct-type-implementing-interface-go/)
14. [Zero value of an Interface in golang](https://golangbyexample.com/zero-value-of-interface-go/)
15. [Accessing underlying variable of an interface in Golang](https://golangbyexample.com/access-underlying-type-interface-golang/)

## 十三、 Builtin Package

01. [Copy function in golang](https://golangbyexample.com/copy-function-in-golang/)
02. [Append function in golang](https://golangbyexample.com/append-function-in-golang/)

## 十四、 Context

01. [Using context in go – Complete Guide](https://golangbyexample.com/using-context-in-golang-complete-guide/)

## 十五、 <s>GO Installation/Set-Up</s>

01. [Installing GO on MAC](https://golangbyexample.com/golang-mac-installation)
02. [Installing GO on Linux](https://golangbyexample.com/golang-linux-installation)
03. [Installing GO on Windows](https://golangbyexample.com/golang-windows-installation/)

## 十六、 Channel

01. [Channel in Go](https://golangbyexample.com/channel-golang/)
02. [Inner working of Channels](https://golangbyexample.com/inner-working-of-channels-in-golang/)
03. [Channel as a function argument in Go](https://golangbyexample.com/channel-function-argument-go)
04. [Send and receive on a nil channel in Go](https://golangbyexample.com/send-receive-nil-channel-go/)
05. [Close operation on a channel in Go](https://golangbyexample.com/close-operation-on-a-channel-in-go-golang/)
06. [Channel Direction in Go](https://golangbyexample.com/channel-direction-go/)
07. [Length and capacity of a channel in Go](https://golangbyexample.com/length-and-capacity-channel-golang/)
08. [All operations/function on a channel in Go](https://golangbyexample.com/all-operations-channel-golang/)
09. [Read/receive all values from a channel in Go](https://golangbyexample.com/receive-all-values-channel-golang/)
10. [For-range loop for a channel in Go](https://golangbyexample.com/for-range-loop-channel-go/)

## 十七、 Goroutines

01. [Goroutines in Go](https://golangbyexample.com/goroutines-golang/)
02. [Number of currently running/active goroutines](https://golangbyexample.com/number-currently-running-active-goroutines)
03. [Wait for all goroutines to finish execution](https://golangbyexample.com/wait-all-goroutines-go)
04. [Receive or Fetch Return Value from a goroutine in golang](https://golangbyexample.com/return-value-goroutine-go)
05. [Receive or fetch multiple return values from a goroutine in golang](https://golangbyexample.com/receive-multiple-return-value-goroutine-golang/)
06. [Pause Execution of a goroutine until an activity or event is completed in Golang](https://golangbyexample.com/pause-goroutine/)

## 十八、 Select

01. [Select Statement in Go](https://golangbyexample.com/select-statement-golang/)
02. [Select statement with a for loop outside in Go](https://golangbyexample.com/select-forloop-outside-go/)
03. [Select with default case in Go](https://golangbyexample.com/select-default-case-go/)
04. [Select with send operation in Golang](https://golangbyexample.com/select-send-operation-go/)
05. [Select statement with a nil channel in Golang](https://golangbyexample.com/select-with-nil-channel-golang/)
06. [Select versus switch in Golang](https://golangbyexample.com/select-versus-switch-in-golang/)
07. [Fallthrough keyword in select statement in Golang](https://golangbyexample.com/fallthrough-keyword-select-golang/)
08. [Break statement in Select in Golang](https://golangbyexample.com/break-keword-select-golang/)
09. [Execute multiple case in Select statement in Golang](https://golangbyexample.com/execute-multiple-case-select-go/)
10. [Empty select or select with no case in Golang](https://golangbyexample.com/empty-select-golang/)
11. [Select statement with timeout in Golang](https://golangbyexample.com/select-statement-with-timeout-go/)

## 十九、 Data Types

01. [All data types in Go with examples](https://golangbyexample.com/all-data-types-in-golang-with-examples)
02. [All basic data types in Golang](https://golangbyexample.com/all-basic-data-types-golang/)
03. [Know Size and Range of int and uint](https://golangbyexample.com/go-size-range-int-uint)
04. [Default Value of all types with examples](https://golangbyexample.com/go-default-zero-value-all-types)
05. [Character in Golang](https://golangbyexample.com/character-in-go)
06. [uintptr in Golang](https://golangbyexample.com/understanding-uintptr-golang)
07. [Rune in Golang](https://golangbyexample.com/understanding-rune-in-golang)

## 二十、 Pointer

01. [Pointer in Golang](https://golangbyexample.com/pointer-golang)
02. [Pointer to a Pointer in Golang](https://golangbyexample.com/pointer-to-pointer-golang)
03. [* or dereferencing pointer in Golang](https://golangbyexample.com/dereferencing-pointer-golang)
04. [Pointer Arithmetic in Golang](https://golangbyexample.com/pointer-arithmetic-golang/)
05. [Default zero value of pointer in Golang](https://golangbyexample.com/default-zero-value-pointer-golang/)

## 二十一、 IOTA

01. [IOTA in Golang](https://golangbyexample.com/iota-in-golang)
02. [Convert an IOTA or Enum to a string in Go (Golang)](https://golangbyexample.com/convert-an-iota-or-enum-to-a-string-in-go-golang/)

## 二十二、 Enum

01. [Enum in Golang](https://golangbyexample.com/enum-in-golang/)

## 二十三、 🔥String

01. [Check if string is a number](https://golangbyexample.com/check-if-string-is-number-golang)
02. [Remove all white spaces from a string](https://golangbyexample.com/remove-all-white-spaces-string-golang)
03. [Write a multiline string in Go](https://golangbyexample.com/multiline-string-go)
04. [String compare in GO](https://golangbyexample.com/compare-two-strings-golang)
05. [Check if a string contains another string in GO](https://golangbyexample.com/check-if-substring-golang)
06. [Split a string by delimiter in Go](https://golangbyexample.com/split-a-string-golang/)
07. [Get all the words from a sentence](https://golangbyexample.com/words-from-sentence-golang)
08. [Join a string by delimiter or a separator in Go](https://golangbyexample.com/go-join-string-delimiter/)
09. [Check if string begins with a prefix in Go](https://golangbyexample.com/string-begins-prefix-go)
10. [Check if string ends with a suffix in Go](https://golangbyexample.com/go-strings-ends-suffix/)
11. [Convert string to lowercase in Go](https://golangbyexample.com/string-lowercase-golang)
12. [Convert string to uppercase in Go](https://golangbyexample.com/golang-string-uppercase)
13. [Capitalize a string in Go](https://golangbyexample.com/capitalize-string-golang/)
14. [Trim prefix of a string in Go](https://golangbyexample.com/trim-prefix-string-go)
15. [Trim suffix of a string in Go](https://golangbyexample.com/trim-suffix-string-golang/)
16. [Trim leading and trailing whitespaces from a string](https://golangbyexample.com/trim-whitespaces-golang)
17. [Count instances of substring in a string in Go](https://golangbyexample.com/instances-substring-string-go)
18. [Find index of first instance of a substring in Go](http://index-first-instance-substring-golang/)
19. [Replace all instances of a substring with another in Go](https://golangbyexample.com/replace-all-instances-substring-go/)
20. [Replace some instances of a substring with another in Go](https://golangbyexample.com/replace-some-instances-substring-go/)
21. [Replace a character with another in a string in Go](https://golangbyexample.com/replace-character-string-go)
22. [Find the index of the last instance of a substring in Go](https://golangbyexample.com/index-last-occurence-substring-go/)
23. [Index character in a string in Go](https://golangbyexample.com/go-index-character-string/)
24. [Generate all permutation of a string in Go](https://golangbyexample.com/all-permutations-string-golang)
25. [Swap characters of a string in Go](https://golangbyexample.com/swap-characters-string-golang)
26. [Swap two strings in Go](https://golangbyexample.com/swap-two-strings-in-golang/)
27. [Reverse a string in Go](https://golangbyexample.com/reverse-a-string-in-golang/)
28. [Find and detete a character in Go](https://golangbyexample.com/go-find-delete-character-in-string)
29. [Find and delete a substring in Go](https://golangbyexample.com/go-find-delete-substring/)
30. [Delete in a string by index in Go](https://golangbyexample.com/golang-delete-index-string/)
31. [Create count/repeating copies of a string in GO](https://golangbyexample.com/create-count-repeating-copies-string-golang)
32. [Case insensitive comparison of two strings in Go](https://golangbyexample.com/golang-case-insensitive-string-comparison/)
33. [Number of Characters in a string in Go](https://golangbyexample.com/number-characters-string-golang/)
34. [Get ASCII code of any Alphabet or Number in Go](https://golangbyexample.com/get-ascii-value-alphabet-go/)
35. [Iterate over a string in golang](https://golangbyexample.com/iterate-over-a-string-golang/)
36. [Length of a string in golang](https://golangbyexample.com/length-of-string-golang/)
37. [ASCII digit to the character in Golang](https://golangbyexample.com/ascii-digit-character/)
38. [Write to write or print backslash in a string in Golang](https://golangbyexample.com/backslash-print-golang/)
39. [Print string with double quotes in Golang](https://golangbyexample.com/print-double-quotes-string-golang/)
40. [Sort a string in Golang](https://golangbyexample.com/sort-string-golang/)
41. [Create or initialize a new string in Go (Golang)](https://golangbyexample.com/create-string-golang/)
42. [Check if a string contains single or multiple whitespaces in Go (Golang)](https://golangbyexample.com/string-whitespace-golang/)

## 二十四、 Math

01. [Ceil of a number in Go](https://golangbyexample.com/ceil-number-golang)
02. [Floor of a number in Go](https://golangbyexample.com/floor-number-golang)
03. [Get Integer value of a float in Go](https://golangbyexample.com/integer-value-of-float)
04. [Round a number in Go](https://golangbyexample.com/round-number-golang/)
05. [Round Even a number in Go](https://golangbyexample.com/round-even-number-golang/)
06. [Remove Decimarl parts of a float in Go](https://golangbyexample.com/remove-decimal-float-go)
07. [Get Absolute value of a number](https://golangbyexample.com/absolute-value-number-golang)
08. [Pi value in Go](https://golangbyexample.com/pi-value-golang/)
09. [Square root of a number in Go](https://golangbyexample.com/square-root-number-golang/)
10. [Cube Root of a number in Go](https://golangbyexample.com/cube-root-number-golang/)
11. [Log of a number in Go](https://golangbyexample.com/log-of-number-go-golang)
12. [Remainder or Modulus in Go](https://golangbyexample.com/remainder-modulus-go-golang)
13. [Break a number into integer and fraction parts in Go](https://golangbyexample.com/break-integer-fraction-part-go)
14. [Power function in Go](https://golangbyexample.com/power-golang)
15. [Check if a number is positive or negative in Go](https://golangbyexample.com/num-positive-negative-go)
16. [Min of two numbers in Go](https://golangbyexample.com/min-of-two-numbers-golang)
17. [Max of two numbers in Go](https://golangbyexample.com/max-of-two-numbers-go/)

## 二十五、 Random

01. [Generate random number in Go](https://golangbyexample.com/generate-random-number-golang)
02. [Generate random password](https://golangbyexample.com/generate-random-password-golang)
03. [Pick a random element in an array/slice in Go](https://golangbyexample.com/pick-random-element-array-slice-go)
04. [Pick a random character in string in Go](https://golangbyexample.com/pick-random-character-string-golang/)
05. [Shuffle a string in Go](https://golangbyexample.com/shuffle-string-golang)
06. [Shuffle a slice or array in Go](https://golangbyexample.com/shuffle-slice-or-array-go/)
07. [Generate a random array/slice of n integers in Go](https://golangbyexample.com/generate-random-array-slice-golang/)
08. [Generate a number in a given range](https://golangbyexample.com/random-number-range-golang/)
09. [Generate a random string in Go](https://golangbyexample.com/generate-random-string-golang)

## 二十六、 Float

01. [Parse string representation of a float](https://golangbyexample.com/parse-string-representation-float-go/)

## 二十七、 Bool

01. [Parse string representation of a bool](https://golangbyexample.com/check-string-bool-golang/)
02. [Format specifier for boolean in golang](https://golangbyexample.com/format-specifier-for-bool-golang)

## 二十八、 🍀Sync

01. [Understanding WaitGroup in Go](https://golangbyexample.com/understanding-waitgroup-go)

## 二十九、 Loop

01. [Implement while loop in Go](https://golangbyexample.com/go-implement-while-loop/)

## 三十、 🍀Function

01. [Immediately Invoked Function in Go](https://golangbyexample.com/immediately-invoked-function-go)
02. [Function Closures in Go](https://golangbyexample.com/function-closures-golang/)
03. [Pass Function as an argument to another function](https://golangbyexample.com/func-as-func-argument-go)
04. [Return a function from another function](https://golangbyexample.com/return-func-from-func-go)
05. [Pass Variable Number of Arguments to a function](https://golangbyexample.com/go-variadic-function)
06. [Difference between function and method](https://golangbyexample.com/difference-between-method-function-go)
07. [Anonymous Function in Go](https://golangbyexample.com/go-anonymous-function)
08. [Higher Order Function in Go](https://golangbyexample.com/gohigher-order-functions/)
09. [User Defined Function Type](https://golangbyexample.com/user-defined-function-type-go/)
10. [Return Multiple Values from a function](https://golangbyexample.com/go-return-multiples-values-function)
11. [Function in Golang – Complete Guide](https://golangbyexample.com/function-golang-complete-guide/)
12. [How to call a function from another package in Golang](https://golangbyexample.com/functoin-different-package-go/)

## 三十一、🍀Defer

01. [Defer keyword in Golang](https://golangbyexample.com/defer-golang/)
02. [Defer a goroutine in Golang](https://golangbyexample.com/defer-goroutine-golang/)
03. [Use Case of defer function in Golang](https://golangbyexample.com/defer-use-case-go/)
04. [Inline Function in Defer in Golang](https://golangbyexample.com/inline-function-defer-go/)
05. [Evaluation of defer arguments in Golang](https://golangbyexample.com/defer-arguments-evaluation-go/)
06. [Custom Function in defer in Golang](https://golangbyexample.com/custom-function-defer-golang/)
07. [How does defer works in Golang](https://golangbyexample.com/how-defer-works-golang/)
08. [Defer function and Named Return Values in Golang](https://golangbyexample.com/defer-named-return-values-golang/)
09. [Multiple defer functions in Golang](https://golangbyexample.com/multiple-defer-functions-golang/)
10. [Defer and Methods in Golang](https://golangbyexample.com/defer-methods-golang/)
11. [Can defer be used inside main function in Golang](https://golangbyexample.com/defer-inside-main-golang/)

## 三十二、 🍀Panic & Recover

01. [Panic and Recover in Golang](https://golangbyexample.com/panic-and-recover-golang/)
02. [Recover a panic in a different function in Go](https://golangbyexample.com/recover-panic-different-function-go/)
03. [Panic with Defer in Golang](https://golangbyexample.com/panic-with-defer-golang/)
04. [Runtime Error Panic in Golang](https://golangbyexample.com/runtime-error-panic-golang/)
05. [Panic format string in Golang](https://golangbyexample.com/panic-format-string-go/)
06. [Recover panic from goroutine in Golang](https://golangbyexample.com/recover-panic-goroutine-go/)
07. [Return value of the function when panic is recovered in Golang](https://golangbyexample.com/return-value-function-panic-recover-go/)
08. [Recover function return value in Golang](https://golangbyexample.com/recover-return-value-golang/)
09. [Panic stack trace in Golang](https://golangbyexample.com/panic-stack-trace-go/)
10. [How to create panic in Golang](https://golangbyexample.com/how-create-panic-golang/)
11. [Example of Recover Function in Golang](https://golangbyexample.com/recover-example-go/)
12. [What happens during panic in Golang](https://golangbyexample.com/what-happens-during-panic-go/)
13. [Create panic by calling panic function in Golang](https://golangbyexample.com/create-panic-golang/)
14. ❓[Base64 encoding/Decoding in Golang](https://golangbyexample.com/base64-golang/)
15. ‼️`panic`，后续的代码不会执行。但是被 `defer` 声明的函数会在 `panic` 之后执行

> 在 Go 语言中，如果发生 `panic` ，后续的代码不会执行。但是被 `defer` 声明的函数会在 `panic` 之后执行。
>
> 在你的代码中，如果 `panic` 发生：
>
> 1. `value = a[index]` 和 `return value, nil` 不会执行。
> 2. `defer handleOutOfBounds()` 会执行，因为它被 `defer` 声明。
>
> `defer` 语句在函数返回之前或者 `panic` 传播之前被调用，这使得它非常适合用于清理资源或处理异常情况。

16. ‼️在 Go 语言中，当 `panic` 发生时，`defer` 语句会在 `panic` 信息打印之前执行。这是因为 `defer` 用于在函数返回之前进行清理工作。

所以， `defer` 中的代码会先执行，然后才会打印 `panic` 信息并终止程序。你可以在 `defer` 中处理 `panic` ，例如通过 `recover` 函数来捕获和处理它：

```go
func handleOutOfBounds() {
    if r := recover(); r != nil {
        fmt.Println("Recovered from panic:", r)
    }
}
```

这样， `panic` 信息会被捕获并处理，而不会导致程序崩溃。

## 三十三、 Generic Articles

01. [NewRelic in Go with deep instrumentation](https://golangbyexample.com/go-new-relic-example-in-golang-with-deep-instrumentation/)
02. [Redis Client Example](https://golangbyexample.com/golang-redis-client-example/)
03. [Redis Cluster Client Example](https://golangbyexample.com/golang-redis-cluster-client-example/)
04. [Maps: Not safe for concurrent use](https://golangbyexample.com/maps-not-safe-for-concurrent-use/)
05. [Octal and Hex in Go](https://golangbyexample.com/hex-and-octal-in-golang)
06. [Double, Single and Back Quotes in Go](https://golangbyexample.com/double-single-back-quotes-go)
07. [All types of Client timeouts in (HTTP/TCP/UDP/ Unix Sockets Communication ) etc](https://golangbyexample.com/all-types-client-timeouts-http-tcp-udp-unix/)
08. [Generate a UUID/GUID in Go (Golang)](https://golangbyexample.com/generate-uuid-guid-golang)
09. [Server Error – 500 vs 502 vs 503 vs 504](https://golangbyexample.com/server-error-5xx)
10. [Print/Output text in color in console](https://golangbyexample.com/print-output-text-color-console)
11. [Print/Output text in bold in Golang](https://golangbyexample.com/print-text-bold-go/)
12. [Print/Output text in italic in Golang](undefined)
13. [Print/Output text with a background in Golang](https://golangbyexample.com/print-text-background-golang/)
14. [Print/Output crossed-out text in Golang](https://golangbyexample.com/print-text-crossout-golang/)
15. [Print/Output text in underline in Golang](https://golangbyexample.com/print-text-underline-golang/)
16. [Format a message without printing in Golang](https://golangbyexample.com/format-message-no-print-golang/)
17. [All about Base64 encoding/decoding – Complete Guide](https://golangbyexample.com/base64-complete-guide/)
18. [HTTP- Understanding multipart/form-data content-type](https://golangbyexample.com/multipart-form-data-content-type-golang/)

## 三十四、 🍀Object-Oriented Programming in GO

01. [OOP: Inheritance in GOLANG complete guide
Using Struct
Using Interface
Using Interface + Struct](undefined)
02. [OOP: Polymorphism in Go Complete Guide
Compile Time Polymorphism in Go (Golang)
Runtime Polymorphism in Go (Golang)
Method Overloading in Go (Alternatives/Workarounds)](undefined)
03. [Abstract Class in Go: Complete Guide](undefined)
04. [Encapsulation in Go](undefined)

## 三十五、 Protocol Buffers

01. [Protocol Buffer And Go: Getting Started](https://golangbyexample.com/protocol-buffers-go/)

## 三十六、 🍀fmt package

01. [Println vs Print vs Printf in Golang](https://golangbyexample.com/println-printf-print-golang/)
02. [Understanding Errorf function in Golang](https://golangbyexample.com/errorf-function-golang/)
03. [Understanding Fprintf function in Golang](https://golangbyexample.com/fprintf-golang/)
04. [Understanding Fprint function in Golang](https://golangbyexample.com/fprint-golang/)
05. [Understanding Fprintln function in Golang](https://golangbyexample.com/fprintln-golang/)
06. [Understanding Println function in Golang](https://golangbyexample.com/println-golang/)
07. [Understanding Printf function in Golang](https://golangbyexample.com/printf-golang/)
08. [Understanding Print function in Golang](https://golangbyexample.com/print-function-golang/)

## 三十七、 GRPC

01. [Difference between GRPC and Rest](https://golangbyexample.com/grpc-vs-rest/)

## 三十八、 Design Patterns

01. [All Design Pattern in GO – Curated List](https://golangbyexample.com/all-design-patterns-golang/)
02. [Abstract Factory Pattern
Builder Pattern
Factory Pattern
Object Pool Pattern
Prototype Pattern
Singleton Pattern](undefined)
03. [Chain of Responsibility Design Pattern
Command Design Pattern
Iterator Design Pattern
Mediator Design Pattern
Memento Design Pattern
Null Object Design Pattern
Observer Design Pattern
State Design Pattern
Strategy Design Pattern
Template Method Design Pattern
Visitor Design Pattern](undefined)
04. [Adapter Design Pattern
Bridge Design Pattern
Composite Design Pattern
Decorator design pattern
Facade Design Pattern
Flyweight Design Pattern
Proxy Design Pattern](undefined)

## 三十九、 Files

01. [Read a large file Word by Word in Go
Read a large file Line by Line in Go
Read a file into a variable in Golang](undefined)
02. [Write to a file in Go
Append to a file](undefined)
03. [Delete a file in Go
Delete a folder in Go](undefined)
04. [Change the updated/modified time of a file in Go](undefined)
05. [Rename a file or folder](undefined)
06. [Check if a file is a directory in Go
Create an empty file in Go
Check if a file or directory exists in Go
Iterate over a directory tree 
Get Current Working Directory in Go
Touch a file in Go
Move file from one location to another
Get File Name, Size, Permission Bits, Mode, Modified Time in Go
Copy a file in Go](undefined)

## 四十、 Folder/Directory

01. [Create a directory](https://golangbyexample.com/create-directory-folder-golang)
02. [Change Current Working Directory in Go](https://golangbyexample.com/change-current-working-directory-go/)

## 四十一、 🍀Validation

01. [Validate the presence of the field in a struct in Golang](https://golangbyexample.com/struct-field-validate-presence-golang/)
02. [Validate the range of the integer in a struct in Golang](https://golangbyexample.com/range-int-struct-validate-golang/)

## 四十二、 🍀Time

01. [All about time and date in Go](https://golangbyexample.com/all-about-time-and-date-golang/)
02. [Represent date of birth in golang.](https://golangbyexample.com/dob-golang)
03. [Get age given a dob](https://golangbyexample.com/get-age-given-dob-go)
04. [Current Timestamp in Go](https://golangbyexample.com/current-timestamp-in-golang/)
05. [Date/Time fomatting in Go](https://golangbyexample.com/time-date-formatting-in-go/)
06. [Time Conversion in Go](https://golangbyexample.com/time-conversion-in-golang)
07. [Parse Time in Go](https://golangbyexample.com/parse-time-in-golang/)
08. [Time Difference between two dates](https://golangbyexample.com/time-difference-between-two-time-value-golang)
09. [Get current time and date of different timezones](https://golangbyexample.com/get-current-time-and-date-of-different-timezones-golang/)
10. [Convert time between different timezones](https://golangbyexample.com/convert-time-timezones-go)
11. [Understanding Duration in Go](https://golangbyexample.com/understanding-duration-go)
12. [Add/Subtract to time](https://golangbyexample.com/add-or-subtract-to-time-g)
13. [Convert Unix Timestamp to time. Time](https://golangbyexample.com/parse-unix-timestamp-time-go)
14. [Date in Golang](https://golangbyexample.com/date-in-golang)
15. [Create new time instance](https://golangbyexample.com/create-new-time-instance-go)

## 四十三、 🍀Type Conversion

01. [Convert float to int in Golang](https://golangbyexample.com/float-to-int-golang/)
02. [Convert int to float in Golang](https://golangbyexample.com/int-to-float-golang/)
03. [Conversion between float32 and float64 in Golang](https://golangbyexample.com/conversion-float-golang/)

## 四十四、 Image

01. [Download a file or image from a URL](https://golangbyexample.com/download-image-file-url-golang)

## 四十五、 OS

01. [Execute shell file from Go](https://golangbyexample.com/execute-shell-file-golang)
02. [List All env variables in Go](https://golangbyexample.com/list-all-env-variables-go)
03. [Set or Get or Unset env variables in Go](https://golangbyexample.com/set-unset-get-env-variable-golang/)
04. [Check if an env variable is set or not](https://golangbyexample.com/check-environment-variable-set-go)
05. [Detect OS at runtime in Go](https://golangbyexample.com/detect-os-golang)
06. [Get Hostname in Go](https://golangbyexample.com/get-hostname-golang/)
07. [Return Exit Status Code in Go](https://golangbyexample.com/return-exit-status-code-go)
08. [Execute an OS/System Command in Go](https://golangbyexample.com/execute-os-system-command-golang)
09. [Get Current Username in Go](https://golangbyexample.com/get-current-username-golang/)
10. [Get Current User’s Home Directory in Go](https://golangbyexample.com/get-current-user-home-directory-go)
11. [Load a .env or environment file in Golang](https://golangbyexample.com/load-env-fiie-golang/)

## 四十六、 net/HTTP

01. [net/http package get Query Params in Go](https://golangbyexample.com/net-http-package-get-query-params-golang/)
02. [net/http Package – Detecting Timeout](https://golangbyexample.com//golang-net-http-package-detecting-upstream-timeout/)
03. [Basic HTTP server in go](https://golangbyexample.com/basic-http-server-go)
04. [Get headers from an incoming HTTP request in Golang](https://golangbyexample.com/headers-http-request-golang/)
05. [Set response headers for an incoming HTTP request in Golang](https://golangbyexample.com/set-resposne-headers-http-go/)
06. [Get response headers for an outgoing HTTP request in Go (Golang)](https://golangbyexample.com/get-response-headers-making-go/)
07. [Set headers for an outgoing HTTP request in Golang](https://golangbyexample.com/set-headers-http-request/)
08. [Check if a particular header is present in an HTTP request in Golang](https://golangbyexample.com/header-present-http-golang/)
09. [Canonical HTTP Header Key Meaning](https://golangbyexample.com/canonical-http-header-key/)
10. [Get JSON request body from a HTTP request in Golang](https://golangbyexample.com/json-request-body-golang-http/)
11. [Get client’s user agent from an incoming HTTP request in Golang](https://golangbyexample.com/user-agent-http-golang)
12. [HTTP Client/Server with Basic Auth in Golang](https://golangbyexample.com/http-basic-auth-golang/)
13. [Parse application/x-www-form-urlencoded http request body in Golang](https://golangbyexample.com/url-encoded-body-golang/)
14. [HTTP client or Send x-www-form-urlencoded request body in Golang](https://golangbyexample.com/http-client-urlencoded-body-go/)
15. [HTTP send/receive jpeg file request body example in Golang](https://golangbyexample.com/jpeg-post-http-go)
16. [HTTP send/receive pdf file in request body example in Golang](https://golangbyexample.com/http-pdf-post-go/)
17. [HTTP send/receive png file in request body example in Golang](https://golangbyexample.com/http-png-post-golang/)
18. [HTTP client/server multipart form-data request body example in Golang](https://golangbyexample.com/http-mutipart-form-body-golang/)
19. [HTTP send/receive application octet-stream request body in Golang](https://golangbyexample.com/octet-stream-http-golang/)
20. [Why the response body is closed in golang](https://golangbyexample.com/resposne-body-closed-golang/)
21. [Set a timeout while making an HTTP request in Golang](https://golangbyexample.com/set-timeout-http-golang/)
22. [Validate the range of the integer in an HTTP request body struct in Golang](https://golangbyexample.com/validate-range-http-body-golang/)
23. [HTTP Client to not follow redirect in Golang](https://golangbyexample.com/http-no-redirect-client-golang/)
24. [Understanding Set-Cookie Response Header](https://golangbyexample.com/set-cookie-response-header/)
25. [Cookie Jar in Golang](https://golangbyexample.com/cookiejar-golang/)
26. [Cookies in Golang](https://golangbyexample.com/cookies-golang/)
27. [Read cookie http in Golang](https://golangbyexample.com/read-cookie-http-golang/)
28. [Set cookie http in Golang](https://golangbyexample.com/set-cookie-http-golang/)
29. [Return 400 (Bad Request) in http response in Golang](https://golangbyexample.com/400-http-status-response-golang/)
30. [Return 404 (Resource Not Found) in http response in Golang](https://golangbyexample.com/404-http-status-code-golang/)
31. [Return 401 (UnAuthorized) in HTTP response in Golang](https://golangbyexample.com/401-http-status-response-go/)
32. [Return 403 (Forbidden) in HTTP response in Golang](https://golangbyexample.com/403-http-status-response-golang/)
33. [Return 200 (StatusOK) in HTTP response in Golang](https://golangbyexample.com/200-http-status-response-golang/)
34. [Return 201 (StatusCreated) in HTTP response in Golang](https://golangbyexample.com/201-http-status-response-golang/)
35. [Return 500 or Internal Server Error in HTTP response in Golang](https://golangbyexample.com/500-status-http-response-golang/)
36. [How to set HTTP status code in response in Golang](https://golangbyexample.com/set-http-status-code-golang/)
37. [Return JSON body in HTTP response in Golang](https://golangbyexample.com/json-response-body-http-go/)
38. [Return 202 (StatusAccepted) in HTTP response in Golang](https://golangbyexample.com/202-status-http-response-go/)
39. [Return plain text body in HTTP response in Golang](https://golangbyexample.com/plain-text-response-body-golang/)
40. [Return an image or file in HTTP response in Golang](https://golangbyexample.com/image-http-response-golang/)
41. [Parse a URL and extract all the parts in Golang](https://golangbyexample.com/parse-url-golang/)
42. [Extract a URL from a string in Golang](https://golangbyexample.com/extract-url-golang/)
43. [Convert Query Param String to Query Param Hash in Golang](https://golangbyexample.com/query-param-map-golang/)
44. [Get full hostname along with port from a URL in Golang](https://golangbyexample.com/hostname-port-url-golang/)
45. [Get or Extract Query Params from a URL in Golang](https://golangbyexample.com/query-params-url-golang/)

## 四十七、 🍀error

01. [Error in Golang](https://golangbyexample.com/error-in-golang/)
02. [Error in Golang- Advanced](https://golangbyexample.com/error-in-golang-advanced/)
03. [Different ways of creating an error in Golang](https://golangbyexample.com/different-ways-of-creating-an-error-in-go-golang)
04. [Comparing error or error equality in Go](https://golangbyexample.com/comparing-error-go/)
05. [Get underlying type from error or error assertion in Go](https://golangbyexample.com/error-assertion-golang/)
06. [Wrapping and Un-wrapping of error in Go](https://golangbyexample.com/wrapping-and-unwrapping-error-golang/)
07. [Ignoring errors in Go](https://golangbyexample.com/ignoring-errors-golang/)
08.  两种断言`err.({type})` `func As(err error, target interface{}) bool` ， 后者更优
09.   在 Go 语言中， `errors.Is` 和 `errors.As` 都用于错误处理，但它们有不同的用途：

### `errors.Is`

* **用途**: 检查一个错误是否等于某个特定的错误。
* **实现**: 它会检查错误链，查看是否有任何错误等于目标错误。
* **用法**: 常用于判断错误是否是某个特定的已知错误。

```go
if errors.Is(err, targetError) { // if err1 == err2 {
    // Handle the specific error
}
```

### `errors.As`

* **用途**: 检查一个错误是否可以转换为特定的错误类型，并进行类型断言。
* **实现**: 它会遍历错误链，尝试将错误转换为目标类型。
* **用法**: 常用于获取特定错误类型的详细信息。

```go
var targetErr *SomeErrorType
if errors.As(err, &targetErr) { // if e, ok := err.(*os.PathError); ok {
    // Now you can work with targetErr as a *SomeErrorType
}
```

### 总结

* 使用 `errors.Is` 来检查错误是否与特定错误相等。
* 使用 `errors.As` 来检查错误是否可以转换为特定类型，并获取该类型的错误信息。

## 算法

算法不仅仅是计算出结果，更重要的是以下几个方面：

01. **正确性**：
   - 确保算法在所有情况下都能产生正确的结果。

02. **效率**：
   - 时间复杂度和空间复杂度的优化，确保在合理的时间和资源内完成任务。

03. **可读性和可维护性**：
   - 代码应易于理解和维护，便于他人阅读和修改。

04. **鲁棒性**：
   - 能够处理异常和边界情况，不易崩溃。

05. **扩展性**：
   - 设计良好的算法应易于扩展，以适应未来的需求变化。

06. **简洁性**：
   - 在不影响性能的情况下，尽可能简洁明了。

这些因素共同决定了一个算法的质量和实用性。

## 四十八、 Data Structures

01. [All Data Structures in Golang](https://golangbyexample.com/all-data-structures-golang/)
02. 🎉[Queue in Golang](https://golangbyexample.com/queue-in-golang/)
03. 🎉[Stack in Golang](https://golangbyexample.com/stack-in-golang/)
04. 🎉[Set in Golang](https://golangbyexample.com/set-implementation-in-golang/)
05. 🎉[Singly Linked List in Golang](https://golangbyexample.com/singly-linked-list-in-golang/)
06. 🎉[Doubly Linked List in Golang](https://golangbyexample.com/doubly-linked-list-golang/)
07. 🎉[Recursive Iterative](undefined)
08. 🎉[Heap in Golang](https://golangbyexample.com/heap-in-golang)
09. [Trie](https://golangbyexample.com/trie-implementation-in-go/)

## 四十九、 Integers

01. [Reverse a number or an integer in Go (Golang)](https://golangbyexample.com/reverse-number-golang/)
02. [Implement your own Atoi function in Go (Golang)](https://golangbyexample.com/implement-your-own-atoi-function-golang/)
03. ✌️[Check if a number is a palindrome or not in Go (Golang)](https://golangbyexample.com/check-number-palindrome-golang/) *递归的执行顺序就像栈一样*
04. [Find the next permutation of a number in Go (Golang)](https://golangbyexample.com/next-permuation-number-go/)
05. [Program to add all digits of a number in Go (Golang)](https://golangbyexample.com/add-all-digits-number-golang/)
06. [Divide two integers without using multiplication or division operator in Go (Golang)](https://golangbyexample.com/divide-two-int-golang/)
07. [Program to calculate the power of a number in Go (Golang)](https://golangbyexample.com/power-number-golang/)
08. [Plus one program or Add one to an integer array in Go (Golang)](https://golangbyexample.com/add-one-integer-array-go/)
09. [The nth digit in a sequence program in Go (Golang)](https://golangbyexample.com/nth-digit-sequence-golang/)
10. [Program for ugly number in Go (Golang)](https://golangbyexample.com/ugly-number-golang/)
11. [Program for ugly number 2 in Go (Golang)](https://golangbyexample.com/program-for-ugly-number-2-in-go-golang/)
12. 递归的执行顺序就像栈一样 . [reconfirm](https://cloud.tencent.com/developer/article/1947205) 

```go
package main

import "fmt"

func main() {

	a := 123421
	output := isPalindrome(a, &a) // 这里是传入了两份数据
	fmt.Println(output)

}

func isPalindrome(x int, dup *int) bool {
	fmt.Println("x", x)

	if x < 0 {
		return false
	}
	if x < 10 {
		return true
	}

	palin := isPalindrome(x/10 /*递的步长*/, dup)
	fmt.Println("p", x) // 从高位->低位

    // devider line
	fmt.Println("d", *dup) 
	*dup = *dup / 10 // 从低位->高位

	lastDigit := x % 10

	if palin && *dup%10 == lastDigit {
		return true
	}

	return false

}

```

> 上述代码x发生递归，而dup没有发生递归，所以相当于是两个数组一个从高位取，一个从低位取
>  
> 抱歉，之前没有详细说明。确实可以这样理解：
>  
> 在递归检查回文数的过程中：
>  
> * **x 的递归**：通过递归调用，逐步去掉最低位，最终到达最高位。
> * **dup**：保持不变，用来记录原始数字。
>  
> 这样：
>  
> * **x** 从高位到低位处理。
> * **dup** 从低位到高位处理。
>  
> 在归阶段，比较 x 和 dup 的对应高低位，判断是否为回文。

## 五十、 String

01. [Longest substring without repeating characters program in Golang](https://golangbyexample.com/longest-substring-without-repeating-characters-golang/)
02. [Longest Palindromic Substring within a string in Go (Golang)](https://golangbyexample.com/longest-palindromic-substring-go/)
03. [Generate valid parentheses in Go (Golang)](https://golangbyexample.com/generate-valid-parentheses-golang/)
04. [Check valid parenthesis in Go (Golang)](https://golangbyexample.com/valid-parenthesis-golang/)
05. [Longest valid parentheses substring within a string in Go (Golang)](https://golangbyexample.com/longest-valid-parentheses-substring-go/)
06. [Wildcard matching or regex matching program in Go (Golang)](https://golangbyexample.com/wildcard-matching-golang/)
07. [Add two binary numbers program in Go (Golang)](https://golangbyexample.com/add-two-binary-numbers-golang/)
08. [Check if two given strings are anagrams in Go (Golang)](https://golangbyexample.com/check-two-strings-anagram-go/)
09. [Sub string program in Go (Golang)](https://golangbyexample.com/sub-string-golang/)
10. [Letter Combinations of a Phone Number Program in Go (Golang)](https://golangbyexample.com/letter-combinations-phone-golang/)
11. [Program for length of the last word in a string in Go (Golang)](https://golangbyexample.com/length-last-word-golang/)
12. [Program to multiply two strings in Go (Golang)](https://golangbyexample.com/multiply-two-strings-golang/)
13. [Program for the total number of words in a sentence in Go (Golang)](https://golangbyexample.com/number-words-sentence-golang/)
14. [Maximum words in a group of sentences in Go (Golang)](https://golangbyexample.com/maximum-words-group-sentences-go/)
15. [Kth Distinct String in an Array Program in Go (Golang)](https://golangbyexample.com/kth-distinct-string-golang/)
16. [Longest Common Prefix in a set of strings in Go (Golang)](https://golangbyexample.com/longest-common-prefix-golang/)
17. [Reverse vowels of a string in Go (Golang)](https://golangbyexample.com/reverse-vowels-string-golang/)
18. [Program for Longest Word in Dictionary through Deleting in Go (Golang)](https://golangbyexample.com/longest-word-dictionary-go/)
19. [Print the next or previous character given a char in Go (Golang)](https://golangbyexample.com/next-previous-char-golang/)
20. [Repeat a string multiple times in Go (Golang)](https://golangbyexample.com/repeat-string-golang/)

## 五十一、 Array

01. [Find two numbers in an array that adds up to a target number in Go (Golang)](https://golangbyexample.com/target-sum-golang/)
02. [Medium of two sorted arrays in Go (Golang)](https://golangbyexample.com/medium-two-sorted-arrays-golang/)
03. [Find all triplets in an array that adds to a zero in Go (Golang)](https://golangbyexample.com/array-triplets-add-zero-golang/)
04. [Find all triplets in an array that adds to a target number in Go (Golang)](https://golangbyexample.com/array-triplets-target-sum-golang/)
05. [Find the sum which is closest to a target number using three numbers in an array or 3Sum closest problem in Go (Golang)](https://golangbyexample.com/three-sum-closest-golang/)
06. [Find first missing positive integer in an int array in Go (Golang)](https://golangbyexample.com/first-missing-postivie-integer-golang/)
07. [Find the pivot index in a sorted and pivoted array in Go (Golang)](https://golangbyexample.com/pivot-index-pivoted-array-go/)
08. [Search in a sorted and pivoted array in Go (Golang)](https://golangbyexample.com/search-sorted-pivoted-array/)
09. [Find the first and last position of a target element in a sorted array in Go (Golang)](https://golangbyexample.com/first-last-position-target-sorted-array-golang/)
10. [Trapping rainwater problem in Go (Golang)](https://golangbyexample.com/?p=6285)
11. [Group anagrams together program in Go (Golang)](https://golangbyexample.com/group-anagrams-together-go/)
12. [Merge overlapping intervals in Go (Golang)](https://golangbyexample.com/merge-overlapping-intervals-golang/)
13. [Non-Overlapping intervals program in Go (Golang)](https://golangbyexample.com/non-overlapping-intervals-golang/)
14. [Sort an array of 0, 1, and 2 in Go (Golang)](https://golangbyexample.com/sort-array-one-zero-two-golang/)
15. [Jump Game Program in Go (Golang)](https://golangbyexample.com/jump-game-program-golang/)
16. [Remove duplicates from a sorted array in Go (Golang)](https://golangbyexample.com/remove-duplicates-sorted-array-golang/)
17. [Maximum sum subarray program in Go (Golang)](https://golangbyexample.com/maximum-sum-subarray-golang/)
18. [Largest Rectangular Area in a Histogram in Go (Golang)](https://golangbyexample.com/largest-rectangular-area-histogram-go/)
19. [Combination Sum Program in Go (Golang)](https://golangbyexample.com/combination-sum-program-go/)
20. [Reverse Words in a sentence in Go (Golang)](https://golangbyexample.com/reverse-words-sentence-golang/)
21. [Program for Power set of a given array of integers in Go (Golang)](https://golangbyexample.com/power-set-array-golang/)
22. [Merge two sorted arrays in Go (Golang)](https://golangbyexample.com/merge-two-sorted-arrays-golang/)
23. [Remove all occurrences of a given value in an array in place in Go (Golang)](https://golangbyexample.com/remove-element-golang/)
24. [Unique Paths Program in Go (Golang)](https://golangbyexample.com/unique-paths-program-golang/)
25. [Best time to Buy-Sell Stocks Program in Go (Golang)](https://golangbyexample.com/buy-sell-stock-golang/)
26. [Search Insert Position Program in Go (Golang)](https://golangbyexample.com/search-insert-position-golang/)
27. [Find All Duplicates in an Array in Go (Golang)](https://golangbyexample.com/find-all-duplicates-array-golang/)
28. [Find all Arithmetic series of length greater than two in Go (Golang)](https://golangbyexample.com/arithmetic-series-golang/)
29. [Distinct or Unique Permutations of a string or array in Go (Golang)](https://golangbyexample.com/unique-permutations-golang/)
30. [Two furthest houses with different colors in Go (Golang)](https://golangbyexample.com/two-furthest-houses-different-color-golang/)
31. [Maximum Difference between increasing elements in an array in Go (Golang)](https://golangbyexample.com/maximum-difference-increasing-elements-in-an-array-golang/)
32. [Maximum Length of Contiguous Subarray with an equal number of 0’s and 1’s in Go (Golang)](https://golangbyexample.com/max-length-array-zero-one-golang/)
33. [Program for Binary Search in a sorted array in Go (Golang)](https://golangbyexample.com/binary-search-sorted-array-golang/)
34. [Majority element in an array in Go (Golang)](https://golangbyexample.com/majority-element-array-golang/)
35. [Find the number which appears once in an array in Go(Golang)](https://golangbyexample.com/number-array-once-golang/)
36. [Longest Consecutive Sequence Program in Go (Golang)](https://golangbyexample.com/longest-consecutive-sequence-golang/)
37. [Check If N and Its Double Exist in Go (Golang)](https://golangbyexample.com/number-double-golang/)
38. [Program for Income Tax Paid in Go (Golang)](https://golangbyexample.com/income-tax-bracket-program-golang/)
39. [Sort characters by frequency in Go (Golang)](https://golangbyexample.com/sort-characters-frequency-go/)

## 五十二、 Matrix

01. ✌️[Spiral Matrix Problem in Go (Golang)](https://golangbyexample.com/spiral-matrix-problem-golang/)
02. [Rotate a symmetric matrix or an image in place in a clockwise direction in Go (Golang)](https://golangbyexample.com/rotate-image-clockwise-golang/)
03. ✌️[Set matrix zero if a row or column is zero in Go (Golang)](https://golangbyexample.com/set-matrix-zero-golang/)
04. [Rotting Oranges Program in Go (Golang)](https://golangbyexample.com/rotting-oranges-program-go/)
05. ✌️[Determine Whether Matrix Can Be Obtained By Rotation in Go (Golang)](https://golangbyexample.com/matrix-rotation-target-golang/)
06. [Count unguarded cells program in Go (Golang)](https://golangbyexample.com/count-unguarded-cells-golang/)

## 五十三、 Algorithm

01. [LRU Cache Implementation in Go (Golang)](https://golangbyexample.com/lru-cache-implementation-golang/)

## 五十四、 Linked List

01. [Convert singly linked list into an array using Golang](https://golangbyexample.com/linked-list-array-go/)
02. [Convert singly linked list into a circular linked list using Golang](https://golangbyexample.com/single-linked-list-circular-golang/)
03. [Check if a linked list is circular in Golang](https://golangbyexample.com/linked-list-is-circular-go/)
04. [Delete a kth node from the front in a Singly Linked List in Golang](https://golangbyexample.com/kth-node-front-linked-list-golang/)
05. [Delete a kth node from back in a Singly Linked List in Go (Golang)](https://golangbyexample.com/delete-kth-node-back-linked-list-golang/)
06. [Reverse Doubly Linked List in Go](https://golangbyexample.com/reverse-doubly-linked-list-golang/)
07. [Add two numbers represented by linked list in Golang](https://golangbyexample.com/add-numbers-linked-list-golang/)
08. [Reverse a linked list in Go (Golang)](https://golangbyexample.com/reverse-linked-list-golang/)
09. [Reverse nodes in k-group for a given linked list in Go (Golang)](https://golangbyexample.com/reverse-nodes-k-group-linked-list-golang/)
10. [Pair swap nodes in a linked list in Go (Golang)](https://golangbyexample.com/pair-swap-nodes-linked-list-go/)
11. [Convert a sorted linked list to balanced BST in Go (Golang)](https://golangbyexample.com/sorted-linked-list-to-balanced-bst/)
12. [Check if a given linked list has a cycle in Go (Golang)](https://golangbyexample.com/ilinked-list-cycle-golang/)
13. [Rotate a linked list in Go (Golang)](https://golangbyexample.com/rotate-linked-list-golang/)
14. [Detect cycle start node in a linked list in Go (Golang)](https://golangbyexample.com/cycle-start-node-linked-list-go/)
15. [Delete middle node of a linked list in Go (Golang)](https://golangbyexample.com/delete-middle-node-linked-list-golang/)
16. [Partition a linked list in Go (Golang)](https://golangbyexample.com/partition-linked-list-golang/)
17. [Remove Linked List Elements Program in Go (Golang)](https://golangbyexample.com/remove-linked-list-elements-golang/)

## 五十五、 Dynamic Programming

01. [Edit Distance between two strings in Go (Golang)](https://golangbyexample.com/edit-distance-two-strings-golang/)
02. [Interleaving String Program in Go (Golang)](https://golangbyexample.com/interleaving-string-program-golang/)
03. [Longest Increasing Subsequence Program in Go (Golang)](https://golangbyexample.com/longest-increasing-subsequence-golang/)
04. [Range Sum Array Program in Go (Golang)](https://golangbyexample.com/range-sum-array-golang/)
05. [Range Sum 2d array program in Go (Golang)](https://golangbyexample.com/range-sum-2d-array-go/)
06. [Count Possible Decodings of a digit sequence into letters in Go (Golang)](https://golangbyexample.com/count-possible-decodings-digit-golang/)
07. [Minimum Path Sum Program in Go (Golang)](https://golangbyexample.com/minimum-path-sum-golang/)
08. [Program for House Robber Problem in Go (Golang)](https://golangbyexample.com/house-robber-golang/)
09. [Program for Pascal’s Triangle in Go (Golang)](https://golangbyexample.com/program-pascal-triangle-golang/)

## 五十六、 Game

01. [Tic Tac Toe Complete Working Program in Go (Golang)](https://golangbyexample.com/tic-tac-toe-program-golang/)

## 五十七、 Tree

01. [Level Order Traversal of a binary tree in Go (Golang)](https://golangbyexample.com/level-order-traversal-binary-tree-golang/)
02. [Height or maximum depth of a binary tree in Go (Golang)](https://golangbyexample.com/height-binary-tree-golang/)
03. [Construct a binary tree from preorder and inorder in Go (Golang)](https://golangbyexample.com/tree-preorder-inorder-golang/)
04. [Construct a binary tree from postorder and inorder in Go (Golang)](https://golangbyexample.com/binary-tree-postorder-inorder-golang/)
05. [Inorder traversal of a Binary Tree in Go (Golang)](https://golangbyexample.com/inorder-binary-tree-golang/)
06. [Postorder traversal of a Binary Tree in Go (Golang)](https://golangbyexample.com/postorder-binary-tree-golang/)
07. [Preorder traversal of a Binary Tree in Go (Golang)](https://golangbyexample.com/preorder-binary-tree-golang/)
08. [Program for the same binary tree in Go (Golang)](https://golangbyexample.com/same-binary-tree-golang/)
09. [Print all Binary Tree Paths in Go (Golang)](https://golangbyexample.com/print-all-binary-tree-paths-go/)
10. [Binary Tree Maximum Path Sum Program in Go (Golang)](https://golangbyexample.com/binary-tree-maximum-path-sum-golang/)

## 五十八、 Binary Search Tree

01. [Check if a given tree is a Binary Search Tree in Go (Golang)](https://golangbyexample.com/tree-is-bst-golang/)
02. [Sorted Array to Height Balanced BST in Go (Golang)](https://golangbyexample.com/sorted-array-balanced-bst-golang/)
03. [Recover Binary Search Tree Program in Go (Golang)](https://golangbyexample.com/recover-binary-search-tree-golang/)

## 五十九、 Generic Programs

01. [Infix to Postfix Conversion in Go (Golang)](https://golangbyexample.com/infix-to-postfix-conversion-go/)
02. [Evaluation of Postfix Expression in Go (Golang)](https://golangbyexample.com/evaluation-of-postfix-expression-golang/)

## 六十、 Sorting Algorithms

01. [Heap Sort](https://golangbyexample.com/heapsort-in-golang)
02. [Insertion Sort](https://golangbyexample.com/insertion-sort-in-go/)
03. [Selection Sort](https://golangbyexample.com/go-selection-sort/)
04. [Bubble Sort](https://golangbyexample.com/go-bubble-sort/)

## 六十一、 Graph

01. [Count unreachable pair of nodes in an undirected graph in Go (Golang)](https://golangbyexample.com/count-unreachable-pair-nodes-golang/)
02. [Detonate the maximum bombs program in Go (Golang)](https://golangbyexample.com/detonate-maximum-bombs-golang/)
03. [Is Graph Bipartite Program in Go (Golang)](https://golangbyexample.com/graph-bipartite-golang/)

## 六十二、 Network

01. [Validate an IP address in Go](https://golangbyexample.com/validate-an-ip-address-in-go)
02. [Check if an IP address is IPv4 or IPv6](https://golangbyexample.com/check-ip-address-is-ipv4-or-ipv6-go)
03. [Get IP address from an incoming HTTP request](https://golangbyexample.com/golang-ip-address-http-request/)

## 六十三、 Regex or Regular Expression

01. [Golang Regex – Include dot – ‘.’ inside square brackets or character class](https://golangbyexample.com/dot-square-bracket-regex-golang/)
02. [Concatenation or AND of regexes in Golang](https://golangbyexample.com/concatenation-regex-golang/)
03. [Alternation (OR) of regexes in Golang](https://golangbyexample.com/alternation-regex-golang/)
04. [Golang regex: Match full string](https://golangbyexample.com/golang-regex-match-full-string/)
05. [Golang regex: Understanding caret and dollar character](https://golangbyexample.com/golang-regex-understanding-caret-and-dollar-character/)
06. [Golang Regex: Match prefix or suffix of a string](https://golangbyexample.com/regex-prefix-suffix-golang/)
07. [Golang Regex: Case insensitive regular expression matching in Golang](https://golangbyexample.com/case-insensitive-regex-golang/)
08. [Golang Regex: Matching raw or literal string](https://golangbyexample.com/golang-regex-literal-strin/)
09. [Golang Regex: Understanding dot ‘.’ character](https://golangbyexample.com/dot-chracter-golang-regex/)
10. [Golang Regex: Replace all string which matches a Regular Expression](https://golangbyexample.com/regex-replace-string-golang/)
11. [Golang Regex: Backreferences](https://golangbyexample.com/golang-regex-backreferences/)
12. [Golang Regex: Optional Operator or question mark (?) in regular expression](https://golangbyexample.com/optional-operator-regex-golang/)
13. [Golang Regex: Match number or numeric digits in Regular Expression](https://golangbyexample.com/golang-regex-match-number/)
14. [Golang Regex: Match a floating-point number in Regular Expression](https://golangbyexample.com/golang-regex-floating-point-number/)
15. [Golang Regex: Understanding Curly Braces in Regular Expressions](https://golangbyexample.com/curly-braces-regex-golang/)
16. [Golang regex match any character](https://golangbyexample.com/golang-regex-match-any-character/)
17. [Golang Regex: Use a variable inside a Regular Expression](https://golangbyexample.com/variable-regex-golang/)

## 六十四、 Logger

01. [Go Logger Rotate](https://golangbyexample.com/go-logger-rotation/)

## 六十五、 MAC OS

01. [Understanding /etc/paths and /etc/paths.d on MAC](https://golangbyexample.com/understand-etc-paths-pathsd-mac)

## 六十六、 JSON

01. [Json parse a file in Golang](https://golangbyexample.com/json-parse-file-golang/)

## 六十七、 Ruby

01. [Ruby convert string to bool](https://golangbyexample.com/string-bool-ruby/)

## 六十八、 Linux

01. [Check all groups that current logged in user belong to on Linux](https://golangbyexample.com/current-log-user-groups/)

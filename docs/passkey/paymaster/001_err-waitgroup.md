## errgroup

`errgroup` 是 Go 的一个包，用于管理一组 goroutine，并收集它们返回的错误。它提供了一种简洁的方法来并发执行任务，并处理可能出现的错误。

以下是一个使用 `errgroup` 的简单示例：

```go
package main

import (
	"fmt"
	"golang.org/x/sync/errgroup"
	"net/http"
)

func main() {
	var g errgroup.Group

	urls := []string{
		"https://www.google.com",
		"https://www.github.com",
		"https://www.invalid-url.com",
	}

	for _, url := range urls {
		// 使用闭包捕获变量
		url := url
		g.Go(func() error {
			resp, err := http.Get(url)
			if err != nil {
				return err
			}
			defer resp.Body.Close()
			fmt.Printf("Fetched %s: %s\n", url, resp.Status)
			return nil
		})
	}

	// 等待所有 goroutine 完成并检查错误
	if err := g.Wait(); err != nil {
		fmt.Printf("Error: %v\n", err)
	} else {
		fmt.Println("Successfully fetched all URLs.")
	}
}
```

### 代码说明：

1. **导入包**：
   - `golang.org/x/sync/errgroup` ：用于创建和管理 goroutine 组。
   - `net/http` ：用于发起 HTTP 请求。

2. **创建 `errgroup.Group`**：
   - `var g errgroup.Group` ：创建一个 `errgroup` 实例。

3. **定义 URL 列表**：
   - 包含要访问的多个 URL。

4. **启动 goroutine**：
   - 使用 `g.Go(func() error { ... })` 启动 goroutine，并在其中执行 HTTP 请求。
   - 捕获错误并返回。

5. **等待 goroutine 完成**：
   - `g.Wait()` ：等待所有 goroutine 完成。如果有任何一个 goroutine 返回错误， `Wait` 会返回该错误。

6. **错误处理**：
   - 检查 `g.Wait()` 返回的错误，并进行相应处理。

这个示例展示了如何使用 `errgroup` 同时处理多个并发任务，并简化错误管理。

## 收集多个错误

`errgroup` 默认情况下只返回第一个遇到的错误。如果你需要收集所有错误，可以使用一个自定义的解决方案。例如，使用一个切片来存储所有错误，并在每个 goroutine 中进行同步访问：

```go
package main

import (
	"fmt"
	"sync"
	"golang.org/x/sync/errgroup"
	"net/http"
)

func main() {
	var g errgroup.Group
	var mu sync.Mutex // ------------------------------------
	var errs []error // ------------------------------------

	urls := []string{
		"https://www.google.com",
		"https://www.github.com",
		"https://www.invalid-url.com",
	}

	for _, url := range urls {
		url := url
		g.Go(func() error {
			resp, err := http.Get(url)
			if err != nil {
				mu.Lock() // ------------------------------------
				errs = append(errs, err) // ------------------------------------
				mu.Unlock() // ------------------------------------
				return nil
			}
			defer resp.Body.Close()
			fmt.Printf("Fetched %s: %s\n", url, resp.Status)
			return nil
		})
	}

	if err := g.Wait(); err != nil {
		fmt.Printf("Error: %v\n", err)
	}

	if len(errs) > 0 {
		fmt.Println("Collected errors:")
		for _, err := range errs { // ------------------------------------
			fmt.Println(err)
		}
	} else {
		fmt.Println("Successfully fetched all URLs.")
	}
}
```

### 代码说明：

1. **互斥锁 (`sync.Mutex`)**：
   - 用于安全地访问 `errs` 切片，以避免并发写入冲突。

2. **错误收集**：
   - 在每个 goroutine 中，遇到错误时，将其添加到 `errs` 切片中。

3. **错误输出**：
   - 在所有 goroutine 完成后，检查 `errs` 切片，输出所有收集到的错误。

这种方法允许你收集所有 goroutine 中发生的错误，而不仅仅是第一个错误。

## `var mu sync.Mutex, var errs []error` 合并为一个struct

当然，你可以将 `sync.Mutex` 和 `errs` 切片合并到一个结构体中，以便更好地组织代码：

```go
package main

import (
	"fmt"
	"sync"
	"golang.org/x/sync/errgroup"
	"net/http"
)
// ------------------------------------
type ErrorCollector struct {
	mu   sync.Mutex
	errs []error
}

func (ec *ErrorCollector) Add(err error) {
	ec.mu.Lock()
	defer ec.mu.Unlock()
	ec.errs = append(ec.errs, err)
}

func (ec *ErrorCollector) Errors() []error {
	ec.mu.Lock()
	defer ec.mu.Unlock()
	return ec.errs
}

func main() {
	var g errgroup.Group
	ec := &ErrorCollector{} // ------------------------------------

	urls := []string{
		"https://www.google.com",
		"https://www.github.com",
		"https://www.invalid-url.com",
	}

	for _, url := range urls {
		url := url
		g.Go(func() error {
			resp, err := http.Get(url)
			if err != nil {
				ec.Add(err) // ------------------------------------
				return nil
			}
			defer resp.Body.Close()
			fmt.Printf("Fetched %s: %s\n", url, resp.Status)
			return nil
		})
	}

	if err := g.Wait(); err != nil {
		fmt.Printf("Error: %v\n", err)
	}

	if len(ec.Errors()) > 0 {
		fmt.Println("Collected errors:")
		for _, err := range ec.Errors() { // ------------------------------------
			fmt.Println(err)
		}
	} else {
		fmt.Println("Successfully fetched all URLs.")
	}
}
```

### 代码说明：

1. **`ErrorCollector` 结构体**：
   - 包含一个 `sync.Mutex` 和一个 `errs` 切片。
   - 提供 `Add` 方法来安全地添加错误。
   - 提供 `Errors` 方法来获取所有收集的错误。

2. **使用 `ErrorCollector`**：
   - 在每个 goroutine 中调用 `ec.Add(err)` 以添加错误。
   - 在所有任务完成后，调用 `ec.Errors()` 来访问所有错误。

这种方法使代码更加模块化和易于维护。

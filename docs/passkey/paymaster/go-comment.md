```go
// paymaster-rpc-proxy
// web端库按照erc4337标准开发的，
// 将 pm_getPaymasterStubData， eth_estimateUserOperationGas，eth_estimateUserOperationGas 合并成1个，
// 需要重新实现第三方库的方法
// prepareUserOperation estimateUserOperationGas formatUserOperationGas

package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"

	// "io/ioutil"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

const (
	PIMLICO_API_URL = "https://api.pimlico.io/v2/84532/rpc?apikey=pim_48H8jTyfc4ADJ6pukGjsh8" // chainId: 84532
	ALCHEMY_API_URL = "https://base-sepolia.g.alchemy.com/v2/1sBw-JGMmDsu6fRi-peC0h58TOrRVrip"
	chainIdHex      = "0x14a34" // chainId hex
	entrypoint      = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789" // 可以从 body["params"].([]interface{})[1] 获取
)

func main() {
	r := gin.Default()
	r.Use(corsMiddleware())

	r.POST("/ping", func(c *gin.Context) {
		fmt.Println("pong")
		c.JSON(http.StatusOK, gin.H{"jsonrpc": "2.0", "result": "pong"})
	})

	r.POST("/", func(c *gin.Context) {
		var body map[string]interface{}
		if err := c.BindJSON(&body); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}

		proxyMethod := c.GetHeader("x-proxy-jsonrpc-method")

		if proxyMethod == "eth_estimateUserOperationGas" {
			handleEstimateUserOperationGas(c, body)
		} else {
			handleDefaultProxy(c, body)
		}
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	host := os.Getenv("HOST")
	if host == "" {
		host = "0.0.0.0"
	}

	r.Run(fmt.Sprintf("%s:%s", host, port))
}

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, x-proxy-jsonrpc-method")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()
	}
}

func handleEstimateUserOperationGas(c *gin.Context, body map[string]interface{}) {
	id := body["id"]

	stubDataResp, err := postJSON(PIMLICO_API_URL, map[string]interface{}{
		"jsonrpc": "2.0",
		"method":  "pm_getPaymasterStubData",
		"params":  []interface{}{body["params"].([]interface{})[0], entrypoint, chainIdHex, nil},
		"id":      id,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"jsonrpc": "2.0", "error": map[string]interface{}{"code": -32603, "message": "Internal error"}, "id": id})
		return
	}

	userOpWithStub := mergeMaps(body["params"].([]interface{})[0].(map[string]interface{}), stubDataResp["result"].(map[string]interface{}))

	estimateGasResp, err := postJSON(ALCHEMY_API_URL, map[string]interface{}{
		"jsonrpc": "2.0",
		"method":  "eth_estimateUserOperationGas",
		"params":  []interface{}{userOpWithStub, entrypoint},
		"id":      id,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"jsonrpc": "2.0", "error": map[string]interface{}{"code": -32603, "message": "Internal error"}, "id": id})
		return
	}

	estimatedGas := estimateGasResp["result"].(map[string]interface{})

	paymasterDataResp, err := postJSON(PIMLICO_API_URL, map[string]interface{}{
		"jsonrpc": "2.0",
		"method":  "pm_getPaymasterData",
		"params":  []interface{}{mergeMaps(userOpWithStub, estimatedGas), entrypoint, chainIdHex},
		"id":      id,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"jsonrpc": "2.0", "error": map[string]interface{}{"code": -32603, "message": "Internal error"}, "id": id})
		return
	}

	combinedResult := mergeMaps(estimatedGas, map[string]interface{}{"paymasterAndData": paymasterDataResp["result"].(map[string]interface{})["paymasterAndData"]})

	c.JSON(http.StatusOK, gin.H{"jsonrpc": "2.0", "result": combinedResult, "id": id})
}

func handleDefaultProxy(c *gin.Context, body map[string]interface{}) {
	resp, err := postJSON(ALCHEMY_API_URL, body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"jsonrpc": "2.0", "error": map[string]interface{}{"code": -32603, "message": "Internal error"}, "id": body["id"]})
		return
	}
	c.JSON(http.StatusOK, resp)
}

func postJSON(url string, data map[string]interface{}) (map[string]interface{}, error) {
	jsonData, err := json.Marshal(data)
	if err != nil {
		return nil, err
	}

	resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		bodyBytes, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("error: %s", string(bodyBytes))
	}

	var result map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}

	return result, nil
}

func mergeMaps(m1, m2 map[string]interface{}) map[string]interface{} {
	for k, v := range m2 {
		m1[k] = v
	}
	return m1
}

```

## `resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonData))` golang 为什么不像js一样传输数据，这里转化成了buffer 

在 Go 中， `http.Post` 函数需要一个实现了 `io.Reader` 接口的参数来读取请求体的数据。 `bytes.NewBuffer(jsonData)` 将字节切片 `jsonData` 转化为一个 `*bytes.Buffer` ，这是一个实现了 `io.Reader` 接口的类型。

相比之下，JavaScript 的 `fetch` API 更加抽象化，允许直接传递对象作为请求体，底层会自动处理转换和传输。Go 语言选择这种设计是为了提供更细粒度的控制和效率，符合其一贯的设计哲学。

这种方式虽然看起来复杂一些，但它提供了更高的灵活性和性能，特别是在处理大数据或流数据时。

如果你有更多问题或需要进一步解释，请告诉我！

## 	 `userOpWithStub := mergeMaps(body["params"].([]interface{})[0].(map[string]interface{}), stubDataResp["result"].(map[string]interface{}))` 这里很奇怪.([]interface{}) 、.(map[string]interface{})这个的作用是

在 Go 中， `.(type)` 是类型断言的语法，用于将接口类型转换为具体类型。

### 解析

* `body["params"].([]interface{})`：
  + `body["params"]` 的值是一个接口类型。
  + `([]interface{})` 断言 `body["params"]` 是一个切片，其中每个元素都是 `interface{}` 类型。
  + 通常用于 JSON 解析后处理动态数组。

* `[0].(map[string]interface{})`：
  + 从切片中获取第一个元素。
  + `.(map[string]interface{})` 断言该元素是一个 `map`，键是字符串，值是 `interface{}`。
  + 常用于处理 JSON 对象。

### 使用场景

这些类型断言在处理动态 JSON 数据时很常见，尤其是当你从外部来源（如 API）获取数据时，需要将其解析为具体类型以便进一步操作。

如果类型断言失败，会导致运行时错误，因此通常会使用“安全断言”来避免：

```go
value, ok := someInterface.([]interface{})
if !ok {
    // 处理错误
}
```

这样可以确保程序的稳健性。

## 必须断言吗？

在 Go 中，当你处理 JSON 数据时，通常需要进行类型断言，因为 `encoding/json` 包将 JSON 数据解析为通用的 `interface{}` 类型。为了访问具体的数据结构，你需要将这些接口转换为具体类型。

### 是否必须进行类型断言？

1. **必须性**：
   - 如果你想访问 JSON 数据中的具体值（如数组或对象中的字段），你必须知道其具体类型并进行类型断言。
   - Go 语言是静态类型语言，因此需要明确的类型信息。

2. **避免断言的方法**：
   - **结构体解析**：如果你有明确的 JSON 结构，可以将 JSON 直接解析到结构体中，避免使用 `interface{}` 。
   

     

```go
     type Params struct {
         // 定义你的字段
     }

     var params Params
     if err := json.Unmarshal(jsonData, &params); err != nil {
         // 处理错误
     }
```

   - **使用泛型库**：一些第三方库提供了更灵活的 JSON 处理方式，可能减少类型断言的需要。

### 总结

类型断言在处理动态或未知结构的 JSON 数据时是必要的，但如果你能确定数据结构，使用结构体解析是更简洁和安全的方式。

## ts必须断言吗？

在 TypeScript 中，类型断言用于告诉编译器某个值的具体类型。这在处理动态数据或绕过编译器类型检查时很有用。

### 是否必须进行类型断言？

1. **必须性**：
   - **不一定必须**：在很多情况下，TypeScript 可以通过类型推断自动识别类型。
   - **必要时使用**：当你从外部来源（如 API）获取数据，而编译器无法推断出具体类型时，可能需要进行类型断言。

2. **类型断言的用法**：
   - 使用 `as` 语法：

```typescript
     let someValue: any = "this is a string";
     let strLength: number = (someValue as string).length;
```

   - 使用尖括号语法（不推荐在 React 中使用）：

```typescript
     let someValue: any = "this is a string";
     let strLength: number = (<string>someValue).length;
```

### 避免断言的方法

* **类型推断**：尽量利用 TypeScript 的类型推断功能。
* **接口和类型定义**：定义明确的接口或类型，确保数据结构的类型安全。
* **类型守卫**：使用类型守卫（如 `typeof` 或 `instanceof`）来缩小类型范围。

### 总结

类型断言在 TypeScript 中并非总是必须的，但在处理不确定类型的数据时非常有用。尽量在类型安全的情况下使用断言，确保代码的健壮性和可维护性。

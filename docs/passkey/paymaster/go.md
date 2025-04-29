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
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

const (
	PIMLICO_API_URL = "https://api.pimlico.io/v2/84532/rpc?apikey=pim_48H8jTyfc4ADJ6pukGjsh8" // chainId 84532
	ALCHEMY_API_URL = "https://base-sepolia.g.alchemy.com/v2/1sBw-JGMmDsu6fRi-peC0h58TOrRVrip"
	chainIdHex      = "0x14a34" // 映射chainId hex
	entrypoint      = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789" // 也可以从 body["params"].([]interface{})[1]
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
		bodyBytes, _ := ioutil.ReadAll(resp.Body)
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

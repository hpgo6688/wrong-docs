## 目的是为了实现openpubkey_authentication流程， 生成golang包PKToken数据

## golang

```go

package main

import (
	"encoding/base64"
	"encoding/json"
	"fmt"

	"golang.org/x/crypto/sha3"
)

var rawURLEncoding = base64.RawURLEncoding.Strict()

func Base64EncodeForJWT(decoded []byte) []byte {
	return base64Encode(decoded, rawURLEncoding)
}

func Base64DecodeForJWT(encoded []byte) ([]byte, error) {
	return base64Decode(encoded, rawURLEncoding)
}

func base64Encode(decoded []byte, encoding *base64.Encoding) []byte {
	encoded := make([]byte, encoding.EncodedLen(len(decoded)))
	encoding.Encode(encoded, decoded)
	return encoded
}

func base64Decode(encoded []byte, encoding *base64.Encoding) ([]byte, error) {
	decoded := make([]byte, encoding.DecodedLen(len(encoded)))
	n, err := encoding.Decode(decoded, encoded)
	if err != nil {
		return nil, err
	}
	return decoded[:n], nil
}

func B64SHA3_256(msg []byte) []byte {
	fmt.Println("----")
	fmt.Println("msg", msg) // [123 34 97 108 103 34 58 34 69 83 50 53 54 34 44 34 114 122 34 58 34 54 102 54 48 54 51 48 55 51 99 50 55 51 49 97 51 99 100 100 57 55 57 97 48 97 52 50 99 57 49 54 53 34 44 34 116 121 112 34 58 34 67 73 67 34 44 34 117 112 107 34 58 123 34 97 108 103 34 58 34 69 83 50 53 54 34 44 34 99 114 118 34 58 34 80 45 50 53 54 34 44 34 107 116 121 34 58 34 69 67 34 44 34 120 34 58 34 87 119 90 100 112 111 45 112 108 51 51 79 113 81 88 71 88 102 111 51 54 85 112 101 57 75 71 105 52 74 57 86 45 55 49 71 67 68 100 80 117 77 115 34 44 34 121 34 58 34 65 108 49 110 110 50 80 55 65 50 95 54 52 108 102 77 72 111 50 79 81 108 117 77 110 48 112 49 118 95 56 111 55 79 109 116 85 82 89 48 55 109 48 34 125 125]
	h := sha3.New256()
	h.Write(msg)
	image := h.Sum(nil)

	fmt.Println("----")
	fmt.Println("image", image) // [60 110 28 111 158 64 247 25 241 6 179 34 31 229 233 143 196 8 65 72 5 201 10 219 129 108 123 33 42 32 213 253]
	fmt.Println("image")

	return Base64EncodeForJWT(image)
}

// 将字节切片转换为逗号分隔的字符串
func byteSliceToCommaSeparatedString(buf []byte) string {
	str := ""
	for i, b := range buf {
		if i > 0 {
			str += ","
		}
		str += fmt.Sprintf("%d", b)
	}
	return str
}

func main() {
	buf, err := json.Marshal(map[string]interface{}{
		"alg": "ES256",
		"rz":  "6f6063073c2731a3cdd979a0a42c9165",
		"typ": "CIC",
		"upk": map[string]interface{}{
			"alg": "ES256",
			"crv": "P-256",
			"kty": "EC",
			"x":   "WwZdpo-pl33OqQXGXfo36Upe9KGi4J9V-71GCDdPuMs",
			"y":   "Al1nn2P7A2_64lfMHo2OQluMn0p1v_8o7OmtURY07m0",
		},
	})

	if err != nil {
		fmt.Println("Error marshalling JSON:", err)
		return
	}

	fmt.Println("buf:", string(buf))
	fmt.Println("--")
	// fmt.Println(buf[:])
	fmt.Printf("[%v]\n", byteSliceToCommaSeparatedString(buf))
	fmt.Println("--")

	hashed := B64SHA3_256(buf)

	fmt.Println("Hashed and encoded:", string(hashed))
}

```

## 问题是

1. 在hash之前，前端与golang 数据一致
2. 在hash之后，前端与golang 数据不一致

## 测试找出不一致的地方修正

## 神坑

```ts
// 这个骗子， sha3_256出来的结果，与真实的结果存在差距
cryptoJS.SHA3(dataToHash, { outputLength: 256 }).toString()
```

## 正确的包

 `import { sha3_256 } from 'js-sha3'`

## nodejs

```js
const crypto = require('crypto')

function test1() {
    // 原始字节数组
    const msg = [
        123, 34, 97, 108, 103, 34, 58, 34, 69, 83, 50, 53, 54, 34, 44, 34, 114, 122, 34, 58, 34, 54, 102, 54, 48, 54, 51, 48, 55, 51, 99, 50, 55, 51, 49, 97, 51, 99, 100, 100, 57, 55,
        57, 97, 48, 97, 52, 50, 99, 57, 49, 54, 53, 34, 44, 34, 116, 121, 112, 34, 58, 34, 67, 73, 67, 34, 44, 34, 117, 112, 107, 34, 58, 123, 34, 97, 108, 103, 34, 58, 34, 69, 83, 50,
        53, 54, 34, 44, 34, 99, 114, 118, 34, 58, 34, 80, 45, 50, 53, 54, 34, 44, 34, 107, 116, 121, 34, 58, 34, 69, 67, 34, 44, 34, 120, 34, 58, 34, 87, 119, 90, 100, 112, 111, 45,
        112, 108, 51, 51, 79, 113, 81, 88, 71, 88, 102, 111, 51, 54, 85, 112, 101, 57, 75, 71, 105, 52, 74, 57, 86, 45, 55, 49, 71, 67, 68, 100, 80, 117, 77, 115, 34, 44, 34, 121, 34,
        58, 34, 65, 108, 49, 110, 110, 50, 80, 55, 65, 50, 95, 54, 52, 108, 102, 77, 72, 111, 50, 79, 81, 108, 117, 77, 110, 48, 112, 49, 118, 95, 56, 111, 55, 79, 109, 116, 85, 82,
        89, 48, 55, 109, 48, 34, 125, 125,
    ]

    // 创建 SHA3-256 哈希
    const hash = crypto.createHash('sha3-256')
    hash.update(Buffer.from(msg))

    // 获取十六进制字符串
    const imageHex = hash.digest('hex')

    console.log('image', imageHex)
}

function test2() {
    const crypto = require('crypto')

    // 原始字节数组
    const msg = [
        123, 34, 97, 108, 103, 34, 58, 34, 69, 83, 50, 53, 54, 34, 44, 34, 114, 122, 34, 58, 34, 54, 102, 54, 48, 54, 51, 48, 55, 51, 99, 50, 55, 51, 49, 97, 51, 99, 100, 100, 57, 55,
        57, 97, 48, 97, 52, 50, 99, 57, 49, 54, 53, 34, 44, 34, 116, 121, 112, 34, 58, 34, 67, 73, 67, 34, 44, 34, 117, 112, 107, 34, 58, 123, 34, 97, 108, 103, 34, 58, 34, 69, 83, 50,
        53, 54, 34, 44, 34, 99, 114, 118, 34, 58, 34, 80, 45, 50, 53, 54, 34, 44, 34, 107, 116, 121, 34, 58, 34, 69, 67, 34, 44, 34, 120, 34, 58, 34, 87, 119, 90, 100, 112, 111, 45,
        112, 108, 51, 51, 79, 113, 81, 88, 71, 88, 102, 111, 51, 54, 85, 112, 101, 57, 75, 71, 105, 52, 74, 57, 86, 45, 55, 49, 71, 67, 68, 100, 80, 117, 77, 115, 34, 44, 34, 121, 34,
        58, 34, 65, 108, 49, 110, 110, 50, 80, 55, 65, 50, 95, 54, 52, 108, 102, 77, 72, 111, 50, 79, 81, 108, 117, 77, 110, 48, 112, 49, 118, 95, 56, 111, 55, 79, 109, 116, 85, 82,
        89, 48, 55, 109, 48, 34, 125, 125,
    ]

    // 创建 SHA3-256 哈希
    const hash = crypto.createHash('sha3-256')
    hash.update(Buffer.from(msg))
    const hashBuffer = hash.digest()

    // Base64 编码并进行 URL 安全处理
    const base64Url = hashBuffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

    console.log('Base64 URL Safe:', base64Url)
}

test2()
```

# 正确逐步完善过程

## step1

```ts
import { sha3_256 } from 'js-sha3'
;(function encodeToBase64Url() {
	// 原始字节数组
	const msg = [
		123, 34, 97, 108, 103, 34, 58, 34, 69, 83, 50, 53, 54, 34, 44, 34, 114, 122, 34, 58, 34, 54, 102, 54, 48, 54, 51, 48, 55, 51, 99, 50, 55, 51, 49, 97, 51, 99, 100, 100, 57, 55,
		57, 97, 48, 97, 52, 50, 99, 57, 49, 54, 53, 34, 44, 34, 116, 121, 112, 34, 58, 34, 67, 73, 67, 34, 44, 34, 117, 112, 107, 34, 58, 123, 34, 97, 108, 103, 34, 58, 34, 69, 83, 50,
		53, 54, 34, 44, 34, 99, 114, 118, 34, 58, 34, 80, 45, 50, 53, 54, 34, 44, 34, 107, 116, 121, 34, 58, 34, 69, 67, 34, 44, 34, 120, 34, 58, 34, 87, 119, 90, 100, 112, 111, 45,
		112, 108, 51, 51, 79, 113, 81, 88, 71, 88, 102, 111, 51, 54, 85, 112, 101, 57, 75, 71, 105, 52, 74, 57, 86, 45, 55, 49, 71, 67, 68, 100, 80, 117, 77, 115, 34, 44, 34, 121, 34,
		58, 34, 65, 108, 49, 110, 110, 50, 80, 55, 65, 50, 95, 54, 52, 108, 102, 77, 72, 111, 50, 79, 81, 108, 117, 77, 110, 48, 112, 49, 118, 95, 56, 111, 55, 79, 109, 116, 85, 82,
		89, 48, 55, 109, 48, 34, 125, 125,
	]

	// 计算 SHA3-256 哈希
	const hashBuffer = sha3_256.create()
	hashBuffer.update(new Uint8Array(msg))
	const hashArray = hashBuffer.array()

	// 将哈希转换为 Base64 字符串
	const base64String = btoa(String.fromCharCode(...hashArray))

	// 执行 URL 安全的替换
	const base64Url = base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

	console.log('tt-sha3_256.ts Base64 URL Safe:', base64Url)
})()

```

## step2

```ts
import { sha3_256 } from 'js-sha3'
;(function encodeToBase64Url() {
	// 原始字节数组
	const msg = [
		123, 34, 97, 108, 103, 34, 58, 34, 69, 83, 50, 53, 54, 34, 44, 34, 114, 122, 34, 58, 34, 54, 102, 54, 48, 54, 51, 48, 55, 51, 99, 50, 55, 51, 49, 97, 51, 99, 100, 100, 57, 55,
		57, 97, 48, 97, 52, 50, 99, 57, 49, 54, 53, 34, 44, 34, 116, 121, 112, 34, 58, 34, 67, 73, 67, 34, 44, 34, 117, 112, 107, 34, 58, 123, 34, 97, 108, 103, 34, 58, 34, 69, 83, 50,
		53, 54, 34, 44, 34, 99, 114, 118, 34, 58, 34, 80, 45, 50, 53, 54, 34, 44, 34, 107, 116, 121, 34, 58, 34, 69, 67, 34, 44, 34, 120, 34, 58, 34, 87, 119, 90, 100, 112, 111, 45,
		112, 108, 51, 51, 79, 113, 81, 88, 71, 88, 102, 111, 51, 54, 85, 112, 101, 57, 75, 71, 105, 52, 74, 57, 86, 45, 55, 49, 71, 67, 68, 100, 80, 117, 77, 115, 34, 44, 34, 121, 34,
		58, 34, 65, 108, 49, 110, 110, 50, 80, 55, 65, 50, 95, 54, 52, 108, 102, 77, 72, 111, 50, 79, 81, 108, 117, 77, 110, 48, 112, 49, 118, 95, 56, 111, 55, 79, 109, 116, 85, 82,
		89, 48, 55, 109, 48, 34, 125, 125,
	]

	// 计算 SHA3-256 哈希
	const hashBuffer = sha3_256.create()
	hashBuffer.update(new Uint8Array(msg))
	const hashArray = hashBuffer.array()

	// 将哈希转换为 Base64 字符串
	const base64String = btoa(String.fromCharCode(...hashArray))

	// 执行 URL 安全的替换
	const base64Url = base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

	console.log('tt-sha3_256.ts Base64 URL Safe:', base64Url)
})()

```

## step3

```ts
import { sha3_256 } from 'js-sha3'
;(function encodeToBase64Url() {
	// 原始数据对象
	const data = {
		alg: 'ES256',
		rz: '6f6063073c2731a3cdd979a0a42c9165',
		typ: 'CIC',
		upk: {
			alg: 'ES256',
			crv: 'P-256',
			kty: 'EC',
			x: 'WwZdpo-pl33OqQXGXfo36Upe9KGi4J9V-71GCDdPuMs',
			y: 'Al1nn2P7A2_64lfMHo2OQluMn0p1v_8o7OmtURY07m0',
		},
	}

	// 将对象转换为 JSON 字符串
	const jsonString = JSON.stringify(data)

	// 计算 SHA3-256 哈希
	const hashBuffer = sha3_256.create()
	hashBuffer.update(jsonString)
	const hashArray = hashBuffer.array()

	// 将哈希转换为 Base64 字符串
	const base64String = btoa(String.fromCharCode(...hashArray))

	// 执行 URL 安全的替换
	const base64Url = base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

	console.log('tt-obj-sha256-base64.ts Base64 URL Safe:', base64Url)
})()

```

## 反思

1. （后端不清楚）一开始后端，未提供任何有用的信息，只给了个请求头
2. （想当然）以为后端自己书写验证，一开始nonce生成按照base58生成（想当然，以前用base58,现在也这么用，没有去细看go openpubkey实现 ）
3. （忽视了算法）运行 go openpubkey web后，PKToken数据是按照jwt的三部分，分别组装，无需按照文档拆成json（）
4. （用了坑库）cryptoJS
5. （知识不熟）base64, base64Url , base64RawURLEncoding然后逐步测试，浪费了大量时间
    - 对象到buffer
    - 字符串到buffer
    - buffer与字符串之间关系， hex
6. 验证测试
   1. golang
   2. nodejs实现
   3. brower实现

## 数据转buffer

在 JavaScript 中，可以将字符串、对象和数组转换为 `ArrayBuffer` 或 `Buffer` 。以下是如何进行这些转换的示例：

### 字符串转 `Buffer`

```javascript
// Node.js 环境
const str = "Hello, World!";
const buffer = Buffer.from(str, 'utf-8');
console.log(buffer);

// 浏览器环境
function stringToArrayBuffer(str) {
    const encoder = new TextEncoder();
    return encoder.encode(str).buffer;
}

const arrayBuffer = stringToArrayBuffer("Hello, World!");
console.log(arrayBuffer);
```

### 对象转 `Buffer`

```javascript
// Node.js 环境
const obj = {
    key: "value"
};
const jsonString = JSON.stringify(obj);
const buffer = Buffer.from(jsonString, 'utf-8');
console.log(buffer);

// 浏览器环境
function objectToArrayBuffer(obj) {
    const jsonString = JSON.stringify(obj);
    return stringToArrayBuffer(jsonString);
}

const arrayBuffer = objectToArrayBuffer({
    key: "value"
});
console.log(arrayBuffer);
```

### 数组转 `Buffer`

```javascript
// Node.js 环境
const arr = [1, 2, 3, 4];
const buffer = Buffer.from(arr);
console.log(buffer);

// 浏览器环境
function arrayToArrayBuffer(arr) {
    return new Uint8Array(arr).buffer;
}

const arrayBuffer = arrayToArrayBuffer([1, 2, 3, 4]);
console.log(arrayBuffer);
```

### 说明

* 在 Node.js 中，`Buffer` 是用于处理二进制数据的类。
* 在浏览器中，`ArrayBuffer` 是用于表示通用、固定长度的二进制数据缓冲区。
* `TextEncoder` 用于将字符串编码为 `ArrayBuffer`。
* 对象需要先转换为 JSON 字符串，再转换为 `Buffer` 或 `ArrayBuffer`。

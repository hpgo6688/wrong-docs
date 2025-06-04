## 垃圾回收

### 尽可能使用栈而不是堆

在 Go 语言中，垃圾回收器负责回收不再使用的内存，但垃圾回收是有开销的。为了提高性能，尽可能避免不必要的堆分配是有益的。以下是一些相关的概念：

1. **栈 vs. 堆**:

   - **栈**：函数调用时的局部变量通常分配在栈上。栈分配和释放内存的速度非常快，因为它们遵循后进先出（LIFO）的原则。
   - **堆**：当需要在函数调用之外使用数据时，或者数据的大小在编译时不确定时，通常会分配在堆上。堆内存需要垃圾回收器来管理。

2. **值类型 vs. 指针类型**:

   - **值类型**：如 `int`、`float`、`struct` 等，通常在栈上分配。使用值类型可以减少堆分配。
   - **指针类型**：指向值的内存地址，可能导致在堆上分配内存，特别是当指针指向的值需要在函数返回后继续存在时。

3. **避免堆分配的技巧**:
   - 使用局部变量和值类型来尽量在栈上分配。
   - 减少使用指针，除非有明确的需要。
   - 使用 `escape analysis` 工具来查看哪些变量会逃逸到堆上，从而优化代码。

通过在栈上分配内存，可以减轻垃圾回收器的负担，从而提高程序性能。

### escape analysis

在 Go 中，变量逃逸到堆上通常是由于以下原因：

1. **返回指针**：函数返回局部变量的指针。
2. **闭包捕获**：闭包引用了局部变量。
3. **接口转换**：值被赋给接口类型。
4. **取地址**：变量地址被传递给其他地方（如切片、map）。

使用 `go build -gcflags="-m"` 可以查看哪些变量发生了逃逸。

### 逃逸 vs 泄漏

- **逃逸**：指的是变量从栈上分配转移到堆上分配。这是 Go 编译器管理内存的一部分，确保变量在需要时仍然可访问。虽然可能影响性能，但并不是内存泄漏。

- **内存泄漏**：指程序不再需要某些内存，但没有释放，导致内存占用持续增长。Go 的垃圾回收机制通常能有效防止内存泄漏。

逃逸本身不会导致内存泄漏。

## groutinus

### goroutine vs 线程 、进程

- **Goroutine**：初始栈约 2KB，动态增长。
- **线程**：初始栈约 1MB，开销较大。线程的上下文切换成本较高。
- **进程**：开销最大，通常多个 MB。包含完整的内存空间、代码段、数据段等。

Goroutine 更轻量，适合高并发。

## chan

## 切片

### 切片的扩容规则是

在 Go 中，切片的扩容规则大致如下：

1. **容量小于 1024**：容量通常会翻倍。
2. **容量大于等于 1024**：每次扩容时，容量增加约 25%。

具体的增长因实现和版本可能会有所不同，但大体遵循这些原则。扩容时，会分配新的底层数组并复制数据。

### 为什么这么设计？为什么不是 1024 以上按 50%扩容，是否可以配置扩容规则

Go 语言的切片扩容规则设计主要是为了在性能和内存使用之间取得平衡：

1. **小容量时翻倍**：这样可以减少频繁扩容的开销，提高性能。
2. **大容量时增加 25%**：减少内存浪费，避免过度分配。

这些规则是固定的，不能直接配置。设计上是为了简化内存管理，避免复杂的配置和潜在的错误。

## validator

```go
package main

import (
	"encoding/json"
	"fmt"
	"strings"

	"github.com/go-playground/validator/v10"
)

type User struct {
	Name  string `validate:"required"`
	Email string `validate:"required,email"`
	Age   int    `validate:"gte=0,lte=130"`
}

type ValidationError struct {
	Field   string `json:"field"`
	Message string `json:"message"`
}

func main() {
	validate := validator.New()

	user := User{
		Name:  "",
		Email: "invalid-email",
		Age:   150,
	}

	err := validate.Struct(user)
	if err != nil {
		if validationErrors, ok := err.(validator.ValidationErrors); ok {
			var errors []ValidationError
			for _, err := range validationErrors {
				ve := ValidationError{
					Field:   strings.ToLower(err.Field()),
					Message: fmt.Sprintf("failed validation with tag '%s'", err.Tag()),
				}
				errors = append(errors, ve)
			}

			jsonErrors, _ := json.Marshal(errors)
			fmt.Println(string(jsonErrors))
		} else {
			fmt.Println("Validation error:", err)
		}
	}
}

// [{"field":"name","message":"failed validation with tag 'required'"},{"field":"email","message":"failed validation with tag 'email'"},{"field":"age","message":"failed validation with tag 'lte'"}]
```

## crypto

### Diffie Helman

```go
package main

import (
	"crypto/rand"
	"crypto/sha256"
	"fmt"
	"golang.org/x/crypto/curve25519"
)

func main() {
	// 生成 Alice 的私钥和公钥
	alicePrivateKey := make([]byte, curve25519.ScalarSize)
	_, err := rand.Read(alicePrivateKey)
	if err != nil {
		fmt.Println("Error generating Alice's private key:", err)
		return
	}
	alicePublicKey, err := curve25519.X25519(alicePrivateKey, curve25519.Basepoint)
	if err != nil {
		fmt.Println("Error generating Alice's public key:", err)
		return
	}

	// 生成 Bob 的私钥和公钥
	bobPrivateKey := make([]byte, curve25519.ScalarSize)
	_, err = rand.Read(bobPrivateKey)
	if err != nil {
		fmt.Println("Error generating Bob's private key:", err)
		return
	}
	bobPublicKey, err := curve25519.X25519(bobPrivateKey, curve25519.Basepoint)
	if err != nil {
		fmt.Println("Error generating Bob's public key:", err)
		return
	}

	// Alice 计算共享密钥
	aliceSharedSecret, err := curve25519.X25519(alicePrivateKey, bobPublicKey)
	if err != nil {
		fmt.Println("Error computing Alice's shared secret:", err)
		return
	}

	// Bob 计算共享密钥
	bobSharedSecret, err := curve25519.X25519(bobPrivateKey, alicePublicKey)
	if err != nil {
		fmt.Println("Error computing Bob's shared secret:", err)
		return
	}

	// 使用 SHA-256 哈希共享密钥
	aliceSharedKey := sha256.Sum256(aliceSharedSecret)
	bobSharedKey := sha256.Sum256(bobSharedSecret)

	// 显示结果
	fmt.Printf("Alice's Shared Key: %x\n", aliceSharedKey)
	fmt.Printf("Bob's Shared Key: %x\n", bobSharedKey)

	// 检查共享密钥是否相同
	if aliceSharedKey == bobSharedKey {
		fmt.Println("Shared keys match!")
	} else {
		fmt.Println("Shared keys do not match!")
	}
}




// https://goplay.tools/snippet/bKUET08iYSU

// example:


// Alice's Shared Key: e0684daf8d1fd02631926aea6140ee521b03da2fd4ce4b83952ba38abdbb11e7
// Bob's Shared Key: e0684daf8d1fd02631926aea6140ee521b03da2fd4ce4b83952ba38abdbb11e7
// Shared keys match!
```

## sharedKey -> 对称加密

```go
package main

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"crypto/sha256"
	"fmt"
	"io"

	"golang.org/x/crypto/curve25519"
)

func main() {
	// 生成 Alice 的私钥和公钥
	alicePrivateKey := make([]byte, curve25519.ScalarSize)
	_, err := rand.Read(alicePrivateKey)
	if err != nil {
		fmt.Println("Error generating Alice's private key:", err)
		return
	}
	alicePublicKey, err := curve25519.X25519(alicePrivateKey, curve25519.Basepoint)
	if err != nil {
		fmt.Println("Error generating Alice's public key:", err)
		return
	}

	// 生成 Bob 的私钥和公钥
	bobPrivateKey := make([]byte, curve25519.ScalarSize)
	_, err = rand.Read(bobPrivateKey)
	if err != nil {
		fmt.Println("Error generating Bob's private key:", err)
		return
	}
	bobPublicKey, err := curve25519.X25519(bobPrivateKey, curve25519.Basepoint)
	if err != nil {
		fmt.Println("Error generating Bob's public key:", err)
		return
	}

	// Alice 和 Bob 计算共享密钥
	aliceSharedSecret, err := curve25519.X25519(alicePrivateKey, bobPublicKey)
	if err != nil {
		fmt.Println("Error computing Alice's shared secret:", err)
		return
	}
	bobSharedSecret, err := curve25519.X25519(bobPrivateKey, alicePublicKey)
	if err != nil {
		fmt.Println("Error computing Bob's shared secret:", err)
		return
	}

	// 使用 SHA-256 哈希共享密钥以生成对称加密密钥
	alice_sharedKey := sha256.Sum256(aliceSharedSecret)

	// 使用alice对称密钥加密数据
	plaintext := []byte("Hello, Bob!")
	ciphertext, err := encrypt(alice_sharedKey[:], plaintext)
	if err != nil {
		fmt.Println("Error encrypting:", err)
		return
	}

	fmt.Printf("Ciphertext: %x\n", ciphertext)

	// here ciphertext is https tranfer

	bob_sharedKey := sha256.Sum256(bobSharedSecret)
	// 使用bob对称密钥解密数据
	decrypted, err := decrypt(bob_sharedKey[:], ciphertext)
	if err != nil {
		fmt.Println("Error decrypting:", err)
		return
	}

	fmt.Printf("Decrypted: %s\n", decrypted)
}

func encrypt(key, plaintext []byte) ([]byte, error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}

	ciphertext := make([]byte, aes.BlockSize+len(plaintext))
	iv := ciphertext[:aes.BlockSize]

	if _, err := io.ReadFull(rand.Reader, iv); err != nil {
		return nil, err
	}

	stream := cipher.NewCFBEncrypter(block, iv)
	stream.XORKeyStream(ciphertext[aes.BlockSize:], plaintext)

	return ciphertext, nil
}

func decrypt(key, ciphertext []byte) ([]byte, error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}

	if len(ciphertext) < aes.BlockSize {
		return nil, fmt.Errorf("ciphertext too short")
	}

	iv := ciphertext[:aes.BlockSize]
	ciphertext = ciphertext[aes.BlockSize:]

	stream := cipher.NewCFBDecrypter(block, iv)
	stream.XORKeyStream(ciphertext, ciphertext)

	return ciphertext, nil
}

```

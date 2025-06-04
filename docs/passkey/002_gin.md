## 

```go
package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

type User struct {
    Name string `json:"name" form:"name" xml:"name"`
    Age  int    `json:"age" form:"age" xml:"age"`
}

type UserID struct {
    ID string `uri:"id"`
}

func main() {
    r := gin.Default()

    // JSON 绑定
    // curl -X POST http://localhost:8080/json -H "Content-Type: application/json" -d '{"name": "Alice", "age": 30}'
    r.POST("/json", func(c *gin.Context) {
        var user User
        if err := c.ShouldBindJSON(&user); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }
        c.JSON(http.StatusOK, user)
    })

    // 表单绑定
    // curl -X POST http://localhost:8080/form -H "Content-Type: application/x-www-form-urlencoded" -d "name=Alice&age=30"
    r.POST("/form", func(c *gin.Context) {
        var user User
        if err := c.ShouldBind(&user); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }
        c.JSON(http.StatusOK, user)
    })

    // 查询参数绑定
    // curl -X GET "http://localhost:8080/query?name=Alice&age=30"
    r.GET("/query", func(c *gin.Context) {
        var user User
        if err := c.ShouldBindQuery(&user); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }
        c.JSON(http.StatusOK, user)
    })

    // URI 绑定
    // curl -X GET http://localhost:8080/user/123
    r.GET("/user/:id", func(c *gin.Context) {
        var userID UserID
        if err := c.ShouldBindUri(&userID); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }
        c.JSON(http.StatusOK, userID)
    })

    // XML 绑定
    // curl -X POST http://localhost:8080/xml -H "Content-Type: application/xml" -d '<User><name>Alice</name><age>30</age></User>'
    r.POST("/xml", func(c *gin.Context) {
        var user User
        if err := c.ShouldBindXML(&user); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }
        c.JSON(http.StatusOK, user)
    })

    r.Run(":8080")
}

```

## ShouldBindBodyWith 可以在不消耗请求主体的情况下多次绑定不同的数据格式

```go
package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

type User struct {
    Name string `json:"name" xml:"name"`
    Age  int    `json:"age" xml:"age"`
}

func main() {
    r := gin.Default()

    // 多种绑定示例
    // curl -X POST http://localhost:8080/bind \
    // -H "Content-Type: application/json" \
    // -d '{"name": "Alice", "age": 30}'
    r.POST("/bind", func(c *gin.Context) {
        var user User

        // 尝试从 JSON 绑定
        if err := c.ShouldBindBodyWith(&user, binding.JSON); err == nil {
            c.JSON(http.StatusOK, gin.H{"source": "JSON", "user": user})
            return
        }

        // 尝试从 XML 绑定
        if err := c.ShouldBindBodyWith(&user, binding.XML); err == nil {
            c.JSON(http.StatusOK, gin.H{"source": "XML", "user": user})
            return
        }

        c.JSON(http.StatusBadRequest, gin.H{"error": "Binding failed"})
    })

    r.Run(":8080")
}

```

## 自动根据 Content-Type 进行绑定

```go
package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

type User struct {
    Name string `json:"name" xml:"name" form:"name"`
    Age  int    `json:"age" xml:"age" form:"age"`
}

func main() {
    r := gin.Default()

    // 自动识别类型的绑定示例
    // curl -X POST http://localhost:8080/auto \
    // -H "Content-Type: application/json" \
    // -d '{"name": "Alice", "age": 30}'
    r.POST("/auto", func(c *gin.Context) {
        var user User

        // 自动根据 Content-Type 进行绑定
        if err := c.ShouldBind(&user); err == nil {
            c.JSON(http.StatusOK, gin.H{"user": user})
        } else {
            c.JSON(http.StatusBadRequest, gin.H{"error": "Binding failed"})
        }
    })

    r.Run(":8080")
}

```

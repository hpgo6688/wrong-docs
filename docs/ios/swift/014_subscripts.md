# `get`/`set` vs 下标
下标和 `get`/`set` 方法在功能上有一些相似之处，但它们的使用场景和目的有所不同。

### 下标的优势

1. **简洁性**：下标语法让代码更简洁，类似数组或字典的访问方式。它可以让你用一种更自然的方式来访问和修改集合中的元素。

2. **多参数支持**：下标可以接受多个参数，这使得它特别适合处理多维数据结构（如矩阵）。

3. **直观性**：在语义上，下标通常用于表示集合类型的访问，这让代码更具可读性。

### 示例对比

#### 使用下标

```swift
struct Matrix {
    let rows: Int, columns: Int
    var grid: [Double]
    
    init(rows: Int, columns: Int) {
        self.rows = rows
        self.columns = columns
        self.grid = Array(repeating: 0.0, count: rows * columns)
    }
    
    subscript(row: Int, column: Int) -> Double {
        get {
            return grid[(row * columns) + column]
        }
        set {
            grid[(row * columns) + column] = newValue
        }
    }
}

var matrix = Matrix(rows: 2, columns: 2)
matrix[0, 1] = 1.5
print(matrix[0, 1])  // 输出: 1.5
```

#### 使用方法

```swift
struct Matrix {
    let rows: Int, columns: Int
    var grid: [Double]
    
    init(rows: Int, columns: Int) {
        self.rows = rows
        self.columns = columns
        self.grid = Array(repeating: 0.0, count: rows * columns)
    }
    
    func getValue(atRow row: Int, column: Int) -> Double {
        return grid[(row * columns) + column]
    }
    
    mutating func setValue(_ value: Double, atRow row: Int, column: Int) {
        grid[(row * columns) + column] = value
    }
}

var matrix = Matrix(rows: 2, columns: 2)
matrix.setValue(1.5, atRow: 0, column: 1)
print(matrix.getValue(atRow: 0, column: 1))  // 输出: 1.5
```

### 总结

- **下标**：适合用于集合类型或需要多参数访问的情境，语法简洁。
- **方法**：适合单属性或需要更复杂逻辑处理的场景。

选择使用下标还是方法，取决于具体的需求和代码风格。
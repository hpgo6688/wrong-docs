## 学习路线总览（Golang / Solidity 对比 Rust）


| 主题           | Golang 示例                | Solidity 示例                         | Rust 示例                             | Rust 特点解读                     |
| -------------- | -------------------------- | ------------------------------------- | ------------------------------------- | --------------------------------- |
| **变量声明**   | `var x int = 5`            | `uint x = 5;`                         | `let x: i32 = 5;`                     | 默认不可变；用 `mut` 变为可变     |
| **函数定义**   | `func add(a int) int`      | `function add(uint a) public returns` | `fn add(a: i32) -> i32`               | 类型必须显式；返回值箭头语法      |
| **控制结构**   | `if`, `for`, `switch`      | `if`, `for`, `while`, `require`       | `if`, `loop`, `for`, `while`, `match` | `match` 非常强大                  |
| **可见性控制** | 包级别控制（大写开头公开） | `public`, `private`, `internal`       | 模块系统 + `pub`                      | 模块导出控制非常细粒度            |
| **所有权模型** | N/A（GC 回收）             | N/A（EVM 管理）                       | 所有权、借用、生命周期                | Rust 最大特色，保证安全不依赖 GC  |
| **错误处理**   | `error`, `panic()`         | `require`, `revert`, `try/catch`      | `Result`, `Option`, `unwrap`, `?`     | 编译期强制处理错误                |
| **异步编程**   | `goroutine`, `channel`     | 异步调用依赖 L2 or JS                 | `async`, `.await`, `tokio`            | Zero-cost 异步模型                |
| **内存管理**   | 自动 GC                    | 自动管理（EVM）                       | 无 GC，所有权决定何时释放             | 编译期保证无内存泄漏              |
| **模块与包**   | `import "fmt"`             | `import "@openzeppelin/contracts"`    | `mod`, `use`, `crate`, `Cargo.toml`   | `Cargo` 像 `go mod` 与 `npm` 合体 |
| **部署目标**   | 可执行或服务               | 区块链合约                            | CLI 工具、WASM、后端、高性能库        | 多平台编译能力很强                |
| **语法风格**   | 简洁，偏命令式             | 类 JavaScript                         | 函数式 + 命令式混合                   | 支持高度抽象与性能并存            |

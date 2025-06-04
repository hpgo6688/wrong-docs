在 Rust 中，Cargo 工作空间允许你管理多个相关的包（crate），使得共享依赖和管理版本变得更简单。下面是一个简单的例子，展示如何设置一个包含三个 crate 的工作空间，并共享相同的依赖。

### 目录结构

```
my_workspace/
├── Cargo.toml
├── Cargo.lock
├── crate_a/
│   └── Cargo.toml
│   └── src/
│       └── lib.rs
├── crate_b/
│   └── Cargo.toml
│   └── src/
│       └── lib.rs
└── crate_c/
    └── Cargo.toml
    └── src/
        └── main.rs
```

### 顶层 `Cargo.toml`

在工作空间的根目录下创建一个 `Cargo.toml` 文件：

```toml
[workspace]
members = ["crate_a", "crate_b", "crate_c"]
```

### crate_a/Cargo.toml

```toml
[package]
name = "crate_a"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = "1.0"
```

### crate_b/Cargo.toml

```toml
[package]
name = "crate_b"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = "1.0"
```

### crate_c/Cargo.toml

```toml
[package]
name = "crate_c"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = "1.0"
crate_a = { path = "../crate_a" }
crate_b = { path = "../crate_b" }
```

### crate_a/src/lib.rs

```rust
pub fn greet() {
    println!("Hello from crate_a!");
}
```

### crate_b/src/lib.rs

```rust
pub fn greet() {
    println!("Hello from crate_b!");
}
```

### crate_c/src/main.rs

```rust
use crate_a;
use crate_b;

fn main() {
    crate_a::greet();
    crate_b::greet();
}
```

### 说明

1. **工作空间管理**：顶层 `Cargo.toml` 定义了工作空间成员。
2. **共享依赖**：所有 crate 共享相同版本的 `serde` 依赖。
3. **内部依赖**：`crate_c` 依赖于 `crate_a` 和 `crate_b`，通过路径引用。

### 构建和运行

在 `my_workspace` 目录下运行以下命令：

```bash
cargo build
cargo run -p crate_c
```

这将构建整个工作空间，并运行 `crate_c`，输出：

```
Hello from crate_a!
Hello from crate_b!
```

这种设置方式使得多个 crate 可以共享依赖和代码，简化了项目管理。
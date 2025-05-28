如果 `Vec` 中的元素是一个结构体，比如 `User`，你可以同样使用可变引用来修改结构体的字段。以下是一个示例：

```rust
struct User {
    name: String,
    age: u32,
}

fn main() {
    let mut users = vec![
        User { name: "Alice".to_string(), age: 30 },
        User { name: "Bob".to_string(), age: 25 },
    ];

    for user in &mut users {
        user.age += 1;
    }

    for user in &users {
        println!("{}: {}", user.name, user.age);
    }
}
```

在这个例子中：

- `&mut users` 获取 `users` 的可变引用。
- `user.age += 1` 增加每个用户的年龄。

这样，你就可以遍历并修改每个 `User` 的 `age` 字段。
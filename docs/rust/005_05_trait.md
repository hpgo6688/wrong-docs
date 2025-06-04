## 举一个例子，我看下代码的什么部分是trait对象



当然，这里是一个简单的例子，展示了对象安全的特征以及如何使用特征对象：

```rust
trait Drawable {
    fn draw(&self);
}

struct Circle {
    radius: f32,
}

impl Drawable for Circle {
    fn draw(&self) {
        println!("Drawing a circle with radius {}", self.radius);
    }
}

struct Square {
    side: f32,
}

impl Drawable for Square {
    fn draw(&self) {
        println!("Drawing a square with side {}", self.side);
    }
}

fn draw_shape(shape: &dyn Drawable) {
    shape.draw();
}

fn main() {
    let circle = Circle { radius: 5.0 };
    let square = Square { side: 3.0 };

    // 使用特征对象
    draw_shape(&circle);
    draw_shape(&square);
}
```

### 代码解释

- **特征 `Drawable`**：定义了一个对象安全的特征 `Drawable`，其中包含一个方法 `draw`。

- **结构体 `Circle` 和 `Square`**：这两个结构体实现了 `Drawable` 特征。

- **特征对象 `&dyn Drawable`**：在 `draw_shape` 函数中，参数 `shape` 是一个特征对象 `&dyn Drawable`。这意味着 `draw_shape` 可以接受任何实现了 `Drawable` 特征的类型。

- **动态分发**：当 `draw_shape` 被调用时，Rust 使用动态分发来确定应该调用哪个具体类型的 `draw` 方法。

在这个例子中，`&dyn Drawable` 就是特征对象的使用方式。

## 简单来讲 ： Trait 对象 是参数类型

简单来说，特征对象（Trait Object）是指在参数类型或变量类型中使用动态分发来处理实现特征的类型。它允许你在运行时处理不同的具体类型，只要这些类型实现了相同的特征。

例如，在函数参数中使用 `&dyn Trait` 或 `Box<dyn Trait>` 就是使用特征对象的典型方式。这样可以在运行时通过特征对象调用实现了特征的方法，而不需要知道具体的类型。
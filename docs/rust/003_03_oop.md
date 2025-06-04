## rust中面向对象

Rust 并不是传统意义上的面向对象编程语言，但它支持一些面向对象的特性：

1. **结构体和方法**:
   - Rust 使用结构体（`struct`）来定义数据类型，并可以为结构体实现方法。

2. **封装**:
   - 通过模块系统和 `pub` 关键字，Rust 支持封装，控制数据和方法的可见性。

3. **特征（Traits）**:
   - 类似于接口，允许定义共享行为。通过实现特征，结构体可以拥有多态行为。

4. **实现继承**:
   - Rust 不支持类继承，但可以通过特征实现类似的行为复用。

5. **多态**:
   - 使用特征对象（`dyn Trait`），Rust 支持运行时多态。

虽然 Rust 不以面向对象为核心，但它提供了足够的工具来实现面向对象编程的许多原则。


## examples


当然，这里有一些 Rust 中面向对象特性的示例：

### 结构体和方法

```rust
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect = Rectangle { width: 30, height: 50 };
    println!("The area of the rectangle is {} square pixels.", rect.area());
}
```

### 封装

```rust
mod shapes {
    pub struct Circle {
        pub radius: f64,
    }

    impl Circle {
        pub fn new(radius: f64) -> Circle {
            Circle { radius }
        }

        pub fn area(&self) -> f64 {
            std::f64::consts::PI * self.radius * self.radius
        }
    }
}

fn main() {
    let circle = shapes::Circle::new(10.0);
    println!("The area of the circle is {} square units.", circle.area());
}
```

### 特征（Traits）

```rust
trait Draw {
    fn draw(&self);
}

struct Square;

impl Draw for Square {
    fn draw(&self) {
        println!("Drawing a square.");
    }
}

fn main() {
    let square = Square;
    square.draw();
}
```

### 多态

```rust
trait Shape {
    fn area(&self) -> f64;
}

struct Triangle {
    base: f64,
    height: f64,
}

impl Shape for Triangle {
    fn area(&self) -> f64 {
        0.5 * self.base * self.height
    }
}

fn print_area(shape: &dyn Shape) {
    println!("The area is {}.", shape.area());
}

fn main() {
    let triangle = Triangle { base: 5.0, height: 10.0 };
    print_area(&triangle);
}
```

这些示例展示了 Rust 如何使用结构体、方法、特征和特征对象来实现面向对象的设计。


### 多结构体多态


好的，让我们用多个结构体类型来展示多态：

```rust
trait Shape {
    fn area(&self) -> f64;
}

struct Triangle {
    base: f64,
    height: f64,
}

impl Shape for Triangle {
    fn area(&self) -> f64 {
        0.5 * self.base * self.height
    }
}

struct Circle {
    radius: f64,
}

impl Shape for Circle {
    fn area(&self) -> f64 {
        std::f64::consts::PI * self.radius * self.radius
    }
}

fn print_area(shape: &dyn Shape) {
    println!("The area is {}.", shape.area());
}

fn main() {
    let triangle = Triangle { base: 5.0, height: 10.0 };
    let circle = Circle { radius: 3.0 };

    print_area(&triangle);
    print_area(&circle);
}
```

在这个例子中，我们定义了两个结构体 `Triangle` 和 `Circle`，并为它们实现了 `Shape` 特征。通过 `print_area` 函数，我们可以处理任何实现了 `Shape` 特征的类型，实现了多态性。
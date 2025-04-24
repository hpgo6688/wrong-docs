# 快速记忆 GORM 关联关系中外键位置的方法

## 1. 关联关系口诀

**"拥有在外，属于在内，多对多在中"**

* **拥有在外**：Has One/Has Many 的外键在**外部表**（被拥有的表）
* **属于在内**：Belongs To 的外键在**内部表**（当前表）
* **多对多在中**：Many To Many 的外键在**中间表**

## 2. 形象比喻法

把数据库表想象成房子：

* **Has One/Has Many**：你的房子（主表）有车库/多个房间（从表），车库/房间需要记录它们属于哪栋房子（外键在从表）
  
* **Belongs To**：你（从表）住在某个房子（主表）里，你需要记录自己住在哪里（外键在当前表）
  
* **Many To Many**：你和朋友共享多个房子，需要一个记事本（中间表）记录谁有哪些房子的钥匙

## 3. 英语单词提示法

* **Has** 开头的关系（HasOne/HasMany）：外键在 **H**ave（拥有）的 **A**nother（另一个）表 → **HA** = Have Another
* **Belongs To**：外键在 **B**elonging（所属）的表 → **B** = Belongs here

## 4. 实际例子快速判断

问自己这个问题：**"谁需要知道谁？"**

| 关系类型 | 例子 | 谁需要知道谁？ | 外键位置 |
|---------|------|---------------|---------|
| Has One | 用户有个人资料 | 个人资料需要知道属于哪个用户 | 个人资料表 |
| Has Many | 用户有多个订单 | 订单需要知道属于哪个用户 | 订单表 |
| Belongs To | 订单属于用户 | 订单需要知道属于哪个用户 | 订单表 |
| Many To Many | 用户有多个角色，角色属于多个用户 | 两者都需要知道对方 | 中间关联表 |

## 5. 快速参考表

| 关系类型       | 外键位置               | 记忆提示                 |
|---------------|-----------------------|-------------------------|
| Has One       | 被拥有的表            | "拥有"的东西记录主人     |
| Has Many      | 被拥有的表            | "多个"东西各自记录主人   |
| Belongs To    | 当前表                | "属于"所以要自己记归属   |
| Many To Many  | 中间表                | "多对多"需要中间人记录   |
| 多态关联      | 关联表+类型字段       | "多态"需要类型标记       |
| 单表继承      | 父表+鉴别器字段       | "继承"都在一张表         |

记住这些简单规则和例子，你就能快速判断任何GORM关联关系中应该在哪里放置外键了！

在 GORM 中，为不同的关系类型设置约束的方式是相似的。可以通过 `constraint` 标签来定义约束，比如外键约束。以下是如何在这四种关系中应用约束的示例：

### Belongs To

```go
type CreditCard struct {
    gorm.Model
    Number string
    UserID uint
    User   User `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;foreignKey:UserID;references:ID"`
}
```

### Has One

```go
type User struct {
    gorm.Model
    CreditCard CreditCard `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;foreignKey:UserID;references:ID"`
}
```

### Has Many

```go
type User struct {
    gorm.Model
    CreditCards []CreditCard `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;foreignKey:UserID;references:ID"`
}
```

### Many To Many

```go
type User struct {
    gorm.Model
    Groups []Group `gorm:"many2many:user_groups;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;joinForeignKey:UserID;joinReferences:GroupID"`
}

type Group struct {
    gorm.Model
    Users []User `gorm:"many2many:user_groups;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;joinForeignKey:GroupID;joinReferences:UserID"`
}
```

### 解释

* **OnUpdate: CASCADE**: 更新时级联更新。
* **OnDelete: SET NULL**: 删除时将外键设置为 NULL。

通过 `constraint` 标签，你可以为外键关系定义不同的行为，以确保数据的一致性和完整性。希望这对你有帮助！

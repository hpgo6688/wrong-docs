GORM 的 `clause.OnConflict` 是用来处理数据库插入时的冲突策略的。以下是一些常见用法的快速总结：

1. **Do Nothing on Conflict**:
   - 如果发生冲突（如主键冲突），则不做任何操作。
   

```go
   db.Clauses(clause.OnConflict{DoNothing: true}).Create(&user)
   ```

2. **Update Specific Columns on Conflict**:
   - 如果 `id` 冲突，更新指定的列。
   

```go
   db.Clauses(clause.OnConflict{
     Columns:   []clause.Column{{Name: "id"}},
     DoUpdates: clause.Assignments(map[string]interface{}{"role": "user"}),
   }).Create(&users)
   ```

3. **Use SQL Expression**:
   - 使用 SQL 表达式更新列值。
   

```go
   db.Clauses(clause.OnConflict{
     Columns:   []clause.Column{{Name: "id"}},
     DoUpdates: clause.Assignments(map[string]interface{}{"count": gorm.Expr("GREATEST(count, VALUES(count))")}),
   }).Create(&users)
   ```

4. **Update Columns to New Value on Conflict**:
   - 如果 `id` 冲突，更新指定列为新值。
   

```go
   db.Clauses(clause.OnConflict{
     Columns:   []clause.Column{{Name: "id"}},
     DoUpdates: clause.AssignmentColumns([]string{"name", "age"}),
   }).Create(&users)
   ```

5. **Update All Columns on Conflict**:
   - 除了主键和有默认值的列，更新所有其他列。
   

```go
   db.Clauses(clause.OnConflict{
     UpdateAll: true,
   }).Create(&users)
   ```

这些用法帮助你在插入数据时灵活处理冲突情况。

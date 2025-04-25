## 这种查询特别适合展示组织结构，帮助理解每个员工在公司结构中的位置。

```sql
WITH RECURSIVE employee_paths (emp_id, emp_name, path) AS
(
  SELECT emp_id, emp_name, CAST(emp_name AS CHAR(200))
    FROM employee
    WHERE manager IS NULL
  UNION ALL
  SELECT e.emp_id, e.emp_name, CONCAT(ep.path, '->', e.emp_name)
    FROM employee_paths ep 
    JOIN employee e
      ON ep.emp_id = e.manager
)
SELECT * FROM employee_paths ORDER BY path;
```

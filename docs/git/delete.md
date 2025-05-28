## 分支改名字

要重命名 Git 分支，可以使用以下步骤：

1. **切换到要重命名的分支**（如果不在该分支上）：
   ```bash
   git checkout old-branch-name
   ```

2. **重命名分支**：
   ```bash
   git branch -m new-branch-name
   ```

3. **更新远程分支**（如果需要）：
   - 删除旧的远程分支：
     ```bash
     git push origin --delete old-branch-name
     ```
   - 推送新的分支并设置上游：
     ```bash
     git push origin new-branch-name
     git push --set-upstream origin new-branch-name
     ```

确保在执行这些操作之前，所有更改都已提交，并且你有权限进行分支操作。
#!/bin/bash
echo "$(date '+%Y-%m-%d %H:%M:%S') - temp save auto run..." >> /Users/haotian.chen/logs/git_auto_commit.log


CODE_DIR="$HOME/Develop/code/web/github"
COMMIT_MESSAGE="Auto commit: $(date '+%Y-%m-%d %H:%M:%S')"

echo "📦 开始检查代码仓库提交状态..."
echo "──────────────────────────────"

# 遍历所有一级子目录
for dir in "$CODE_DIR"/*/; do
    # 去除末尾斜杠获取目录名
    clean_dir="${dir%/}"
    project_name=$(basename "$clean_dir")

    # 跳过非Git仓库
    if [ ! -d "$clean_dir/.git" ]; then
        echo "⏭️ 跳过非Git仓库: $project_name"
        echo "──────────────────────────────"
        continue
    fi

    echo "🔍 检查项目: $project_name"
    cd "$clean_dir" || { echo "❌ 进入目录失败"; continue; }

    # 检查更新
    git fetch --quiet

    # 检查工作树状态
    if [ -n "$(git status --porcelain)" ] || [ "$(git rev-parse HEAD)" != "$(git rev-parse @{u})" ]; then
        echo "⚠️ 发现未提交更改或远程更新:"
        git status --short

        # 暂存所有变更
        git add . 

        # 提交变更
        if git commit -m "$COMMIT_MESSAGE" --quiet; then
            echo "✅ 提交成功: $COMMIT_MESSAGE"
            
            # 尝试推送
            if git push --quiet; then
                echo "🚀 推送成功!"
                # 添加延迟
                # sleep 10
            else
                echo "❌ 推送失败!"
            fi
        else
            echo "🟡 无新内容需要提交"
        fi
    else
        echo "✅ 项目已是最新状态"
    fi

    echo "──────────────────────────────"
    cd - > /dev/null || exit
done

echo "🎉 所有项目检查完成!"
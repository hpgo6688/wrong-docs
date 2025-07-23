#!/bin/bash

# 检查是否提供了目录参数
if [ -z "$1" ]; then
    echo "用法: $0 <目标目录>"
    exit 1
fi

# 目标目录
TARGET_DIR="$1"

# 判断目录是否存在
if [ ! -d "$TARGET_DIR" ]; then
    echo "错误: 目录 '$TARGET_DIR' 不存在"
    exit 1
fi

# 切换到目标目录
cd "$TARGET_DIR" || exit 1

# 查找未加序号的文件，按修改时间排序（Linux 通用）
# FILES=$(find . -maxdepth 1 -type f ! -regex './[0-9]\{3\}_.*' -printf "%T@ %f\n" | sort -n | cut -d' ' -f2-)
FILES=$(find . -maxdepth 1 -type f ! -regex './[0-9]\{3\}_.*' -exec stat -f "%B %N" {} \; | sort -n | cut -d' ' -f2-)

# 初始化序号
COUNT=1

# 遍历文件
for FILE in $FILES; do
    PREFIX=$(printf "%03d" "$COUNT")
    NEW_NAME="${PREFIX}_$FILE"

    # 避免重命名冲突
    if [ ! -e "$NEW_NAME" ]; then
        mv "$FILE" "$NEW_NAME"
        echo "重命名: $FILE -> $NEW_NAME"
    fi

    COUNT=$((COUNT + 1))
done

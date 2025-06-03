#!/bin/bash

# 检查是否传入参数
if [ -z "$1" ]; then
    echo "用法: $0 <目标目录>"
    exit 1
fi

TARGET_DIR="$1"

# 检查目录是否存在
if [ ! -d "$TARGET_DIR" ]; then
    echo "错误: 目录 '$TARGET_DIR' 不存在"
    exit 1
fi

cd "$TARGET_DIR" || exit 1

# 获取未加编号的文件，并按修改时间排序（macOS 版本）
FILES=$(find . -maxdepth 1 -type f ! -regex './[0-9][0-9][0-9]_.*' -exec stat -f "%m %N" {} \; | sort -n | cut -d' ' -f2-)

COUNT=1

for FILE in $FILES; do
    # 去掉 ./ 前缀
    BASENAME="${FILE#./}"
    PREFIX=$(printf "%02d" "$COUNT")
    NEW_NAME="${PREFIX}_${BASENAME}"

    if [ ! -e "$NEW_NAME" ]; then
        mv "$BASENAME" "$NEW_NAME"
        echo "重命名: $BASENAME -> $NEW_NAME"
    else
        echo "跳过: $NEW_NAME 已存在"
    fi

    COUNT=$((COUNT + 1))
done

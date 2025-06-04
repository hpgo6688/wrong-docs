#!/bin/bash

# 用法说明
usage() {
    echo "用法: $0 <目标目录> [--force]"
    echo "  --force    强制重命名所有 .md 文件（包括已编号的）"
    exit 1
}

# 参数检查
if [ -z "$1" ]; then
    usage
fi

TARGET_DIR="$1"
FORCE_RENAME=false

if [ "$2" == "--force" ]; then
    FORCE_RENAME=true
fi

# 检查目录是否存在
if [ ! -d "$TARGET_DIR" ]; then
    echo "错误: 目录 '$TARGET_DIR' 不存在"
    exit 1
fi

# 切换到目标目录
cd "$TARGET_DIR" || exit 1

# 查找所有包含 .md 文件的目录
DIRS=$(find . -type f -name "*.md" -exec dirname {} \; | sort -u)

# 遍历每个目录
for DIR in $DIRS; do
    echo "📁 处理目录: $DIR"

    # 构建 find 命令
    if $FORCE_RENAME; then
        # 查找所有 .md 文件
        FILES=$(find "$DIR" -maxdepth 1 -type f -name "*.md" -exec stat -f "%m %N" {} \; | sort -n)
    else
        # 查找未编号的 .md 文件
        FILES=$(find "$DIR" -maxdepth 1 -type f -name "*.md" ! -regex ".*/[0-9][0-9][0-9]_.*\.md" -exec stat -f "%m %N" {} \; | sort -n)
    fi

    COUNT=1

    while IFS= read -r LINE; do
        # 拆分时间戳和路径
        TIME=$(echo "$LINE" | cut -d' ' -f1)
        FILE_PATH=$(echo "$LINE" | cut -d' ' -f2-)

        BASENAME=$(basename "$FILE_PATH")
        EXT="${BASENAME##*.}"
        NAME_NO_EXT="${BASENAME%.*}"

        # 去掉已有编号（如果有）
        CLEAN_NAME=$(echo "$NAME_NO_EXT" | sed -E 's/^[0-9]{3}_//')

        PREFIX=$(printf "%03d" "$COUNT")
        NEW_NAME="${PREFIX}_${CLEAN_NAME}.${EXT}"
        NEW_PATH="${DIR}/${NEW_NAME}"

        # 如果新路径等于旧路径，不执行
        if [ "$FILE_PATH" != "$NEW_PATH" ]; then
            if [ ! -e "$NEW_PATH" ]; then
                mv "$FILE_PATH" "$NEW_PATH"
                echo "✅ 重命名: $FILE_PATH -> $NEW_PATH"
            else
                echo "⚠️  跳过: $NEW_PATH 已存在"
            fi
        else
            echo "ℹ️  已正确命名: $FILE_PATH"
        fi

        COUNT=$((COUNT + 1))
    done <<< "$FILES"

done

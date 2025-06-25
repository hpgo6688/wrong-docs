```sh
#!/bin/bash

# 移除项目代码中的中文字符脚本
# 使用方法: 
#   ./remove_chinese.sh [目录路径]           # 交互模式
#   ./remove_chinese.sh [目录路径] --auto    # 自动处理所有文件
#   ./remove_chinese.sh [目录路径] --preview # 仅预览，不修改

# 解析参数
TARGET_DIR="${1:-.}"
AUTO_MODE=false
PREVIEW_MODE=false

# 检查参数
for arg in "$@"; do
    case $arg in
        --auto)
            AUTO_MODE=true
            shift
            ;;
        --preview)
            PREVIEW_MODE=true
            shift
            ;;
        --help|-h)
            echo "使用方法:"
            echo "  $0 [目录路径]           # 交互模式（默认）"
            echo "  $0 [目录路径] --auto    # 自动处理所有包含中文的文件"
            echo "  $0 [目录路径] --preview # 仅预览包含中文的文件，不修改"
            echo "  $0 --help              # 显示帮助信息"
            exit 0
            ;;
    esac
done

# 支持的文件扩展名（可根据需要修改）
FILE_EXTENSIONS=("*.js" "*.jsx" "*.ts" "*.tsx" "*.py" "*.java" "*.cpp" "*.c" "*.h" "*.cs" "*.php" "*.rb" "*.go" "*.rs" "*.swift" "*.kt" "*.scala" "*.html" "*.css" "*.scss" "*.less" "*.vue" "*.xml" "*.json" "*.yaml" "*.yml" "*.sql" "*.sh" "*.bat" "*.ps1")

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查目录是否存在
if [ ! -d "$TARGET_DIR" ]; then
    echo -e "${RED}错误: 目录 '$TARGET_DIR' 不存在${NC}"
    exit 1
fi

echo -e "${BLUE}开始扫描目录: $TARGET_DIR${NC}"
echo -e "${BLUE}支持的文件类型: ${FILE_EXTENSIONS[*]}${NC}"
if [ "$AUTO_MODE" = true ]; then
    echo -e "${YELLOW}自动模式: 将自动处理所有包含中文的文件${NC}"
elif [ "$PREVIEW_MODE" = true ]; then
    echo -e "${YELLOW}预览模式: 仅显示包含中文的文件，不进行修改${NC}"
else
    echo -e "${YELLOW}交互模式: 每个文件都会询问是否处理${NC}"
fi
echo ""

# 创建备份目录
BACKUP_DIR="./chinese_backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

# 统计变量
total_files=0
modified_files=0
total_chinese_chars=0
modified_files_list=()  # 添加数组来记录被修改的文件

# 函数：检查文件是否包含中文
contains_chinese() {
    local file="$1"
    grep -q '[一-龯]' "$file" 2>/dev/null
}

# 函数：移除中文字符
remove_chinese() {
    local file="$1"
    local temp_file="${file}.tmp"
    
    # 创建备份
    cp "$file" "$BACKUP_DIR/$(basename "$file").bak"
    
    # 方法1: 移除所有中文字符（包括标点符号）
    # sed 's/[一-龯]//g' "$file" > "$temp_file"
    
    # 方法2: 移除中文字符，但保留常见编程符号
    # 这个正则表达式匹配常见的中文字符范围
    sed 's/[\u4e00-\u9fff]//g' "$file" > "$temp_file" 2>/dev/null || \
    sed 's/[一-龯]//g' "$file" > "$temp_file"
    
    # 移除可能的中文标点符号
    sed -i 's/[，。；：""''（）【】《》？！、]//' "$temp_file" 2>/dev/null || \
    sed -i 's/[，。；：""''（）【】《》？！、]//g' "$temp_file"
    
    # 清理多余的空白字符
    sed -i 's/  */ /g; s/^ *//; s/ *$//' "$temp_file"
    
    # 移除空行（可选）
    sed -i '/^$/d' "$temp_file"
    
    # 替换原文件
    mv "$temp_file" "$file"
}

# 函数：统计文件中的中文字符数量
count_chinese() {
    local file="$1"
    grep -o '[一-龯]' "$file" 2>/dev/null | wc -l
}

# 收集所有匹配的文件
all_files=()
for ext in "${FILE_EXTENSIONS[@]}"; do
    while IFS= read -r -d '' file; do
        all_files+=("$file")
    done < <(find "$TARGET_DIR" -name "$ext" -type f -print0)
done

# 处理文件
for file in "${all_files[@]}"; do
    ((total_files++))
    
    if contains_chinese "$file"; then
        chinese_count=$(count_chinese "$file")
        echo -e "${YELLOW}发现中文字符: $file (${chinese_count}个字符)${NC}"
        
        # 显示包含中文的行（前3行）
        echo -e "${BLUE}包含中文的内容预览:${NC}"
        grep -n '[一-龯]' "$file" | head -3 | while read line; do
            echo -e "${BLUE}  $line${NC}"
        done
        echo ""
        
        # 根据模式决定是否处理
        should_process=false
        
        if [ "$PREVIEW_MODE" = true ]; then
            echo -e "${BLUE}[预览模式] 跳过处理${NC}"
            continue
        elif [ "$AUTO_MODE" = true ]; then
            should_process=true
            echo -e "${GREEN}[自动模式] 正在处理...${NC}"
        else
            # 交互模式 - 确保正确读取用户输入
            echo -n "是否移除此文件中的中文字符? [y/N]: "
            read -r response < /dev/tty
            if [[ "$response" =~ ^[Yy]$ ]]; then
                should_process=true
            fi
        fi
        
        if [ "$should_process" = true ]; then
            remove_chinese "$file"
            ((modified_files++))
            ((total_chinese_chars += chinese_count))
            modified_files_list+=("$file")  # 记录被修改的文件
            echo -e "${GREEN}✓ 已处理: $file${NC}"
        else
            echo -e "${BLUE}✗ 跳过: $file${NC}"
        fi
        echo ""
    fi
done

# 显示统计结果
echo -e "${BLUE}==================== 处理完成 ====================${NC}"
echo -e "${GREEN}扫描文件总数: $total_files${NC}"
echo -e "${GREEN}修改文件数量: $modified_files${NC}"
echo -e "${GREEN}移除中文字符总数: $total_chinese_chars${NC}"
echo -e "${GREEN}备份目录: $BACKUP_DIR${NC}"
echo ""

# 如果有修改文件，显示备份信息
if [ $modified_files -gt 0 ]; then
    echo -e "${YELLOW}重要提示:${NC}"
    echo -e "${YELLOW}1. 原文件已备份到 $BACKUP_DIR${NC}"
    echo -e "${YELLOW}2. 请检查修改后的文件是否符合预期${NC}"
    echo -e "${YELLOW}3. 如需恢复，请从备份目录复制文件${NC}"
    echo ""
    
    # 询问是否查看修改的文件列表
    echo -n "是否查看被修改的文件列表? [y/N]: "
    read -r response < /dev/tty
    
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}被修改的文件列表:${NC}"
        for modified_file in "${modified_files_list[@]}"; do
            echo -e "${GREEN}  ✓ $modified_file${NC}"
        done
        echo ""
        echo -e "${BLUE}对应的备份文件:${NC}"
        for modified_file in "${modified_files_list[@]}"; do
            backup_file="$BACKUP_DIR/$(basename "$modified_file").bak"
            if [ -f "$backup_file" ]; then
                echo -e "${YELLOW}  📁 $backup_file${NC}"
            fi
        done
    fi
fi

echo -e "${GREEN}脚本执行完成！${NC}"
```
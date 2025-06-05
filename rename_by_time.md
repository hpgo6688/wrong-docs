# 默认模式：只处理当前目录的 .md 文件，跳过已编号
./rename_by_folder.sh

# 强制重命名当前目录所有 .md 文件（包括已编号）
./rename_by_folder.sh --force

# 递归处理所有子目录，跳过已编号
./rename_by_folder.sh --recursive

# 递归且强制重命名所有 .md 文件
./rename_by_folder.sh --recursive --force

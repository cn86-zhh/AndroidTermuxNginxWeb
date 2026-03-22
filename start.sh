#!/bin/bash

echo "=========================================="
echo "  Termux Nginx Library API Server"
echo "=========================================="
echo ""

if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装"
    echo "请先安装 Node.js: pkg install nodejs"
    exit 1
fi

if [ ! -f "package.json" ]; then
    echo "❌ package.json 文件不存在"
    exit 1
fi

if [ ! -d "node_modules" ]; then
    echo "📦 正在安装依赖..."
    npm install
    # shellcheck disable=SC2181
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
    echo "✅ 依赖安装完成"
    echo ""
fi

PORT=${PORT:-3000}
echo "🚀 启动 API 服务器 (端口: $PORT)..."
echo "📁 Library 路径: $(pwd)/library"
echo ""
echo "访问地址:"
echo "  - 主页: http://localhost:$PORT"
echo "  - API: http://localhost:$PORT/api/library"
echo "  - 健康检查: http://localhost:$PORT/api/health"
echo ""
echo "按 Ctrl+C 停止服务器"
echo "=========================================="
echo ""

node api-server.js

@echo off
chcp 65001 >nul
echo ==========================================
echo   Termux Nginx Library API Server
echo ==========================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js 未安装
    echo 请先安装 Node.js
    pause
    exit /b 1
)

if not exist "package.json" (
    echo ❌ package.json 文件不存在
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo 📦 正在安装依赖...
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ 依赖安装失败
        pause
        exit /b 1
    )
    echo ✅ 依赖安装完成
    echo.
)

set PORT=3000
echo 🚀 启动 API 服务器 ^(端口: %PORT%^)...
echo 📁 Library 路径: %cd%\library
echo.
echo 访问地址:
echo   - 主页: http://localhost:%PORT%
echo   - API: http://localhost:%PORT%/api/library
echo   - 健康检查: http://localhost:%PORT%/api/health
echo.
echo 按 Ctrl+C 停止服务器
echo ==========================================
echo.

node api-server.js
pause

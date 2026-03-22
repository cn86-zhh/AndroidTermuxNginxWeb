# Termux Nginx 资源库

一个专为 Termux Nginx 环境设计的资源库管理系统，提供动态扫描、文件管理和 Web 界面展示功能。

## 项目简介

Termux Nginx 资源库是一个轻量级的资源管理平台，旨在为 Android Termux 环境中的 Nginx 用户提供便捷的资源管理服务。系统采用 Node.js + Express 构建，支持动态扫描和管理多种类型的资源文件。

## 核心特性

- 动态目录扫描：自动扫描并管理 library 目录下的所有资源文件
- 分类管理：支持脚本库、模板库、软件包库、公共库四大分类
- 文件预览：支持文本文件在线预览和二进制文件下载
- RESTful API：提供完整的 API 接口，便于集成和扩展
- 响应式界面：现代化的 Web 界面，支持移动端和桌面端
- 轻量级设计：基于 Node.js 原生模块，无需复杂依赖

## 技术栈

- 后端：Node.js (>=14.0.0)
- 框架：Express 4.18.2
- 前端：原生 HTML/CSS/JavaScript
- 部署环境：Termux + Nginx

## 项目结构

```
AndroidTermuxNginxWeb/
├── api-server.js          # Express API 服务器
├── server.js              # LibraryScanner 类，目录扫描核心
├── index.html             # 项目主页
├── library.html           # 资源库页面
├── package.json           # 项目配置文件
├── start.bat              # Windows 启动脚本
├── start.sh               # Linux/Mac 启动脚本
└── library/               # 资源目录
    ├── config/            # 配置文件（nginx配置等）
    ├── package/           # 软件包和工具
    ├── script/            # Shell 脚本集合
    ├── source/            # 公共代码片段和资源
    └── template/          # 网页和API模板
```

## 快速开始

### 环境要求

- Node.js >= 14.0.0
- npm 或 yarn

### 安装步骤

1. 克隆或下载项目到本地

2. 安装依赖：

```bash
npm install
```

3. 启动服务器：

Windows:

```bash
start.bat
```

Linux/Mac:

```bash
chmod +x start.sh
./start.sh
```

或直接使用 npm：

```bash
npm start
```

4. 访问应用：

- 主页：http://localhost:3000
- 资源库：http://localhost:3000/library.html
- API 文档：见下方 API 接口说明

## API 接口

### 获取所有分类和文件

```
GET /api/library
```

响应示例：

```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "script",
        "name": "脚本库",
        "icon": "📜",
        "description": "实用的Shell脚本集合",
        "color": "#667eea",
        "files": [...],
        "isEmpty": false
      }
    ]
  }
}
```

### 获取特定分类的文件

```
GET /api/library/:category
```

参数：

- `category`: 分类ID（script、template、package、source）

### 获取文件内容或下载

```
GET /api/file/:category/:filename
```

参数：

- `category`: 分类ID
- `filename`: 文件名

说明：

- 文本文件返回文件内容
- 二进制文件触发下载

### 健康检查

```
GET /api/health
```

响应示例：

```json
{
  "success": true,
  "message": "Library API Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 资源分类说明

### 脚本库 (script)

存放实用的 Shell 脚本，包括系统管理、自动化任务等。

### 模板库 (template)

提供网页模板和 API 模板，便于快速开发。

### 软件包库 (package)

常用软件包和工具的下载链接或安装包。

### 公共库 (source)

公共代码片段、工具脚本和杂项资源。

## 部署到 Termux Nginx

1. 在 Termux 中安装 Node.js：

```bash
pkg install nodejs
```

2. 上传项目文件到 Termux

3. 安装依赖并启动：

```bash
cd /path/to/project
npm install
npm start
```

4. 配置 Nginx 反向代理（可选）：

```nginx
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

## 配置说明

### 端口配置

默认端口为 3000，可通过环境变量修改：

```bash
PORT=8080 npm start
```

### 资源目录

默认资源目录为项目根目录下的 `library` 文件夹，可在 `server.js` 中修改路径。

## 开发说明

### 添加新分类

在 `server.js` 中的 `categories` 数组添加新分类：

```javascript
{
    id: 'new-category',
    name: '新分类',
    icon: '🔧',
    description: '分类描述',
    color: '#ff6b6b'
}
```

### 扩展 API

在 `api-server.js` 中添加新的路由和中间件。

## 常见问题

**Q: 如何修改默认端口？**  
A: 设置环境变量 `PORT`，例如：`PORT=8080 npm start`

**Q: 支持哪些文件类型？**  
A: 支持所有文本文件和二进制文件，文本文件可在线预览，二进制文件自动下载。

**Q: 如何添加新资源？**  
A: 直接将文件放入对应的 library 子目录即可，系统会自动扫描。

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

如有问题或建议，请通过 Issue 联系。

---

**注意**: 本项目专为 Termux Nginx 环境设计，确保在 Android Termux 环境中运行以获得最佳体验。

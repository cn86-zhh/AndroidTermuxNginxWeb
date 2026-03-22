/**
 * Library Configuration
 * 使用面向对象的编码风格，便于维护与扩展
 */

class LibraryFile {
    constructor(options) {
        this.name = options.name;
        this.title = options.title;
        this.description = options.description;
        this.content = options.content || '';
        this.type = options.type || 'text';
        this.size = options.size || null;
    }

    toObject() {
        return {
            name: this.name,
            title: this.title,
            description: this.description,
            content: this.content,
            type: this.type,
            size: this.size
        };
    }
}

class LibraryCategory {
    constructor(options) {
        this.id = options.id;
        this.name = options.name;
        this.icon = options.icon;
        this.description = options.description;
        this.color = options.color || '#667eea';
        this.files = options.files || [];
    }

    addFile(file) {
        if (file instanceof LibraryFile) {
            this.files.push(file);
        }
        return this;
    }

    toObject() {
        return {
            id: this.id,
            name: this.name,
            icon: this.icon,
            description: this.description,
            color: this.color,
            files: this.files.map(f => f instanceof LibraryFile ? f.toObject() : f)
        };
    }
}

class LibraryConfigManager {
    constructor() {
        this.categories = [];
        this._init();
    }

    _init() {
        this._createScriptCategory();
        this._createTemplateCategory();
        this._createPackageCategory();
        this._createSourceCategory();
    }

    _createScriptCategory() {
        const category = new LibraryCategory({
            id: 'script',
            name: '脚本库',
            icon: '📜',
            description: '实用的Shell脚本集合',
            color: '#667eea'
        });

        category.addFile(new LibraryFile({
            name: 'hello.sh',
            title: 'Hello World 脚本',
            description: '一个简单的Bash脚本示例，用于测试Termux环境是否正常工作。',
            content: `#!/bin/bash

echo -e "Hello World!"
echo -e "欢迎使用 Termux Nginx!"`
        }));

        category.addFile(new LibraryFile({
            name: 'sysinfo.sh',
            title: '系统信息脚本',
            description: '查看系统信息，包括主机名、内核版本、内存和磁盘使用情况。',
            content: `#!/bin/bash

echo "========== 系统信息 =========="
echo "主机名: $(hostname)"
echo "内核版本: $(uname -r)"
echo "系统时间: $(date)"
echo "内存使用:"
free -h
echo "磁盘使用:"
df -h`
        }));

        this.categories.push(category);
    }

    _createTemplateCategory() {
        const category = new LibraryCategory({
            id: 'template',
            name: '模板库',
            icon: '📄',
            description: '网页和API模板',
            color: '#f5576c'
        });

        category.addFile(new LibraryFile({
            name: 'index.html',
            title: '测试页面模板',
            description: '一个简单的Nginx测试页面，用于验证服务器是否正常运行。',
            content: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Termux Nginx 测试页面</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        h1 { text-align: center; }
        .info {
            background: rgba(255,255,255,0.1);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <h1>🎉 Nginx 运行成功!</h1>
    <div class="info">
        <h2>服务器信息</h2>
        <p>服务器时间: <span id="time"></span></p>
        <p>Nginx 版本: nginx/1.24.0</p>
    </div>
    <script>
        document.getElementById('time').textContent = new Date().toLocaleString('zh-CN');
    </script>
</body>
</html>`
        }));

        category.addFile(new LibraryFile({
            name: 'api-template.json',
            title: 'API模板',
            description: 'JSON格式的API响应模板，包含端点定义示例。',
            content: `{
    "name": "Termux Nginx",
    "version": "1.0.0",
    "description": "一个简单的API响应模板",
    "endpoints": [
        {
            "path": "/api/status",
            "method": "GET",
            "description": "获取服务器状态"
        },
        {
            "path": "/api/info",
            "method": "GET",
            "description": "获取系统信息"
        }
    ]
}`
        }));

        this.categories.push(category);
    }

    _createPackageCategory() {
        const category = new LibraryCategory({
            id: 'package',
            name: '软件包库',
            icon: '📦',
            description: '常用软件包和工具下载',
            color: '#4facfe'
        });

        category.addFile(new LibraryFile({
            name: 'Xshell-8.0.0095p.exe',
            title: 'Xshell 8.0 终端模拟器',
            description: '强大的终端模拟软件，支持SSH、SFTP、TELNET等协议，适用于Windows平台。',
            type: 'binary',
            size: '约 45MB'
        }));

        category.addFile(new LibraryFile({
            name: 'windows-geek.exe',
            title: 'Windows Geek 工具',
            description: 'Windows系统优化和管理工具，提供系统清理、优化等功能。',
            type: 'binary',
            size: '约 2MB'
        }));

        this.categories.push(category);
    }

    _createSourceCategory() {
        const category = new LibraryCategory({
            id: 'source',
            name: '公共库',
            icon: '📚',
            description: '公共代码片段、工具脚本和杂项资源',
            color: '#43e97b'
        });

        category.addFile(new LibraryFile({
            name: 'utils.sh',
            title: '通用工具函数库',
            description: '包含常用Shell函数，如日志记录、颜色输出、参数解析等。',
            content: `#!/bin/bash

LOG_LEVELS=("DEBUG" "INFO" "WARN" "ERROR")
CURRENT_LOG_LEVEL="INFO"

log() {
    local level=$1
    shift
    local message=$@
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [$level] $message"
}

log_info() {
    log "INFO" $@
}

log_error() {
    log "ERROR" $@
}

log_warn() {
    log "WARN" $@
}

colors() {
    RED='\\033[0;31m'
    GREEN='\\033[0;32m'
    YELLOW='\\033[0;33m'
    BLUE='\\033[0;34m'
    NC='\\033[0m'
}

print_success() {
    echo -e "\${GREEN}✓ $1\${NC}"
}

print_error() {
    echo -e "\${RED}✗ $1\${NC}"
}

print_warning() {
    echo -e "\${YELLOW}⚠ $1\${NC}"
}

check_command() {
    if command -v $1 &> /dev/null; then
        return 0
    else
        return 1
    fi
}

get_os() {
    case "$(uname -s)" in
        Linux*)     echo "Linux" ;;
        Darwin*)    echo "Mac" ;;
        CYGWIN*)    echo "Cygwin" ;;
        MINGW*)     echo "MinGW" ;;
        *)          echo "Unknown" ;;
    esac
}`
        }));

        category.addFile(new LibraryFile({
            name: 'json-utils.js',
            title: 'JSON处理工具',
            description: 'JavaScript JSON处理工具函数，包含解析、格式化、验证等功能。',
            content: `/**
 * JSON Utils - JSON处理工具库
 */

const JsonUtils = {
    parse(jsonString, defaultValue = null) {
        try {
            return JSON.parse(jsonString);
        } catch (e) {
            console.error('JSON解析失败:', e.message);
            return defaultValue;
        }
    },

    stringify(obj, indent = 2) {
        try {
            return JSON.stringify(obj, null, indent);
        } catch (e) {
            console.error('JSON序列化失败:', e.message);
            return null;
        }
    },

    isValid(jsonString) {
        try {
            JSON.parse(jsonString);
            return true;
        } catch (e) {
            return false;
        }
    },

    format(jsonString, indent = 2) {
        const parsed = this.parse(jsonString);
        if (parsed === null) return null;
        return this.stringify(parsed, indent);
    },

    minify(jsonString) {
        const parsed = this.parse(jsonString);
        if (parsed === null) return null;
        return JSON.stringify(parsed);
    },

    deepClone(obj) {
        return this.parse(this.stringify(obj));
    },

    merge(target, source) {
        return { ...target, ...source };
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = JsonUtils;
}`
        }));

        category.addFile(new LibraryFile({
            name: 'http-helpers.js',
            title: 'HTTP请求辅助函数',
            description: '封装常用的HTTP请求方法，支持GET、POST等请求方式。',
            content: `/**
 * HTTP Helpers - HTTP请求辅助函数库
 */

const HttpHelpers = {
    async get(url, options = {}) {
        const response = await fetch(url, {
            method: 'GET',
            headers: options.headers || {},
            ...options
        });
        return this._handleResponse(response);
    },

    async post(url, data, options = {}) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            body: JSON.stringify(data),
            ...options
        });
        return this._handleResponse(response);
    },

    async put(url, data, options = {}) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            body: JSON.stringify(data),
            ...options
        });
        return this._handleResponse(response);
    },

    async delete(url, options = {}) {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: options.headers || {},
            ...options
        });
        return this._handleResponse(response);
    },

    async _handleResponse(response) {
        if (!response.ok) {
            throw new Error(\`HTTP Error: \${response.status} \${response.statusText}\`);
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        }
        return response.text();
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = HttpHelpers;
}`
        }));

        category.addFile(new LibraryFile({
            name: 'date-utils.js',
            title: '日期处理工具',
            description: '日期格式化、计算、验证等常用功能。',
            content: `/**
 * Date Utils - 日期处理工具库
 */

const DateUtils = {
    format(date, pattern = 'YYYY-MM-DD HH:mm:ss') {
        const d = new Date(date);
        const tokens = {
            'YYYY': d.getFullYear(),
            'MM': String(d.getMonth() + 1).padStart(2, '0'),
            'DD': String(d.getDate()).padStart(2, '0'),
            'HH': String(d.getHours()).padStart(2, '0'),
            'mm': String(d.getMinutes()).padStart(2, '0'),
            'ss': String(d.getSeconds()).padStart(2, '0')
        };
        let result = pattern;
        for (const [key, value] of Object.entries(tokens)) {
            result = result.replace(key, value);
        }
        return result;
    },

    now() {
        return new Date();
    },

    timestamp() {
        return Date.now();
    },

    addDays(date, days) {
        const d = new Date(date);
        d.setDate(d.getDate() + days);
        return d;
    },

    addMonths(date, months) {
        const d = new Date(date);
        d.setMonth(d.getMonth() + months);
        return d;
    },

    diffDays(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
    },

    isWeekend(date) {
        const d = new Date(date);
        const day = d.getDay();
        return day === 0 || day === 6;
    },

    isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = DateUtils;
}`
        }));

        this.categories.push(category);
    }

    addCategory(category) {
        if (category instanceof LibraryCategory) {
            this.categories.push(category);
        }
        return this;
    }

    getCategoryById(id) {
        return this.categories.find(cat => cat.id === id);
    }

    toObject() {
        return {
            categories: this.categories.map(cat => cat.toObject())
        };
    }
}

const manager = new LibraryConfigManager();

const LibraryConfig = manager.toObject();

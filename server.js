/**
 * Library API Server
 * 提供library目录的动态扫描API
 * 支持Termux Nginx环境部署
 */

const fs = require('fs');
const path = require('path');

class LibraryScanner {
    constructor(libraryPath) {
        this.libraryPath = libraryPath;
        this.categories = [
            { id: 'script', name: '脚本库', icon: '📜', description: '实用的Shell脚本集合', color: '#667eea' },
            { id: 'template', name: '模板库', icon: '📄', description: '网页和API模板', color: '#f5576c' },
            { id: 'package', name: '软件包库', icon: '📦', description: '常用软件包和工具下载', color: '#4facfe' },
            { id: 'source', name: '公共库', icon: '📚', description: '公共代码片段、工具脚本和杂项资源', color: '#43e97b' }
        ];
    }

    scanDirectory(dirPath) {
        try {
            if (!fs.existsSync(dirPath)) {
                return [];
            }

            const files = fs.readdirSync(dirPath);
            const fileList = [];

            for (const file of files) {
                const filePath = path.join(dirPath, file);
                const stats = fs.statSync(filePath);

                if (stats.isFile()) {
                    fileList.push({
                        name: file,
                        size: this.formatFileSize(stats.size),
                        type: this.getFileType(file),
                        modified: stats.mtime
                    });
                }
            }

            return fileList.sort((a, b) => a.name.localeCompare(b.name));
        } catch (error) {
            console.error(`扫描目录失败: ${dirPath}`, error.message);
            return [];
        }
    }

    getFileType(filename) {
        const ext = path.extname(filename).toLowerCase();
        const binaryExtensions = ['.exe', '.zip', '.tar', '.gz', '.7z', '.rar', '.bin', '.dll', '.so'];
        return binaryExtensions.includes(ext) ? 'binary' : 'text';
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    scanAll() {
        const result = {
            categories: []
        };

        for (const category of this.categories) {
            const categoryPath = path.join(this.libraryPath, category.id);
            const files = this.scanDirectory(categoryPath);

            result.categories.push({
                ...category,
                files: files,
                isEmpty: files.length === 0
            });
        }

        return result;
    }
}

const scanner = new LibraryScanner(path.join(__dirname, 'library'));

module.exports = scanner;

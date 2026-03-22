/**
 * Library API Server
 * Express服务器，提供library目录的API接口
 * 支持Termux Nginx环境部署
 */

const express = require('express');
const path = require('path');
const fs = require('fs');
const scanner = require('./server');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.get('/api/library', (req, res) => {
    try {
        const data = scanner.scanAll();
        res.json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.get('/api/library/:category', (req, res) => {
    try {
        const categoryId = req.params.category;
        const categoryPath = path.join(__dirname, 'library', categoryId);

        if (!fs.existsSync(categoryPath)) {
            return res.status(404).json({
                success: false,
                error: '分类不存在'
            });
        }

        const files = scanner.scanDirectory(categoryPath);
        const categoryInfo = scanner.categories.find(c => c.id === categoryId);

        res.json({
            success: true,
            data: {
                ...categoryInfo,
                files: files,
                isEmpty: files.length === 0
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.get('/api/file/:category/:filename', (req, res) => {
    try {
        const categoryId = req.params.category;
        const filename = req.params.filename;
        const filePath = path.join(__dirname, 'library', categoryId, filename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                error: '文件不存在'
            });
        }

        const stats = fs.statSync(filePath);
        const ext = path.extname(filename).toLowerCase();
        const binaryExtensions = ['.exe', '.zip', '.tar', '.gz', '.7z', '.rar', '.bin', '.dll', '.so'];
        const isBinary = binaryExtensions.includes(ext);

        if (isBinary) {
            res.download(filePath);
        } else {
            const content = fs.readFileSync(filePath, 'utf8');
            res.json({
                success: true,
                data: {
                    name: filename,
                    content: content,
                    type: 'text',
                    size: scanner.formatFileSize(stats.size)
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Library API Server is running',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Library API Server is running on http://0.0.0.0:${PORT}`);
    console.log(`Library path: ${path.join(__dirname, 'library')}`);
});

#!/bin/bash

# 系统信息查看脚本
echo "========== 系统信息 =========="
echo "主机名: $(hostname)"
echo "内核版本: $(uname -r)"
echo "系统时间: $(date)"
echo "内存使用:"
free -h
echo "磁盘使用:"
df -h

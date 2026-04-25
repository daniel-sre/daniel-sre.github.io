# Go Port Scanner

一个基于 Go 实现的并发端口与 URL 扫描工具。

该工具支持 TCP 端口扫描以及 HTTP/HTTPS 探测，采用 Worker Pool 模型实现并发控制，适用于基础运维与网络探测场景。

---

## 功能特性

- 支持单 IP 与 CIDR 网段扫描
- 支持多端口与端口范围（如 80,443 或 1-1000）
- 支持 HTTP 与 HTTPS 探测
- 支持 Worker Pool 并发控制
- 支持超时控制，避免阻塞
- 支持 JSON 输出

---

## 系统架构
项目采用模块化设计，主要由以下几个部分组成：

- Parser：解析输入参数（IP、端口、URL）
- IP Generator：根据 CIDR 生成 IP 列表
- Worker Pool：并发执行任务
- Scanner：执行具体扫描（TCP 或 HTTP）
- Output：统一格式化输出结果
---

## 参数说明
```
  -fallback
    	try both http and https
  -json
    	json output
  -o string
    	output file
  -p string
    	 80 or 80-100 or 80,443,22 (default "80")
  -pretty
    	pretty json
  -t string
    	(IP or CIDR)
  -u string
    	url
  -w int
    	worker number (default 10)
```
---
## 使用示例

端口扫描：
```
go run main.go -t 192.168.1.1 -p 80,443  
```
URL 探测：
```
go run main.go -u example.com -p 80,443 --fallback  
```
JSON 输出：
```
go run main.go -t 192.168.1.1 -p 80,443 --json --pretty  
```
---

## 项目地址

https://github.com/daniel-sre/go-port-scanner
---

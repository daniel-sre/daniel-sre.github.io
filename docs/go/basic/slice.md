# Slice：底层结构与扩容机制

在 Go 的日常开发中，slice 几乎无处不在。但在一些看似正常的操作下，却可能产生令人困惑的结果。

例如：

```go
a := []int{1,2,3}
b := a
b[0] = 100

fmt.Println(a) // [100 2 3] 为什么 a 被修改了？
```

这个问题的根本原因，并不是语法，而是对 slice 底层结构理解不够。

---

## 一、底层结构

slice 本质上不是一个独立的数据结构，而是对底层数组的一层“视图”。

其结构可以抽象为：

```
slice = pointer + len + cap
```

- pointer：指向底层数组  
- len：当前可访问元素数量  
- cap：当前容量（不扩容情况下的最大长度）

---

### 1. 共享底层数组

```go
a := []int{1,2,3}
b := a

b[0] = 100

fmt.Println("a:", a)
fmt.Println("b:", b)
```

输出结果：

```
a: [100 2 3] addr=A
b: [100 2 3] addr=A
```

说明：

- a 和 b 指向同一个底层数组  
- 修改 b 会影响 a  

---

### 2. 切片是“窗口”，不是复制

```go
a := []int{1,2,3,4}
b := a[:2]

b[0] = 100

fmt.Println("a:", a)
fmt.Println("b:", b)
```

输出结果：

```
a: [100 2 3 4] addr=A
b: [100 2]     addr=A
```

说明：

- b 只是 a 的一个“窗口”  
- 并没有复制数据  
- 仍然共享同一块底层数组  

---

## 二、扩容机制

```go
s := make([]int, 0, 5)
s = append(s, 1,2,3,4,5)

fmt.Println(s)
```

当未超过 cap：

- 不会扩容  
- 直接写入原数组  

---

当超过容量：

```go
s := make([]int, 0, 5)
s = append(s, 1,2,3,4,5)

old := s
s = append(s, 7,8,9)

fmt.Println("old:", old)
fmt.Println("new:", s)
```

输出结果：

```
old: [1 2 3 4 5] addr=A
new: [1 2 3 4 5 7 8 9] addr=B
```

说明：

- 发生扩容  
- 创建新数组  
- 拷贝旧数据  
- 返回新的 slice  

---

### 3. 扩容后的“数据分裂”

```go
a := []int{1,2,3}
b := a

a = append(a, 4)
b = append(b, 5)

fmt.Println("a:", a)
fmt.Println("b:", b)
```

输出结果：

```
a: [1 2 3 4] addr=A
b: [1 2 3 5] addr=B
```

说明：

- append 触发扩容后  
- a 和 b 不再共享底层数组  

👉 关键点：

```
是否扩容，决定是否共享数据
```

---

### 4. 扩容策略（简化理解）

- 容量 < 1024 → 扩容为 2 倍  
- 容量 ≥ 1024 → 扩容为约 1.25 倍  

---

## 三、性能问题

扩容的代价：

- 内存重新分配  
- 数据拷贝 

示例：

```go
var s []int
for i := 0; i < 1000000; i++ {
    s = append(s, i)
}
```

问题：

- 多次扩容  
- 多次内存拷贝  
- 性能不稳定  

---

### 优化方式

```go
s := make([]int, 0, 1000000)
```

优势：

- 减少扩容次数  
- 避免重复拷贝  
- 性能更稳定  

---

## 四、常见陷阱（重点）

### 1. 小切片导致大内存无法释放

```go
big := make([]byte, 1024*1024) // 1MB
small := big[:10]

fmt.Println("len:", len(small))
fmt.Println("cap:", cap(small))
```

输出结果：

```
len: 10
cap: 1048576
```

说明：

- small 仍然引用 big 的底层数组  
- 即使只使用 10 字节  
- 1MB 内存仍然不会被 GC 回收  

---

### 正确写法

```go
small2 := make([]byte, len(small))
copy(small2, small)

fmt.Println(len(small2), cap(small2))
```

输出结果：

```
10 10
```

说明：

- small2 拥有独立内存  
- 原大数组在无引用后可被 GC 回收  

---

## 五、并发不安全

slice 不是线程安全的数据结构。

多个 goroutine 同时 append 同一个 slice，会发生数据竞争。

---

### 1. 错误示例

```go
func main() {
    s := []int{}

    for i := 0; i < 10; i++ {
        go func(i int) {
            s = append(s, i)
        }(i)
    }

    time.Sleep(time.Second)

    fmt.Println("slice:", s)
    fmt.Println("len:", len(s))
}
```

---

### 2. 可能结果

- 数据丢失  
- 长度不一致  
- 顺序混乱  

---

### 3. 原因分析

#### （1）写入覆盖

- goroutine A 读取 len = 3  
- goroutine B 读取 len = 3  
- 同时写入 index = 3 → 数据被覆盖  

---

#### （2）扩容导致数据丢失

- goroutine A 扩容到新数组 A  
- goroutine B 扩容到新数组 B  

结果：

- 数据写入不同数组  
- 部分数据丢失  

---

#### （3）核心原因

```
append 不是原子操作
```

---

### 4. 检测数据竞争

```bash
go run -race main.go
```

出现：

```
WARNING: DATA RACE
```

说明存在数据竞争。

---

### 5. 解决方案（加锁）

```go
var mu sync.Mutex

mu.Lock()
s = append(s, i)
mu.Unlock()
```

---

### 6. 关键理解

加锁不会让程序变成串行执行，而是只让临界区（append 操作）变成有序执行。

---

## 总结

1. slice 本质是对数组的引用  
2. 扩容会带来性能开销  
3. 是否扩容决定是否共享数据  
4. slice 存在共享底层数组的隐式行为  
5. slice 在并发场景下不安全  

---

## 一句话结论

slice 的核心问题不在语法，而在“共享底层数组带来的隐式行为”。
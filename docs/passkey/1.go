package main

import (
	"fmt"
	"math/rand"
	"sync/atomic"
	"time"
)

// 定义读取操作结构体
type readOp struct {
	key  int
	resp chan int
}

// 定义写入操作结构体
type writeOp struct {
	key  int
	val  int
	resp chan bool
}

func main() {

	// 计数器，用于记录读取和写入操作的次数
	var readOps uint64
	var writeOps uint64

	// 定义读取和写入操作的通道
	reads := make(chan readOp)
	writes := make(chan writeOp)

	// 启动 Goroutine 管理共享状态
	go func() {
		var state = make(map[int]int) // map
		for {
			select {
			// 处理读取操作
			case read := <-reads:
				read.resp <- state[read.key]
			// 处理写入操作
			case write := <-writes:
				state[write.key] = write.val
				write.resp <- true
			}
		}
	}()

	// 启动 100 个 Goroutine 进行读取操作
	for r := 0; r < 100; r++ {
		go func() {
			for {
				read := readOp{
					key:  rand.Intn(5), // 随机选择一个键
					resp: make(chan int)}
				reads <- read                 // 等这个chan
				<-read.resp                   // 等这个chan
				atomic.AddUint64(&readOps, 1) // 原子增加读取操作计数
				time.Sleep(time.Millisecond)
			}
		}()
	}

	// 启动 10 个 Goroutine 进行写入操作
	for w := 0; w < 10; w++ {
		go func() {
			for {
				write := writeOp{
					key:  rand.Intn(5),   // 随机选择一个键
					val:  rand.Intn(100), // 随机生成一个值
					resp: make(chan bool)}
				writes <- write
				<-write.resp
				atomic.AddUint64(&writeOps, 1) // 原子增加写入操作计数
				time.Sleep(time.Millisecond)
			}
		}()
	}

	// 运行一段时间后，打印操作计数
	time.Sleep(time.Second)

	readOpsFinal := atomic.LoadUint64(&readOps)
	fmt.Println("readOps:", readOpsFinal)
	writeOpsFinal := atomic.LoadUint64(&writeOps)
	fmt.Println("writeOps:", writeOpsFinal)
}

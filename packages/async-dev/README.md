# JavaScript Asynchronous Programming

## Concepts

### Blocking Code(产生阻塞的代码)

当浏览器里面的一个web应用进行密集运算还没有把控制权返回给浏览器时，整个浏览器处于停滞状态，即**阻塞**；此时浏览器无法继续处理用户的输入并执行其他任务，直到web应用交回处理器的控制。

#### Example

​	**simple-sync.html**

​	**simple-sync-ui-blocking.html**

#### Why is this?

The answer is because JavaScript, generally speaking, is **single-threaded**.

### Threads

一个**线程**是一个基本的处理过程，程序用它来完成任务。每个线程只能执行一个任务：

```text
Task A --> Task B --> Task C
```

每个任务顺序执行，只有前面的任务结束了，后面的任务才能开始。

### JavaScript is single-threaded

JavaScript传统上是**单线程的**。即使有多个内核，也只能在单一线程上运行多个任务，此线程成为主线程（**main thread**）。

```text
Main thread: Render circles to canvas --> Display alert()
```

可通过[Web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)可以把一些任务交给一个名为worker的单独线程，这样可以同时运行多个JavaScript代码快。（可以空出主线程处理用户的交互，从而避免阻塞）

```text
Main thread: Task A --> Task C
Worker thread: Expensive task B
```

#### Example

​	**simple-sync-worker.html**

### Asynchronous Code

Web Workers存在局限性，不能访问DOM — 不能让一个worker直接更新UI。其次，虽然worker里面运行的代码不会产生阻塞，但是基本上还是**同步**的，即当一个函数依赖于几个在它**之前运行的过程的结果**时，就会成为问题。

```text
* use sync
Main thread: Task A --> Task B

* use worker
Main thread: Task A --> Task B --> | Task D |
Worker thread: Task C -----------> |				|
```

#### `Promise`s

```text
Main thread: Task A										Task B
		Promise: 			|__async operation__|
```

由于操作发生在其他地方，因此在处理异步操作的时候，主线程不会被阻塞。

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



## Async JavaScript

代码必须等到`response`返回才能继续往下执行。

JavaScript代码中，常见异步编程风格：callbacks（老式），promise（新式）

### Async `callbacks`

异步callbacks其实就是函数，只不过是作为参数传递给那些在后台执行的其他函数。当那些后台运行的代码结束，就调用callbacks函数，并做出响应。

如`addEventListener()`的第二个参数就是异步callback；第一个参数是侦听的事件类型，第二个就是事件发生时调用的回调函数。

### `Promises`

Promises是新派的异步代码，现代的web APIs经常用到。

`fetch()` API就是Promise的现代更高效的`XMLHttpRequest`

```js
fetch('products.json').then(function(response) {
  return response.json();
}).then(function(json) {
  products = json;
  initialize();
}).catch(function(err) {
  console.log('Fetch problem: ' + err.message);
});
```

 这里的`fetch()`只需要一个参数 — 资源的网络URL，返回一个`promise`。promise是表示异步操作**完成**或**失败**的对象。

如果其中任何一个`then()`块失败，则在末尾运行`catch()`块 — 与同步`try...catch`类似，`catch()`提供了一个错误的对象，可用来报告发生的错误类型。但`try...catch`不能与promise一起工作。

#### The Event Queue

像promise这样的异步操作被放入事件队列中，事件队列在**主线程**完成处理后运行，这样它们就不会阻止后续JavaScript代码的运行。排队操作将尽快完成，然后将结果返回到JavaScript环境。

#### Promises versus Callbacks

两者本质上是一个返回的对象。

`Promise`优点：

* 可以使用多个`then()`操作将多个异步操作链接在一起，并将其中一个操作的结果作为输入传给下一个操作；而回调则会产生大量的嵌套。
* `Promise`总是严格按照它们放置的事件队列中的**顺序**调用。
* 错误处理都会由末尾的一个`catch()`块处理，而不是在每一层独立处理。

### Async Code本质

#### Example

**async-sync.html**

### Conclusion

在最基本的形式中，JavaScript是一种同步的、阻塞的、单线程的语言。但通过web浏览器所定义的函数和API，允许我们当某些事件发生时不按照同步方式，而是按异步调用函数。

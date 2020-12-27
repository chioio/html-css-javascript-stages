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



## 合作异步JavaScript：Timeouts & Intervals

**`setTimeout()`**

​	在指定的时间后执行一段代码

**`setInterval()`**

​	以固定的时间间隔，重复运行一段代码

**`requestAnimationFrame()`**

​	`setInterval()`的morden版本；在浏览器下一次重新绘制显示之前执行指定的代码块，从而允许动画在适当的帧率下运行，而不管它在什么环境中运行。

* 这些函数设置的异步代码实际上在主线程上运行（在其指定的计时器过去之后）。

  在`setTimeout()`调用**执行之前**或`setInterval()`迭代之间可以（并且经常会）运行其他代码。

* 任何异步代码仅在主线程可用后才执行（当调用栈为空时）。

### `setTimeout()`

**Point：**如果指定值为0（或完全省略该值），函数将尽快执行。

> **Note：**因为`setTimeout()`其本身就是异步操作，指定的时间（或延时）不能保证在指定的确切时间后执行，而是最短的延时执行时间。**主线程上的堆栈为空前，传递给这些函数的回调将无法运行**。所以指定值为0时，回调**不会立即执行**。
>
> **Example：**执行类似`setTimeout(fn, 0)`之类的代码，之后立即运行从1到100亿的循环后，回调将在几秒后执行。

#### 传递参数给`setTimeout()`

```js
function sayHi(who) {
  alert(`Hello ${who}!`);
}

let makeGreeting = setTimeout(sayHi, 2000, 'Mr. Tenn Chio');

```

#### Clearing timeouts

```js
clearTimeout(makeGreeting);
```

### `setInterval()`

#### Example

​	**setinterval-clock.html**

​	**set interval-stopwatch.html**

```js
function displayTime() {
  let date = new Date();
  let time = date.toLocaleTimeString();
  document.getElementById('demo').textContent = time;
}

const createClock = setInterval(displayTime, 1000);
```

#### 清除Intervals

```js
const myInterval = setInterval(myFunction, 2000);

clearInterval(myInterval);
```

#### 递归的timeouts

我们可以递归调用`setTimeout()`来重复运行相同的代码，从而代替`setInterval()`

```js
let i = 1;

setTimeout(function run() {
  console.log(i);
  i++;
  setTimeout(run, 100);
}, 100);

// ==========================

let i = 1;

setInterval(function run() {
  console.log(i);
  i++;
}, 100)
```

##### 递归`setTimeout()`和`setInterval()`有何不同？

* 递归`setTimeout()`保证执行之间的**延迟相同**
* 使用`setInterval()`时，选择的时间间隔包括执行我们所运行的代码所花费的时间。（假设代码需要40毫秒才能运行完成，然后间隔最终只有60毫秒）
* 当递归使用`setTimeout()`时，每次迭代都可以在运行下一次迭代之前计算不同的延迟；即第二个参数的值可以指定再次运行代码之前等待不同的时间。

#### 立即超时

使用0用作`setTimeout()`的回调函数会立即执行，但是在主线程代码之后执行。

```js
// 先弹出弹窗"Hello"，待用户点击弹窗确认按钮后再弹出弹窗"world"

setTimeout(function() {
  alert('World');
}, 0);

alert('Hello');
```

### `requestAnimationFrame()`

`requestAnimationFrame()`是一个专门的循环函数，旨在浏览器中搞笑运行动画。在浏览器重新加载显示内容之前执行指定的代码块，从而允许动画以适当的帧率运行，不管其运行的环境如何。

* `requestAnimationFrame()`是递归调用的

#### `requestAnimationFrame()`与`setInterval()`和`setTimeout()`有什么不同？

```js
function draw() {
  // Drawing code goes here
  requestAnimationFrame(draw);
}

draw();

// ===========================

function draw() {
  // Drawing code goes here
}

setInterval(draw, 17);		// 1000毫秒/60Hz 约为 17毫秒
```

#### 包括时间戳

```js
let startTime = null;

function draw(timestamp) {
  if(!startTime) {
    startTime = timestamp;
  }
  
  currentTime = timestamp - startTime;
  
  // Do something based on current time
  
  requestAnimationFrame(draw);
}

draw();
```

#### 撤销`requestAnimationFrame()`

`cancelAnimationFrame()`撤销，与`setTimeout()`\`setInterval()`的清除有所不同。

```js
cancelAnimationFrame(rAF);
```


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

Web Workers存在局限性，**不能访问DOM** — 不能让一个worker直接更新UI。其次，虽然worker里面运行的代码不会产生阻塞，但是基本上还是**同步**的，即当一个函数依赖于几个在它**之前运行的过程的结果**时，就会成为问题。

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



## Graceful Async Programming with Promises

### What is promises?

本质上，Promises是一个对象，代表操作的中间状态（承诺），它保证未来可能返回某种结果。

### `Promise`

`promise`与事件监听器类似，但也存在差异：

* 一个promise只能**成功**或**失败**一次。它不能成功或失败两次，并且一旦操作完成，他就无法从成功切换到失败，而事件监听器则相反。
* 如果promise成功或失败并且你稍后添加**成功/失败回调**，则将调用正确的回调，即使时间发生在较早的时间。

#### 响应失败

通过	`.catch()`方法来添加错误处理

```js
let errorCase = promise.catch(e => {
  console.log('There has been a problem with your fetch orperation: ' + e.message);
})
```

* 履行的promise所返回的值都将成为传递给下一个`.then()`块的executor函数的参数。

### Promise回顾

* 创建promise时，它既不是**成功**也不是**失败**状态。这个状态叫做**pending**（待定）。

* 当promise返回时，称为**resolved**（已解决）

  * 一个**成功resolved**的promise称为**fullfilled**（实现）。

    它返回一个值，可以通过将`.then()`块链接到promise链的末尾来访问该值。

    `.then()`块中的执行程序函数将包含promise的返回值。

  * 一个**不成功resolved**的promise被称为**rejected（拒绝）**了。

    它返回一个原因（**reason**），一条错误消息，说明为什么拒绝promise。

    可以通过`.catch()`块链接到promise链的末尾来访问此原因。

### 运行代码以响应多个Promises的实现

使用`Promise.all()`**静态方法**，将一个promises数组作为输入参数，并返回一个新的Promise对象，**只有**当数组中的所有promise都满足时才会执行`.then()`块。

```js
Promise.all([a, b, c]).then(values => {
  ...
});
```

### 在promise fullfill/reject后运行一些最终代码

必须在`.then()`和`.catch()`回调中包含相同的代码。

```js
myPromise
	.then(response => {
  	doSomething(response)
  	runFinalCode();
	})
	.catch(e => {
  	returnError(e);
  	runFinalCode();
	})
```

使用`.finally()`块：

```js
myPromise
	.then(response => {
	  doSomething(response);
	})
	.catch(e => {
  returnError(e);
	})
	.finally(() => {
  	runFinalCode()
	})
```

### 构建自定义`promise`

#### 使用`Promise()`构造函数

```js
let timeoutPromise = new Promise((resolve, reject) => {
  setTimeout(function() {
    resolve('Success!')
  }, 2000)
})
```

`resolve()`和`reject()`是用来**实现**和**拒绝**新创建的promise的函数。

```js
timeoutPromise.then(message => {
  alert(message)
})

// ---- 简化 ----
timeoutPromise.then(alert)
```

#### 拒绝一个自定义的`promise`

`reject()`需要一个值，该值为拒绝的原因，即将传递给`.catch()`的错误块。

```js
function timeoutPromise(message, interval) {
  return new Promise((resolve, reject) => {
    if (message === '' || typeof message !== 'string') {
      reject('Message is empty or not a string')
    } else if (interval < 0 || typeof interval !== 'number') {
      reject('Interval is negative ot not a number')
    } else {
      setTimeout(() => {
        resolve(message);
      }, interval)
    }
  })
}
```



## `async` & `await` 

ES 2017中提供的基于promises的**语法糖**，使得异步代码更易于编写和阅读。

### Basic

#### `async` 关键字

​	`async function`，将保证函数**返回值为promise**

```js
async function hello() { return 'Hello' }
// ------------------
let hello = async () => { return 'Hello' }

hello().then(value => console.log(value))
// ------------------
hello().then(console.log)

```

#### `await`关键字

**`await`只在异步函数里面才起作用**。它可以放在任何异步的，基于promise的函数之前。它会暂停代码在该行上，直到promise完成，然后返回结果值。在暂停的同时，其他正在等待的代码就有机会执行了。

```js
async function hello() {
  return greeting = await Promise.resolve('Hello')
}

hello().then(alert)
```

### `async`和`await`的缺陷

`async`/`await`让代码开起来是同步的，在某种程度上，也使得它的行为更加地同步。

`await`关键字会**阻塞**其后的代码，直到promise完成，就像执行同步操作一样。

每个`await`都会等待前一个完成，而我们实际想要的是所有的promises同时开始处理（就像没有使用`async`/`await`时那样）。

解决这个问题 — 通过将**`Promise`对象存储在变量中**来同时开始它们，然后等待它们全部执行完毕。

#### Example

​	**slow-async-await.html**

```js
async function timeTest() {
  await timeoutPromise(3000)
  await timeoutPromise(3000)
  await timeoutPromise(3000)
}
```

这里是直接等待所有三个`timeoutPromise()`调用，使每个调用3秒钟。后续的每一个被迫等到最后一个完成。所以该例子执行所需时间为 9s+。

​	**fast-async-await.html**

```js
async function timeTest() {
  const timeoutPromise1 = timeoutPromise(3000)
  const timeoutPromise2 = timeoutPromise(3000)
  const timeoutPromise3 = timeoutPromise(3000)
  
  await timeoutPromise1
  await timeoutPromise2
  await timeoutPromise3
}
```

这里是将三个Promise对象存储在变量中，这样可以同时启动它们关联的进程。

接下来等待它们的结果 — 因为promise都基本上同时处理，promise将同时完成，所以该例子执行所需时间为仅为 3s+。

* 另外，必须将等待执行的promise封装在异步函数中。

### async/await的类方法

可以在**类/对象方法**前面添加`async`，以使它们返回promises，并`await`它们内部的promises。

```js
class Person {
  constructor(first, last, age, gender, interests) {
    this.name = {
      first,
      last
    }
    this.age = age
    this.gender = gender
    this.interests = interests
  }
  
  async greeting() {
    return await Promise.resolve(`Hi! I'm ${this.name.first}`)
  }
  
  farewell() {
    console.log(`${this.name.first} has left the building. Bye for now!`)
  }
}

let han = new Person('Han', 'Solo', 25, 'male', ['Smuggling'])

han.greeting().then(console.log)
```


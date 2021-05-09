# Client-side web API

## Manipulaing Documents

### web浏览器的重要部分

* Navigator

* Window

* Document

#### Example

​	**shopping-list-finished.html**



## 客户端存储

#### 传统方法：cookies

过时、存在各种安全问题。

`document.cookie`

#### 新流派：Web Storage 和 IndexedDB

* Web Storage API用于存储和检索较小的、由名称和相应值组成的数据项。
* IndexedDB API为浏览器提供了一个完整的数据库系统来存储复杂的数据。（音频、视频文件）

#### 未来：Cache API

Cache API是为存储特定HTTP请求的响应文件而设计的，它对于像存储离线网站文件这样的事情非常有用，能够将文件缓存在本地。缓存通常与Service Worker API组合使用。

### 存储简单数据 — web storage

键名/键值

#### 基本语法

```js
// set
localStorage.setItem('name', 'Chris')
// get
localStorage.getItem('name')
// remove
localStorage.removeItem('name')
```

#### 数据会一直存在

web storage的一个关键特性是，数据在不同页面加载时都存在（甚至是当浏览器关闭后）。

#### 为每个域名分离存储

每个域名都有一个单独的数据存储区（每个单独的网址都在浏览器中加载）。

### 存储复杂数据 — IndexedDB

IndexedDB API（有时简称IDB）是可以在浏览器中访问的一个完整的数据库系统。其种类不限于像字符串和数字这样的简单值，可以在一个IndexedDB中存储视频，图像和许多其他的内容。

#### Example

​	**note.html**


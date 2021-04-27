# HTML

## Words
__W3C - World Wide Web Consortium__  
__SEO - Search Engine Optimization__  
__URL - Uniform Resource Locator(统一资源定位符)__  
__HTTP - Hypertext Transfer Protocol__  
__FTP - FIle Transfer Protocol__  

## WWW Definition
Connect one page to another page or resource, or connect part of a page to another.

## What?

### What is Progressive Enhancement?
A concept that help you build a universal website.

### What is an HTML Element?
An HTML element is defined by a start tag, some content, and an end tag:  
`<tag>Content</tag>`
HTML tags are composed of element, attributes, and values.

## Basic
### Web page basic structure:
```html
<!DOCTYPE html>
<html lang="en">
  <!-- head content for search engine -->
  <head>
    <meta charset="utf-8" />
    <title>page title</title>
  </head>
  <body>
    page content
  </body>
</html>
```

### URL
`"http://www.domain.com/dir/file.html"`  
`http`: scheme(模式)  
`www.domain.com`: hostname  
`/dir/file.html`: path

### Semantic HTML(语义化HTML)
语义: 描述的是网页内容的含义  
语义化: 指通过语义上的标签进行描述的内容

#### Why Semantic HTML
* 提升可访问性和互操作性（内容对于借助辅助技术的残章访问者是可访问的，同时对于台式机、收集、平板电脑及其他设备上的浏览器是可访问的）。
* 提升搜索引擎优化（SEO）的效果。
* 使维护代码和添加样式变得更容易。
* （通常）使代码更少，页面加载更快。

#### `<a>`
"锚"(anchor)

#### `<small></small>`
含义: 法律声明等条文细则.

### Block-level Element & Inline-level Element


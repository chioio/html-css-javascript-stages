# HTML

## Words

**W3C - World Wide Web Consortium**  
**SEO - Search Engine Optimization**  
**URL - Uniform Resource Locator(统一资源定位符)**  
**HTTP - Hypertext Transfer Protocol**  
**FTP - FIle Transfer Protocol**

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

### Semantic HTML(语义化 HTML)

语义: 描述的是网页内容的含义  
语义化: 指通过语义上的标签进行描述的内容

#### Why Semantic HTML

- 提升可访问性和互操作性（内容对于借助辅助技术的残章访问者是可访问的，同时对于台式机、收集、平板电脑及其他设备上的浏览器是可访问的）。
- 提升搜索引擎优化（SEO）的效果。
- 使维护代码和添加样式变得更容易。
- （通常）使代码更少，页面加载更快。

#### `<a>`

"锚"(anchor)

#### `<small></small>`

含义: 法律声明等条文细则.

### Block-level Element & Inline-level Element

## Create Article

### `<header>`, `<footer>`, `<nav>`

Cannot nest a footer element or anther header in the header element, and cannot nest a header element in a footer or address element.
Cannot nest a nav in the address element.

#### `<small>`

Semanticization of copyright or legal terms.

### `<article>`

For one or more article in document, page, website.

### `<section>`

For divide page universal parts.  
Define the similar theme in a group content.

### `<aside>`

For a part of the content that not so relevant to the main content.

### `<div>`

For common containers, it is not semantic.

#### `<span>`

Not semantic inline element.

### class, id, title

## Text Processing

### `<small>`

A side comment indicating the detailed rules(细则).  
It just suit for short words, so do not using it to mark the long legal declaration.

### `<strong>`, `<em>`, `<cite>`

`strong` element means the important content, `em` means the focus content, `cite` element using for mark the references of artworks, films, books etc, but do not using `cite` to reference the person name.

### `<b>`, `<i>`

In the old HTML version, `b` element means the bold text, `i` element means the italic text.
In HTML5, the `b` element not communicate any importance, just visual effect, the `i` element contain different tone or other not regular situations.

### `<figure>`, `<figcaption>`

`figure` element can introduce graph and the `figcaption` contains the graph title.  
`figure` can contains multi content block, but the `figcaption` just allow one.

### `<blockquote>`, `<q>`

The `blockquote` element represents a separate quote(单独的引述), the `q` element represents a inline quote.

### `<time>`

Mark the time, date or time period.  
If the tag content is not qualified time format, we need add the `datetime` property and copy the time in the correct format.

- FORMAT: YYYY-MM-DDZhh:mm:ss  
  2021-04-29Z10:20:00

### `<abbr>`

Explain abbreviations.

### `<dfn>`

Semantic distinction between elements.

### `<sub>`, `<sup>`

Create the subscript and superscript.  
<sub>subscript</sub>DEMO<sup>superscript</sup>

### `<address>`

Using to mark communication address.

### `<del>`, `<ins>`

When change the previous edition, if need to mark the changes we can using `del` and `ins`, seem like `delete` and `insert` operations.

### `<code>`

Using for mark the code example or file name.

### `<pre>`

To keep the content blanks or wrap.
Usually used with `code` to keep the code formats.

<pre>
<code>
function {
  console.log("DEMO");
}
</code>
</pre>

### `<mark>`

Using for highlight text.  
<mark>DEMO</mark>

### `<br>`

Single element, means wrap line.

### `<wbr>`

Single element, means the text line wrapable.

### `<span>`

The `span` has no semantics like `div`, but the difference is that `span` is only suitable for surrounding words or phrases, `div` suitable for surrounding blocks.

### `<ruby>`, `<rp>`, `<rt>`

Ruby annotation.  
<ruby>
中<rt>zhōng</rt>
国<rt>guó</rt>
</ruby>  
<ruby>
<rp>(</rp><rt>apple</rt><rp>)</rp>
</ruby>

## Image Processing

### SVG(Scalable Vector Graphics)

### Color

R(Red), G(Green), B(Blue), RGB 模式又称三原色模式;
C(Cyan 青), M(Magenta 品红), Y(Yellow 黄), B(Black), CMYK 模式又称印刷 4 分色模式.

### `<img>`

`alt` attribute value can replace the image on web page if the image load failure.  
`width` and `height` attributes specify the image size with pixel.


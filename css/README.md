# CSS

`selector { declaration block(property: value) }`

## Inheritance

### Inheritable Properties

> - Text
>
>   - color
>   - direction
>   - font
>   - font-family
>   - font-size
>   - font-style(设置斜体)
>   - font-variant(设置小型大写字母)
>   - font-weight
>   - letter-spacing
>   - line-height
>   - text-align
>   - text-indent(首行缩进)
>   - text-transform(修改大小写)
>   - visibility
>   - white-space(指定如何处理空格)
>   - word-spacing(字间距)
>
> - List
>
>   - list-style
>   - list-style-image(列表指定标记)
>   - list-style-position
>   - list-style-type(设置列表的标记)
>
> - Table
>
>   - border-collapse(相邻单元格边框是否合并为一边框)
>   - border-spacing
>   - caption-side(设置表格标题位置)
>   - empty-cells(是否显示空单元格)
>
> - Page(for printed matter)
>
>   - orphans(设置当前元素内部发生分页时在页面底部需要保留的最少行数)
>   - page-break-inside(设置元素内部分页方式)
>   - widows(设置当前元素内部发生分页时在页面顶部需要保留的最少行数)
>
> - Other
>   - cursor
>   - quotes(指定引号样式)



## CSS Construct Block

### Property value

* inherit

  显示指出该属性的值对应元素的父元素对该属性设定的值相同。

* pre-define value



### CSS Color

HEX, RGB, HSL(CSS 3), RGBA(CSS 3), HSLA(CSS 3)

HSL( Hue[色相] Saturation[饱和度] Lightness[亮度])

Hue: 0 ~ 360

Saturation\Lightness: 0 ~ 100%



## Define Selectors

The selector determines which elements the formatting is applied to, while the **declaration** defines the formatting to be applied.



## Text Styles

Not inherit the father element font setting:

* select
* textarea
* input

> Can use the `font-family: inherit` to inherit the father element font setting.

The font list is called font stack.

<script>
  export default {
    data() {
			return {
        layout: [
          {"x":0,"y":0,"w":2,"h":2,"i":"0"},
	        {"x":2,"y":0,"w":2,"h":4,"i":"1"},
	        {"x":4,"y":0,"w":2,"h":5,"i":"2"},
	        {"x":6,"y":0,"w":2,"h":3,"i":"3"},
	        {"x":8,"y":0,"w":2,"h":3,"i":"4"},
	        {"x":10,"y":0,"w":2,"h":3,"i":"5"},
	        {"x":0,"y":5,"w":2,"h":5,"i":"6"},
	        {"x":2,"y":5,"w":2,"h":5,"i":"7"},
	        {"x":4,"y":5,"w":2,"h":5,"i":"8"},
	        {"x":6,"y":3,"w":2,"h":4,"i":"9"},
	        {"x":8,"y":4,"w":2,"h":4,"i":"10"}
        ]
      }
    },

    methods: {
      createdEvent(newLayout) {
        console.log('created---' + newLayout);
      },

      moveEvent(i, newX, newY) {
        console.log('MOVE i=' + i + ', X=' + newX + ', Y=' + newY);
      },

      movedEvent(i, newX, newY) {
        console.log('MOVED i=' + i + ', X=' + newX + ', Y=' + newY);
      },

      resizeEvent(i, newH, newW, newHPx, newWPx) {
        console.log('RESIZE i=' + i + ', H=' + newH + ', W=' + newW + ', H(px)=' + newHPx + ', W(px)=' + newWPx);
      },

      resizedEvent(i, newH, newW, newHPx, newWPx) {
        console.log('RESIZED i=' + i + ', H=' + newH + ', W=' + newW + ', H(px)=' + newHPx + ', W(px)=' + newWPx);
      }
    }
  };
</script>

## GridLayout 动态布局

### 基础用法

:::demo `layout`为数据源。值必须为 Array，其数据项为 Object。 每条数据项必须有 i, x, y, w 和 h 属性。 请参考下面的 GridItem。
```html
<template>
  <yu-grid-layout :layout="layout"></yu-grid-layout>
</template>

<script>
  export default {
    data: function () {
      return {
        layout: [
          {"x":0,"y":0,"w":2,"h":2,"i":"0"},
          {"x":2,"y":0,"w":2,"h":4,"i":"1"},
          {"x":4,"y":0,"w":2,"h":5,"i":"2"},
          {"x":6,"y":0,"w":2,"h":3,"i":"3"},
          {"x":8,"y":0,"w":2,"h":3,"i":"4"},
          {"x":10,"y":0,"w":2,"h":3,"i":"5"},
          {"x":0,"y":5,"w":2,"h":5,"i":"6"},
          {"x":2,"y":5,"w":2,"h":5,"i":"7"},
          {"x":4,"y":5,"w":2,"h":5,"i":"8"},
          {"x":6,"y":3,"w":2,"h":4,"i":"9"},
          {"x":8,"y":4,"w":2,"h":4,"i":"10"}
        ]
      }
    }
  }
</script>
```
:::

### 事件

:::demo `created`、`beforeMount`、`mounted`、`updated` 分别对应Vue生命周期中的事件。
```html
<template>
  <yu-grid-layout
    :layout="layout"
    @created="createdEvent"
    @resize="resizeEvent"
    @move="moveEvent"
    @resized="resizedEvent"
    @moved="movedEvent"
  >
  </yu-grid-layout>
</template>

<script>
  export default {
    data: function () {
      return {
        layout: [
          {"x":0,"y":0,"w":2,"h":2,"i":"0"},
          {"x":2,"y":0,"w":2,"h":4,"i":"1"},
          {"x":4,"y":0,"w":2,"h":5,"i":"2"},
          {"x":6,"y":0,"w":2,"h":3,"i":"3"},
          {"x":8,"y":0,"w":2,"h":3,"i":"4"},
          {"x":10,"y":0,"w":2,"h":3,"i":"5"},
          {"x":0,"y":5,"w":2,"h":5,"i":"6"},
          {"x":2,"y":5,"w":2,"h":5,"i":"7"},
          {"x":4,"y":5,"w":2,"h":5,"i":"8"},
          {"x":6,"y":3,"w":2,"h":4,"i":"9"},
          {"x":8,"y":4,"w":2,"h":4,"i":"10"}
        ]
      }
    },

    methods: {
      createdEvent(newLayout) {
        console.log('created---' + newLayout);
      },

      moveEvent(i, newX, newY) {
        console.log('MOVE i=' + i + ', X=' + newX + ', Y=' + newY);
      },

      movedEvent(i, newX, newY) {
        console.log('MOVED i=' + i + ', X=' + newX + ', Y=' + newY);
      },

      resizeEvent(i, newH, newW, newHPx, newWPx) {
        console.log('RESIZE i=' + i + ', H=' + newH + ', W=' + newW + ', H(px)=' + newHPx + ', W(px)=' + newWPx);
      },

      resizedEvent(i, newH, newW, newHPx, newWPx) {
        console.log('RESIZED i=' + i + ', H=' + newH + ', W=' + newW + ', H(px)=' + newHPx + ', W(px)=' + newWPx);
      }
    }
  }
</script>
```
:::

### GridLayout Attributes 
| 参数     | 说明                 | 类型       | 是否必须   | 可选值            | 默认值  |
|----------|----------------------|-----------|-----------|-------------------|--------|
| layout | 数据源, 值必须为Array, 其数据项为Object。每条数据项必须有 i, x, y, w 和 h 属性。请参考下面的 GridItem | Array | true | — | — |
| colNum | 定义栅格系统的列数，其值需为自然数 | Number | — | — | 12 |
| rowHeight | 每行的高度，单位像素 | Number | — | — | 30 |
| maxRows | 定义最大行数 | Number | — | — | Infinity |
| margin | 定义栅格中的元素边距(值必须是包含两个 Number的数组，数组中第一个元素表示水平边距，第二个表示垂直边距，单位为像素) | Array | — | — | [10, 10] |
| isDraggable | 标识栅格中的元素是否可拖拽 | Boolean | — | — | true |
| isResizable | 标识栅格中的元素是否可调整大小 | Boolean | — | — | true |
| isMirrored | 标识栅格中的元素是否可镜像反转 | Boolean | — | — | false |
| autoSize | 标识容器是否自动调整大小 | Boolean | — | — | true |
| verticalCompact | 识布局是否垂直压缩 | Boolean | — | — | true |
| useCssTransforms | 标识是否使用CSS属性 transition-property: transform; | Boolean | — | — | true |
| responsive | 标识布局是否为响应式 | Boolean | — | — | false |
| breakpoints | 为响应式布局设置断点 | Object | — | — | { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 } |
| cols | 设置每个断点对应的列数 | Object | — | — | { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 } |

### GridItem Attributes (layout中每一项的属性)
| 参数     | 说明                 | 类型       | 是否必须   | 可选值            | 默认值  |
|----------|----------------------|-----------|-----------|-------------------|--------|
| i | 栅格中元素的ID | String | true | — | — |
| x | 标识栅格元素位于第几列，需为自然数 | Number | true | — | — |
| x | 标识栅格元素位于第几行，需为自然数 | Number | true | — | — |
| w | 标识栅格元素的初始宽度，值为colWidth的倍数 | Number | true | — | — |
| h | 标识栅格元素的初始高度，值为rowHeight的倍数 | Number | true | — | — |
| minW | 栅格元素的最小宽度，值为colWidth的倍数。如果w小于minW，则minW的值会被w覆盖。 | Number | — | — | 1 |
| minH | 栅格元素的最小高度，值为rowHeight的倍数。如果h小于minH，则minH的值会被h覆盖。 | Number | — | — | 1 |
| maxW | 栅格元素的最大宽度，值为colWidth的倍数。如果w大于maxW，则maxW的值会被w覆盖。 | Number | — | — | Infinity |
| maxH | 栅格元素的最大高度，值为rowHeight的倍数。如果h大于maxH，则maxH的值会被h覆盖。 | Number | — | — | Infinity |
| isDraggable | 标识栅格元素是否可拖拽。如果值为null则取决于父容器。 | Boolean | — | — | null |
| static | 标识栅格元素是否为静态的（无法拖拽、调整大小或被其他元素移动）。 | Boolean | — | — | false |
| dragIgnoreFrom | 标识栅格元素中哪些子元素无法触发拖拽事件，值为css-like选择器。 | String | — | — | 'a, button' |
| dragAllowFrom | 标识栅格元素中哪些子元素可以触发拖拽事件，值为css-like选择器。如果值为null则表示所有子元素（dragIgnoreFrom的除外）。 | String | — | — | null |
| resizeIgnoreFrom | 标识栅格元素中哪些子元素无法触发调整大小的事件，值为css-like选择器。 | String | — | — | 'a, button' |

### GridLayout Events
| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| created | 对应Vue生命周期的created | layout |
| beforeMount | 对应Vue生命周期的beforeMount | layout |
| mounted | 对应Vue生命周期的mounted | layout |
| ready | 当完成mount中的所有操作时生成的事件 | layout |
| updated | 更新事件（布局更新或栅格元素的位置重新计算） | layout |
| move | 移动时的事件 | i, newX, newY |
| moved | 移动后的事件 | i, newX, newY |
| resize | 调整大小时的事件 | i, newH, newW, newHPx, newWPx |
| resized | 调整大小后的事件 | i, newH, newW, newHPx, newWPx |

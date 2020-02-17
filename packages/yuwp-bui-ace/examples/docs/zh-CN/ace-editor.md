<script>
  export default {
    data() {
			return {
        lang: 'sql',
        options: {},
        options2: {
          readOnly: true,
          fontSize: 14,
        },
        code: `SELECT name,country FROM Websites;`,
      }
    },

    methods: {
      onchange(code) {}
    }
  };
</script>

## AceEditor 代码高亮输入框

### 基础用法

:::demo `lang`为需要支持的语言。 `change`为一个`Function`，它会在输入值发生变化时调用，参数为当前输入值。
```html
<template>
  <yu-ace-editor :lang="lang" @change="onchange"></yu-ace-editor>
</template>

<script>
  export default {
    data: function () {
      return {
        lang: 'sql'
      }
    },

    methods: {
      onchange(code) {}
    }
  }
</script>
```
:::

### 设置初始值、自定义代码风格

:::demo `code`为初始值。 `theme`为代码风格。`width`为输入框宽度。`height`为输入框高度。
```html
<template>
  <yu-ace-editor :lang="lang" @change="onchange" :code="code" :theme="'monokai'" :width="'500'" :height="'160'"></yu-ace-editor>
</template>

<script>
  export default {
    data: function () {
      return {
        lang: 'sql',
        code: `SELECT name,country FROM Websites;`,
      }
    },

    methods: {
      onchange(code) {}
    }
  }
</script>
```
:::

### 自定义项options

:::demo `readOnly`是否只读。 `fontSize`为字体大小。更多自定义项见下方说明。
```html
<template>
  <yu-ace-editor :lang="lang" @change="onchange" :code="code" :theme="'monokai'" :options="options2" :width="'500'" :height="'160'"></yu-ace-editor>
</template>

<script>
  export default {
    data: function () {
      return {
        lang: 'sql',
        code: `SELECT name,country FROM Websites;`,
        options2: {
          readOnly: true,
          fontSize: 14,
        },
      }
    },

    methods: {
      onchange(code) {}
    }
  }
</script>
```
:::

### AceEditor Attributes 
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|-----------|--------------|-----------|--------------------------------  |-------- |
| lang | 需要支持的语言 | string | html/css/javascript/sql/java | sql |
| change | 输入值发生变化的回调函数，参数为当前输入值 | function | — | — |
| width | 输入框宽度 | string | — | 500 |
| height | 输入框高度 | string | — | 200 |
| theme | 主题 | string | github/monokai/chrome/xcode/clouds | github |
| Options | 自定义配置项 | object | — | {} |

### Options Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|-----------|--------------|-----------|--------------------------------  |-------- |
| selectionStyle | 选中样式 | String | line|text | text |
| highlightActiveLine | 高亮当前行 | Boolean | — | true |
| highlightSelectedWord | 高亮选中文本 | Boolean | — | true |
| readOnly | 是否只读 | Boolean | — | false |
| cursorStyle | 光标样式 | ace/slim/smooth/wide | — | ace |
| mergeUndoDeltas | 合并撤销 | String/Boolean | always | false |
| behavioursEnabled | 启用行为 | Boolean | — | true |
| wrapBehavioursEnabled | 启用换行 | Boolean | — | true |
| autoScrollEditorIntoView | 启用滚动 | Boolean | — | false |
| copyWithEmptySelection | 复制空格 | Boolean | — | true |
| useSoftTabs | 使用软标签 | Boolean | — | false |
| navigateWithinSoftTabs | 软标签跳转 | Boolean | — | false |
| enableMultiselect | 选中多处 | Boolean | — | false |
| hScrollBarAlwaysVisible | 纵向滚动条始终可见 | Boolean | — | false |
| vScrollBarAlwaysVisible | 横向滚动条始终可见 | Boolean | — | false |
| highlightGutterLine | 高亮边线 | Boolean | — | true |
| animatedScroll | 滚动动画 | Boolean | — | false |
| showInvisibles | 显示不可见字符 | Boolean | — | false |
| showPrintMargin | 显示打印边距 | Boolean | — | false |
| printMarginColumn | 设置页边距 | Number | — | 80 |
| printMargin | 显示并设置页边距 | Boolean/Number | — | false |
| fadeFoldWidgets | 淡入折叠部件 | Boolean | — | false |
| showFoldWidgets | 显示折叠部件 | Boolean | — | true |
| showLineNumbers | 显示行号 | Boolean | — | true |
| showGutter | 显示行号区域 | Boolean | — | true |
| displayIndentGuides | 显示参考线 | Boolean | — | true |
| fontSize | 设置字号 | Number/String | — | inherit |
| fontFamily | 设置字体 | String | — | inherit |
| maxLines | 至多行数 | Number | — | — |
| minLines | 至少行数 | Number | — | — |
| scrollPastEnd | 滚动位置 | Boolean/Number | — | 0 |
| fixedWidthGutter | 固定行号区域宽度 | Boolean | — | false |
| scrollSpeed | 滚动速度 | Number | — | — |
| dragDelay | 拖拽延时 | Number | — | — |
| dragEnabled | 是否启用拖动 | Number | — | true |
| focusTimout | 聚焦超时 | Number | — | — |
| tooltipFollowsMouse | 鼠标提示 | Boolean | — | false |
| firstLineNumber | 起始行号 | Boolean | — | 1 |
| newLineMode | 新开行模式 | String | auto/unix/windows | auto |
| useWorker | 使用辅助对象 | Boolean | — | — |
| useSoftTabs | 使用软标签 | Boolean | — | — |
| tabSize | 标签大小 | Number | — | — |
| wrap | 换行 | Boolean | — | — |
| foldStyle | 折叠样式 | String | markbegin/markbeginend/manual | — |

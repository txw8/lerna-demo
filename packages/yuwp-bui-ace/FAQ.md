## 常见问题

<details>
<summary>给组件绑定的事件为什么无法触发？</summary>

在 Vue 2.0 中，为**自定义**组件绑定**原生**事件必须使用 `.native` 修饰符：
```html
<my-component @click.native="handleClick">Click Me</my-component>
```

从易用性的角度出发，我们对 `Button` 组件进行了处理，使它可以监听 `click` 事件：
```html
<yu-button @click="handleButtonClick">Click Me</yu-button>
```

但是对于其他组件，还是需要添加 `.native` 修饰符。
</details>

<details>
<summary>如何在 Table 组件的每一行添加操作该行数据的按钮？</summary>

使用 [Scoped slot](https://vuejs.org/v2/guide/components.html#Scoped-Slots) 即可：
```html
<yu-table-column label="操作">
  <template scope="props">
    <yu-button @click.native="showDetail(props.row)">查看详情</yu-button>
  </template>
</yu-table-column>
```
参数 `row` 即为对应行的数据。
</details>

<details>
<summary>Tree 组件的 `render-content` 和 Table 组件的 `render-header` 怎么用？</summary>

请阅读 Vue 文档 [Render Function](http://vuejs.org/v2/guide/render-function.html) 的相关内容。注意，使用 JSX 来写 Render Function 的话，需要安装 `babyu-plugin-transform-vue-jsx`，并参照其[文档](https://github.com/vuejs/babel-plugin-transform-vue-jsx)进行配置。
</details>

<details>
<summary>如何使用第三方图标库？</summary>

只要修改第三方图标库的前缀（具体方法参阅第三方库的文档），并编写相应的 CSS，即可在 YuwpUI 中像使用内置图标一样使用第三方图标。例如，将第三方库的前缀改为 `yu-icon-my`，然后在其 CSS 文件中添加：
```css
[class^="yu-icon-my"], [class*=" yu-icon-my"] {
  font-family:"your-font-family" !important;

  /* 以下内容参照第三方图标库本身的规则 */
  font-size: inherit;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```
具体使用时，和 YuwpUI 内置的图标用法一样。比如在 `yu-input` 中：
```html
<yu-input icon="my-xxx" />
```
</details>

<details>
<summary>所有组件的任意属性都支持 `.sync` 修饰符吗？</summary>
  
不是。对于支持 `.sync` 修饰符的属性，我们会在文档的 API 表格中注明。更多 `.sync` 的用法请查看 [Vue 文档](https://vuejs.org/v2/guide/components.html#sync-Modifier)。
</details>

<details>
<summary>你们的文档怎么偷偷更新了？</summary>

我们只会在 YuwpUI 发布新版本时同步更新文档，以体现最新的变化。详细的更新内容可以查看 [changelog](http://192.168.254.128/YUFP/yufp-widgets-pc/master/CHANGELOG.zh-CN.md)。
</details>

<details>
<summary>在项目中引入 YuwpUI ，但是 CSS 报错/字体文件报错/组件没有样式是什么原因？</summary>

请参考我们提供的 [starter kit](https://github.com/YuwpUI/element-starter)，在 webpack 的 loaders 中正确配置 file-loader、css-loader 和 style-loader。此外，我们还提供了基于 [cooking](https://github.com/YuwpUI/element-cooking-starter) 和 [laravel](https://github.com/YuwpUI/element-in-laravel-starter) 的项目模板。
</details>

<details>
<summary>将 YuwpUI 克隆至本地，运行时为何会报错/跑不起来？</summary>

首先，确保克隆的是 master 分支的最新代码，并且文件完整。其次，确保本地的 node 版本在 4.0 以上，npm 版本在 3.0 以上。最后，可以启动开发环境：

```bash
npm run dev
```

或是直接打包：

```bash
npm run dist
```
</details>

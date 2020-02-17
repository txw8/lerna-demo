/** YuwpUI 1.3.13 Copyright © 2017-present Yusys All Rights Reserved. */
/* Automatically generated by './build/bin/build-entry.js' */

import AceEditor from '../packages/ace-editor/index.js';
import locale from '@/src/locale';
import CollapseTransition from '@/src/transitions/collapse-transition';

const components = [
  AceEditor,
  CollapseTransition
];

window.$YUWPUI_CONF = window.$YUWPUI_CONF || {};
const install = function(Vue, opts = window.$YUWPUI_CONF) {
  locale.use(opts.locale);
  locale.i18n(opts.i18n);

  /*
    组件属性全局配置功能， use时配置{pagination: {small: true, currentPage: 2, total: 10000, pageSize: 100}}格式的参数。
    优先级：组件标签配置的属性 > 全局配置的属性 > 组件默认属性值
  */
  components.forEach(component => {
    var comName = component.xtype.toLowerCase();
    var attrs = component.props;
    Object.keys(opts).forEach(function(name) {
      if (comName.slice(2) === name) {
        Object.keys(opts[name]).forEach(function(attr) {
          if (opts[name][attr] !== undefined && attrs[attr] !== undefined) {
            if (typeof (attrs[attr]) === 'function') {
              attrs[attr] = {default: opts[name][attr]};
            } else {
              attrs[attr].default = opts[name][attr];
            }
          }
        });
      }
    });
    Vue.component(component.name, component);
    Vue.component(component.xtype, component);
  });

  Vue.prototype.$YUFPWP = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  };

};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
console.log('YuwpUI 1.3.13.2020-2-17');
export default {
  version: '1.3.13',
  locale: locale.use,
  i18n: locale.i18n,
  install,
  CollapseTransition,
  AceEditor
};

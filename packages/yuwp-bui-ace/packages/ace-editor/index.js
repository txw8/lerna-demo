import AceEditor from './src/ace-editor';

/* istanbul ignore next */
AceEditor.install = function(Vue) {
  Vue.component(AceEditor.name, AceEditor);
};

export default AceEditor;

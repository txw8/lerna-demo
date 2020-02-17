<template>
  <div class="ace-editor">
    <editor ref='myEditor' v-model="content" :lang="lang" @init="editorInit" :options="options" :theme="theme" :width="width" :height="height" ></editor>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'ElAceEditor',
  xtype: 'YuAceEditor',
  components: {
    editor: require('vue2-ace-editor')
  },

  props: {
    width: {
      type: String,
      default: '500'
    },
    height: {
      type: String,
      default: '200'
    },
    theme: {
      type: String,
      default: 'xcode'
    },
    code: {
      type: String,
      default: ''
    },
    /* 要支持的代码语言 */
    lang: {
      type: String,
      default: 'sql'
    },
    /* vue2-ace-editor编辑器配置 */
    options: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },

  data() {
    return {
      content: ''
    };
  },

  watch: {
    content(val) {
      this.$emit('change', val);
    }
  },

  mounted() {
    // let editor = this.$refs.myEditor.editor;
  },

  methods: {
    editorInit() {
      this.content = this.code;
      // require('./brace/mode/' + this.lang);
      // require('./brace/theme/' + this.theme);
      require('./brace/mode/sql');
      require('./brace/theme/xcode');
    }
  }
};
</script>

<style scoped></style>

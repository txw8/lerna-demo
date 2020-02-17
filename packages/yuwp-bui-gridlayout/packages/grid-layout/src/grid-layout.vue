<template>
  <grid-layout
    :layout.sync="layout"
    :col-num="colNum"
    :row-height="rowHeight"
    :max-rows="maxRows"
    :margin="margin"
    :is-draggable="isDraggable"
    :is-resizable="isResizable"
    :is-mirrored="isMirrored"
    :auto-size="autoSize"
    :vertical-compact="verticalCompact"
    :use-css-transforms="useCssTransforms"
    :responsive="responsive"
    :breakpoints="breakpoints"
    @layout-created="layoutCreatedEvent"
    @layout-before-mount="layoutBeforeMountEvent"
    @layout-mounted="layoutMountedEvent"
    @layout-ready="layoutReadyEvent"
    @layout-updated="layoutUpdatedEvent"
  >
    <grid-item v-for="item in layout"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :minW="item.minW"
      :minH="item.minH"
      :maxW="item.maxW"
      :maxH="item.maxH"
      :static="item.static"
      :is-draggable="item.isDraggable"
      :drag-ignore-from="item.dragIgnoreFrom"
      :drag-allow-from="item.dragAllowFrom"
      :resize-ignore-from="item.resizeIgnoreFrom"
      :key="item.i"
       @resize="resizeEvent"
       @move="moveEvent"
       @resized="resizedEvent"
       @moved="movedEvent"
      >
      {{item.i}}
    </grid-item>
  </grid-layout>
</template>

<script type="text/babel">
import VueGridLayout from 'vue-grid-layout';

export default {
  name: 'ElGridLayout',
  xtype: 'YuGridLayout',
  comments: [VueGridLayout],
  props: {
    layout: {
      type: Array,
      required: true,
      default: () => []
    },
    colNum: {
      type: Number,
      default: 12
    },
    rowHeight: {
      type: Number,
      default: 30
    },
    maxRows: {
      type: Number,
      default: Infinity
    },
    margin: {
      type: Array,
      default: () => [10, 10]
    },
    isDraggable: {
      type: Boolean,
      default: true
    },
    isResizable: {
      type: Boolean,
      default: true
    },
    isMirrored: {
      type: Boolean,
      default: false
    },
    autoSize: {
      type: Boolean,
      default: true
    },
    verticalCompact: {
      type: Boolean,
      default: true
    },
    useCssTransforms: {
      type: Boolean,
      default: false
    },
    responsive: {
      type: Boolean,
      default: false
    },
    breakpoints: {
      type: Object,
      default: () => {
        return { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
      }
    },
    cols: {
      type: Object,
      default: () => {
        return { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
      }
    }
  },

  data() {
    return {};
  },

  computed: {},

  watch: {
    layout: {
      handler: function(val) {
        this.setLayout(val);
      },
      deep: true
    }
  },

  created() {},

  methods: {
    setLayout(items) {
      items.forEach(item => {
        item.minW = item.minW || 1;
        item.minH = item.minH || 1;
        item.maxW = item.maxW || Infinity;
        item.maxH = item.maxH || Infinity;
        item.static = item.static || false;
        item.isDraggable = item.isDraggable || null;
        item.dragIgnoreFrom = item.dragIgnoreFrom || 'a, button';
        item.dragAllowFrom = item.dragAllowFrom || null;
        item.resizeIgnoreFrom = item.resizeIgnoreFrom || 'a, button';
      });
      this.layout = items;
    },

    layoutCreatedEvent(newLayout) {
      this.$emit('created', newLayout);
    },

    layoutBeforeMountEvent(newLayout) {
      this.$emit('beforeMount', newLayout);
    },

    layoutMountedEvent(newLayout) {
      this.$emit('mounted', newLayout);
    },

    layoutReadyEvent(newLayout) {
      this.$emit('ready', newLayout);
    },

    layoutUpdatedEvent(newLayout) {
      this.$emit('updated', newLayout);
    },

    moveEvent(i, newX, newY) {
      this.$emit('move', i, newX, newY);
    },

    movedEvent(i, newX, newY) {
      this.$emit('moved', i, newX, newY);
    },

    resizeEvent(i, newH, newW, newHPx, newWPx) {
      this.$emit('resize', i, newH, newW, newHPx, newWPx);
    },

    resizedEvent(i, newH, newW, newHPx, newWPx) {
      this.$emit('resized', i, newH, newW, newHPx, newWPx);
    }
  }
};
</script>
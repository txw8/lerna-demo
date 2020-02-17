import GridLayout from './src/grid-layout.vue';

GridLayout.install = function(Vue) {
  Vue.component(GridLayout.name, GridLayout);
};

export default GridLayout;

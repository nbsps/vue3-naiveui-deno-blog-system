<template>
  <div class="info-wrap">
    <div class="info">
      <h3 class="title">{{ title }}</h3>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '关于我',
    },
  },
  setup() {
    // const title = ref(store.state.)
    return {};
  },
});
</script>

<style lang="less" scoped>
.info-wrap {
  box-sizing: border-box;
  // float: left;
  position: absolute;
  width: 100%;
  padding: 20px;
  // margin: 20px 10px 10px 0;
  // text-align: right;
  z-index: 10;
}
.title {
  // margin: 40px 0 10px;
  padding-bottom: 5px;
  border-bottom: 2px solid black;
  margin-bottom: 10px;
}
// @media (max-width: 768px) {
//   .info-wrap {
//     width: 100%;
//     // display: block;
//     // position: relative;
//   }
//   // * {
//   //   margin: 0;
//   // }
// }
</style>

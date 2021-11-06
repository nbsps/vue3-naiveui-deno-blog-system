<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from '@vue/runtime-core';
import scrollReveal from 'scrollreveal';
export default defineComponent({
  mounted() {
    scrollReveal().reveal('.card', {
      distance: '100px',
      duration: 1000,
      easing: 'ease-out',
      interval: 100,
      opacity: 0,
      origin: 'bottom',
    });
  },
});
</script>

<style lang="less" scoped>
.card {
  position: relative;
  display: block;
  margin: 5vh 10vw 0 10vw;
  height: 300px;
  width: 80vw;
  border-radius: 15px;
  transition: all ease 0.3s;
  box-shadow: 0 4px 8px 6px rgba(7, 17, 27, 0.1);
  background-color: #fff;
}
.card:hover {
  box-shadow: 0 4px 8px 8px rgba(7, 17, 27, 0.15);
}
</style>

<template>
  <div class="back-top" @click="backTopClick">
    <img src="~assets/img/backtop.png" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  name: 'backTop',
  setup() {
    // 注册 滚动事件
    document.addEventListener('scroll', () => {
      const backtop: HTMLDivElement | null =
        document.querySelector('.back-top');
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (!backtop) return;
      if (scrollTop == 0) {
        backtop.style.opacity = '0';
        backtop.style.transform = 'translateX(50px)';
      } else {
        backtop.style.opacity = '1';
        backtop.style.transform = 'translateX(0)';
      }
    });
    // 返回顶部
    const backTopClick = () => {
      if (document.documentElement.scrollTop) {
        scrollTopSmooth();
        return;
      }
      document.body.scrollTop = 0;
    };
    function scrollTopSmooth(position = 0) {
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (af) {
          return setTimeout(af, 17);
        };
      }
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const step = function () {
        let distance = position - scrollTop;
        scrollTop = scrollTop + distance / 5;
        if (Math.abs(distance) < 1) {
          window.scrollTo(0, position);
        } else {
          window.scrollTo(0, scrollTop);
          requestAnimationFrame(step);
        }
      };
      step();
    }

    return {
      backTopClick,
    };
  },
});
</script>

<style lang="less" scoped>
.back-top {
  position: fixed;
  right: 10px;
  bottom: 30px;
  opacity: 0;
  transition: all ease-in-out 0.5s;
  transform: translateX(0);
  img {
    width: 43px;
  }
}
</style>
